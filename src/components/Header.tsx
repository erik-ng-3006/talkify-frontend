import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

const Header = () => {
	const { logout } = useAuthStore();
	const navigate = useNavigate();
	return (
		<header className='flex justify-between items-center p-4 bg-gradient-to-br from-purple-400 via-pink-500 to-red-400 text-white'>
			<h1 className='text-3xl font-bold'>
				<Link to={'/'}>
					<i className='fa-solid fa-comment mr-2'></i>
					Talkify
				</Link>
			</h1>
			<nav>
				<ul className='flex gap-4'>
					<li>
						<Link to={'/setting'}>
							<i className='fa-solid fa-gear'></i>
							Settings
						</Link>
					</li>
					<li>
						<Link to={'/profile'}>
							<i className='fa-solid fa-user'></i>
							Profile
						</Link>
					</li>
					<li>
						<button type='button' onClick={() => logout(navigate)}>
							<i className='fa-solid fa-right-from-bracket'></i>{' '}
							Logout
						</button>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Header;
