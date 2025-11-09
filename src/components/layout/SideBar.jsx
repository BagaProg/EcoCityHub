import { motion, AnimatePresence } from "motion/react";
import SideBarLinkButton from "../ui/SideBarLinkButton";
import { Leaf, XIcon, Home, User, ShoppingBag, NewspaperIcon, Globe2Icon, MapIcon, Briefcase, Car, HeadphonesIcon, Globe, LogOut } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

export default function SideBar({ show, setShow }) {
	const { t } = useTranslation();
	useEffect(() => {
		if (show) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}
		return () => {
			document.body.style.overflow = "auto";
		};
	}, [show]);

	return (
		<>
			<AnimatePresence>
				{show && (
					<motion.aside
						className="flex flex-col gap-5 w-[350px] p-6 fixed right-0 top-0 z-20 h-full bg-gray-50 dark:bg-[#1a2230] shadow-sm shadow-gray-600/50 dark:shadow-gray-950 overflow-y-auto"
						initial={{ opacity: 0, x: 100 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: 100 }}
						transition={{ duration: 0.2 }}
					>
						<div className="flex justify-between items-stretch">
							<div className="flex flex-col gap-1 w-full items-center pt-4">
								<Leaf className={`w-7 h-7 mb-[10px] text-green-500 dark:text-green-400`} />
								<p className="text-gray-800 dark:text-white font-semibold text-[18px] ">{t('sidebar.navigation')}</p>
								<p className="text-gray-800 dark:text-white font-normal monsterrat text-[16px] opacity-70">{t('sidebar.sidebarTitle')}</p>
							</div>
							<button className="mt-6 hover:bg-gray-300/60 dark:hover:bg-gray-700/60 duration-150 w-[35px] h-[35px] flex justify-center items-center aspect-square rounded-full" onClick={() => setShow(!show)}><XIcon /></button>
						</div>
						<div className="flex flex-col gap-4">
							<SideBarLinkButton
								icon={<Home className="w-[20px] h-[20px] text-gray-800 dark:text-white" />}
								title={t('sidebar.home')}
								subtitle={t('sidebar.homeSubtitle')}
								link={'/'}
								onClick={() => setShow(!show)}
							/>
							<SideBarLinkButton
								icon={<User className="w-[20px] h-[20px] text-gray-800 dark:text-white" />}
								title={t('sidebar.profile')}
								subtitle={t('sidebar.profileSubtitle')}
								link={'/profile'}
								onClick={() => setShow(!show)}
							/>
							<SideBarLinkButton
								icon={<ShoppingBag className="w-[20px] h-[20px] text-gray-800 dark:text-white" />}
								title={t('sidebar.ecoMarket')}
								subtitle={t('sidebar.ecoMarketSubtitle')}
								link={''}
								onClick={() => setShow(!show)}
							/>
							<SideBarLinkButton
								icon={<NewspaperIcon className="w-[20px] h-[20px] text-gray-800 dark:text-white" />}
								title={t('sidebar.ecoNews')}
								subtitle={t('sidebar.ecoNewsSubtitle')}
								link={''}
								onClick={() => setShow(!show)}
							/>
							<SideBarLinkButton
								icon={<Globe2Icon className="w-[20px] h-[20px] text-gray-800 dark:text-white" />}
								title={t('sidebar.ecoCause')}
								subtitle={t('sidebar.ecoCauseSubtitle')}
								link={''}
								onClick={() => setShow(!show)}
							/>
							<SideBarLinkButton
								icon={<MapIcon className="w-[20px] h-[20px] text-gray-800 dark:text-white" />}
								title={t('sidebar.ecoMaps')}
								subtitle={t('sidebar.ecoMapsSubtitle')}
								link={'/map'}
								onClick={() => setShow(!show)}
							/>
							<SideBarLinkButton
								icon={<Briefcase className="w-[20px] h-[20px] text-gray-800 dark:text-white" />}
								title={t('sidebar.ecoJobs')}
								subtitle={t('sidebar.ecoJobsSubtitle')}
								link={''}
								onClick={() => setShow(!show)}
							/>
							<SideBarLinkButton
								icon={<Car className="w-[20px] h-[20px] text-gray-800 dark:text-white" />}
								title={t('sidebar.ecoCar')}
								subtitle={t('sidebar.ecoCarSubtitle')}
								link={''}
								onClick={() => setShow(!show)}
							/>
							<SideBarLinkButton
								icon={<HeadphonesIcon className="w-[20px] h-[20px] text-gray-800 dark:text-white" />}
								title={t('sidebar.support')}
								subtitle={t('sidebar.supportSubtitle')}
								link={''}
								onClick={() => setShow(!show)}
							/>
							<hr className='text-gray-800 dark:text-gray-500 my-[10px]' />
							<SideBarLinkButton
								icon={<LogOut className="w-[20px] h-[20px] text-white" />}
								title={t('sidebar.exit')}
								subtitle={t('sidebar.exitSubtitle')}
								link={'/login'}
								isExitButton={true}
								onClick={() => {
									setShow(!show)
									localStorage.removeItem("token");
									localStorage.removeItem("user");
									window.location.reload();
								}}
							/>
						</div>
						<hr className='text-gray-800 dark:text-gray-500 mt-[5px]' />
						<div className="flex flex-col gap-2 items-center">
							<Globe className="w-[30px] h-[30px] text-gray-800 dark:text-white" />
							<p className="text-center text-gray-800 dark:text-white font-normal monsterrat text-[16px] opacity-70">{t('sidebar.sidebarSubtitle')}</p>
						</div>
					</motion.aside>
				)}
			</AnimatePresence>
			<AnimatePresence>
				{show && (
					<motion.div
						className="fixed inset-0 z-10 bg-black/30 backdrop-blur-sm"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
						onClick={() => setShow(false)}
					/>
				)}
			</AnimatePresence>
		</>
	)
}