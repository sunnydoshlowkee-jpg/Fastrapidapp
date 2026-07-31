import api from './api';
import { getApiFieldError } from '../utils/apiErrors';

export const getEarnings = (period = 'all') =>
  api.get('/rider/earnings', { params: { period } });

export async function getRiderWalletTransactions({ limit = 30, type } = {}) {
  try {
    const { data } = await api.get('/rider/wallet/transactions', {
      params: {
        limit,
        ...(type ? { type } : {}),
      },
    });
    return data?.data ?? [];
  } catch (err) {
    throw new Error(getApiFieldError(err, 'form') || err.response?.data?.message || 'Unable to load transactions.');
  }
}

export async function withdrawRiderEarnings(amount) {
  try {
    const { data } = await api.post('/rider/wallet/withdraw', {
      amount: Number(amount),
    });
    return data?.data ?? data;
  } catch (err) {
    throw new Error(getApiFieldError(err, 'amount') || getApiFieldError(err, 'form') || err.response?.data?.message || 'Withdrawal failed.');
  }
}
