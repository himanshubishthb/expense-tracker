import { formatCurrency } from '../utils/currency';
import { formatDisplayDate } from '../utils/dateUtils';

const CATEGORY_STYLES = {
  Food: 'bg-orange-50 text-orange-700 ring-orange-200',
  Transport: 'bg-blue-50 text-blue-700 ring-blue-200',
  Bills: 'bg-red-50 text-red-700 ring-red-200',
  Entertainment: 'bg-purple-50 text-purple-700 ring-purple-200',
  Other: 'bg-slate-50 text-slate-700 ring-slate-200',
};

export default function ExpenseTable({ expenses, onEdit, onDelete, isDeleting }) {
  const handleDelete = (expense) => {
    const confirmed = window.confirm(
      `Delete expense of ${formatCurrency(expense.amount)} (${expense.category})?`
    );
    if (confirmed) {
      onDelete(expense.id);
    }
  };

  if (expenses.length === 0) {
    return null;
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 px-5 py-4">
        <h3 className="text-sm font-semibold text-slate-900">Expense History</h3>
        <p className="mt-0.5 text-xs text-slate-500">
          Sorted by newest first · {expenses.length} record{expenses.length !== 1 ? 's' : ''}
        </p>
      </div>

      <div className="hidden md:block">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-5 py-3 font-medium">Amount</th>
              <th className="px-5 py-3 font-medium">Category</th>
              <th className="px-5 py-3 font-medium">Date</th>
              <th className="px-5 py-3 font-medium">Note</th>
              <th className="px-5 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {expenses.map((expense) => (
              <tr
                key={expense.id}
                className="transition-colors hover:bg-slate-50/80"
              >
                <td className="px-5 py-4 font-semibold text-slate-900">
                  {formatCurrency(expense.amount)}
                </td>
                <td className="px-5 py-4">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${CATEGORY_STYLES[expense.category]}`}
                  >
                    {expense.category}
                  </span>
                </td>
                <td className="px-5 py-4 text-slate-600">
                  {formatDisplayDate(expense.date)}
                </td>
                <td className="max-w-xs truncate px-5 py-4 text-slate-500">
                  {expense.note || '—'}
                </td>
                <td className="px-5 py-4">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => onEdit(expense)}
                      className="rounded-lg px-3 py-1.5 text-xs font-medium text-indigo-600 transition-colors hover:bg-indigo-50"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(expense)}
                      disabled={isDeleting}
                      className="rounded-lg px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="divide-y divide-slate-100 md:hidden">
        {expenses.map((expense) => (
          <div key={expense.id} className="p-4 transition-colors hover:bg-slate-50/80">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-lg font-bold text-slate-900">
                  {formatCurrency(expense.amount)}
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  {formatDisplayDate(expense.date)}
                </p>
              </div>
              <span
                className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${CATEGORY_STYLES[expense.category]}`}
              >
                {expense.category}
              </span>
            </div>
            {expense.note && (
              <p className="mt-2 text-sm text-slate-600">{expense.note}</p>
            )}
            <div className="mt-3 flex gap-2">
              <button
                type="button"
                onClick={() => onEdit(expense)}
                className="flex-1 rounded-lg border border-indigo-200 py-2 text-xs font-medium text-indigo-600 transition-colors hover:bg-indigo-50"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => handleDelete(expense)}
                disabled={isDeleting}
                className="flex-1 rounded-lg border border-red-200 py-2 text-xs font-medium text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
