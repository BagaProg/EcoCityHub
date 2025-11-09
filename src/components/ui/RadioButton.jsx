import { useState } from "react";
import { motion } from "motion/react";

export default function RadioButton({ options = [], setTab }) {
	const [active, setActive] = useState(options[0]?.id || 0);

	return (
		<div className="relative rounded-3xl px-1 gap-1 bg-gray-100 dark:bg-[#1d2433] flex w-full mx-auto items-center">
			<motion.div
				layout
				transition={{ type: "spring", stiffness: 200, damping: 20 }}
				className="absolute z-1 h-[75%] rounded-2xl top-[12%] bg-white dark:bg-[#1f2939] shadow-md"
				style={{
					width: `${100 / options.length - 4}%`,
					left: `${(100 / options.length) * active + 4 / options.length}%`,
				}}
			/>

			{options.map((opt, index) => (
				<button
					key={index}
					className={`z-2 flex sm:text-[16px] text-[12px] flex-col sm:flex-row gap-2 w-full justify-center items-center rounded-2xl p-2 duration-150 text-gray-700 dark:text-gray-200 ${active === index ? "font-semibold" : "opacity-70"
						}`}
					onClick={() => {
						setActive(index);
						if (setTab) setTab(opt.id || index);
					}}
				>
					{opt.icon}
					{opt.text}
				</button>
			))}
		</div>
	);
}
