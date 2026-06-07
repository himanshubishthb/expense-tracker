import * as expenseService from '../services/expenseService.js';

export async function getExpenses(req, res, next) {
  try {
    const expenses = await expenseService.getAllExpenses();
    res.status(200).json({ success: true, data: expenses });
  } catch (error) {
    next(error);
  }
}

export async function createExpense(req, res, next) {
  try {
    const expense = await expenseService.createExpense(req.validatedExpense);
    res.status(201).json({ success: true, data: expense });
  } catch (error) {
    next(error);
  }
}

export async function updateExpense(req, res, next) {
  try {
    const expense = await expenseService.updateExpense(
      req.params.id,
      req.validatedExpense
    );
    res.status(200).json({ success: true, data: expense });
  } catch (error) {
    next(error);
  }
}

export async function deleteExpense(req, res, next) {
  try {
    await expenseService.deleteExpense(req.params.id);
    res.status(200).json({
      success: true,
      message: 'Expense deleted successfully',
    });
  } catch (error) {
    next(error);
  }
}
