export default function RoomDetailLoading() {
  return (
    <div className="min-h-screen bg-stone-900 animate-pulse">
      <div className="h-[72px] border-b border-white/10" />
      {/* Gallery skeleton */}
      <div className="h-[520px] bg-stone-800" />
      {/* Content skeleton */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-7 space-y-6">
            <div className="h-3 bg-stone-800 rounded w-24" />
            <div className="h-12 bg-stone-800 rounded w-2/3" />
            <div className="h-3 bg-stone-800 rounded w-full" />
            <div className="h-3 bg-stone-800 rounded w-4/5" />
            <div className="h-3 bg-stone-800 rounded w-3/4" />
          </div>
          <div className="lg:col-span-5">
            <div className="border border-white/10 p-8 space-y-4">
              <div className="h-10 bg-stone-800 rounded" />
              <div className="h-12 bg-stone-800 rounded" />
              <div className="h-12 bg-stone-800 rounded" />
              <div className="h-14 bg-stone-700 rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
