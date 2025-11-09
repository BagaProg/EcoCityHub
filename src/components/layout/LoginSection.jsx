import { useState, useContext } from "react";
import RadioButton from "../ui/radioButton";
import { LogInIcon, UserPlus } from "lucide-react";
import InputBlock from "../ui/InputBlock";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";

export default function LoginSection() {
	const [tab, setTab] = useState("login");
	const { t } = useTranslation();
	const navigate = useNavigate();
	const { setUser } = useContext(AuthContext);

	const handleSuccess = (data) => {
		if (data.token) {
			localStorage.setItem("token", data.token);
			localStorage.setItem("user", JSON.stringify(data.user));
			setUser(data.user);
			navigate("/");
		}
	};

	return (
		<div className="w-full min-h-screen px-[15px] flex justify-center items-center">
			<div className="border-1 border-gray-500/30 w-[448px] m-2 flex flex-col gap-5 p-8 rounded-2xl bg-white duration-150 shadow-sm shadow-gray-400/50 dark:shadow-gray-950/50 dark:bg-transparent">
				<p className="text-[30px] sm:text-[27px] tracking-wide text-gray-800 dark:text-white">
					{tab === "login" ? "Login" : "Sign in"}
				</p>
				<RadioButton
					setTab={setTab}
					options={[
						{ id: "login", text: "Login", icon: <LogInIcon className="w-[18px] h-[18px]" /> },
						{ id: "signin", text: "Sign In", icon: <UserPlus className="w-[18px] h-[18px]" /> },
					]}
				/>
				{tab === "login" ? (
					<InputBlock
						fields={[
							{ name: "email", label: "Email", placeholder: "your@email.com", type: "email" },
							{ name: "password", label: "Password", placeholder: "Your password...", type: "password" },
						]}
						name="Login"
						endpoint="/api/login"
						onSuccess={handleSuccess}
						customButton={true}
					/>
				) : (
					<InputBlock
						fields={[
							{ name: "full_name", label: "Full name", placeholder: "Ellen Joe", type: "text" },
							{ name: "email", label: "Email", placeholder: "your@email.com", type: "email" },
							{ name: "password", label: "Password", placeholder: "Your password...", type: "password" },
						]}
						name="Sign in"
						endpoint="/api/register"
						onSuccess={handleSuccess}
						customButton={true}
					/>
				)}
				<p className="text-gray-800 w-[90%] text-center mx-auto dark:text-white opacity-50 text-[16px] monsterrat">
					{t("footer.policy")}
				</p>
			</div>
		</div>
	);
}
