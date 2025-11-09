import SectionTitle from "./SectionTitle";
import ProblemCard from "./ProblemCard";
import { useTranslation } from "react-i18next";
import { AlertTriangle, Droplet, Zap, Recycle } from "lucide-react"

export default function HomeProblemSection() {
	const { t } = useTranslation();

	return (
		<div className="dark:bg-[#1a2331] bg-white mt-[98px] duration-150">
			<div className="container py-20">
				<SectionTitle title={t('home.titles.problemsTitle.title')} subtitle={t('home.titles.problemsTitle.subtitle')} />
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-stretch justify-between gap-4 mt-[50px]">
					<ProblemCard
						icon={<AlertTriangle className="w-15 h-15 bg-red-500/10 rounded-2xl p-2 text-red-500" />}
						title={t('home.problems.climate.title')}
						subtitle={t('home.problems.climate.description')}
						option={t('home.problems.climate.stat')}
						subOption={t('home.problems.climate.statLabel')}
						customColor={'red'}
					/>
					<ProblemCard
						icon={<Droplet className="w-15 h-15 bg-blue-500/10 rounded-2xl p-2 text-blue-500" />}
						title={t('home.problems.water.title')}
						subtitle={t('home.problems.water.description')}
						option={t('home.problems.water.stat')}
						subOption={t('home.problems.water.statLabel')}
						customColor={'blue'}
					/>
					<ProblemCard
						icon={<Zap className="w-15 h-15 bg-orange-500/10 rounded-2xl p-2 text-orange-500" />}
						title={t('home.problems.energy.title')}
						subtitle={t('home.problems.energy.description')}
						option={t('home.problems.energy.stat')}
						subOption={t('home.problems.energy.statLabel')}
						customColor={'orange'}
					/>
					<ProblemCard
						icon={<Recycle className="w-15 h-15 bg-purple-500/10 rounded-2xl p-2 text-purple-500" />}
						title={t('home.problems.waste.title')}
						subtitle={t('home.problems.waste.description')}
						option={t('home.problems.waste.stat')}
						subOption={t('home.problems.waste.statLabel')}
						customColor={'purple'}
					/>
				</div>
			</div>
		</div>
	)
}