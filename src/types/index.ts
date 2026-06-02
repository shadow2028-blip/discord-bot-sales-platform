// User Types
export interface User {
  id: string;
  email: string;
  username: string;
  role: 'user' | 'admin';
  createdAt: Date;
  updatedAt: Date;
  discordId?: string;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

// Bot Types
export interface Bot {
  id: string;
  name: string;
  description: string;
  detailedDescription: string;
  price: number;
  currency: 'TRY' | 'USD' | 'EUR';
  imageUrl: string;
  features: string[];
  botInviteUrl?: string;
  discordBotId?: string;
  rating?: number;
  reviews?: number;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

export interface BotCardProps {
  bot: Bot;
  onPurchase: (botId: string) => void;
  isInCart?: boolean;
}

// Cart Types
export interface CartItem {
  botId: string;
  bot: Bot;
  quantity: number;
  addedAt: Date;
}

export interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}

// Purchase/Order Types
export interface Purchase {
  id: string;
  userId: string;
  botId: string;
  bot?: Bot;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  stripePaymentIntentId?: string;
  iyzicoPaymentId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserBot {
  id: string;
  userId: string;
  botId: string;
  bot?: Bot;
  purchaseDate: Date;
  status: 'active' | 'inactive' | 'revoked';
  inviteUrl?: string;
}

// Payment Types
export interface CheckoutSession {
  id: string;
  cartItems: CartItem[];
  total: number;
  currency: string;
  status: 'open' | 'complete' | 'expired';
  createdAt: Date;
  expiresAt: Date;
}

export interface PaymentIntentPayload {
  amount: number;
  currency: string;
  userEmail: string;
  userId: string;
  cartItems: CartItem[];
  metadata?: Record<string, string>;
}

export interface PaymentResult {
  success: boolean;
  paymentIntentId?: string;
  clientSecret?: string;
  redirectUrl?: string;
  error?: string;
}

// Dashboard Types
export interface DashboardStats {
  totalBots: number;
  totalRevenue: number;
  totalUsers: number;
  recentPurchases: Purchase[];
}

// Admin Types
export interface BotFormData {
  name: string;
  description: string;
  detailedDescription: string;
  price: number;
  currency: 'TRY' | 'USD' | 'EUR';
  imageUrl: string;
  features: string[];
  botInviteUrl?: string;
  discordBotId?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Middleware Types
export interface AuthenticatedRequest extends Request {
  user?: User;
  userId?: string;
}
