import { CameraIcon, Edit, Settings, Award, Crown, Leaf, Wallet, DollarSign, Zap, Star, Trophy, Shield, Heart, TrendingUp, X, Globe, File } from "lucide-react";
import { useTranslation } from "react-i18next";
import ImpactSection from "../ui/ImpactSection";
import RecentActivityBlocks from "../ui/RecentActivityBlocks";
import Badges from "../ui/Badges";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Webcam from "react-webcam";

export default function MainProfile() {
	const { t } = useTranslation();
	const [profile, setProfile] = useState({});
	const [showCamera, setShowCamera] = useState(false);
	const webcamRef = useRef(null);
	const user = JSON.parse(localStorage.getItem("user"));
	const userId = user?.id;

	useEffect(() => {
		if (!userId) {
			console.error("❌ userId not found in localStorage");
			return;
		}
		axios
			.get(`${import.meta.env.VITE_API_URL}/api/profile/${userId}`)
			.then((res) => setProfile(res.data))
			.catch((err) => console.error("❌ Failed to load profile:", err));
	}, [userId]);

	const handleAvatarChange = async (e) => {
		if (!userId) return;
		const file = e.target.files[0];
		if (!file) return;
		try {
			const formData = new FormData();
			formData.append("avatar", file);
			const res = await axios.post(
				`${import.meta.env.VITE_API_URL}/api/profile/avatar/${userId}`,
				formData,
				{ headers: { "Content-Type": "multipart/form-data" } }
			);
			const newAvatarUrl = res.data.url;
			setProfile((prev) => ({ ...prev, avatar: newAvatarUrl }));
			await axios.put(`${import.meta.env.VITE_API_URL}/api/profile/${userId}`, {
				avatar: newAvatarUrl,
			});
			window.location.reload();
		} catch (err) {
			console.error("❌ Avatar upload failed:", err);
		}
	};

	const capturePhoto = async () => {
		if (!userId) return;
		try {
			const imageSrc = webcamRef.current.getScreenshot();
			const blob = await fetch(imageSrc).then((res) => res.blob());
			const formData = new FormData();
			formData.append("avatar", blob, "photo.png");
			const res = await axios.post(
				`${import.meta.env.VITE_API_URL}/api/profile/avatar/${userId}`,
				formData,
				{ headers: { "Content-Type": "multipart/form-data" } }
			);
			const newAvatarUrl = res.data.url;
			setProfile((prev) => ({ ...prev, avatar: newAvatarUrl }));
			setShowCamera(false);
			await axios.put(`${import.meta.env.VITE_API_URL}/api/profile/${userId}`, {
				avatar: newAvatarUrl,
			});
			window.location.reload();
		} catch (err) {
			console.error("❌ Capture error:", err);
		}
	};

	return (
		<div className="dark:bg-gray-900 bg-white py-[150px]">
			<div className="container ">
				<div className="flex flex-col gap-3 lg:mx-20 m-0 p-6 py-10 shadow-lg rounded-2xl shadow-gray-600/20 dark:shadow-gray-950/60 border border-gray-500/20">
					<div className="lg:flex gap-4 block items-center justify-between">
						<div className="relative inline-block">
							<img
								src={profile.avatar || "https://placehold.co/140x140?text=Avatar"}
								alt="Profile avatar"
								className="mb-[10px] lg:mb-0 min-w-[140px] min-h-[140px] max-w-[140px] max-h-[140px] rounded-full object-cover border-4 border-white shadow-sm shadow-gray-600/40 dark:shadow-transparent"
							/>
							<div className="absolute -bottom-0.5 right-0 flex justify-between gap-2">
								<label htmlFor="avatarInput" className="mt-[15px] w-7 h-7 flex justify-center items-center p-1 shadow-md cursor-pointer hover:scale-110 duration-150 rounded-full bg-white dark:bg-gray-800">
									<File className="text-gray-800 dark:text-white" />
								</label>
								<button
									onClick={() => setShowCamera(true)}
									className="w-7 h-7 flex justify-center items-center p-1 shadow-md cursor-pointer hover:scale-110 duration-150 rounded-full bg-white dark:bg-gray-800"
									title="Open camera"
								>
									<CameraIcon className=" text-gray-800 dark:text-white" />
								</button>
							</div>

							<input
								id="avatarInput"
								type="file"
								accept="image/*"
								className="hidden"
								onChange={handleAvatarChange}
							/>
						</div>
						{showCamera && (
							<div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center z-50 px-[10px]">
								<div className="bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-lg flex flex-col items-center gap-4">
									<Webcam
										audio={false}
										ref={webcamRef}
										screenshotFormat="image/png"
										className="rounded-xl border-2 border-gray-300"
										videoConstraints={{ facingMode: "user" }}
									/>
									<div className="flex gap-4">
										<button
											onClick={capturePhoto}
											className="flex justify-around items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-xl duration-150 font-semibold hover:bg-green-600"
										>
											<CameraIcon size={16} />
											<p>Capture</p>
										</button>
										<button
											onClick={() => setShowCamera(false)}
											className="justify-around bg-gray-400 dark:bg-gray-500 text-white px-4 py-2 rounded-xl font-semibold hover:bg-gray-500 dark:hover:bg-gray-600 duration-150 flex items-center gap-2"
										>
											<X size={16} />
											<p>Cancel</p>
										</button>
									</div>
								</div>
							</div>
						)}
						<div className="flex flex-col gap-3 w-full">
							<div className="md:flex block items-center justify-between">
								<div>
									<p className="text-[30px] text-gray-800 dark:text-white font-bold">{profile.full_name || "User"}</p>
									<p className="text-[18px] text-gray-800 dark:text-white font-normal">{profile.tag || "@bagaprog"}</p>
									<p className="text-[16px] text-gray-800 dark:text-white font-normal opacity-80 monsterrat mt-[5px]">
										Member since March 2024
									</p>
								</div>
								<div className="flex gap-6 mt-[5px] md:mt-0">
									<button className="flex items-center gap-2 border border-gray-500/30 p-2 rounded-2xl hover:bg-gray-200 dark:hover:bg-gray-700 duration-150">
										<Edit className="w-[18px] h-[18px] text-gray-800 dark:text-white" />
										<p>Edit Profile</p>
									</button>
									<button className="border border-gray-500/30 p-2 px-3 rounded-2xl hover:bg-gray-200 dark:hover:bg-gray-700 duration-150">
										<Settings className="w-[18px] h-[18px] text-gray-800 dark:text-white" />
									</button>
								</div>
							</div>
							<div className="flex flex-col gap-2">
								<div className="flex justify-between items-center">
									<p className="monsterrat opacity-80">{t("account.profileCompleteness")}</p>
									<p>80%</p>
								</div>
								<div className="w-full overflow-hidden bg-green-200 dark:bg-green-700/50 h-[8px] rounded-xl">
									<div className="w-[80%] h-[8px] bg-green-500"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="block gap-9 items-start mt-[50px] lg:mx-20 m-0 xl:flex">
					<div className="flex flex-col gap-10 xl:w-[30%] w-full">
						{/*  */}
						<div className="flex flex-col gap-12 rounded-2xl p-5 shadow-lg shadow-gray-600/20 dark:shadow-gray-950/60 border border-gray-500/20">
							<div className="flex items-center gap-2">
								<Trophy className="w-[20px] h-[20px] text-gray-800 dark:text-white" />
								<p className="text-gray-800 dark:text-white text-[16px]">Eco Level & Rank</p>
							</div>
							<div className="mx-auto text-center flex flex-col gap-8">
								<Crown className="w-[40px] h-[40px] mx-auto text-gray-800 dark:text-white" />
								<div className="mx-auto flex flex-col gap-1">
									<p className="text-gray-800 dark:text-white text-center text-[24px] font-bold">Level 12</p>
									<p className="text-gray-800 dark:text-white text-center monsterrat opacity-70">{t('account.ecoDriver')}</p>
									<p className="text-gray-800 dark:text-white text-center text-[14px] monsterrat mt-[10px]">Global Rank #4</p>
								</div>
								<div className="flex flex-col gap-2">
									<p className="text-[18px] font-bold">3420</p>
									<p className="text-[14px] tracking-wide opacity-80">EcoPoints</p>
								</div>
							</div>
							<div className="flex flex-col gap-2">
								<p className="text center text-gray-800 dark:text-white text-center opacity-75">210 points to Level 13</p>
								<div className="w-full overflow-hidden bg-green-200 dark:bg-green-700/50 h-[8px] rounded-xl">
									<div className="w-[80%] h-[8px] bg-green-500"></div>
								</div>
							</div>
						</div>
						{/*  */}
						<div className="dark:bg-gray-800 bg-white flex flex-col gap-4 rounded-2xl p-5 shadow-lg shadow-gray-600/20 dark:shadow-gray-950/60 border border-gray-500/20">
							<div className="flex items-center gap-2">
								<Leaf className="w-[20px] h-[20px] text-gray-800 dark:text-white" />
								<p className="text-gray-800 dark:text-white text-[16px]">Environmental Impact</p>
							</div>
							<div className="flex flex-col gap-5 px-2">
								<ImpactSection
									icon={'🌍'}
									title={'CO₂ Saved'}
									description={'4520 kg'}
									customBgColor={'bg-green-500/10'}
									customTextColor={'text-green-600 dark:text-green-400'}
								/>
								<ImpactSection
									icon={'🌳'}
									title={'Trees planted'}
									description={'23'}
									customBgColor={''}
									customTextColor={'text-gray-800 dark:text-white'}
								/>
								<ImpactSection
									icon={'⚡'}
									title={'Energy Saved'}
									description={'1850 kWh'}
									customBgColor={'bg-blue-500/10'}
									customTextColor={'text-blue-600 dark:text-blue-400'}
								/>
							</div>
						</div>
						{/*  */}
						<div className="dark:bg-gray-800 bg-white flex flex-col gap-10 rounded-2xl p-5 shadow-lg shadow-gray-600/20 dark:shadow-gray-950/60 border border-gray-500/20">
							<div className="flex items-center gap-2">
								<Wallet className="w-[20px] h-[20px] text-gray-800 dark:text-white" />
								<p className="text-gray-800 dark:text-white text-[16px]">Wallet Balance</p>
							</div>
							<div className="mx-auto text-center flex flex-col">
								<p className="text-[30px] font-bold text-gray-800 dark:text-white">$1267.30</p>
								<p className="text-gray-800 dark:text-white opacity-70">Available Balance</p>
							</div>
							<div className="flex items-start justify-between px-5">
								<div className="flex flex-col gap-2">
									<p className="text-[14px] opacity-60">EcoPoints Value</p>
									<p className="text-[12px] opacity-60">3420 points × $0.01 each</p>
								</div>
								<p className="text-gray-700 dark:text-white font-bold">
									$34.20
								</p>
							</div>
							<div className="flex gap-2 items-center">
								<button className="w-1/2 flex items-center justify-center gap-2 bg-green-500 dark:bg-green-400 p-2 rounded-3xl hover:bg-green-600 dark:hover:bg-green-500 duration-150">
									<DollarSign className="w-[18px] h-[18px] text-white" />
									<p className="text-white">Add Funds</p>
								</button>
								<button className="w-1/2 flex items-center justify-center border border-gray-500/30 gap-2 p-2 rounded-3xl hover:bg-gray-200 dark:hover:bg-gray-700 duration-150">
									<Zap className="w-[18px] h-[18px] text-gray-800 dark:text-white" />
									<p className="text-gray-800 dark:text-white">Redeem Points</p>
								</button>
							</div>
						</div>
						{/*  */}
						<div className="dark:bg-gray-800 bg-white flex flex-col gap-10 rounded-2xl p-5 shadow-lg shadow-gray-600/20 dark:shadow-gray-950/60 border border-gray-500/20">
							<div className="flex items-center gap-2">
								<Star className="w-[20px] h-[20px] text-gray-800 dark:text-white" />
								<p className="text-gray-800 dark:text-white text-[16px]">Resent Activity</p>
							</div>
							<div className="flex flex-col gap-4">
								<RecentActivityBlocks
									title={'Purchased eco-friendly bamboo toothbrush'}
									time={'2 hours ago'}
									ecoPoints={'+15 EcoPoints'}
								/>
								<hr className="text-gray-500/30" />
								<RecentActivityBlocks
									title={'Completed Carbon Footprint Assessment'}
									time={'1 day ago'}
									ecoPoints={'+50 EcoPoints'}
								/>
								<hr className="text-gray-500/30" />
								<RecentActivityBlocks
									title={'Shared petition for ocean cleanup'}
									time={'3 days ago'}
									ecoPoints={'+10 EcoPoints'}
								/>
								<hr className="text-gray-500/30" />
								<RecentActivityBlocks
									title={'Used car sharing service'}
									time={'5 days ago'}
									ecoPoints={'+25 EcoPoints'}
								/>
							</div>
						</div>
					</div>
					<div className="xl:w-[70%] w-full dark:bg-gray-800 gap-12 bg-white flex flex-col lg:mt-0 mt-[20px] rounded-2xl p-5 shadow-lg shadow-gray-600/20 dark:shadow-gray-950/60 border border-gray-500/20">
						<div className="">
							<div className="flex items-center gap-2">
								<Award className="w-[20px] h-[20px] text-gray-800 dark:text-white" />
								<p className="text-gray-800 dark:text-white text-[16px]">Achievements & Badges</p>
							</div>
							<p className="text-gray-800 dark:text-white opacity-60 font-normal mt-[8px]">Track your environmental impact and unlock rewards</p>
						</div>
						<div className="">
							<div className="flex items-center gap-2">
								<Trophy className="w-[20px] h-[20px] text-yellow-300" />
								<p className="text-gray-800 dark:text-white text-[16px] font-bold">Earned Achievements (6)</p>
							</div>
							{/*  */}
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-[15px]">
								<Badges
									isEarned={true}
									icon={<Shield className="w-[20px] h-[20px] text-green-600" />}
									iconBgColor={'bg-green-500/10'}
									title={'Eco Shopper'}
									description={'Made 10 sustainable purchases'}
									time={'Earned March 15, 2023'}
									progress={''}
								/>
								<Badges
									isEarned={true}
									icon={<Heart className="w-[20px] h-[20px] text-blue-600" />}
									iconBgColor={'bg-blue-500/10'}
									title={'Cleaner'}
									description={'Participated in 3 eco-cleanup events'}
									time={'Earned April 2, 2023'}
									progress={''}
								/>
								<Badges
									isEarned={true}
									icon={<TrendingUp className="w-[20px] h-[20px] text-blue-600" />}
									iconBgColor={'bg-blue-500/10'}
									title={'Eco Driver'}
									description={'Drive electric car efficiently for 1000km'}
									time={'Earned May 18, 2023'}
									progress={''}
								/>
								<Badges
									isEarned={true}
									icon={<DollarSign className="w-[20px] h-[20px] text-green-600" />}
									iconBgColor={'bg-green-500/10'}
									title={'Green Investor'}
									description={'Supported 5 crowdfunding campaigns'}
									time={'Earned June 30, 2023'}
									progress={''}
								/>
								<Badges
									isEarned={true}
									icon={<Leaf className="w-[20px] h-[20px] text-green-700" />}
									iconBgColor={'bg-green-500/10'}
									title={'Tree Hugger'}
									description={'Planted 20 trees through platform'}
									time={'Earned July 12, 2023'}
									progress={''}
								/>
								<Badges
									isEarned={true}
									icon={<Globe className="w-[20px] h-[20px] text-purple-600" />}
									iconBgColor={'bg-purple-500/10'}
									title={'Climate Warrior'}
									description={'Save 5000kg of CO₂ emissions'}
									time={'Earned August 25, 2023'}
									progress={''}
								/>
							</div>
							<hr className="my-[15px] text-gray-500/30" />
							<div className="flex items-center gap-2">
								<TrendingUp className="w-[20px] h-[20px] text-blue-300" />
								<p className="text-gray-800 dark:text-white text-[16px] font-bold">In Progress (4)</p>
							</div>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-[15px]">
								<Badges
									isEarned={false}
									icon={<Zap className="w-[20px] h-[20px] text-yellow-600" />}
									iconBgColor={'bg-yellow-500/10'}
									title={'Energy Master'}
									description={'Save 2000kWh of energy'}
									time={''}
									progress={'92%'}
								/>
								<Badges
									isEarned={false}
									icon={<Award className="w-[20px] h-[20px] text-orange-600" />}
									iconBgColor={'bg-orange-500/10'}
									title={'Sustainability Expert'}
									description={'Complete all eco-challenges'}
									time={''}
									progress={'73%'}
								/>
								<Badges
									isEarned={false}
									icon={<Crown className="w-[20px] h-[20px] text-blue-600" />}
									iconBgColor={'bg-blue-500/10'}
									title={'Community Leader'}
									description={'Rank in top 10 for 3 months'}
									time={''}
									progress={'33%'}
								/>
								<Badges
									isEarned={false}
									icon={<Trophy className="w-[20px] h-[20px] text-yellow-600" />}
									iconBgColor={'bg-yellow-500/10'}
									title={'Eco Legend'}
									description={'Achieve 10,000 total EcoPoints'}
									time={''}
									progress={'34%'}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
