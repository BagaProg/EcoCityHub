import Logo from '../ui/Logo';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Mail, Phone, LocationEdit } from 'lucide-react';
import InputBlock from '../ui/InputBlock';

export default function Footer() {
	const { t } = useTranslation();

	return (
		<footer className="dark:bg-gray-900 bg-white">
			<div className="container py-10 grid gap-y-12 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
				<div className="flex flex-col gap-1 pr-[5px]">
					<Logo customStyle={true} />
					<p className='text-gray-800 dark:text-white text-[16px] w-[80%] monsterrat font-medium opacity-70'>{t('home.main.subtitle')}</p>
				</div>
				<div className="flex flex-col gap-1.5 pt-[12px] px-[5px]">
					<p className='mb-[10px] font-extrabold text-[18px] text-gray-800 dark:text-white'>Quick Links</p>
					<Link className='text-gray-800 dark:text-gray-300 dark:hover:text-white hover:text-gray-800 duration-150 dark:opacity-100 opacity-80' to=''>EcoMarket</Link>
					<Link className='text-gray-800 dark:text-gray-300 dark:hover:text-white hover:text-gray-800 duration-150 dark:opacity-100 opacity-80' to=''>EcoNews</Link>
					<Link className='text-gray-800 dark:text-gray-300 dark:hover:text-white hover:text-gray-800 duration-150 dark:opacity-100 opacity-80' to=''>EcoMaps</Link>
					<Link className='text-gray-800 dark:text-gray-300 dark:hover:text-white hover:text-gray-800 duration-150 dark:opacity-100 opacity-80' to=''>EcoFreelance</Link>
					<Link className='text-gray-800 dark:text-gray-300 dark:hover:text-white hover:text-gray-800 duration-150 dark:opacity-100 opacity-80' to=''>EcoCarHub</Link>
				</div>
				<div className="flex flex-col gap-2  pt-[12px] px-[5px]">
					<p className="mb-[10px] font-extrabold text-[18px] text-gray-800 dark:text-white">Contact us</p>
					<p className='flex gap-1.5 items-center text-gray-800 dark:text-gray-300 duration-150 dark:opacity-100 opacity-80'>
						<Mail className='w-[18px] h-[18px] text-gray-800 dark:text-gray-300' />
						hello@ecocityhub.com
					</p>
					<p className='flex gap-1.5 items-center text-gray-800 dark:text-gray-300 duration-150 dark:opacity-100 opacity-80'>
						<Phone className='w-[18px] h-[18px] text-gray-800 dark:text-gray-300' />
						+1 (555) 123-4567
					</p>
					<p className='flex gap-1.5 items-center text-gray-800 dark:text-gray-300 duration-150 dark:opacity-100 opacity-80'>
						<LocationEdit className='w-[18px] h-[18px] text-gray-800 dark:text-gray-300' />
						Taraz, Kazakhstan
					</p>
				</div>
				<div className="flex flex-col gap-4 pt-[12px] pl-[5px]">
					<p className="font-extrabold text-[18px] text-gray-800 dark:text-white">Stay Updated</p>
					<p className="text-gray-800 dark:text-white text-[16px] monsterrat font-medium opacity-70">{t('footer.getTheLatest')}</p>
					<InputBlock
						fields={[
							{ name: "email", label: '', placeholder: "Enter your email", type: "email" },
						]}
						name={'Subcribe'}
					/>
				</div>
			</div>
			<div className="container">
				<hr className='text-gray-800 dark:text-gray-500' />
			</div>
			<div className="container gap-3 mt-[10px] gapy-10 grid grid-cols-1 p-5 md:grid-cols-2">
				<p className="flex md:justify-start justify-center text-gray-800 dark:text-white">© 2025 EcoCityHub. All rights reserved. Made with 💚 for our planet.</p>
				<div className="flex gap-6 items-center md:justify-end justify-center">
					<Link className='text-gray-800 dark:text-gray-300 dark:hover:text-white hover:text-gray-800 duration-150 dark:opacity-100 opacity-80' to=''>Privacy Policy</Link>
					<Link className='text-gray-800 dark:text-gray-300 dark:hover:text-white hover:text-gray-800 duration-150 dark:opacity-100 opacity-80' to=''>Terms of Service</Link>
					<Link className='text-gray-800 dark:text-gray-300 dark:hover:text-white hover:text-gray-800 duration-150 dark:opacity-100 opacity-80' to=''>Cookie Policy</Link>
				</div>
			</div>
		</footer>
	)
}