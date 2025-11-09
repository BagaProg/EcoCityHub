import MenuButton from "./MenuButton";
import { Menu } from "lucide-react";

export default function SideBarButton({ show, setShow }) {

	return (
		<>
			<MenuButton
				Icon={<Menu className="w-5 h-5 sm:-mr-2" color="gray" />}
				text={''}
				customStyle={false}
				onClick={() => setShow(!show)}
			/>
		</>
	)
}