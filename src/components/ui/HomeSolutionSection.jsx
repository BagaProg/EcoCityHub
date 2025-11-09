import SectionTitle from "./SectionTitle";
import { useTranslation } from "react-i18next";
import LinkSolutionButton from "./LinkSolutionButton";
import { ShoppingBag, MapIcon, Briefcase, Car } from "lucide-react";
import EcoCityHubPhoto from "../../assets/images/EcoCityHub.png"

export default function HomeSolutionSection() {
	const { t } = useTranslation();

	return (
		<div className="container py-10 mt-[45px]">
			<SectionTitle title={t('home.titles.solutionsTitle.title')} subtitle={t('home.titles.solutionsTitle.subtitle')} />
			<div className="flex lg:flex-row items-center justify-between gap-10 mt-[50px] flex-col">
				<div className="group w-100% lg:w-1/2 rounded-xl overflow-hidden shadow-lg shadow-black/40">
					<img
						className="group-hover:scale-105 duration-200 w-full"
						src={EcoCityHubPhoto} alt="" />
				</div>
				<div className="w-100% lg:w-1/2 flex flex-col gap-6">
					<LinkSolutionButton
						link={''}
						icon={<ShoppingBag className="min-w-[45px] min-h-[45px] bg-green-500/10 rounded-2xl p-2 text-green-500" />}
						title={t('home.solutions.shop.title')}
						subtitle={t('home.solutions.shop.description')}
					/>
					<LinkSolutionButton
						link={'/map'}
						icon={<MapIcon className="min-w-[45px] min-h-[45px] bg-blue-500/10 rounded-2xl p-2 text-blue-500" />}
						title={t('home.solutions.maps.title')}
						subtitle={t('home.solutions.maps.description')}
					/>
					<LinkSolutionButton
						link={''}
						icon={<Briefcase className="min-w-[45px] min-h-[45px] bg-purple-500/10 rounded-2xl p-2 text-purple-500" />}
						title={t('home.solutions.freelance.title')}
						subtitle={t('home.solutions.freelance.description')}
					/>
					<LinkSolutionButton
						link={''}
						icon={<Car className="min-w-[45px] min-h-[45px] bg-red-500/10 rounded-2xl p-2 text-red-500" />}
						title={t('home.solutions.car.title')}
						subtitle={t('home.solutions.car.description')}
					/>
				</div>
			</div>
		</div>
	)
}