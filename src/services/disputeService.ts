import api from './api';

export const disputeService = {
  raiseDispute: (data: { orderId: string, reason: string, description: string }) => 
    api.post('/api/disputes/raise', data),
  
  getDisputeById: (id: string) => 
    api.get(`/api/disputes/${id}`),
  
  resolveDispute: (data: { disputeId: string, resolution: string, action: string }) => 
    api.post('/api/disputes/resolve', data),
};
