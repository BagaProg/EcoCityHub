
export default function DescriptionBlock({ icon, title, description }) {

	return (
		<div className="flex flex-col gap-5.5">
			{icon}
			<p className="text-gray-800 text-[20px] sm:text-[24px] text-center tracking-wide mx-auto dark:text-white">{title}</p>
			<p className="text-gray-800 w-[90%] text-center mx-auto dark:text-white opacity-50 text-[18px] monsterrat">{description}</p>
		</div>
	)
}