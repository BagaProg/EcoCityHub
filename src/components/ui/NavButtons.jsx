import LanguageSwitcher from './LanguageSwitcher';
import ThemeSwitcher from './ThemeSwitcher';
import LoginButton from './LoginButton';
import SideBarButton from './SideBarButton';

export default function NavButtons({ show, setShow }) {

	return (
		<div className="flex justify-end items-center md:gap-5">
			<LanguageSwitcher />
			<ThemeSwitcher />
			<LoginButton />
			<SideBarButton show={show} setShow={setShow} />
		</div>
	)
}