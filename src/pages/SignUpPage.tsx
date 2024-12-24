import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthStore, useAuthStore } from '../store/useAuthStore';
import { toast } from 'react-hot-toast';

const SignUpPage: React.FC = () => {
	const [formData, setFormData] = useState({
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
	});

	const validateForm = () => {
		if (!formData.username.trim()) {
			toast.error('Username is required');
			return false;
		}

		if (!formData.email.trim()) {
			toast.error('Email is required');
			return false;
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(formData.email)) {
			toast.error('Invalid email format');
			return false;
		}

		if (!formData.password.trim()) {
			toast.error('Password is required');
			return false;
		}
		if (formData.password.length < 8 || formData.password.length > 12) {
			toast.error('Password must be between 8 and 12 characters');
			return false;
		}
		if (!formData.confirmPassword.trim()) {
			toast.error('Confirm Password is required');
			return false;
		}

		if (formData.password !== formData.confirmPassword) {
			toast.error('Passwords do not match');
			return false;
		}

		return true;
	};

	const { signup }: AuthStore = useAuthStore() as AuthStore;

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { id, value } = e.target;
		setFormData({ ...formData, [id]: value });
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (validateForm()) signup(formData);
	};

	return (
		<div className='h-full bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center p-4'>
			<div className='container bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl w-full max-w-md transform hover:scale-105 transition-all duration-300'>
				<h2 className='text-4xl font-extrabold text-white mb-6 text-center animate-pulse'>
					Sign Up
				</h2>
				<form onSubmit={handleSubmit} className='space-y-6'>
					<div className='input-field relative'>
						<input
							id='username'
							type='text'
							value={formData.username}
							onChange={handleChange}
							className='w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 focus:bg-opacity-30 focus:ring-2 focus:ring-purple-300 text-white placeholder-gray-200 transition duration-200'
							placeholder='Username'
						/>
						<i className='fas fa-user absolute right-3 top-3 text-white'></i>
					</div>
					<div className='input-field relative'>
						<input
							id='email'
							type='email'
							value={formData.email}
							onChange={handleChange}
							className='w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 focus:bg-opacity-30 focus:ring-2 focus:ring-purple-300 text-white placeholder-gray-200 transition duration-200'
							placeholder='Email Address'
						/>
						<i className='fas fa-envelope absolute right-3 top-3 text-white'></i>
					</div>
					<div className='input-field relative'>
						<input
							id='password'
							type='password'
							value={formData.password}
							onChange={handleChange}
							className='w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 focus:bg-opacity-30 focus:ring-2 focus:ring-purple-300 text-white placeholder-gray-200 transition duration-200'
							placeholder='Password'
						/>
						<i className='fas fa-lock absolute right-3 top-3 text-white'></i>
					</div>
					<div className='input-field relative'>
						<input
							id='confirmPassword'
							type='password'
							value={formData.confirmPassword}
							onChange={handleChange}
							className='w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 focus:bg-opacity-30 focus:ring-2 focus:ring-purple-300 text-white placeholder-gray-200 transition duration-200'
							placeholder='Confirm Password'
						/>
						<i className='fas fa-lock absolute right-3 top-3 text-white'></i>
					</div>
					<button
						type='submit'
						className='btn w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 px-4 rounded-lg hover:opacity-90 focus:ring-4 focus:ring-purple-300 transition duration-300 transform hover:scale-105'
					>
						Sign Up
						<i className='fas fa-arrow-right ml-2'></i>
					</button>
				</form>
				<p className='text-white text-center mt-6'>
					Already have an account?
					<Link to='/login' className='font-bold hover:underline'>
						{' '}
						Log in
					</Link>
				</p>
				<div className='mt-8 flex justify-center space-x-4'>
					<Link
						to='#'
						className='text-white hover:text-purple-300 transition-colors duration-200'
					>
						<i className='fab fa-facebook-f text-2xl'></i>
					</Link>
					<Link
						to='#'
						className='text-white hover:text-purple-300 transition-colors duration-200'
					>
						<i className='fab fa-twitter text-2xl'></i>
					</Link>
					<Link
						to='#'
						className='text-white hover:text-purple-300 transition-colors duration-200'
					>
						<i className='fab fa-google text-2xl'></i>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default SignUpPage;
