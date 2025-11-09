import { useTranslation } from 'react-i18next';
import { Leaf } from 'lucide-react';

export default function Logo({ customStyle }) {
	const { t } = useTranslation();

	return (
		<div className="flex items-center justify-start gap-3 py-[10px]">
			<Leaf className={`w-7 h-7 text-green-500 dark:text-green-400 ${customStyle ? 'rounded-full w-12 h-12 p-3 shadow shadow-gray-600/50 dark:text-shadow-gray-950/50' : ''}`} />
			<div className="dark:text-white text-gray-800">
				<p className='sm:text-[28px] text-[22px] text-bold tracking-wide'>EcoCityHub</p>
				<p className={`monsterrat text-[14px] ${customStyle ? 'block' : ' sm:block hidden'} opacity-50 tracking-wide mt-[-5px]`}>{t('header.subtitle')}</p>
			</div>
		</div>
	)
}