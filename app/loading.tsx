export default function Loading() {
  return (
    <div className="min-h-screen bg-berit-black flex items-center justify-center text-berit-text">
      <div className="flex flex-col items-center gap-3">
        <div className="h-10 w-10 rounded-full border border-berit-gold/40 border-t-berit-gold animate-spin" />
        <p className="text-xs uppercase tracking-[0.3em] text-berit-gold/70">Genesis</p>
      </div>
    </div>
  )
}
