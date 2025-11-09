import { Star } from "lucide-react";

export default function ReviewBlock({ stars, text, personAvatar, personName, personRole }) {

	return (
		<div className="hover:scale-103 duration-150 flex flex-col justify-between gap-2 p-4 rounded-2xl shadow-md border border-gray-500/20 shadow-gray-600/20 dark:shadow-gray-950/50 bg-white dark:bg-gray-800">
			<div className="flex flex-col gap-3">
				<div className="flex gap-0.5 justify-start items-center">
					{Array.from({ length: 5 }, (_, i) => (
						<Star
							key={i}
							size={24}
							className="text-yellow-500"
							fill={i < stars ? "currentColor" : "none"}
						/>
					))}
				</div>
				<p className="text-gray-800 dark:text-white opacity-50 text-[16px] sm:text-[20px] monsterrat">" {text} "</p>
			</div>
			<div className="flex items-center justify-start gap-4">
				<img className="aspect-square object-cover w-[50px] h-[50px] rounded-full" src={personAvatar} alt="Text" />
				<div className="">
					<p className="text-gray-800 text-[20px] sm:text-[24px] tracking-wide mx-auto dark:text-white">{personName}</p>
					<p className="text-gray-800 dark:text-white opacity-50 text-[16px] monsterrat">{personRole}</p>
				</div>
			</div>
		</div>
	)
}