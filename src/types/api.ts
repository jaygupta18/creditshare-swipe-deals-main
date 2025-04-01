// User related types
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'buyer' | 'card_holder' | 'admin';
  createdAt: Date;
  trustScore?: number;
  kycVerified?: boolean;
  profilePicture?: string;
  isVerified: boolean;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role: 'buyer' | 'card_holder';
}

export interface OtpVerificationRequest {
  email?: string;
  phone?: string;
  otp: string;
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordChangeRequest {
  currentPassword: string;
  newPassword: string;
}

export interface ProfileUpdateRequest {
  name?: string;
  phone?: string;
  address?: string;
  profilePicture?: string;
}

export interface KycDocument {
  type: 'pan' | 'aadhar' | 'drivingLicense' | 'passport';
  fileUrl: string;
  verified: boolean;
  uploadedAt: Date;
}

// Order related types
export interface Order {
  id: string;
  productName: string;
  description?: string;
  amount: number;
  reward: number;
  serviceFee?: number;
  totalAmount?: number;
  store?: string;
  productUrl: string;
  productImage?: string;
  status: 'pending' | 'accepted' | 'payment_confirmed' | 'proof_uploaded' | 'purchased' | 'shipped' | 'delivered' | 'cancelled' | 'completed';
  buyerId: string;
  cardHolderId?: string;
  buyer?: User;
  cardHolder?: User;
  instructions?: string;
  proofUrl?: string;
  createdAt: string;
  updatedAt: string;
  acceptedAt?: string;
  paymentConfirmedAt?: string;
  proofUploadedAt?: string;
  completedAt?: string;
  cancelledAt?: string;
  cancelReason?: string;
}

export interface CreateOrderRequest {
  productName: string;
  productUrl: string;
  amount: number;
  reward: number;
  instructions?: string;
  productImage?: string;
}

export interface Transaction {
  id: string;
  orderId?: string;
  userId: string;
  amount: number;
  type: 'payment' | 'refund' | 'withdrawal' | 'service_fee';
  status: 'pending' | 'completed' | 'failed';
  paymentMethod?: string;
  createdAt: string;
}

export interface Dispute {
  id: string;
  orderId: string;
  raisedBy: string;
  reason: string;
  description: string;
  status: 'open' | 'under_review' | 'resolved';
  resolution?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'order' | 'payment' | 'system';
  isRead: boolean;
  createdAt: string;
}

export interface UpdateProfileRequest {
  name?: string;
  phone?: string;
  address?: string;
  profilePicture?: string;
  bio?: string;
}
