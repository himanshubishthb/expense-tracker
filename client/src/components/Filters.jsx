import { useEffect, useState } from 'react';
import {
  getLastMonthRange,
  getThisMonthRange,
  toDateString,
} from '../utils/dateUtils';

const CATEGORIES = ['All', 'Food', 'Transport', 'Bills', 'Entertainment', 'Other'];
const DATE_FILTERS = [
  { value: 'all', label: 'All Time' },
  { value: 'thisMonth', label: 'This Month' },
  { value: 'lastMonth', label: 'Last Month' },
  { value: 'custom', label: 'Custom Range' },
];

const FILTER_STORAGE_KEY = 'expense-tracker-filters';

const defaultFilters = {
  category: 'All',
  dateFilter: 'all',
  customStart: '',
  customEnd: '',
};

function loadFiltersFromStorage() {
  try {
    const stored = localStorage.getItem(FILTER_STORAGE_KEY);
    if (stored) {
      return { ...defaultFilters, ...JSON.parse(stored) };
    }
  } catch {
    // ignore invalid storage
  }
  return defaultFilters;
}

export function applyFilters(expenses, filters) {
  let filtered = [...expenses];

  if (filters.category && filters.category !== 'All') {
    filtered = filtered.filter((expense) => expense.category === filters.category);
  }

  if (filters.dateFilter === 'thisMonth') {
    const { start, end } = getThisMonthRange();
    filtered = filtered.filter(
      (expense) => expense.date >= start && expense.date <= end
    );
  } else if (filters.dateFilter === 'lastMonth') {
    const { start, end } = getLastMonthRange();
    filtered = filtered.filter(
      (expense) => expense.date >= start && expense.date <= end
    );
  } else if (filters.dateFilter === 'custom' && filters.customStart && filters.customEnd) {
    filtered = filtered.filter(
      (expense) =>
        expense.date >= filters.customStart && expense.date <= filters.customEnd
    );
  }

  return filtered.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
}

export default function Filters({ onFilterChange }) {
  const [filters, setFilters] = useState(loadFiltersFromStorage);

  useEffect(() => {
    localStorage.setItem(FILTER_STORAGE_KEY, JSON.stringify(filters));
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleDateFilterChange = (value) => {
    if (value === 'thisMonth') {
      const { start, end } = getThisMonthRange();
      setFilters((prev) => ({
        ...prev,
        dateFilter: value,
        customStart: start,
        customEnd: end,
      }));
    } else if (value === 'lastMonth') {
      const { start, end } = getLastMonthRange();
      setFilters((prev) => ({
        ...prev,
        dateFilter: value,
        customStart: start,
        customEnd: end,
      }));
    } else {
      setFilters((prev) => ({
        ...prev,
        dateFilter: value,
        customStart: value === 'custom' ? prev.customStart : '',
        customEnd: value === 'custom' ? prev.customEnd : '',
      }));
    }
  };

  const handleReset = () => {
    setFilters(defaultFilters);
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="grid flex-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <label htmlFor="category-filter" className="block text-sm font-medium text-slate-700">
              Category
            </label>
            <select
              id="category-filter"
              value={filters.category}
              onChange={(e) => updateFilter('category', e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            >
              {CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="date-filter" className="block text-sm font-medium text-slate-700">
              Date Range
            </label>
            <select
              id="date-filter"
              value={filters.dateFilter}
              onChange={(e) => handleDateFilterChange(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            >
              {DATE_FILTERS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {filters.dateFilter === 'custom' && (
            <>
              <div>
                <label htmlFor="start-date" className="block text-sm font-medium text-slate-700">
                  Start Date
                </label>
                <input
                  id="start-date"
                  type="date"
                  value={filters.customStart}
                  max={filters.customEnd || toDateString(new Date())}
                  onChange={(e) => updateFilter('customStart', e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>
              <div>
                <label htmlFor="end-date" className="block text-sm font-medium text-slate-700">
                  End Date
                </label>
                <input
                  id="end-date"
                  type="date"
                  value={filters.customEnd}
                  min={filters.customStart}
                  max={toDateString(new Date())}
                  onChange={(e) => updateFilter('customEnd', e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
}
