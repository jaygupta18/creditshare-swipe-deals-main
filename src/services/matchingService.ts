import api from './api';
import { Order, User } from '../types/api';

export const matchingService = {
  getSmartRecommendations: (params?: { category?: string, priceRange?: string }) => 
    api.get('/api/matching/smart-recommendations', { params }),
  
  getTopTrustedUsers: (params?: { limit?: number, role?: string }) => 
    api.get('/api/matching/top-trusted-users', { params }),
  
  getInstantMatches: (orderId?: string) => 
    api.get('/api/matching/instant-matches', { params: { orderId } }),
};
