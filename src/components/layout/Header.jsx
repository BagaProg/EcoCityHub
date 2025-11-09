import Logo from '../ui/Logo';
import NavButtons from '../ui/NavButtons';

export default function Header({ show, setShow }) {
	return (
		<header className="w-full h-[84px] fixed top-0 left-0 
			bg-white/70 dark:bg-[#141a25]/70 
			backdrop-blur-sm shadow-md z-10
			text-gray-900 dark:text-white">
			<div className="container">
				<div className="flex justify-between items-center">
					<Logo />
					<NavButtons show={show} setShow={setShow} />
				</div>
			</div>
		</header>
	)
}
