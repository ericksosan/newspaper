import { Outlet } from 'react-router-dom';
export const Layout = (): JSX.Element => {
	return (
		<>
			<h1 className="text-3xl font-bold">Nav</h1>
			<Outlet />
			<h1 className="text-3xl font-bold">Footer</h1>
		</>
	);
};
