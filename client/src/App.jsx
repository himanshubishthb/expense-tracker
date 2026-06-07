import { useCallback, useMemo, useRef, useState } from 'react';
import EmptyState from './components/EmptyState';
import ExpenseChart from './components/ExpenseChart';
import ExpenseForm from './components/ExpenseForm';
import ExpenseTable from './components/ExpenseTable';
import Filters, { applyFilters } from './components/Filters';
import Header from './components/Header';
import LoadingSpinner from './components/LoadingSpinner';
import SummaryCards from './components/SummaryCards';
import { useExpenses } from './hooks/useExpenses';
import { exportExpensesToCSV } from './utils/csvExport';

export default function App() {
  const formRef = useRef(null);
  const [editingExpense, setEditingExpense] = useState(null);
  const [activeFilters, setActiveFilters] = useState(null);

  const {
    expenses,
    loading,
    error,
    actionLoading,
    fetchExpenses,
    createExpense,
    updateExpense,
    deleteExpense,
    clearError,
  } = useExpenses();

  const handleFilterChange = useCallback((filters) => {
    setActiveFilters(filters);
  }, []);

  const filteredExpenses = useMemo(() => {
    if (!activeFilters) return expenses;
    return applyFilters(expenses, activeFilters);
  }, [expenses, activeFilters]);

  const handleFormSubmit = async (data, id) => {
    if (id) {
      return updateExpense(id, data);
    }
    return createExpense(data);
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense);
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleCancelEdit = () => {
    setEditingExpense(null);
  };

  const handleExport = () => {
    if (filteredExpenses.length === 0) return;
    exportExpensesToCSV(filteredExpenses);
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header onExport={handleExport} exportDisabled />
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <LoadingSpinner />
        </main>
      </div>
    );
  }

  if (error && expenses.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header onExport={handleExport} exportDisabled />
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
            <h2 className="text-lg font-semibold text-red-800">
              Failed to load expenses
            </h2>
            <p className="mt-2 text-sm text-red-600">{error}</p>
            <button
              type="button"
              onClick={fetchExpenses}
              className="mt-6 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header
        onExport={handleExport}
        exportDisabled={filteredExpenses.length === 0}
      />

      <main className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
        {error && (
          <div className="flex items-center justify-between rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
            <p className="text-sm text-amber-800">{error}</p>
            <button
              type="button"
              onClick={clearError}
              className="text-sm font-medium text-amber-700 hover:text-amber-900"
            >
              Dismiss
            </button>
          </div>
        )}

        <Filters onFilterChange={handleFilterChange} />

        <SummaryCards
          expenses={expenses}
          filteredExpenses={filteredExpenses}
        />

        <div className="grid gap-6 lg:grid-cols-2">
          <div ref={formRef}>
            <ExpenseForm
              editingExpense={editingExpense}
              onSubmit={async (data, id) => {
                const result = await handleFormSubmit(data, id);
                if (result.success) {
                  setEditingExpense(null);
                }
                return result;
              }}
              onCancelEdit={handleCancelEdit}
              isSubmitting={actionLoading}
            />
          </div>
          <ExpenseChart expenses={filteredExpenses} />
        </div>

        {filteredExpenses.length === 0 ? (
          <EmptyState onAddExpense={scrollToForm} />
        ) : (
          <ExpenseTable
            expenses={filteredExpenses}
            onEdit={handleEdit}
            onDelete={deleteExpense}
            isDeleting={actionLoading}
          />
        )}
      </main>
    </div>
  );
}
