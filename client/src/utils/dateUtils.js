export function toDateString(date) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function formatDisplayDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function getTodayString() {
  return toDateString(new Date());
}

export function getMonthRange(year, month) {
  const start = new Date(year, month, 1);
  const end = new Date(year, month + 1, 0);
  return {
    start: toDateString(start),
    end: toDateString(end),
  };
}

export function getThisMonthRange() {
  const now = new Date();
  return getMonthRange(now.getFullYear(), now.getMonth());
}

export function getLastMonthRange() {
  const now = new Date();
  return getMonthRange(now.getFullYear(), now.getMonth() - 1);
}

export function isDateInRange(dateString, start, end) {
  const date = new Date(dateString);
  date.setHours(0, 0, 0, 0);

  const startDate = new Date(start);
  startDate.setHours(0, 0, 0, 0);

  const endDate = new Date(end);
  endDate.setHours(0, 0, 0, 0);

  return date >= startDate && date <= endDate;
}

export function isInCurrentMonth(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth()
  );
}
