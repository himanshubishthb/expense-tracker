export default function EmptyState({ onAddExpense }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-16 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50">
        <svg
          className="h-8 w-8 text-indigo-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 18.75a60.07 60.07 0 0115.97 0M12 12.75V8.25m0 0L9.75 10.5M12 8.25l2.25 2.25M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-slate-800">No expenses yet</h3>
      <p className="mt-2 max-w-sm text-sm text-slate-500">
        Start tracking your spending by adding your first expense. Your dashboard
        will populate with insights once you have data.
      </p>
      {onAddExpense && (
        <button
          type="button"
          onClick={onAddExpense}
          className="mt-6 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
        >
          Add First Expense
        </button>
      )}
    </div>
  );
}
