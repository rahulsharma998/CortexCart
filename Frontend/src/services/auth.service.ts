import api from './api';
import type { LoginCredentials, RegisterData, AuthResponse, User } from '../types';

const mapUser = (data: any): User => ({
  ...data,
  name: data.full_name || data.name,
  _id: data.id || data._id,
  role: data.role || 'user',
});

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const formData = new URLSearchParams();
    formData.append('username', credentials.email);
    formData.append('password', credentials.password);

    const response = await api.post<any>('/auth/login', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const token = response.data.access_token;
    localStorage.setItem('token', token);

    const userResp = await api.get<any>('/auth/me', {
      headers: { Authorization: `Bearer ${token}` }
    });

    return {
      access_token: token,
      token_type: response.data.token_type,
      user: mapUser(userResp.data)
    };
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
    await api.post<any>('/auth/signup', payload);

    return authService.login({ email: data.email, password: data.password });
  },

  async getCurrentUser(): Promise<User> {
    const response = await api.get<any>('/auth/me');
    return mapUser(response.data);
  },

  async updateProfile(data: Partial<User>): Promise<User> {
    const payload: any = {};
    if (data.name) payload.full_name = data.name;
    if (data.address) payload.address = data.address;
    if (data.phone) payload.contact_number = data.phone;

    const response = await api.put<any>('/auth/profile', payload);
    return mapUser(response.data);
  },

  logout() {
    localStorage.removeItem('token');
  },

  async getUsers(): Promise<User[]> {
    const response = await api.get<any[]>('/admin/users');
    return response.data.map(mapUser);
  },
};
