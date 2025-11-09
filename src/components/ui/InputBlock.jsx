import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // ✅ добавляем
import Cookies from "js-cookie"; // ✅ если используешь токен в cookie

export default function InputBlock({
	onSubmit,
	name,
	customStyle,
	customButton,
	fields = [],
	endpoint,
	onSuccess,
}) {
	const [inputs, setInputs] = useState(fields.map(() => ""));
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const navigate = useNavigate(); // ✅ для перехода

	const handleChange = (index, value) => {
		const updated = [...inputs];
		updated[index] = value;
		setInputs(updated);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setLoading(true);

		const data = fields.reduce((acc, field, idx) => {
			acc[field.name] = inputs[idx];
			return acc;
		}, {});

		try {
			if (onSubmit) return onSubmit(data);

			const res = await axios.post(
				`${import.meta.env.VITE_API_URL}${endpoint}`,
				data
			);

			console.log("✅ Response:", res.data);

			// ✅ Сохраняем токен
			if (res.data.token) {
				Cookies.set("token", res.data.token, { expires: 7 }); // хранится 7 дней
			}

			// ✅ Успешно — перенаправляем
			if (onSuccess) onSuccess(res.data);
			else navigate("/"); // возвращаем на главную

		} catch (err) {
			console.error("❌ Error:", err);
			setError(
				err.response?.data?.error || "Something went wrong, try again."
			);
		} finally {
			setLoading(false);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className={`flex ${customStyle ? "" : "flex-col"} gap-1`}
		>
			{fields.map((field, index) => (
				<div key={index} className="not-last:mb-[20px] flex flex-col gap-1">
					<label className="text-gray-800 dark:text-white text-[18px]">
						{field.label}
					</label>
					<input
						type={field.type || "text"}
						value={inputs[index] ?? ""}
						onChange={(e) => handleChange(index, e.target.value)}
						placeholder={field.placeholder || `Input ${index + 1}`}
						className="outline-none focus:shadow-[0_0_8px_rgba(34,197,94,0.8)] placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-green-500 duration-150 block w-full h-[45px] rounded-2xl border-1 px-3 border-gray-500/50"
					/>
				</div>
			))}

			{error && (
				<p className="text-red-500 text-center text-[14px] mt-2">{error}</p>
			)}

			<button
				className={`${customButton ? 'bg-green-500' : ''} duration-150 hover:scale-105 hover:bg-green-500 hover:text-white flex justify-center items-center w-full h-[45px] rounded-2xl`}
				type="submit"
				disabled={loading}
			>
				{loading ? "..." : <p className={`${customButton ? 'text-white' : ''}`}>{name}</p>}
			</button>
		</form>
	);
}
