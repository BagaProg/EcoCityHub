import { useTranslation } from "react-i18next";

export default function ProblemCard({ icon, title, subtitle, option, subOption, customColor }) {
	const { t } = useTranslation();

	return (
		<div className="w-full rounded-2xl shadow-sm hover:-translate-y-2 shadow-gray-400/50 duration-150 dark:bg-gray-800 bg-white dark:shadow-transparent p-4 py-6 flex flex-col border border-gray-500/20 justify-between gap-4">
			<div className="mx-auto w-15 h-15 flex justify-center items-stretch ">
				{icon}
			</div>
			<p className="text-center text-[20px] sm:text-[24px] tracking-wide text-gray-800 dark:text-white">{title}</p>
			<p className="text-center text-gray-800 dark:text-white opacity-50 text-[16px] sm:text-[20px] monsterrat">{subtitle}</p>
			<div className="text-center">
				<p className={`text-[24px] sm:text-[28px] ${customColor === 'red' ? 'text-red-600' : ''} 
				${customColor === 'blue' ? 'text-blue-600' : ''} ${customColor === 'orange' ? 'text-orange-600' : ''} 
				${customColor === 'purple' ? 'text-purple-600' : ''}`}>{option}</p>
				<p className="text-gray-800 monsterrat dark:text-white opacity-50 text-[16px]">{subOption}</p>
			</div>
		</div>
	)
}