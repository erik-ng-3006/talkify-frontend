import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Layout = ({ children }: React.PropsWithChildren) => {
	return (
		<div className='flex flex-col min-h-screen'>
			<Header />
			<div className='flex-1'>{children}</div>
			<Footer />
		</div>
	);
};

export default Layout;
