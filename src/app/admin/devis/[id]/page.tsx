"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import type { DevisData } from "@/components/features/devis/DevisPDF";

const inputClass =
  "mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[#0d0f14] shadow-sm focus:border-[#00D4FF] focus:outline-none focus:ring-2 focus:ring-[#00D4FF]/20";

const TYPE_SITE_LABEL: Record<string, string> = {
  vitrine: "Site vitrine",
  complet: "Site complet",
  abonnement: "Abonnement",
};

type DemandeRecord = {
  clientId?: string;
  prenom?: string;
  nom?: string;
  email?: string;
  telephone?: string;
  entreprise?: string;
  typeSite?: string;
  description?: string;
  acompte?: number;
  solde?: number;
  [key: string]: unknown;
};

type PrestationRow = {
  id: string;
  label: string;
  montant: string;
};

function todayIsoDate() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function parseEuro(s: string) {
  const n = parseFloat(s.replace(",", ".").replace(/\s/g, ""));
  return Number.isNaN(n) ? 0 : n;
}

function labelForTypeSite(raw: string) {
  const t = raw.trim();
  if (!t) return "Prestation";
  return TYPE_SITE_LABEL[t] ?? t;
}

function newRowId() {
  return typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `r-${Date.now()}-${Math.random()}`;
}

