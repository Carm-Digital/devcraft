"use client";

import Link from "next/link";
import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import type { JournalEntry } from "@/lib/adminJournal";
import type { SiteColors, SiteContent } from "@/lib/siteContent";

type State = {
  loading: boolean;
  saving: boolean;
  content: SiteContent | null;
};

type StatutDevis = "en_attente" | "acompte_regle" | "solde_regle" | "archive";

type DemandeDevis = {
  clientId?: string;
  createdAt?: string;
  prenom?: string;
  nom?: string;
  email?: string;
  telephone?: string;
  entreprise?: string;
  typeSite?: string;
  description?: string;
  styleSouhaite?: string;
  hasLogo?: boolean;
  hasTextes?: boolean;
  hasPhotos?: boolean;
  accompagnementLogo?: boolean;
  accompagnementTextes?: boolean;
  accompagnementPhotos?: boolean;
  commentConnu?: string;
  acompte?: number;
  solde?: number;
  statut?: StatutDevis;
  notes?: string;
  [key: string]: unknown;
};

const inputClass =
  "mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[#0d0f14] shadow-sm focus:border-[#00D4FF] focus:outline-none focus:ring-2 focus:ring-[#00D4FF]/20";

const STATUT_LABELS: Record<StatutDevis, string> = {
  en_attente: "En attente",
  acompte_regle: "Acompte réglé",
  solde_regle: "Solde réglé",
  archive: "Archivé",
};

const DEMANDE_FILTER_OPTIONS: { value: "tous" | StatutDevis; label: string }[] = [
  { value: "tous", label: "Tous" },
  { value: "en_attente", label: "En attente" },
  { value: "acompte_regle", label: "Acompte réglé" },
  { value: "solde_regle", label: "Solde réglé" },
  { value: "archive", label: "Archivé" },
];

type DemandeSortId = "recent" | "ancien" | "montant_asc" | "montant_desc";

const DEMANDE_SORT_OPTIONS: { value: DemandeSortId; label: string }[] = [
  { value: "recent", label: "Plus récent" },
  { value: "ancien", label: "Plus ancien" },
  { value: "montant_asc", label: "Montant croissant" },
  { value: "montant_desc", label: "Montant décroissant" },
];

function coerceStatut(s: unknown): StatutDevis {
  if (s === "en_attente" || s === "acompte_regle" || s === "solde_regle" || s === "archive") {
    return s;
  }
  return "en_attente";
}

function formatDemandeField(value: unknown): string {
  if (value === undefined || value === null) return "—";
  if (typeof value === "boolean") return value ? "Oui" : "Non";
  if (typeof value === "string" && !value.trim()) return "—";
  return String(value);
}

function journalIconEmoji(action: string): string {
  const a = action.toLowerCase();
  if (a.includes("contenu")) return "📄";
  if (a.includes("archiv")) return "📦";
  if (a.includes("suppression")) return "🗑️";
  if (a.includes("montant")) return "💶";
  if (a.includes("mail") || a.includes("e-mail")) return "✉️";
  return "📌";
}

function statutBadgeClass(s: StatutDevis): string {
  switch (s) {
    case "en_attente":
      return "bg-slate-200 text-slate-800 ring-1 ring-slate-300";
    case "acompte_regle":
      return "bg-[#00D4FF]/10 text-[#00D4FF] ring-1 ring-[#00D4FF]/40";
    case "solde_regle":
      return "bg-emerald-100 text-emerald-900 ring-1 ring-emerald-300";
    case "archive":
      return "bg-red-100 text-red-900 ring-1 ring-red-300";
    default:
      return "bg-slate-200 text-slate-800 ring-1 ring-slate-300";
  }
}

type AdminTabId = "demandes" | "statistiques" | "journal" | "contenu" | "parametres" | "couleurs";

const ADMIN_TABS: { id: AdminTabId; label: string }[] = [
  { id: "demandes", label: "Demandes" },
  { id: "statistiques", label: "Statistiques" },
  { id: "journal", label: "Journal" },
  { id: "contenu", label: "Contenu" },
  { id: "parametres", label: "Paramètres" },
  { id: "couleurs", label: "Couleurs" },
];

const THEME_COLOR_ROWS: { key: keyof SiteColors; label: string; zone: string }[] = [
  { key: "nuit", label: "Fond sombre", zone: "Header, footer, hero, tous les modules sombres" },
  { key: "electric", label: "Bleu accent", zone: "Dégradés, effets de fond, radial gradients" },
  { key: "gold", label: "Accent principal (cyan)", zone: "Boutons, liens actifs, eyebrow, badges, icônes" },
  { key: "offwhite", label: "Fond clair", zone: "Fond des pages, sections claires, cartes blanches" },
  { key: "foreground", label: "Texte principal", zone: "Textes sombres sur fond clair" },
];

