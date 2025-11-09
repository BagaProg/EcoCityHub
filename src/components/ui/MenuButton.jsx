
export default function MenuButton({ Icon, text, onClick, customStyle }) {
	return (
		<button
			className={`flex ${customStyle ? `hover:scale-110 hover:shadow-md hover:shadow-gray-500/50 dark:hover:shadow-black/60 duration-200 hover:bg-gray-200 dark:hover:bg-transparent` : `hover:bg-gray-200 dark:hover:bg-gray-800`} duration-150 rounded-4xl justify-start items-center gap-1.5 p-1.5 sm:px-3 sm:py-2 cursor-pointer text-gray-700 dark:text-white`}
			onClick={onClick}
		>
			{Icon}
			<p className="sm:block hidden">{text}</p>
		</button>
	)
}