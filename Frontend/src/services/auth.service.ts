import api from './api';
import type { LoginCredentials, RegisterData, AuthResponse, User } from '../types';

interface UserData {
  full_name?: string;
  name?: string;
  email?: string;
  id?: string;
  _id?: string;
  role?: string;
  isActive?: boolean;
  [key: string]: string | boolean | undefined;
}

const mapUser = (data: UserData): User => ({
  ...data,
  name: data.full_name || data.name || '',
  email: data.email || '',
  _id: data.id || data._id || '',
  role: (data.role || 'User') as 'User' | 'Admin',
  isActive: data.isActive ?? true,
});

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const formData = new URLSearchParams();
    formData.append('username', credentials.email);
    formData.append('password', credentials.password);

    const response = await api.post<AuthResponse>('/auth/login', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const token = response.data.access_token;

    try {
      const userResp = await api.get<UserData>('/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      return {
        access_token: token,
        token_type: response.data.token_type,
        user: mapUser(userResp.data)
      };
    } catch {
      return {
        access_token: token,
        token_type: response.data.token_type,
        user: mapUser((response.data.user as UserData) || (response.data as unknown as UserData))
      };
    }
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    const payload = {
      username: data.email,
      email: data.email,
      password: data.password,
      full_name: data.name,
      contact_number: data.phone || undefined,
      address: data.address || undefined,
      dob: data.dob ? new Date(data.dob).toISOString() : undefined,
      role: data.role,
    };
    await api.post<AuthResponse>('/auth/signup', payload);

    return authService.login({ email: data.email, password: data.password });
  },

  async getCurrentUser(): Promise<User> {
    const response = await api.get<UserData>('/auth/me');
    return mapUser(response.data);
  },

  async updateProfile(data: Partial<User>): Promise<User> {
    const payload: Partial<UserData> = {};
    if (data.name) payload.full_name = data.name;
    if (data.address) payload.address = data.address;
    if (data.phone) payload.contact_number = data.phone;

    const response = await api.put<UserData>('/auth/profile', payload);
    return mapUser(response.data);
  },

  logout() {
    localStorage.removeItem('token');
  },

  async getUsers(): Promise<User[]> {
    const response = await api.get<UserData[]>('/admin/users');
    return response.data.map(mapUser);
  },
};
