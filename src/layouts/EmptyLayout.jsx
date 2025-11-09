import { Outlet } from "react-router-dom";
import '../App.css';

export default function EmptyLayout() {

	return (
		<main className="min-h-screen">
			<Outlet />
		</main>
	)
}