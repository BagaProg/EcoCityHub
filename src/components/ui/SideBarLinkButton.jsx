import { Link } from "react-router-dom";

export default function SideBarLinkButton({ icon, title, subtitle, link, onClick, isExitButton }) {

	return (
		<Link to={link}
			onClick={onClick}
			className={`${isExitButton ? 'bg-red-400 dark:bg-red-600 hover:bg-red-500' : 'bg-white hover:bg-gray-100 dark:hover:bg-gray-700'} flex duration-150  gap-4 p-4 items-center rounded-2xl border-1 border-gray-600/30 dark:border-gray-500/30 dark:bg-gray-800`}
		>
			{icon}
			<div className="">
				<p className={`${isExitButton ? 'text-white' : 'text-gray-800'} dark:text-white font-semibold text-[18px] `}>{title}</p>
				<p className={`${isExitButton ? 'text-white' : 'text-gray-800'} dark:text-white font-normal monsterrat text-[16px] opacity-70`}>
					{subtitle}
				</p>
			</div>
		</Link>
	)
}