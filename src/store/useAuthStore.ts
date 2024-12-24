import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';
type AuthUser = {
	username: string;
	email: string;
	password: string;
	confirmPassword: string;
};
export type AuthStore = {
	authUser: AuthUser | null;
	isSignedUp: boolean;
	isLoggedIn: boolean;
	isUpdatingProfile: boolean;
	isCheckingAuth: boolean;
	signup: (data: AuthUser) => Promise<void>;
};

export const useAuthStore = create((set) => {
	return {
		authUser: null,
		isSignedUp: false,
		isLoggedIn: false,
		isUpdatingProfile: false,
		isCheckingAuth: true,

		async signup(data: AuthUser) {
			set({ isSignedUp: true });
			try {
				const result = await axiosInstance.post('/auth/register', data);
				set({ authUser: result.data });
				toast.success('Signup successful');
			} catch (error) {
				console.log(error);
				toast.error('Signup failed');
			} finally {
				set({ isSignedUp: false });
			}
		},
	};
});