export default function AdminDevisParClientPage() {
  const params = useParams();
  const router = useRouter();
  const clientId = typeof params?.id === "string" ? params.id : "";

  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [entreprise, setEntreprise] = useState("");

  const [dateDevis, setDateDevis] = useState(todayIsoDate);
  const [validiteJours, setValiditeJours] = useState("30");
  const [typeSite, setTypeSite] = useState("");
  const [description, setDescription] = useState("");

  const [prestations, setPrestations] = useState<PrestationRow[]>([]);
  const [acompte, setAcompte] = useState("");
  const [solde, setSolde] = useState("");
  const [soldeManual, setSoldeManual] = useState(false);

  const [emailClient, setEmailClient] = useState("");

  const [sending, setSending] = useState(false);
  const [sendMessage, setSendMessage] = useState<{ kind: "ok" | "err"; text: string } | null>(null);

  const totalHT = useMemo(
    () => prestations.reduce((s, p) => s + parseEuro(p.montant), 0),
    [prestations],
  );

  useEffect(() => {
    if (!soldeManual) {
      const a = parseEuro(acompte);
      setSolde(String(totalHT - a));
    }
  }, [totalHT, acompte, soldeManual]);

  const applyDemande = useCallback((d: DemandeRecord) => {
    setPrenom(String(d.prenom ?? ""));
    setNom(String(d.nom ?? ""));
    setEmail(String(d.email ?? ""));
    setTelephone(String(d.telephone ?? ""));
    setEntreprise(typeof d.entreprise === "string" ? d.entreprise : "");
    setDescription(typeof d.description === "string" ? d.description : "");
    const ts = String(d.typeSite ?? "").trim();
    setTypeSite(ts);
    setEmailClient(String(d.email ?? ""));

    const a =
      typeof d.acompte === "number" && !Number.isNaN(d.acompte) ? d.acompte : 0;
    const s =
      typeof d.solde === "number" && !Number.isNaN(d.solde) ? d.solde : 0;
    setAcompte(a > 0 ? String(a) : "");
    setSoldeManual(false);

    const totalHint = a + s > 0 ? a + s : 0;
    setPrestations([
      {
        id: newRowId(),
        label: labelForTypeSite(ts),
        montant: totalHint > 0 ? String(totalHint) : "0",
      },
    ]);

    if (s > 0 || a > 0) {
      setSolde(String(s > 0 ? s : Math.max(0, totalHint - a)));
    } else {
      setSolde("0");
    }
    setDateDevis(todayIsoDate());
    setValiditeJours("30");
  }, []);

  useEffect(() => {
    if (!clientId) {
      setLoading(false);
      setNotFound(true);
      return;
    }

    let cancelled = false;

    void (async () => {
      setLoading(true);
      setNotFound(false);
      setLoadError(null);
      try {
        const res = await fetch("/api/admin/devis", { cache: "no-store", credentials: "include" });
        const data = await res.json().catch(() => null);

        if (res.status === 401) {
          router.push(`/admin/login?next=${encodeURIComponent(`/admin/devis/${clientId}`)}`);
          return;
        }

        if (!res.ok) {
          throw new Error(data?.message ?? "Impossible de charger les demandes.");
        }

        const list = (data.demandes ?? []) as DemandeRecord[];
        const demande = list.find((x) => String(x.clientId ?? "") === clientId);

        if (!demande) {
          if (!cancelled) {
            setNotFound(true);
            setLoading(false);
          }
          return;
        }

        if (!cancelled) {
          applyDemande(demande);
          setNotFound(false);
        }
      } catch (err) {
        if (!cancelled) {
          setLoadError(err instanceof Error ? err.message : "Erreur de chargement.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [clientId, router, applyDemande]);

  function updatePrestation(index: number, field: "label" | "montant", value: string) {
    setSoldeManual(false);
    setPrestations((prev) => {
      const next = [...prev];
      const row = next[index];
      if (!row) return prev;
      next[index] = { ...row, [field]: value };
      return next;
    });
  }

  function addPrestation() {
    setSoldeManual(false);
    setPrestations((prev) => [...prev, { id: newRowId(), label: "", montant: "0" }]);
  }

  function removePrestation(index: number) {
    setSoldeManual(false);
    setPrestations((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSendMessage(null);

    if (!clientId.trim()) return;

    const acompteNum = parseEuro(acompte);
    const soldeNum = parseEuro(solde);
    const prestationsPayload = prestations
      .map((p) => ({
        label: p.label.trim(),
        montant: parseEuro(p.montant),
      }))
      .filter((p) => p.label.length > 0);

    if (prestationsPayload.length === 0) {
      setSendMessage({ kind: "err", text: "Ajoutez au moins une prestation avec un libellé." });
      return;
    }

    if (!emailClient.trim()) {
      setSendMessage({ kind: "err", text: "Indiquez l’email du destinataire." });
      return;
    }

    const totalComputed = prestationsPayload.reduce((s, p) => s + p.montant, 0);

    const vj = Math.floor(Number(validiteJours));
    const validite =
      Number.isFinite(vj) && vj > 0 ? vj : 30;

    const devisData: DevisData = {
      clientId: clientId.trim(),
      prenom: prenom.trim(),
      nom: nom.trim(),
      email: email.trim(),
      telephone: telephone.trim(),
      typeSite: typeSite.trim() || "—",
      prestations: prestationsPayload,
      acompte: acompteNum,
      solde: soldeNum,
      totalHT: totalComputed,
      dateDevis: dateDevis.trim(),
      validiteJours: validite,
    };

    if (entreprise.trim()) devisData.entreprise = entreprise.trim();
    if (description.trim()) devisData.description = description.trim();

    setSending(true);
    try {
      const res = await fetch("/api/admin/devis/envoyer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ emailClient: emailClient.trim(), devisData }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        throw new Error(data?.message ?? "Envoi impossible.");
      }
      setSendMessage({ kind: "ok", text: "Devis généré et envoyé par email." });
    } catch (err) {
      setSendMessage({
        kind: "err",
        text: err instanceof Error ? err.message : "Erreur d’envoi.",
      });
    } finally {
      setSending(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F5F4F0] px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white p-8 text-slate-600">
          Chargement…
        </div>
      </main>
    );
  }

  if (loadError) {
    return (
      <main className="min-h-screen bg-[#F5F4F0] px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-4">
          <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{loadError}</p>
          <button
            type="button"
            onClick={() => router.push("/admin")}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-[#F5F4F0]"
          >
            ← Retour
          </button>
        </div>
      </main>
    );
  }

  if (notFound || !clientId) {
    return (
      <main className="min-h-screen bg-[#F5F4F0] px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-4">
          <p className="text-slate-700">Demande introuvable pour ce numéro.</p>
          <button
            type="button"
            onClick={() => router.push("/admin")}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-[#F5F4F0]"
          >
            ← Retour
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F5F4F0] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-[#0d0f14] sm:text-3xl">
              Créer un devis — {clientId}
            </h1>
            <p className="mt-1 text-sm text-slate-600">Prévisualisation et envoi par email au client.</p>
          </div>
          <button
            type="button"
            onClick={() => router.push("/admin")}
            className="self-start rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-[#F5F4F0]"
          >
            ← Retour
          </button>
        </header>

        <form onSubmit={handleSubmit} className="space-y-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500">Infos client</h2>
              <div>
                <label className="text-sm font-semibold text-[#0d0f14]">Prénom</label>
                <input className={inputClass} value={prenom} onChange={(e) => setPrenom(e.target.value)} />
              </div>
              <div>
                <label className="text-sm font-semibold text-[#0d0f14]">Nom</label>
                <input className={inputClass} value={nom} onChange={(e) => setNom(e.target.value)} />
              </div>
              <div>
                <label className="text-sm font-semibold text-[#0d0f14]">Email</label>
                <input
                  type="email"
                  className={inputClass}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-[#0d0f14]">Téléphone</label>
                <input
                  type="tel"
                  className={inputClass}
                  value={telephone}
                  onChange={(e) => setTelephone(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-[#0d0f14]">Entreprise</label>
                <input className={inputClass} value={entreprise} onChange={(e) => setEntreprise(e.target.value)} />
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500">Infos devis</h2>
              <div>
                <label className="text-sm font-semibold text-[#0d0f14]">Date du devis</label>
                <input
                  type="date"
                  className={inputClass}
                  value={dateDevis}
                  onChange={(e) => setDateDevis(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-[#0d0f14]">Validité (jours)</label>
                <input
                  type="number"
                  min={1}
                  className={inputClass}
                  value={validiteJours}
                  onChange={(e) => setValiditeJours(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-[#0d0f14]">Type de site</label>
                <input
                  className={`${inputClass} cursor-not-allowed bg-[#F5F4F0] text-slate-600`}
                  value={typeSite.trim() ? labelForTypeSite(typeSite) : "—"}
                  readOnly
                  aria-readonly
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-[#0d0f14]">Description</label>
                <textarea
                  className={inputClass}
                  rows={5}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
          </div>

          <section className="space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500">Prestations</h2>
            <div className="space-y-3">
              {prestations.map((row, index) => (
                <div
                  key={row.id}
                  className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-[#F5F4F0]/80 p-4 sm:flex-row sm:items-end"
                >
                  <div className="min-w-0 flex-1">
                    <label className="text-xs font-semibold text-slate-700">Libellé</label>
                    <input
                      className={inputClass}
                      value={row.label}
                      onChange={(e) => updatePrestation(index, "label", e.target.value)}
                    />
                  </div>
                  <div className="w-full sm:w-40">
                    <label className="text-xs font-semibold text-slate-700">Montant HT (€)</label>
                    <input
                      type="text"
                      inputMode="decimal"
                      className={inputClass}
                      value={row.montant}
                      onChange={(e) => updatePrestation(index, "montant", e.target.value)}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removePrestation(index)}
                    disabled={prestations.length <= 1}
                    className="rounded-lg border border-red-200 bg-white px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Supprimer
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addPrestation}
              className="rounded-xl border border-dashed border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-[#F5F4F0]"
            >
              Ajouter une prestation
            </button>
          </section>

          <section className="space-y-4 rounded-xl border border-slate-200 bg-[#F5F4F0]/80 p-4 sm:p-5">
            <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500">Récapitulatif</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <p className="text-xs font-semibold text-slate-600">Total HT</p>
                <p className="mt-1 text-lg font-bold text-[#0d0f14]">
                  {new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(totalHT)}
                </p>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700">Acompte (€)</label>
                <input
                  type="text"
                  inputMode="decimal"
                  className={inputClass}
                  value={acompte}
                  onChange={(e) => {
                    setSoldeManual(false);
                    setAcompte(e.target.value);
                  }}
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700">Solde (€)</label>
                <input
                  type="text"
                  inputMode="decimal"
                  className={inputClass}
                  value={solde}
                  onChange={(e) => {
                    setSoldeManual(true);
                    setSolde(e.target.value);
                  }}
                />
              </div>
            </div>
          </section>

          <section className="space-y-4 border-t border-slate-200 pt-8">
            <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500">Envoi</h2>
            <div>
              <label className="text-sm font-semibold text-[#0d0f14]">Email du client (destinataire)</label>
              <input
                type="email"
                className={inputClass}
                value={emailClient}
                onChange={(e) => setEmailClient(e.target.value)}
                autoComplete="email"
              />
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="submit"
                disabled={sending}
                className="rounded-xl bg-[#0d0f14] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#111827] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {sending ? "Envoi en cours…" : "Générer et envoyer le devis par email"}
              </button>
              {sendMessage && (
                <p
                  className={`text-sm font-medium ${sendMessage.kind === "ok" ? "text-emerald-700" : "text-red-700"}`}
                >
                  {sendMessage.text}
                </p>
              )}
            </div>
          </section>
        </form>
      </div>
    </main>
  );
}
