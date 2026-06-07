import { formatDisplayDate } from './dateUtils';

function escapeCSVValue(value) {
  const stringValue = String(value ?? '');
  if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }
  return stringValue;
}

export function exportExpensesToCSV(expenses, filename = 'expenses.csv') {
  const headers = ['Amount', 'Category', 'Date', 'Note'];
  const rows = expenses.map((expense) => [
    expense.amount,
    expense.category,
    formatDisplayDate(expense.date),
    expense.note || '',
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map((row) => row.map(escapeCSVValue).join(',')),
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
