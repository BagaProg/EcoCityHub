import SectionTitle from './SectionTitle';
import { useTranslation } from 'react-i18next';
import DescriptionBlock from './DescriptionBlock';
import { Users, Target, Medal } from 'lucide-react';

export default function HomeAboutSection() {
	const { t } = useTranslation();

	return (
		<div className="dark:bg-gradient-to-b dark:from-[#1f2939] from-[transparent] to-[transparent] dark:to-[#202b3d] mt-[98px] duration-150">
			<div className="container py-20">
				<SectionTitle title={t('home.titles.howItWorksTitle.title')} subtitle={t('home.titles.howItWorksTitle.subtitle')} />
				<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-y-15 gap-3 last:mx-auto justify-between items-stretch mt-[70px]">
					<DescriptionBlock
						icon={<Users className='min-w-[35px] min-h-[35px] text-gray-800 mx-auto dark:text-white' />}
						title={t('home.howItWorks.step1.title')}
						description={t('home.howItWorks.step1.description')}
					/>
					<DescriptionBlock
						icon={<Target className='min-w-[35px] min-h-[35px] text-gray-800 mx-auto dark:text-white' />}
						title={t('home.howItWorks.step2.title')}
						description={t('home.howItWorks.step2.description')}
					/>
					<DescriptionBlock
						icon={<Medal className='min-w-[35px] min-h-[35px] text-gray-800 mx-auto dark:text-white' />}
						title={t('home.howItWorks.step3.title')}
						description={t('home.howItWorks.step3.description')}
					/>
				</div>
			</div>
		</div>
	)
}