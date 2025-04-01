import api from './api';
import { 
  AuthResponse, 
  LoginRequest, 
  RegisterRequest, 
  OtpVerificationRequest,
  PasswordResetRequest,
  PasswordChangeRequest,
  ProfileUpdateRequest,
  User,
  UpdateProfileRequest
} from '../types/api';

export const authService = {
  register: (data: RegisterRequest) => 
    api.post('/api/auth/register', data),
  
  login: (data: LoginRequest) => 
    api.post('/api/auth/login', data),
  
  logout: () => 
    api.post('/api/auth/logout'),
  
  verifyOtp: (data: { otp: string, email?: string, phone?: string }) => 
    api.post('/api/auth/verify-otp', data),
  
  resetPassword: (data: { email: string }) => 
    api.post('/api/auth/reset-password', data),
  
  changePassword: (data: { currentPassword: string, newPassword: string }) => 
    api.post('/api/auth/change-password', data),
  
  getProfile: () => 
    api.get('/api/auth/me'),
  
  updateProfile: (data: UpdateProfileRequest) => 
    api.put('/api/auth/update-profile', data),
};
