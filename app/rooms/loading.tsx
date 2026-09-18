export default function RoomsLoading() {
  return (
    <div className="min-h-screen bg-stone-900">
      {/* Nav skeleton */}
      <div className="h-[72px] border-b border-white/10 bg-stone-900" />

      {/* Header skeleton */}
      <div className="h-72 bg-stone-800 animate-pulse" />

      {/* Filter bar skeleton */}
      <div className="h-16 border-b border-white/10 bg-stone-900/90" />

      {/* Grid skeleton */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-stone-900 animate-pulse">
              <div className="h-60 bg-stone-800" />
              <div className="p-7">
                <div className="h-4 bg-stone-800 rounded mb-3 w-2/3" />
                <div className="h-3 bg-stone-800 rounded mb-2 w-full" />
                <div className="h-3 bg-stone-800 rounded w-4/5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
