export default function PageSpinner() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="w-10 h-10 rounded-full border-4 border-orange/20 border-t-orange animate-spin" />
    </div>
  );
}