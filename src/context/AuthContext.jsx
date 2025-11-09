import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (!token) {
			setLoading(false);
			return;
		}

		axios
			.get(`${import.meta.env.VITE_API_URL}/api/me`, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((res) => setUser(res.data))
			.catch(() => {
				localStorage.removeItem("token");
				localStorage.removeItem("user");
				setUser(null);
			})
			.finally(() => setLoading(false));
	}, []);

	return (
		<AuthContext.Provider value={{ user, setUser, loading }}>
			{children}
		</AuthContext.Provider>
	);
}
