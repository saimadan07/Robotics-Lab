export interface User {
  id: number;
  rollNo: string;
  name: string;
  role: 'admin' | 'student' | 'staff';
  password: string;
}

export interface Component {
  id: number;
  name: string;
  category: string;
  available: number;
  total: number;
  description: string;
}

export interface Booking {
  id: number;
  userId: number;
  componentId: number;
  quantity: number;
  requestDate: string;
  returnDate: string;
  status: 'pending' | 'approved' | 'rejected';
  purpose: string;
}

export interface LoginForm {
  rollNo: string;
  password: string;
}

export interface RegisterForm {
  rollNo: string;
  name: string;
  role: 'student' | 'staff';
  password: string;
  confirmPassword: string;
}

export interface BookingForm {
  componentId: string;
  quantity: string;
  returnDate: string;
  purpose: string;
}

export interface ComponentForm {
  name: string;
  category: string;
  total: string;
  description: string;
}

export type TabType = 'overview' | 'inventory' | 'requests' | 'returns' | 'analytics';