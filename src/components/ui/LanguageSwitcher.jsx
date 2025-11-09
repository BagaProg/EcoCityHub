import DropDown from "./DropDown";
import { Globe } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
	const { i18n } = useTranslation();
	const changeLanguage = (lang) => {
		i18n.changeLanguage(lang)
	};

	const currentLanguage = () => {
		if (i18n.language === "en") return "English";
		if (i18n.language === "ru") return "Русский";
		if (i18n.language === "kz") return "Қазақша";
	};

	return (
		<div className="relative flex justify-end items-center gap-1 sm:px-3 sm:py-2 p-1.5 sm:min-w-[120px] rounded-4xl 
		hover:bg-gray-200 dark:hover:bg-gray-800 duration-150 text-gray-700 dark:text-white">
			<Globe className="w-5 h-5" color="gray" />
			<DropDown
				text={currentLanguage()}
				items={[
					["English", () => changeLanguage("en"), i18n.language === "en"],
					["Русский", () => changeLanguage("ru"), i18n.language === "ru"],
					["Қазақша", () => changeLanguage("kz"), i18n.language === "kz"],
				]}
			/>
		</div>
	)
}
