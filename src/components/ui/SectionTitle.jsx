
export default function SectionTitle({ title, subtitle }) {

	return (
		<div className="mx-auto flex flex-col gap-2 items-center justify-center">
			<p className="sm:text-[40px] text-[30px] font-extrabold tracking-wider text-center text-gray-800 dark:text-white">{title}</p>
			<p className="monsterrat sm:text-[18px] text-[16px] font-medium opacity-50 text-gray-800 dark:text-white text-center">{subtitle}</p>
		</div>
	)
}