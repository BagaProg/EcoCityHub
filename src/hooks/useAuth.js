import { useEffect, useState } from "react";
import axios from "axios";

export default function useAuth() {
	const [user, setUser] = useState(() => {
		const saved = localStorage.getItem("user");
		return saved ? JSON.parse(saved) : null;
	});
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
			.then((res) => {
				setUser(res.data);
				localStorage.setItem("user", JSON.stringify(res.data));
			})
			.catch(() => {
				localStorage.removeItem("token");
				localStorage.removeItem("user");
				setUser(null);
			})
			.finally(() => setLoading(false));
	}, []);

	return { user, loading };
}
