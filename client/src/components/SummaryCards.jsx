import { formatCurrency } from '../utils/currency';
import { isInCurrentMonth } from '../utils/dateUtils';

const CATEGORY_COLORS = {
  Food: 'bg-orange-100 text-orange-700',
  Transport: 'bg-blue-100 text-blue-700',
  Bills: 'bg-red-100 text-red-700',
  Entertainment: 'bg-purple-100 text-purple-700',
  Other: 'bg-slate-100 text-slate-700',
};

function getCategoryTotals(expenses) {
  return expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});
}

export default function SummaryCards({ expenses, filteredExpenses }) {
  const thisMonthExpenses = expenses.filter((expense) =>
    isInCurrentMonth(expense.date)
  );

  const totalThisMonth = thisMonthExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  const highestExpense = expenses.length
    ? expenses.reduce((max, expense) =>
        expense.amount > max.amount ? expense : max
      )
    : null;

  const categoryTotals = getCategoryTotals(filteredExpenses);

  const cards = [
    {
      title: 'Total Spent This Month',
      value: formatCurrency(totalThisMonth),
      subtitle: `${thisMonthExpenses.length} transactions`,
      accent: 'from-indigo-500 to-indigo-600',
    },
    {
      title: 'Highest Single Expense',
      value: highestExpense ? formatCurrency(highestExpense.amount) : formatCurrency(0),
      subtitle: highestExpense
        ? `${highestExpense.category} · ${highestExpense.note || 'No note'}`
        : 'No expenses recorded',
      accent: 'from-rose-500 to-rose-600',
    },
    {
      title: 'Total Expenses',
      value: String(filteredExpenses.length),
      subtitle: 'Matching current filters',
      accent: 'from-emerald-500 to-emerald-600',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <div
            key={card.title}
            className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md"
          >
            <div className={`h-1 bg-gradient-to-r ${card.accent}`} />
            <div className="p-5">
              <p className="text-sm font-medium text-slate-500">{card.title}</p>
              <p className="mt-2 text-2xl font-bold text-slate-900">{card.value}</p>
              <p className="mt-1 truncate text-xs text-slate-400">{card.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-slate-900">
          Spending by Category
        </h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {['Food', 'Transport', 'Bills', 'Entertainment', 'Other'].map((category) => (
            <div
              key={category}
              className="rounded-xl border border-slate-100 bg-slate-50 p-4 transition-colors hover:border-indigo-100 hover:bg-indigo-50/50"
            >
              <span
                className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${CATEGORY_COLORS[category]}`}
              >
                {category}
              </span>
              <p className="mt-2 text-lg font-bold text-slate-900">
                {formatCurrency(categoryTotals[category] || 0)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
