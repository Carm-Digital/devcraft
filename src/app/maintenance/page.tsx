export default function MaintenancePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#0d0f14] px-6 py-16 text-center text-slate-100">
      <img
        src="/logo.svg"
        alt="DevCraft"
        width={180}
        height={48}
        className="mb-10 h-auto w-[min(180px,70vw)]"
      />
      <p className="font-display text-xl font-bold text-white sm:text-2xl">
        Site en maintenance — Revenez bientôt
      </p>
    </main>
  );
}
