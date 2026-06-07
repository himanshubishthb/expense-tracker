export const VALID_CATEGORIES = [
  'Food',
  'Transport',
  'Bills',
  'Entertainment',
  'Other',
];

function isFutureDate(dateString) {
  const expenseDate = new Date(dateString);
  expenseDate.setHours(0, 0, 0, 0);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return expenseDate > today;
}

export function validateExpense(req, res, next) {
  const { amount, category, date, note } = req.body;
  const errors = [];

  if (amount === undefined || amount === null || amount === '') {
    errors.push('Amount is required');
  } else {
    const parsedAmount = Number(amount);
    if (Number.isNaN(parsedAmount)) {
      errors.push('Amount must be a valid number');
    } else if (parsedAmount <= 0) {
      errors.push('Amount must be greater than 0');
    }
  }

  if (!category || typeof category !== 'string' || !category.trim()) {
    errors.push('Category is required');
  } else if (!VALID_CATEGORIES.includes(category)) {
    errors.push(`Category must be one of: ${VALID_CATEGORIES.join(', ')}`);
  }

  if (!date || typeof date !== 'string' || !date.trim()) {
    errors.push('Date is required');
  } else if (Number.isNaN(new Date(date).getTime())) {
    errors.push('Date must be a valid date');
  } else if (isFutureDate(date)) {
    errors.push('Date cannot be in the future');
  }

  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  req.validatedExpense = {
    amount: Number(amount),
    category: category.trim(),
    date: date.trim(),
    note: typeof note === 'string' ? note.trim() : '',
  };

  next();
}
