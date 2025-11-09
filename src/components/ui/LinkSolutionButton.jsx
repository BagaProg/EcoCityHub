import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function LinkSolutionButton({ link, icon, title, subtitle }) {

	return (
		<Link to={`${link}`} className="flex items-start justify-between p-6 rounded-2xl bg-white hover:shadow-lg dark:hover:shadow-sm duration-150 shadow-md shadow-gray-400/50 dark:shadow-gray-950/50 border border-gray-500/20 dark:bg-transparent ">
			<div className="flex gap-5">
				{icon}
				<div className="flex flex-col gap-2">
					<p className="text-[20px] sm:text-[24px] tracking-wide text-gray-800 dark:text-white">{title}</p>
					<p className="text-gray-800 w-[90%] dark:text-white opacity-50 text-[18px] monsterrat">{subtitle}</p>
				</div>
			</div>
			<ArrowRight className="min-w-[20px] min-h-[20px] inline-block ml-2" />
		</Link>
	)
}