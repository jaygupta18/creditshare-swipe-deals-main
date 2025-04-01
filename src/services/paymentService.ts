import api from './api';
import { PaymentTransaction } from '../types/api';

export const paymentService = {
  initiatePayment: (data: { orderId: string, amount: number }) => 
    api.post('/api/payments/initiate', data),
  
  requestRefund: (data: { transactionId: string, reason: string }) => 
    api.post('/api/payments/refund', data),
  
  getTransactions: (params?: { page?: number, limit?: number, type?: string }) => 
    api.get('/api/payments/transactions', { params }),
  
  withdrawEarnings: (data: { amount: number, accountDetails: any }) => 
    api.post('/api/payments/withdraw', data),
};
