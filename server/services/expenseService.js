import { v4 as uuidv4 } from 'uuid';
import { readJSON, writeJSON } from '../utils/fileHandler.js';

class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
  }
}

export async function getAllExpenses() {
  const expenses = await readJSON();
  return expenses.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
}

export async function getExpenseById(id) {
  const expenses = await readJSON();
  const expense = expenses.find((item) => item.id === id);

  if (!expense) {
    throw new AppError('Expense not found', 404);
  }

  return expense;
}

export async function createExpense(expenseData) {
  const expenses = await readJSON();

  const newExpense = {
    id: uuidv4(),
    ...expenseData,
    createdAt: new Date().toISOString(),
  };

  expenses.push(newExpense);
  await writeJSON(expenses);

  return newExpense;
}

export async function updateExpense(id, expenseData) {
  const expenses = await readJSON();
  const index = expenses.findIndex((item) => item.id === id);

  if (index === -1) {
    throw new AppError('Expense not found', 404);
  }

  const updatedExpense = {
    ...expenses[index],
    ...expenseData,
    id: expenses[index].id,
    createdAt: expenses[index].createdAt,
  };

  expenses[index] = updatedExpense;
  await writeJSON(expenses);

  return updatedExpense;
}

export async function deleteExpense(id) {
  const expenses = await readJSON();
  const index = expenses.findIndex((item) => item.id === id);

  if (index === -1) {
    throw new AppError('Expense not found', 404);
  }

  const [deletedExpense] = expenses.splice(index, 1);
  await writeJSON(expenses);

  return deletedExpense;
}
