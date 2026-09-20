export default function Loading() {
  return (
    <div className="fixed inset-0 bg-stone-900 z-[999] flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        {/* Animated logo */}
        <span
          className="font-serif text-4xl italic text-cream animate-pulse"
          style={{ animationDuration: "2s" }}
        >
          New Haven Hotel
        </span>
        {/* Spinner ring */}
        <div className="w-10 h-10 rounded-full border border-white/10 border-t-gold-500 animate-spin" />
      </div>
    </div>
  );
}
