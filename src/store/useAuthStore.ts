import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import { toast } from 'react-hot-toast';

interface AuthState {
	token: string | null;
	isAuthenticated: boolean;
	isLoggingIn: boolean;
	isSigningUp: boolean;
	login: (
		credentials: { username: string; password: string },
		navigate: any
	) => Promise<void>;
	signup: (
		data: {
			username: string;
			email: string;
			password: string;
			confirmPassword: string;
		},
		navigate: any
	) => Promise<void>;
	logout: (navigate: any) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
	token: localStorage.getItem('token'),
	isAuthenticated: !!localStorage.getItem('token'),
	isLoggingIn: false,
	isSigningUp: false,

	login: async (credentials, navigate) => {
		set({ isLoggingIn: true });
		try {
			const response = await axiosInstance.post(
				'/auth/login',
				credentials
			);
			const { token } = response.data;

			localStorage.setItem('token', token);
			axiosInstance.defaults.headers.common[
				'Authorization'
			] = `Bearer ${token}`;

			set({ token, isAuthenticated: true });
			toast.success('Login successful!');
			navigate('/');
		} catch (error: any) {
			const message =
				error.response?.data?.message || 'Invalid username or password';
			toast.error(message);
		} finally {
			set({ isLoggingIn: false });
		}
	},

	signup: async (data, navigate) => {
		set({ isSigningUp: true });
		try {
			await axiosInstance.post('/auth/register', data);

			toast.success('Signup successful! You can now log in.');
			navigate('/login');
		} catch (error: any) {
			const message =
				error.response?.data?.message ||
				'Signup failed. Please try again.';
			toast.error(message);
		} finally {
			set({ isSigningUp: false });
		}
	},

	logout: (navigate) => {
		localStorage.removeItem('token');
		delete axiosInstance.defaults.headers.common['Authorization'];

		set({ token: null, isAuthenticated: false });
		toast.success('Logged out successfully');
		navigate('/login');
	},
}));
