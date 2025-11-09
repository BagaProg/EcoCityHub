import MenuButton from "./MenuButton";
import { Sun, Moon } from "lucide-react";
import { useState } from "react";

export default function ThemeSwitcher() {
	let [icon, setIcon] = useState('moon');

	return (
		<>
			<MenuButton
				Icon={icon === 'moon' ? <Moon className="w-5 h-5 sm:-mr-2" color="gray" /> : <Sun className="w-5 h-5 sm:-mr-2" color="gray" />}
				text={''}
				anotherStyle={false}
				onClick={() => {
					if (icon === 'moon') {
						setIcon('sun');
					} else {
						setIcon('moon');
					}
					const html = document.getElementById('html');
					html.classList.toggle('dark');
					localStorage.setItem("theme", "light");
				}}
			/>
		</>
	)
}