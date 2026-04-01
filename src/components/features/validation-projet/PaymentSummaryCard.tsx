import type { DepositConfig } from "@/types/payment";
import { formatAmount } from "@/config/deposits";

interface PaymentSummaryCardProps {
  config: DepositConfig;
  /** Afficher le montant (false si sur devis) */
  showAmount: boolean;
}

export default function PaymentSummaryCard({ config, showAmount }: PaymentSummaryCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg sm:p-8">
      <div className="border-b border-slate-100 pb-6">
        <p className="text-sm font-semibold uppercase tracking-wider text-[#F1E83B]">
          Récapitulatif
        </p>
        <h2 className="mt-2 text-xl font-bold text-slate-900">{config.shortLabel}</h2>
        <p className="mt-2 text-slate-600">{config.description}</p>
      </div>

      {showAmount && config.amountCents != null && (
        <div className="border-b border-slate-100 py-6">
          <p className="text-sm font-medium text-slate-500">Montant de l’acompte</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">
            {formatAmount(config.amountCents)}
          </p>
        </div>
      )}

      <div className="py-6">
        <p className="text-sm font-medium text-slate-900">Cette étape comprend</p>
        <ul className="mt-3 space-y-2">
          {config.includes.map((item) => (
            <li key={item} className="flex gap-2 text-slate-600">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-xl bg-slate-50 p-4">
        <p className="text-sm text-slate-700">
          Chaque projet étant conçu sur mesure, cette validation intervient après échange et cadrage initial. Le paiement de cette étape permet de réserver le lancement de votre projet. Le solde ou la suite de la facturation est défini selon la prestation convenue.
        </p>
      </div>
    </div>
  );
}

