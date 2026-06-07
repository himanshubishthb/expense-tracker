import { Router } from 'express';
import * as expenseController from '../controllers/expenseController.js';
import { validateExpense } from '../middleware/validateExpense.js';

const router = Router();

router.get('/', expenseController.getExpenses);
router.post('/', validateExpense, expenseController.createExpense);
router.put('/:id', validateExpense, expenseController.updateExpense);
router.delete('/:id', expenseController.deleteExpense);

export default router;
