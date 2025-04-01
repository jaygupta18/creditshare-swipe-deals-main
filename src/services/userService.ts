import api from './api';
import { User } from '../types/api';

export const userService = {
  getUserById: (id: string) => 
    api.get(`/api/user/${id}`),
  
  updateUser: (data: any) => 
    api.put('/api/user/update', data),
  
  uploadKyc: (formData: FormData) => 
    api.post('/api/user/kyc-upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
  
  getTrustScore: () => 
    api.get('/api/user/trust-score'),
  
  inviteUser: (data: { email: string, name?: string }) => 
    api.post('/api/user/invite', data),
};
