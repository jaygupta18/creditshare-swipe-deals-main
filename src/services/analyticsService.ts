import api from './api';
import { User } from '../types/api';

export const analyticsService = {
  getTopUsers: (params?: { limit?: number, period?: string }) => 
    api.get('/api/analytics/top-users', { params }),
  
  getOrderTrends: (params?: { period?: string, category?: string }) => 
    api.get('/api/analytics/order-trends', { params }),
};
