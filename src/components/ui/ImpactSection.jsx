
export default function ImpactSection({ icon, title, description, customBgColor, customTextColor }) {

	return (
		<div className={`${customBgColor} p-3 rounded-2xl flex justify-between items-center gap-6 `}>
			<div className="flex items-center gap-2">
				<p className="text-[18px]">{icon}</p>
				<p className={`text-[16px] text-gray-800 dark:text-white`}>{title}</p>
			</div>
			<p className={`${customTextColor} font-bold`}>{description}</p>
		</div>
	)
}