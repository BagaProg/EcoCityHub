import MenuButton from "./MenuButton";
import { Link } from "react-router-dom";
import { User } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import axios from "axios";

export default function LoginButton() {
	const { t } = useTranslation();
	const [avatar, setAvatar] = useState("");

	const user = JSON.parse(localStorage.getItem("user"));
	const userId = user?.id;

	useEffect(() => {
		if (userId) {
			axios
				.get(`${import.meta.env.VITE_API_URL}/api/profile/${userId}`)
				.then((res) => setAvatar(res.data.avatar))
				.catch(console.error);
		}
	}, [userId]);

	return (
		<MenuButton
			Icon={
				<Link to="/profile">
					{avatar ? (
						<img
							src={avatar}
							className="w-8 h-8 rounded-full object-cover"
							alt="avatar"
						/>
					) : (
						<User className="w-5 h-5" color="gray" />
					)}
				</Link>
			}
			customStyle={true}
			text={
				<Link to="/profile" className="text-gray-700 dark:text-white font-bold">
					{t("header.profile")}
				</Link>
			}
			onClick={() => { }}
		/>
	);
}
