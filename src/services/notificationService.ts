import api from './api';

export const notificationService = {
  sendNotification: (data: { userId: string, type: string, message: string }) => 
    api.post('/api/notifications/send', data),
  
  getMyNotifications: (params?: { page?: number, limit?: number, read?: boolean }) => 
    api.get('/api/notifications/my-notifications', { params }),
};
