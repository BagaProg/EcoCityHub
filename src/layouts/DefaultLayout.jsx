import { Outlet } from "react-router-dom";
import SideBar from "../components/layout/SideBar";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import '../App.css';
import { useState } from "react";

export default function DefaultLayout() {
	const [show, setShow] = useState(false);

	return (
		<>
			<Header show={show} setShow={setShow} />
			<SideBar show={show} setShow={setShow} />
			<main className="min-h-screen">
				<Outlet />
			</main>
			<Footer />
		</>
	)
}