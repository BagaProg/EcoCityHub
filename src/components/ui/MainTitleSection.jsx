export default function MaintitleSection({ title, description, content }) {

	return (
		<div className="mx-auto flex flex-col">
			<p className="text-gray-700 dark:text-white text-[46px] tracking-wide text-center font-bold">{title}</p>
			<p className="max-w-[70%] mx-auto text-gray-800 dark:text-white opacity-70 text-[20px] text-center">{description}</p>
			{content}
		</div>
	)
}