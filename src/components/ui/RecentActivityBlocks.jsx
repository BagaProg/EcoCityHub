
export default function RecentActivityBlocks({ title, time, ecoPoints }) {

	return (
		<div className="flex items-start justify-between gap-2">
			<div className="flex flex-col gap-2 w-[70%]">
				<p className="text-[14px] text-gray-800 dark:text-white">{title}</p>
				<p className="text-gray-800 text-[12px] dark:text-white opacity-70">{time}</p>
			</div>
			<p className="text-gray-800 dark:text-white text-[12px]">{ecoPoints}</p>
		</div>
	)
}