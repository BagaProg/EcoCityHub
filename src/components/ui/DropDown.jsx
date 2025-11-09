import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";

export default function DropDown({ text, items, customStyle }) {
	const [isOpen, setIsOpen] = useState(false);
	const ref = useRef(null);
	const [isVisible, setIsVisible] = useState(false);
	const [hoveredIndex, setHoveredIndex] = useState(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => setIsVisible(entry.isIntersecting),
			{ threshold: 0.5 }
		);

		if (ref.current) observer.observe(ref.current)

		return () => {
			if (ref.current) observer.unobserve(ref.current)
		}
	}, []);
	return (
		<button
			className="flex justify-start items-center cursor-pointer text-gray-700 dark:text-white"
			ref={ref}
			onClick={() => setIsOpen(!isOpen)}
		>
			<div
				className="flex items-center"
			>
				<p className={`${customStyle ? 'block' : 'sm:block hidden'}`}>{text}</p>
				<ChevronDown
					className={`w-4 h-4 ml-1 ${isOpen ? "rotate-180" : "rotate-0"
						} duration-200`}
					color="gray"
				/>
			</div>

			<AnimatePresence>
				{isOpen && (
					<motion.ul
						className={`absolute ${isVisible ? "top-10" : "bottom-10"} ${customStyle ? 'right-[6px]' : '-left-[0.5px]'} z-11 bg-white rounded-xl shadow-sm shadow-black/20 p-3 
            		dark:bg-[#141a25] dark:border-gray-700 border border-gray-200`}
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						transition={{ duration: 0.1 }}
					>
						{items.map(([label, func, active], i) => {
							const isOtherHovered = hoveredIndex !== null && hoveredIndex !== i
							const showActiveBg = active && !isOtherHovered

							return (
								<li
									key={i}
									className={`flex justify-between w-[110px] items-center cursor-pointer
                    			p-1 px-2 rounded-xl duration-200
                    			${showActiveBg ? "bg-gray-200 dark:bg-gray-800" : ""}
                    			${!active ? "hover:bg-gray-200 dark:hover:bg-gray-800" : ""}`}
									onClick={() => {
										func()
										setIsOpen(false)
									}}
									onMouseEnter={() => setHoveredIndex(i)}
									onMouseLeave={() => setHoveredIndex(null)}
								>
									{label}
									{active && (
										<Check className="w-4 h-4" color="gray" />
									)}
								</li>
							)
						})}
					</motion.ul>
				)}
			</AnimatePresence>
		</button>
	)
}
