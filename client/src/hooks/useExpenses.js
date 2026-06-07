import { useCallback, useEffect, useState } from 'react';
import { expenseApi } from '../services/api';

function getErrorMessage(error) {
  const apiErrors = error.response?.data?.errors;
  if (Array.isArray(apiErrors) && apiErrors.length > 0) {
    return apiErrors.join(', ');
  }
  return error.response?.data?.message || error.message || 'Something went wrong';
}

export function useExpenses() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchExpenses = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await expenseApi.getAll();
      setExpenses(response.data.data);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  const createExpense = async (expenseData) => {
    setActionLoading(true);
    setError(null);

    try {
      const response = await expenseApi.create(expenseData);
      setExpenses((prev) => [response.data.data, ...prev]);
      return { success: true };
    } catch (err) {
      const message = getErrorMessage(err);
      setError(message);
      return { success: false, message };
    } finally {
      setActionLoading(false);
    }
  };

  const updateExpense = async (id, expenseData) => {
    setActionLoading(true);
    setError(null);

    try {
      const response = await expenseApi.update(id, expenseData);
      setExpenses((prev) =>
        prev.map((expense) =>
          expense.id === id ? response.data.data : expense
        )
      );
      return { success: true };
    } catch (err) {
      const message = getErrorMessage(err);
      setError(message);
      return { success: false, message };
    } finally {
      setActionLoading(false);
    }
  };

  const deleteExpense = async (id) => {
    setActionLoading(true);
    setError(null);

    try {
      await expenseApi.delete(id);
      setExpenses((prev) => prev.filter((expense) => expense.id !== id));
      return { success: true };
    } catch (err) {
      const message = getErrorMessage(err);
      setError(message);
      return { success: false, message };
    } finally {
      setActionLoading(false);
    }
  };

  const clearError = () => setError(null);

  return {
    expenses,
    loading,
    error,
    actionLoading,
    fetchExpenses,
    createExpense,
    updateExpense,
    deleteExpense,
    clearError,
  };
}
