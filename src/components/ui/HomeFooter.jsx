import { CheckCircle, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function HomeFooter() {
	const { t } = useTranslation();

	return (
		<div className="dark:bg-gray-900 bg-white">
			<div className="container pt-32 pb-20 flex flex-col gap-4">
				<CheckCircle className="w-[64px] h-[64px] mx-auto" />
				<div className="flex flex-col gap-6">
					<p className="text-[35px] text-center sm:text-[50px] font-bold tracking-wide text-gray-800 dark:text-white">{t('footer.welcome')}</p>
					<p className="text-gray-800 dark:text-white w-[70%] mx-auto text-center text-[20px] sm:text-[22px] monsterrat font-medium opacity-70">{t('home.main.subtitle')}</p>
					<div className="flex justify-center">
						<button className="p-3 px-5 rounded-4xl border border-gray-300 dark:border-gray-600 duration-150 hover:scale-105 hover:bg-green-500 hover:text-white text-gray-800 dark:text-white font-bold">
							{t('home.main.explore')}
							<ArrowRight className="w-4 h-4 inline-block ml-2" />
						</button>
						<button className="md:min-w-[205px] w-auto flex justify-center items-center">
							{t('home.main.watch')}
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}