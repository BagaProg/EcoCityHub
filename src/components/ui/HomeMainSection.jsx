import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function HomeMainSection() {
	const { t } = useTranslation();

	return (
		<div className="container flex lg:flex-row items-center justify-between gap-8 mt-[150px] flex-col">
			<div className="w-100% lg:w-1/2 flex flex-col gap-6">
				<div className="text-[16px] monsterrat font-medium translate-y-6 text-gray-800 dark:text-white">
					<p>{t('home.main.suptitle')}</p>
				</div>
				<div className="text-[40px] sm:text-[60px] font-extrabold tracking-wide text-green-600 dark:text-green-400">
					EcoCityHub
				</div>
				<div className="text-gray-800 dark:text-white text-[20px] sm:text-[22px] monsterrat font-medium opacity-70 mb-[10px]">
					<p>{t('home.main.subtitle')}</p>
				</div>
				<div className="flex gap-10">
					<button className="p-3 px-5 rounded-4xl border border-gray-300 dark:border-gray-600 duration-150 hover:scale-105 hover:bg-green-500 hover:text-white text-gray-800 dark:text-white font-bold">
						{t('home.main.explore')}
						<ArrowRight className="w-4 h-4 inline-block ml-2" />
					</button>
					<button>
						{t('home.main.watch')}
					</button>
				</div>
			</div>
			<div className="group w-100% lg:w-1/2 rounded-xl overflow-hidden shadow-lg shadow-black/40">
				<img
					className="group-hover:scale-105 duration-200"
					src="https://images.unsplash.com/photo-1693517596637-8190ac7afc0e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY28lMjBjaXR5JTIwc3VzdGFpbmFibGUlMjBncmVlbiUyMHNtYXJ0fGVufDF8fHx8MTc1NzE4NzUzNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" alt="" />
			</div>
		</div>
	)
}