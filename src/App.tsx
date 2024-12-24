import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignUpPage';
import SettingPage from './pages/SettingPage';
import ProfilePage from './pages/ProfilePage';
import Layout from './layout/Layout';
import { Toaster } from 'react-hot-toast';

const App = () => {
	return (
		<div className='h-screen'>
			<BrowserRouter>
				<Routes>
					<Route
						path='/'
						element={
							<Layout>
								<HomePage />
							</Layout>
						}
					></Route>
					<Route
						path='/setting'
						element={
							<Layout>
								<SettingPage />
							</Layout>
						}
					></Route>
					<Route
						path='/profile'
						element={
							<Layout>
								<ProfilePage />
							</Layout>
						}
					></Route>
					{/* login, signup */}
					<Route path='/signup' element={<SignupPage />}></Route>
					<Route path='/login' element={<LoginPage />}></Route>
				</Routes>
			</BrowserRouter>
			{/* toaster */}
			<Toaster />
		</div>
	);
};

export default App;
