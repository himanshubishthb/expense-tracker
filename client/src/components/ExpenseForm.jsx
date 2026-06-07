import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { getTodayString } from '../utils/dateUtils';

const CATEGORIES = ['Food', 'Transport', 'Bills', 'Entertainment', 'Other'];

const defaultValues = {
  amount: '',
  category: 'Food',
  date: getTodayString(),
  note: '',
};

export default function ExpenseForm({
  editingExpense,
  onSubmit,
  onCancelEdit,
  isSubmitting,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues });

  useEffect(() => {
    if (editingExpense) {
      reset({
        amount: editingExpense.amount,
        category: editingExpense.category,
        date: editingExpense.date,
        note: editingExpense.note || '',
      });
    } else {
      reset(defaultValues);
    }
  }, [editingExpense, reset]);

  const handleFormSubmit = async (data) => {
    const payload = {
      amount: Number(data.amount),
      category: data.category,
      date: data.date,
      note: data.note,
    };

    const result = await onSubmit(payload, editingExpense?.id);

    if (result.success) {
      reset(defaultValues);
    }
  };

  const handleCancel = () => {
    reset(defaultValues);
    onCancelEdit?.();
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">
        {editingExpense ? 'Edit Expense' : 'Add Expense'}
      </h2>
      <p className="mt-1 text-sm text-slate-500">
        {editingExpense
          ? 'Update the details below and save your changes.'
          : 'Record a new expense to keep your budget on track.'}
      </p>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="mt-6 space-y-5">
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-slate-700">
            Amount
          </label>
          <input
            id="amount"
            type="number"
            step="0.01"
            min="0.01"
            placeholder="0.00"
            className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            {...register('amount', {
              required: 'Amount is required',
              min: { value: 0.01, message: 'Amount must be greater than 0' },
              valueAsNumber: true,
            })}
          />
          {errors.amount && (
            <p className="mt-1 text-xs text-red-500">{errors.amount.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-slate-700">
            Category
          </label>
          <select
            id="category"
            className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            {...register('category', { required: 'Category is required' })}
          >
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="mt-1 text-xs text-red-500">{errors.category.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-medium text-slate-700">
            Date
          </label>
          <input
            id="date"
            type="date"
            max={getTodayString()}
            className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            {...register('date', {
              required: 'Date is required',
              validate: (value) => {
                const selected = new Date(value);
                const today = new Date();
                today.setHours(23, 59, 59, 999);
                return selected <= today || 'Date cannot be in the future';
              },
            })}
          />
          {errors.date && (
            <p className="mt-1 text-xs text-red-500">{errors.date.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="note" className="block text-sm font-medium text-slate-700">
            Note
          </label>
          <textarea
            id="note"
            rows={3}
            placeholder="Optional description..."
            className="mt-1.5 w-full resize-none rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            {...register('note')}
          />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting
              ? 'Saving...'
              : editingExpense
                ? 'Update Expense'
                : 'Add Expense'}
          </button>
          {editingExpense && (
            <button
              type="button"
              onClick={handleCancel}
              className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
