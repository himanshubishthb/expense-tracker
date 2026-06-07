export default function LoadingSpinner({ message = 'Loading expenses...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" />
      <p className="mt-4 text-sm font-medium text-slate-500">{message}</p>
    </div>
  );
}
