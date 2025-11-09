import { Check } from "lucide-react";

export default function RecentActivityBlocks({ isEarned, icon, iconBgColor, title, description, time, progress }) {

	return (
		<div className="w-full relative flex items-start justify-start gap-3 dark:shadow-transparent shadow-md rounded-2xl p-5 shadow-gray-600/20 border border-gray-500/20">
			<div className={`${iconBgColor} min-w-[36px] min-h-[36px] p-2 rounded-full flex items-center justify-center`}>
				{icon}
			</div>
			<div className="flex flex-col gap-2 w-full">
				<p className="font-bold text-gray-800 dark:text-white">{title}</p>
				<p className="text-[14px] font-normal text-gray-800 dark:text-white opacity-70">{description}</p>
				{isEarned ? (
					<div className="">
						<p className="text-gray-800 dark:text-white text-[12px]">{time}</p>
						<div className="absolute top-5 right-5 w-[25px] h-[25px] flex items-center justify-center bg-green-500/20 dark:bg-green-600/10 duration-150 rounded-full">
							<Check className="w-[15px] h-[15px] text-green-600" />
						</div>
					</div>
				) : (
					<div className="">
						<div className="flex justify-between items-center">
							<p className="text-gray-700 dark:text-white opacity-80">Progress</p>
							<p className="text-gray-800 dark:text-white">{progress}</p>
						</div>
						<div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full mt-1">
							<div className="bg-green-500 h-2 rounded-full" style={{ width: progress }}></div>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}