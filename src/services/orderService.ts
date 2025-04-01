import api from './api';
import { CreateOrderRequest } from '@/types/api';

export const orderService = {
  createOrder: (data: CreateOrderRequest) => 
    api.post('/api/orders/create', data),
  
  exploreOrders: (params?: { page?: number, limit?: number, category?: string }) => 
    api.get('/api/orders/explore', { params }),
  
  acceptOrder: (orderId: string) => 
    api.post('/api/orders/accept', { orderId }),
  
  cancelOrder: (orderId: string, reason?: string) => 
    api.post('/api/orders/cancel', { orderId, reason }),
  
  cancelAcceptance: (orderId: string, reason?: string) => 
    api.post('/api/orders/cancel-acceptance', { orderId, reason }),
  
  confirmPayment: (orderId: string) => 
    api.post('/api/orders/confirm-payment', { orderId }),
  
  uploadProof: (orderId: string, formData: FormData) => 
    api.post('/api/orders/upload-proof', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      params: { orderId },
    }),
  
  confirmDelivery: (orderId: string) => 
    api.post('/api/orders/confirm-delivery', { orderId }),
  
  getMyOrders: (params?: { page?: number, limit?: number, status?: string }) => 
    api.get('/api/orders/my-orders', { params }),
  
  getMyAcceptedOrders: (params?: { page?: number, limit?: number, status?: string }) => 
    api.get('/api/orders/my-accepted-orders', { params }),
    
  getOrderById: (orderId: string) => 
    api.get(`/api/orders/${orderId}`),
};