/** Valeur #rrggbb pour <input type="color" /> */
function hexForColorInput(hex: string): string {
  const s = hex.trim();
  const m3 = /^#([0-9A-Fa-f])([0-9A-Fa-f])([0-9A-Fa-f])$/i.exec(s);
  if (m3) {
    return `#${m3[1]}${m3[1]}${m3[2]}${m3[2]}${m3[3]}${m3[3]}`.toLowerCase();
  }
  if (/^#[0-9A-Fa-f]{6}$/i.test(s)) return s.toLowerCase();
  if (/^#[0-9A-Fa-f]{8}$/i.test(s)) return `#${s.slice(1, 7)}`.toLowerCase();
  return "#000000";
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<AdminTabId>("demandes");

  const [state, setState] = useState<State>({
    loading: true,
    saving: false,
    content: null,
  });

  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const [devisLoading, setDevisLoading] = useState(true);
  const [demandes, setDemandes] = useState<DemandeDevis[]>([]);
  const [devisEdits, setDevisEdits] = useState<
    Record<string, { acompte: string; solde: string; statut: StatutDevis; notes: string }>
  >({});
  const [devisBusyId, setDevisBusyId] = useState<string | null>(null);
  const [copyFeedbackId, setCopyFeedbackId] = useState<string | null>(null);
  const [origin, setOrigin] = useState("");
  const [demandeFilterStatut, setDemandeFilterStatut] = useState<"tous" | StatutDevis>("tous");
  const [demandeSearch, setDemandeSearch] = useState("");
  const [demandeSort, setDemandeSort] = useState<DemandeSortId>("recent");
  const [selectedDemande, setSelectedDemande] = useState<DemandeDevis | null>(null);
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [journalLoading, setJournalLoading] = useState(false);

  useEffect(() => {
    setOrigin(typeof window !== "undefined" ? window.location.origin : "");
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), 3000);
    return () => window.clearTimeout(t);
  }, [toast]);

  useEffect(() => {
    void loadContent();
  }, []);

  const loadDevis = useCallback(async () => {
    setDevisLoading(true);
    try {
      const res = await fetch("/api/admin/devis", { cache: "no-store", credentials: "include" });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        throw new Error(data?.message ?? "Impossible de charger les demandes.");
      }
      const list = (data.demandes ?? []) as DemandeDevis[];
      setDemandes(list);
      const nextEdits: Record<
        string,
        { acompte: string; solde: string; statut: StatutDevis; notes: string }
      > = {};
      for (const d of list) {
        const id = String(d.clientId ?? "");
        if (!id) continue;
        nextEdits[id] = {
          acompte: d.acompte !== undefined && d.acompte !== null ? String(d.acompte) : "",
          solde: d.solde !== undefined && d.solde !== null ? String(d.solde) : "",
          statut: coerceStatut(d.statut),
          notes: typeof d.notes === "string" ? d.notes : "",
        };
      }
      setDevisEdits(nextEdits);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erreur de chargement des devis.";
      setToast({ message, type: "error" });
    } finally {
      setDevisLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadDevis();
  }, [loadDevis]);

  const loadJournal = useCallback(async () => {
    setJournalLoading(true);
    try {
      const res = await fetch("/api/admin/journal", { cache: "no-store", credentials: "include" });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        throw new Error(data?.message ?? "Impossible de charger le journal.");
      }
      setJournalEntries((data.entries ?? []) as JournalEntry[]);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erreur de chargement du journal.";
      setToast({ message, type: "error" });
    } finally {
      setJournalLoading(false);
    }
  }, []);

  useEffect(() => {
    if (activeTab === "journal") void loadJournal();
  }, [activeTab, loadJournal]);

  useEffect(() => {
    if (!selectedDemande) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedDemande(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedDemande]);

  const sortedFilteredDemandes = useMemo(() => {
    const filtered = demandes.filter((d) => {
      const id = String(d.clientId ?? "");
      if (!id) return false;
      const statut = devisEdits[id]?.statut ?? coerceStatut(d.statut);
      if (demandeFilterStatut !== "tous" && statut !== demandeFilterStatut) return false;
      const q = demandeSearch.trim().toLowerCase();
      if (q) {
        const fullName = [d.prenom, d.nom].filter(Boolean).join(" ").toLowerCase();
        const email = String(d.email ?? "").toLowerCase();
        if (!fullName.includes(q) && !email.includes(q) && !id.toLowerCase().includes(q)) {
          return false;
        }
      }
      return true;
    });

    const getCreated = (d: DemandeDevis) => (typeof d.createdAt === "string" ? d.createdAt : "");

    const getMontantTotal = (d: DemandeDevis) => {
      const id = String(d.clientId ?? "");
      const ed = devisEdits[id];
      const fromEditA = ed ? Number(ed.acompte.replace(",", ".")) : NaN;
      const fromEditS = ed ? Number(ed.solde.replace(",", ".")) : NaN;
      const a =
        !Number.isNaN(fromEditA) ? fromEditA : typeof d.acompte === "number" ? d.acompte : 0;
      const s = !Number.isNaN(fromEditS) ? fromEditS : typeof d.solde === "number" ? d.solde : 0;
      return a + s;
    };

    const copy = [...filtered];
    switch (demandeSort) {
      case "recent":
        copy.sort((a, b) => getCreated(b).localeCompare(getCreated(a)));
        break;
      case "ancien":
        copy.sort((a, b) => getCreated(a).localeCompare(getCreated(b)));
        break;
      case "montant_asc":
        copy.sort((a, b) => getMontantTotal(a) - getMontantTotal(b));
        break;
      case "montant_desc":
        copy.sort((a, b) => getMontantTotal(b) - getMontantTotal(a));
        break;
      default:
        break;
    }
    return copy;
  }, [demandes, devisEdits, demandeFilterStatut, demandeSearch, demandeSort]);

  async function loadContent() {
    setState((prev) => ({ ...prev, loading: true }));
    try {
      const res = await fetch("/api/admin/content", { cache: "no-store", credentials: "include" });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        throw new Error(data?.message ?? "Impossible de charger les contenus.");
      }
      setState((prev) => ({ ...prev, loading: false, content: data.content }));
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erreur de chargement.";
      setState((prev) => ({ ...prev, loading: false }));
      setToast({ message, type: "error" });
    }
  }

  function updateField<K extends keyof SiteContent>(key: K, value: SiteContent[K]) {
    setState((prev) =>
      prev.content ? { ...prev, content: { ...prev.content, [key]: value } } : prev,
    );
  }

  function updateSocialLink<K extends keyof SiteContent["socialLinks"]>(key: K, value: string) {
    setState((prev) =>
      prev.content
        ? {
            ...prev,
            content: {
              ...prev.content,
              socialLinks: { ...prev.content.socialLinks, [key]: value },
            },
          }
        : prev,
    );
  }

  function updateColor<K extends keyof SiteContent["colors"]>(key: K, value: string) {
    setState((prev) =>
      prev.content
        ? {
            ...prev,
            content: {
              ...prev.content,
              colors: { ...prev.content.colors, [key]: value },
            },
          }
        : prev,
    );
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!state.content) return;

    setState((prev) => ({ ...prev, saving: true }));
    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(state.content),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        throw new Error(data?.message ?? "Enregistrement impossible.");
      }
      setState((prev) => ({
        ...prev,
        saving: false,
        content: data.content,
      }));
      setToast({ message: "Modifié avec succès.", type: "success" });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erreur d'enregistrement.";
      setState((prev) => ({ ...prev, saving: false }));
      setToast({ message, type: "error" });
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  async function handleSaveDevis(clientId: string) {
    const edit = devisEdits[clientId];
    if (!edit) return;

    const acompte = Number(edit.acompte.replace(",", "."));
    const solde = Number(edit.solde.replace(",", "."));
    if (Number.isNaN(acompte) || Number.isNaN(solde)) {
      setToast({ message: "Montants invalides.", type: "error" });
      return;
    }

    setDevisBusyId(clientId);
    try {
      const res = await fetch("/api/admin/devis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          clientId,
          acompte,
          solde,
          statut: edit.statut,
          notes: edit.notes,
        }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        throw new Error(data?.message ?? "Enregistrement impossible.");
      }
      setToast({ message: "Montants enregistrés.", type: "success" });
      await loadDevis();
    } catch (err) {
      setToast({
        message: err instanceof Error ? err.message : "Erreur d'enregistrement.",
        type: "error",
      });
    } finally {
      setDevisBusyId(null);
    }
  }

  async function handleArchiveDemande(clientId: string) {
    const edit = devisEdits[clientId];
    if (!edit) return;

    const acompte = Number(edit.acompte.replace(",", "."));
    const solde = Number(edit.solde.replace(",", "."));
    if (Number.isNaN(acompte) || Number.isNaN(solde)) {
      setToast({ message: "Montants invalides.", type: "error" });
      return;
    }

    setDevisBusyId(clientId);
    try {
      const res = await fetch("/api/admin/devis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          clientId,
          acompte,
          solde,
          statut: "archive",
          notes: edit.notes,
        }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        throw new Error(data?.message ?? "Archivage impossible.");
      }
      setToast({ message: "Demande archivée.", type: "success" });
      await loadDevis();
    } catch (err) {
      setToast({
        message: err instanceof Error ? err.message : "Erreur lors de l’archivage.",
        type: "error",
      });
    } finally {
      setDevisBusyId(null);
    }
  }

  async function handleDeleteDemande(clientId: string) {
    if (
      !window.confirm(
        `Supprimer définitivement la demande ${clientId} ? Cette action est irréversible.`,
      )
    ) {
      return;
    }

    setDevisBusyId(clientId);
    try {
      const res = await fetch("/api/admin/devis", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ clientId }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        throw new Error(data?.message ?? "Suppression impossible.");
      }
      setToast({ message: "Demande supprimée.", type: "success" });
      await loadDevis();
    } catch (err) {
      setToast({
        message: err instanceof Error ? err.message : "Erreur lors de la suppression.",
        type: "error",
      });
    } finally {
      setDevisBusyId(null);
    }
  }

  async function copyPaymentLink(clientId: string) {
    const base = typeof window !== "undefined" ? window.location.origin : origin;
    const url = `${base}/reglement-devis?id=${encodeURIComponent(clientId)}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopyFeedbackId(clientId);
      window.setTimeout(() => setCopyFeedbackId(null), 2000);
    } catch {
      setToast({ message: "Copie impossible (permissions navigateur).", type: "error" });
    }
  }

  return (
    <main className="min-h-screen bg-[#F5F4F0] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold text-[#0d0f14]">Admin DevCraft</h1>
            <p className="mt-1 text-sm text-slate-600">
              Modifiez les contenus principaux sans toucher au code.
            </p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-[#F5F4F0]"
          >
            Se deconnecter
          </button>
        </div>

        <nav
          className="-mx-4 mb-8 overflow-x-auto border-b border-slate-200 px-4 sm:mx-0 sm:px-0"
          aria-label="Navigation admin"
        >
          <div className="flex min-w-max gap-0 sm:min-w-0">
            {ADMIN_TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`shrink-0 border-b-2 px-4 py-3 text-sm font-semibold transition ${
                    isActive
                      ? "border-[#00D4FF] bg-[#0d0f14] text-white"
                      : "border-transparent bg-transparent text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </nav>

        {activeTab === "demandes" && (
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="font-display text-xl font-bold text-[#0d0f14]">Demandes de devis reçues</h2>
                <p className="mt-1 text-sm text-slate-600">
                  Gestion des devis stockés dans KV (demandes de qualification).
                </p>
              </div>
              <button
                type="button"
                onClick={() => void loadDevis()}
                disabled={devisLoading}
                className="shrink-0 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-[#F5F4F0] disabled:cursor-not-allowed disabled:opacity-60"
              >
                ↺ Rafraîchir
              </button>
            </div>

            {devisLoading && <p className="mt-4 text-slate-600">Chargement des demandes…</p>}

            {!devisLoading && demandes.length === 0 && (
              <p className="mt-4 text-sm text-slate-600">Aucune demande pour le moment (ou KV non configuré).</p>
            )}

            {!devisLoading && demandes.length > 0 && (
              <div className="mt-6 flex flex-col gap-4 border-t border-slate-100 pt-6 lg:flex-row lg:flex-wrap lg:items-end lg:justify-between">
                <div className="grid w-full gap-3 sm:max-w-md lg:flex-1">
                  <label htmlFor="demande-filter-statut" className="text-xs font-semibold text-slate-700">
                    Filtrer par statut
                  </label>
                  <select
                    id="demande-filter-statut"
                    className={inputClass}
                    value={demandeFilterStatut}
                    onChange={(e) =>
                      setDemandeFilterStatut(e.target.value as "tous" | StatutDevis)
                    }
                  >
                    {DEMANDE_FILTER_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid w-full flex-1 gap-3 sm:min-w-[200px]">
                  <label htmlFor="demande-search" className="text-xs font-semibold text-slate-700">
                    Recherche (nom, email, ID)
                  </label>
                  <input
                    id="demande-search"
                    type="search"
                    placeholder="Rechercher…"
                    autoComplete="off"
                    className={inputClass}
                    value={demandeSearch}
                    onChange={(e) => setDemandeSearch(e.target.value)}
                  />
                </div>
                <div className="grid w-full gap-3 sm:max-w-xs lg:shrink-0">
                  <label htmlFor="demande-sort" className="text-xs font-semibold text-slate-700">
                    Trier par
                  </label>
                  <select
                    id="demande-sort"
                    className={inputClass}
                    value={demandeSort}
                    onChange={(e) => setDemandeSort(e.target.value as DemandeSortId)}
                  >
                    {DEMANDE_SORT_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {!devisLoading && demandes.length > 0 && (
              <p className="mt-4 text-sm font-medium text-slate-700">
                {sortedFilteredDemandes.length === 1
                  ? "1 demande"
                  : `${sortedFilteredDemandes.length} demandes`}
              </p>
            )}

            {!devisLoading && demandes.length > 0 && sortedFilteredDemandes.length === 0 && (
              <p className="mt-4 text-sm text-slate-600">Aucune demande ne correspond aux filtres.</p>
            )}

            <ul className="mt-6 space-y-6">
              {sortedFilteredDemandes.map((d) => {
                const id = String(d.clientId ?? "");
                if (!id) return null;
                const edit = devisEdits[id] ?? {
                  acompte: "",
                  solde: "",
                  statut: "en_attente" as StatutDevis,
                  notes: "",
                };
                const effectiveStatut = edit.statut;
                const created =
                  typeof d.createdAt === "string"
                    ? new Date(d.createdAt).toLocaleString("fr-FR", { dateStyle: "short", timeStyle: "short" })
                    : "—";
                const paymentUrl = origin ? `${origin}/reglement-devis?id=${encodeURIComponent(id)}` : "";
                const busy = devisBusyId === id;

                return (
                  <li
                    key={id}
                    className="rounded-xl border border-slate-200 bg-[#F5F4F0]/80 p-4 sm:p-5"
                  >
                    <div className="flex flex-wrap items-center gap-3">
                      <p className="font-mono text-lg font-bold tracking-wide text-[#00D4FF] drop-shadow-sm [text-shadow:0_0_1px_rgba(0,0,0,0.3)]">
                        {id}
                      </p>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${statutBadgeClass(effectiveStatut)}`}
                      >
                        {STATUT_LABELS[effectiveStatut] ?? effectiveStatut}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-slate-500">Créée le {created}</p>
                    <div className="mt-3 grid gap-1 text-sm text-slate-700">
                      <p>
                        <strong>Nom :</strong> {[d.prenom, d.nom].filter(Boolean).join(" ") || "—"}
                      </p>
                      <p>
                        <strong>Email :</strong> {String(d.email ?? "—")}
                      </p>
                      <p>
                        <strong>Téléphone :</strong> {String(d.telephone ?? "—")}
                      </p>
                      <p>
                        <strong>Type de site :</strong> {String(d.typeSite ?? "—")}
                      </p>
                    </div>

                    <div className="mt-4 grid gap-3 sm:grid-cols-3">
                      <div>
                        <label className="text-xs font-semibold text-slate-700">Acompte (€)</label>
                        <input
                          type="text"
                          inputMode="decimal"
                          className={inputClass}
                          value={edit.acompte}
                          onChange={(e) =>
                            setDevisEdits((prev) => ({
                              ...prev,
                              [id]: { ...edit, acompte: e.target.value },
                            }))
                          }
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-slate-700">Solde (€)</label>
                        <input
                          type="text"
                          inputMode="decimal"
                          className={inputClass}
                          value={edit.solde}
                          onChange={(e) =>
                            setDevisEdits((prev) => ({
                              ...prev,
                              [id]: { ...edit, solde: e.target.value },
                            }))
                          }
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-slate-700">Statut</label>
                        <select
                          className={inputClass}
                          value={edit.statut}
                          onChange={(e) =>
                            setDevisEdits((prev) => ({
                              ...prev,
                              [id]: { ...edit, statut: e.target.value as StatutDevis },
                            }))
                          }
                        >
                          {(Object.keys(STATUT_LABELS) as StatutDevis[]).map((s) => (
                            <option key={s} value={s}>
                              {STATUT_LABELS[s]}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="mt-4">
                      <label htmlFor={`notes-${id}`} className="text-xs font-semibold text-slate-700">
                        Notes internes
                      </label>
                      <textarea
                        id={`notes-${id}`}
                        className={inputClass}
                        rows={3}
                        placeholder="Ajouter une note..."
                        value={edit.notes}
                        onChange={(e) =>
                          setDevisEdits((prev) => ({
                            ...prev,
                            [id]: { ...edit, notes: e.target.value },
                          }))
                        }
                      />
                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        disabled={busy}
                        onClick={() => void handleSaveDevis(id)}
                        className="rounded-xl bg-[#0d0f14] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#111827] disabled:opacity-60"
                      >
                        {busy ? "En cours…" : "Enregistrer les montants"}
                      </button>
                      <Link
                        href={`/admin/devis/${encodeURIComponent(id)}`}
                        className={`rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-[#0d0f14] transition hover:bg-[#F5F4F0] ${busy ? "pointer-events-none opacity-50" : ""}`}
                        aria-disabled={busy}
                      >
                        Créer un devis →
                      </Link>
                      <button
                        type="button"
                        disabled={busy}
                        onClick={() => setSelectedDemande(d)}
                        className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-[#0d0f14] transition hover:bg-[#F5F4F0] disabled:opacity-60"
                      >
                        Voir détail
                      </button>
                      <button
                        type="button"
                        disabled={busy}
                        onClick={() => void handleArchiveDemande(id)}
                        className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:opacity-60"
                      >
                        Archiver
                      </button>
                      <button
                        type="button"
                        disabled={busy}
                        onClick={() => void handleDeleteDemande(id)}
                        className="rounded-xl border border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-50 disabled:opacity-60"
                      >
                        Supprimer
                      </button>
                    </div>

                    <div className="mt-4 rounded-lg border border-dashed border-slate-300 bg-white p-3">
                      <p className="text-xs font-medium text-slate-500">Lien de paiement</p>
                      <p className="mt-1 break-all font-mono text-xs text-slate-800">
                        {paymentUrl || "…"}
                      </p>
                      <button
                        type="button"
                        onClick={() => void copyPaymentLink(id)}
                        className="mt-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-[#F5F4F0]"
                      >
                        {copyFeedbackId === id ? "Copié !" : "Copier le lien"}
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        )}

        {activeTab === "statistiques" && (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-600 shadow-sm">
            Module statistiques — à venir
          </div>
        )}

        {activeTab === "journal" && (
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="font-display text-xl font-bold text-[#0d0f14]">Journal d&apos;activité</h2>
                <p className="mt-1 text-sm text-slate-600">Les 50 dernières actions enregistrées dans KV.</p>
              </div>
              <button
                type="button"
                onClick={() => void loadJournal()}
                disabled={journalLoading}
                className="shrink-0 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-[#F5F4F0] disabled:cursor-not-allowed disabled:opacity-60"
              >
                ↺ Rafraîchir
              </button>
            </div>
            {journalLoading && <p className="mt-6 text-sm text-slate-600">Chargement…</p>}
            {!journalLoading && journalEntries.length === 0 && (
              <p className="mt-6 text-sm text-slate-600">Aucune entrée (ou KV non configuré).</p>
            )}
            {!journalLoading && journalEntries.length > 0 && (
              <ul className="mt-6 space-y-3">
                {journalEntries.map((entry, i) => (
                  <li
                    key={`${entry.timestamp}-${i}`}
                    className="flex gap-3 rounded-xl bg-[#0d0f14] px-4 py-3 text-sm text-slate-200"
                  >
                    <span className="shrink-0 text-lg leading-none" aria-hidden>
                      {journalIconEmoji(entry.action)}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-white">{entry.action}</p>
                      {entry.detail ? <p className="mt-0.5 text-slate-400">{entry.detail}</p> : null}
                      <p className="mt-1 text-xs text-slate-500">
                        {new Date(entry.timestamp).toLocaleString("fr-FR", {
                          dateStyle: "short",
                          timeStyle: "short",
                        })}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}

        {activeTab === "contenu" && (
          <>
            {state.loading && (
              <div className="rounded-2xl border border-slate-200 bg-white p-6 text-slate-600">Chargement...</div>
            )}

            {!state.loading && state.content && (
              <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <div>
                  <label className="text-sm font-semibold text-[#0d0f14]">Titre principal (hero)</label>
                  <input
                    className={inputClass}
                    value={state.content.heroTitle}
                    onChange={(e) => updateField("heroTitle", e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-[#0d0f14]">Sous-titre hero</label>
                  <textarea
                    className={inputClass}
                    rows={3}
                    value={state.content.heroSubtitle}
                    onChange={(e) => updateField("heroSubtitle", e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-[#0d0f14]">Texte des services</label>
                  <textarea
                    className={inputClass}
                    rows={3}
                    value={state.content.servicesText}
                    onChange={(e) => updateField("servicesText", e.target.value)}
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <label className="text-sm font-semibold text-[#0d0f14]">Prix vitrine</label>
                    <input
                      className={inputClass}
                      value={state.content.offerPrices.vitrine}
                      onChange={(e) =>
                        updateField("offerPrices", { ...state.content!.offerPrices, vitrine: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-[#0d0f14]">Prix complet</label>
                    <input
                      className={inputClass}
                      value={state.content.offerPrices.complet}
                      onChange={(e) =>
                        updateField("offerPrices", { ...state.content!.offerPrices, complet: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-[#0d0f14]">Prix abonnement</label>
                    <input
                      className={inputClass}
                      value={state.content.offerPrices.abonnement}
                      onChange={(e) =>
                        updateField("offerPrices", { ...state.content!.offerPrices, abonnement: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="submit"
                    disabled={state.saving}
                    className="rounded-xl bg-[#0d0f14] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#111827] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {state.saving ? "Enregistrement..." : "Enregistrer"}
                  </button>
                </div>
              </form>
            )}
          </>
        )}

        {activeTab === "parametres" && (
          <>
            {state.loading && (
              <div className="rounded-2xl border border-slate-200 bg-white p-6 text-slate-600">Chargement...</div>
            )}

            {!state.loading && state.content && (
              <form onSubmit={handleSubmit} className="space-y-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <div className="space-y-4">
                  <h3 className="border-b border-slate-200 pb-2 font-display text-lg font-bold text-[#0d0f14]">
                    Site public
                  </h3>
                  <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-[#F5F4F0]/80 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-semibold text-[#0d0f14]">Mode maintenance</p>
                      <p className="text-sm text-slate-600">
                        Les visiteurs sont redirigés vers /maintenance. L&apos;admin et les API admin restent accessibles.
                      </p>
                    </div>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={state.content.maintenanceMode}
                      onClick={() => {
                        const c = state.content;
                        if (!c) return;
                        updateField("maintenanceMode", !c.maintenanceMode);
                      }}
                      className={`relative h-9 w-[3.75rem] shrink-0 rounded-full transition focus:outline-none focus:ring-2 focus:ring-[#00D4FF]/40 ${
                        state.content.maintenanceMode ? "bg-emerald-600" : "bg-slate-300"
                      }`}
                    >
                      <span
                        className={`absolute top-1 left-1 block h-7 w-7 rounded-full bg-white shadow transition-transform ${
                          state.content.maintenanceMode ? "translate-x-[1.35rem]" : "translate-x-0"
                        }`}
                      />
                      <span className="sr-only">{state.content.maintenanceMode ? "Désactiver" : "Activer"}</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="border-b border-slate-200 pb-2 font-display text-lg font-bold text-[#0d0f14]">
                    Informations de contact
                  </h3>
                  <div>
                    <label className="text-sm font-semibold text-[#0d0f14]">Email de contact</label>
                    <input
                      type="email"
                      className={inputClass}
                      value={state.content.contactEmail}
                      onChange={(e) => updateField("contactEmail", e.target.value)}
                      autoComplete="email"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-[#0d0f14]">Email d&apos;expédition (Resend)</label>
                    <input
                      type="email"
                      className={inputClass}
                      value={state.content.expeditionEmail}
                      onChange={(e) => updateField("expeditionEmail", e.target.value)}
                      autoComplete="email"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-[#0d0f14]">Nom de l&apos;agence</label>
                    <input
                      type="text"
                      className={inputClass}
                      value={state.content.nomAgence}
                      onChange={(e) => updateField("nomAgence", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="border-b border-slate-200 pb-2 font-display text-lg font-bold text-[#0d0f14]">
                    Réseaux sociaux
                  </h3>
                  <p className="text-sm text-slate-600">URLs complètes (ex. https://instagram.com/…).</p>
                  <div>
                    <label className="text-sm font-semibold text-[#0d0f14]">Instagram</label>
                    <input
                      type="url"
                      className={inputClass}
                      placeholder="https://…"
                      value={state.content.socialLinks.instagram}
                      onChange={(e) => updateSocialLink("instagram", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-[#0d0f14]">TikTok</label>
                    <input
                      type="url"
                      className={inputClass}
                      placeholder="https://…"
                      value={state.content.socialLinks.tiktok}
                      onChange={(e) => updateSocialLink("tiktok", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-[#0d0f14]">Twitter / X</label>
                    <input
                      type="url"
                      className={inputClass}
                      placeholder="https://…"
                      value={state.content.socialLinks.twitter}
                      onChange={(e) => updateSocialLink("twitter", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-[#0d0f14]">Snapchat</label>
                    <input
                      type="url"
                      className={inputClass}
                      placeholder="https://…"
                      value={state.content.socialLinks.snapchat}
                      onChange={(e) => updateSocialLink("snapchat", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="border-b border-slate-200 pb-2 font-display text-lg font-bold text-[#0d0f14]">
                    Textes éditables
                  </h3>
                  <div>
                    <label className="text-sm font-semibold text-[#0d0f14]">Texte contact</label>
                    <textarea
                      className={inputClass}
                      rows={3}
                      value={state.content.contactText}
                      onChange={(e) => updateField("contactText", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-[#0d0f14]">Texte footer</label>
                    <textarea
                      className={inputClass}
                      rows={3}
                      value={state.content.footerText}
                      onChange={(e) => updateField("footerText", e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="submit"
                    disabled={state.saving}
                    className="rounded-xl bg-[#0d0f14] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#111827] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {state.saving ? "Enregistrement..." : "Enregistrer"}
                  </button>
                </div>
              </form>
            )}
          </>
        )}

        {activeTab === "couleurs" && (
          <>
            {state.loading && (
              <div className="rounded-2xl border border-slate-200 bg-white p-6 text-slate-600">Chargement...</div>
            )}

            {!state.loading && state.content && (
              <form onSubmit={handleSubmit} className="space-y-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <div>
                  <h2 className="font-display text-xl font-bold text-[#0d0f14]">Thème visuel</h2>
                  <p className="mt-1 text-sm text-slate-600">
                    Les changements s&apos;appliquent sur tout le site en temps réel.
                  </p>
                </div>

                <div className="space-y-6">
                  {THEME_COLOR_ROWS.map((row) => {
                    const value = state.content!.colors[row.key];
                    return (
                      <div
                        key={row.key}
                        className="flex flex-col gap-3 border-b border-slate-100 pb-6 last:border-0 last:pb-0 sm:flex-row sm:items-center sm:gap-6"
                      >
                        <div
                          className="h-10 w-10 shrink-0 rounded-lg border border-slate-200 shadow-inner"
                          style={{ backgroundColor: hexForColorInput(value) }}
                          aria-hidden
                        />
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-[#0d0f14]">{row.label}</p>
                          <p className="text-sm text-slate-500">{row.zone}</p>
                          <div className="mt-3 flex flex-wrap items-center gap-3">
                            <input
                              type="color"
                              className="h-10 w-14 cursor-pointer rounded border border-slate-200 bg-white p-0"
                              value={hexForColorInput(value)}
                              onChange={(e) => updateColor(row.key, e.target.value)}
                              aria-label={`Couleur : ${row.label}`}
                            />
                            <input
                              type="text"
                              className={`${inputClass} max-w-[11rem] font-mono text-sm`}
                              value={value}
                              onChange={(e) => updateColor(row.key, e.target.value)}
                              placeholder="#000000"
                              spellCheck={false}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="submit"
                    disabled={state.saving}
                    className="rounded-xl bg-[#0d0f14] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#111827] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {state.saving ? "Enregistrement..." : "Enregistrer les couleurs"}
                  </button>
                </div>
              </form>
            )}
          </>
        )}
      </div>

      {selectedDemande &&
        (() => {
          const d = selectedDemande;
          const detailId = String(d.clientId ?? "");
          const detailStatut = devisEdits[detailId]?.statut ?? coerceStatut(d.statut);
          const detailNotes = devisEdits[detailId]?.notes ?? (typeof d.notes === "string" ? d.notes : "");
          const createdLabel =
            typeof d.createdAt === "string"
              ? new Date(d.createdAt).toLocaleString("fr-FR", { dateStyle: "full", timeStyle: "short" })
              : "—";
          const ed = devisEdits[detailId];
          const acompteLabel =
            ed?.acompte?.trim() !== ""
              ? `${ed.acompte} €`
              : typeof d.acompte === "number"
                ? `${d.acompte} €`
                : null;
          const soldeLabel =
            ed?.solde?.trim() !== ""
              ? `${ed.solde} €`
              : typeof d.solde === "number"
                ? `${d.solde} €`
                : null;

          return (
            <div
              className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-6"
              role="dialog"
              aria-modal="true"
              aria-labelledby="demande-detail-title"
              onClick={() => setSelectedDemande(null)}
            >
              <div
                className="flex max-h-[100dvh] w-full max-w-2xl flex-col overflow-y-auto rounded-t-2xl bg-white shadow-xl sm:max-h-[90vh] sm:rounded-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 sm:px-6">
                  <h2 id="demande-detail-title" className="font-display text-lg font-bold text-[#0d0f14]">
                    Détail de la demande
                  </h2>
                  <button
                    type="button"
                    onClick={() => setSelectedDemande(null)}
                    className="rounded-lg p-2 text-2xl leading-none text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
                    aria-label="Fermer"
                  >
                    ×
                  </button>
                </div>
                <div className="space-y-4 px-4 py-4 sm:px-6 sm:py-6">
                  <p className="font-mono text-xl font-bold tracking-wide text-[#00D4FF] drop-shadow-sm [text-shadow:0_0_1px_rgba(0,0,0,0.2)]">
                    {detailId || "—"}
                  </p>
                  <div>
                    <p className="text-xs font-semibold text-slate-500">Statut</p>
                    <span
                      className={`mt-1 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${statutBadgeClass(detailStatut)}`}
                    >
                      {STATUT_LABELS[detailStatut] ?? detailStatut}
                    </span>
                  </div>
                  <dl className="space-y-3 text-sm">
                    <div>
                      <dt className="text-xs font-semibold text-slate-500">Prénom</dt>
                      <dd className="mt-0.5 text-slate-900">{formatDemandeField(d.prenom)}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold text-slate-500">Nom</dt>
                      <dd className="mt-0.5 text-slate-900">{formatDemandeField(d.nom)}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold text-slate-500">Email</dt>
                      <dd className="mt-0.5 text-slate-900">{formatDemandeField(d.email)}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold text-slate-500">Téléphone</dt>
                      <dd className="mt-0.5 text-slate-900">{formatDemandeField(d.telephone)}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold text-slate-500">Entreprise</dt>
                      <dd className="mt-0.5 text-slate-900">{formatDemandeField(d.entreprise)}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold text-slate-500">Type de site</dt>
                      <dd className="mt-0.5 text-slate-900">{formatDemandeField(d.typeSite)}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold text-slate-500">Description</dt>
                      <dd className="mt-0.5 whitespace-pre-wrap text-slate-900">
                        {formatDemandeField(d.description)}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold text-slate-500">Style souhaité</dt>
                      <dd className="mt-0.5 text-slate-900">{formatDemandeField(d.styleSouhaite)}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold text-slate-500">Logo fourni</dt>
                      <dd className="mt-0.5 text-slate-900">{formatDemandeField(d.hasLogo)}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold text-slate-500">Textes fournis</dt>
                      <dd className="mt-0.5 text-slate-900">{formatDemandeField(d.hasTextes)}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold text-slate-500">Photos fournies</dt>
                      <dd className="mt-0.5 text-slate-900">{formatDemandeField(d.hasPhotos)}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold text-slate-500">Accompagnement logo</dt>
                      <dd className="mt-0.5 text-slate-900">{formatDemandeField(d.accompagnementLogo)}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold text-slate-500">Accompagnement textes</dt>
                      <dd className="mt-0.5 text-slate-900">{formatDemandeField(d.accompagnementTextes)}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold text-slate-500">Accompagnement visuels</dt>
                      <dd className="mt-0.5 text-slate-900">{formatDemandeField(d.accompagnementPhotos)}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold text-slate-500">Comment nous avez-vous connu ?</dt>
                      <dd className="mt-0.5 text-slate-900">{formatDemandeField(d.commentConnu)}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold text-slate-500">Créée le</dt>
                      <dd className="mt-0.5 text-slate-900">{createdLabel}</dd>
                    </div>
                  </dl>
                  {(acompteLabel != null || soldeLabel != null) && (
                    <div className="rounded-xl border border-slate-100 bg-[#F5F4F0]/80 p-3 text-sm">
                      <p className="text-xs font-semibold text-slate-500">Montants</p>
                      {acompteLabel != null && (
                        <p className="mt-1 text-slate-900">
                          <strong>Acompte :</strong> {acompteLabel}
                        </p>
                      )}
                      {soldeLabel != null && (
                        <p className="mt-1 text-slate-900">
                          <strong>Solde :</strong> {soldeLabel}
                        </p>
                      )}
                    </div>
                  )}
                  {detailNotes.trim() !== "" && (
                    <div className="text-sm">
                      <p className="text-xs font-semibold text-slate-500">Notes internes</p>
                      <p className="mt-0.5 whitespace-pre-wrap text-slate-900">{detailNotes}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })()}

      {toast && (
        <div
          role="status"
          className={`fixed bottom-4 right-4 z-[100] max-w-sm rounded-2xl px-5 py-3 text-sm font-medium shadow-xl ${
            toast.type === "success" ? "bg-emerald-500 text-white" : "bg-red-500 text-white"
          }`}
        >
          {toast.message}
        </div>
      )}
    </main>
  );
}
