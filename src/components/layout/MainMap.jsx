import MaintitleSection from "../ui/MainTitleSection";
import RadioButton from "../ui/RadioButton";
import { useTranslation } from "react-i18next";
import { useState, useEffect, } from "react";
import axios from "axios";
import { Cloud, AirVent, Leaf, AlertTriangle, Building, MapPin, Droplets, WindIcon, Cloudy, SunMedium } from "lucide-react";
import DropDown from "../ui/DropDown";
import i18next from "i18next";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function MainMap() {
	const { t } = useTranslation();
	const [tab, setTab] = useState("weather");
	const [userCity, setUserCity] = useState("taraz");
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState(null);
	const [airData, setAirData] = useState([]);
	const API_KEY = import.meta.env.VITE_OPENWEATHER_KEY;
	const cities = {
		taraz: { name: "Taraz", lat: 42.8977, lon: 71.388 },
		astana: { name: "Astana", lat: 51.1605, lon: 71.4704 },
		almaty: { name: "Almaty", lat: 43.222, lon: 76.8512 },
		shymkent: { name: "Shymkent", lat: 42.32, lon: 69.59 },
		london: { name: "London", lat: 51.5074, lon: -0.1278 },
		medina: { name: "Medina", lat: 24.470901, lon: 39.612236 },
		delhi: { name: "Delhi", lat: 28.679079, lon: 77.06971 },
	};
	const getDayOfWeek = (timestamp) => {
		const date = new Date(timestamp * 1000);
		const lang = i18next.language;
		const days = {
			en: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
			ru: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
			kz: ["Жексенбі", "Дүйсенбі", "Сейсенбі", "Сәрсенбі", "Бейсенбі", "Жұма", "Сенбі"],
		};
		return days[lang]?.[date.getDay()] || days.en[date.getDay()];
	};
	const currentCityName = () => cities[userCity]?.name || userCity;
	const [events, setEvents] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			setData(null);
			if (!API_KEY) {
				console.error("VITE_OPENWEATHER_KEY is not set. Check your .env");
				setLoading(false);
				return;
			}
			const { lat, lon } = cities[userCity];
			try {
				const [currentRes, forecastRes, airRes, uvRes] = await Promise.all([
					axios.get(
						`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=${i18next.language}`
					),
					axios.get(
						`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=${i18next.language}`
					),
					axios.get(
						`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
					),
					axios.get(
						`https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${API_KEY}`
					),
				]);
				const forecastList = forecastRes.data.list || [];
				const dayMap = {};

				forecastList.forEach((item) => {
					const date = new Date(item.dt * 1000);
					const day = date.toISOString().slice(0, 10);
					if (!dayMap[day])
						dayMap[day] = { min: item.main.temp_min, max: item.main.temp_max };
					else {
						dayMap[day].min = Math.min(dayMap[day].min, item.main.temp_min);
						dayMap[day].max = Math.max(dayMap[day].max, item.main.temp_max);
					}
				});

				const nextDays = Object.keys(dayMap)
					.slice(0, 4)
					.map((day) => ({
						date: day,
						min: Math.round(dayMap[day].min),
						max: Math.round(dayMap[day].max),
					}));
				const aqiValue = airRes.data.list?.[0]?.main.aqi || null;
				const uvIndex = uvRes.data.value;
				const uvText =
					uvIndex < 3
						? "bg-green-400"
						: uvIndex < 6
							? "bg-yellow-400"
							: uvIndex < 8
								? "bg-orange-400"
								: uvIndex < 11
									? "bg-red-400"
									: "bg-purple-400";

				setData({
					current: currentRes.data,
					forecast: nextDays,
					air: { aqi: aqiValue },
					uv: { value: uvIndex, text: uvText },
				});
			} catch (err) {
				console.error("Ошибка загрузки данных: ", err);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, [userCity, i18next.language, API_KEY]);

	useEffect(() => {
		const fetchAirData = async () => {
			try {
				const cityList = ["taraz", "astana", "almaty", "shymkent"];
				const requests = cityList.map((key) => {
					const { lat, lon } = cities[key];
					return axios.get(
						`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
					);
				});
				const responses = await Promise.all(requests);
				const formatted = responses.map((res, i) => {
					const aqi = res.data.list[0].main.aqi;
					const percent = getAirQualityPercent(aqi);
					return { city: cities[cityList[i]].name, aqi, percent };
				});
				setAirData(formatted);
			} catch (err) {
				console.error("Ошибка загрузки качества воздуха: ", err);
			}
		};
		fetchAirData();
	}, [API_KEY]);

	useEffect(() => {
		const fetchDisasters = async () => {
			try {
				const res = await fetch("http://localhost:5000/api/nasa/disasters");
				const json = await res.json();
				setEvents(Array.isArray(json) ? json : json.events || []);
			} catch (err) {
				console.error("Ошибка загрузки NASA катастроф:", err);
			}
		};
		fetchDisasters();
	}, []);

	const getAirQualityPercent = (aqi) => {
		const base = { 1: 100, 2: 80, 3: 60, 4: 40, 5: 20 }[aqi] ?? 0;
		const offset = Math.random() * 10 - 5;
		return Math.max(0, Math.min(100, base + offset));
	};
	if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
	if (!data) return <div className="min-h-screen flex items-center justify-center">Data Error</div>;

	const weather = data.current;
	const iconUrl = weather
		? `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
		: null;
	const CA_BOUNDS = {
		latMin: 35,
		latMax: 55,
		lonMin: 50,
		lonMax: 90
	};
	const isInCA = (coordinates) => {
		const [lon, lat] = coordinates;
		return (
			lat >= CA_BOUNDS.latMin &&
			lat <= CA_BOUNDS.latMax &&
			lon >= CA_BOUNDS.lonMin &&
			lon <= CA_BOUNDS.lonMax
		);
	};

	const eventsCA = events.filter(ev => {
		const geo = ev.geometry?.[ev.geometry.length - 1];
		return geo?.coordinates && isInCA(geo.coordinates);
	});

	const ecoPlaces = [
		{ name: "Парк им. Абая", category: "Парк", coords: [42.8977, 71.388], url: "https://shymkentsweettexas.com/wp-content/uploads/2017/09/Parc-Aba%C3%AF-Shymkent-Kazakhstan_Entr%C3%A9e-principale.jpg" },
		{ name: "Парк 1 мая", category: "Парк", coords: [42.9005, 71.392], url: "https://baq.kz/storage/cache_resize/news/2024/04/29/RYMWFkOzblwDMV8RVAOlImhqIryis2rJYDHBFs7U.jpg_width=1200Xheight=autoXtype=1.jpg" },
		{ name: "Эко-станция Тараз", category: "Перерабатывающая станция", coords: [42.899, 71.39], url: "https://lh5.googleusercontent.com/rY-SlwAg5u0jfuZGWxToOtEFqVa0FCDnd-SLWGowUFWIk7IVxVp4RPEoBWTgoWKk36wQTteQxUMSKXxtFIU2ODUBYRwpI7cE8N88kG5BfBNBGzlGlTXrVAWSqsKTgDOmTrPSXuuwZfzpH_qPrx4ggwkHKCstECADXbuDA8TEfHaKA9898t_4FJo81Un2oQ" },
		{ name: "Парк Победы", category: "Парк", coords: [42.896, 71.384], url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-CGd-abVgDpUPC0sLCwl2s21GHuEh7sJqqQ&s" },
		{ name: "Парк Центральный", category: "Парк", coords: [42.899, 71.385], url: "https://fototerra.ru/photo/Kazahstan/Taraz/image267923.jpg" },
		{ name: "Эко-магазин Recycle", category: "Эко-магазин", coords: [42.893, 71.386], url: "https://www.superstation.pro/content/images/2022/08/Greggs-1.jpg" },
		{ name: "Эко-кафе Green Leaf", category: "Эко-кафе", coords: [42.894, 71.389], url: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/19/56/c2/cd/green-leaf.jpg?w=1200&h=1200&s=1" },
		{ name: "Парк Молодежный", category: "Парк", coords: [42.892, 71.388], url: "https://www.samru.ru/content/Image/News/samara_news/news2023/molodezhnui.jpg" },
		{ name: "Эко-стоянка Solar Park", category: "Эко-стоянка", coords: [42.895, 71.390], url: "https://novate.ru/files/u4755/SolarGrove1.jpg" },
		{ name: "Парк Южный", category: "Парк", coords: [42.891, 71.387], url: "https://informburo.kz/storage/photos/176/main/intZMpwJseHzUOdON9uIZ7L1kzX5rc8VfmB2Qps1.jpg" },
		{ name: "Эко-магазин EcoMarket", category: "Эко-магазин", coords: [42.894, 71.385], url: "https://avatars.mds.yandex.net/get-altay/4054675/2a000001763ca35f97c7971a097418858c97/orig" },
		{ name: "Эко-кафе Nature", category: "Эко-кафе", coords: [42.897, 71.384], url: "https://www.beboss.ru/new/files/73/2d/naturalrestaurantinteriordesign12-qgg32k.1180x600.jpg" },
	];

	return (
		<div className="container mt-[150px] flex flex-col gap-10">
			<MaintitleSection
				title={t("sidebar.ecoMaps")}
				description={t("ecoMaps.ecoMapsTitle")}
			/>
			<div className="relative mx-auto flex justify-center items-center gap-1 sm:px-3 sm:py-2 p-1.5 w-[150px] rounded-4xl hover:bg-gray-200 dark:hover:bg-gray-900 duration-150 text-gray-700 dark:text-white">
				<Building className="w-5 h-5" color="gray" />
				<DropDown
					text={currentCityName()}
					items={[
						["Taraz", () => setUserCity("taraz"), userCity === "taraz"],
						["Astana", () => setUserCity("astana"), userCity === "astana"],
						["Almaty", () => setUserCity("almaty"), userCity === "almaty"],
						["Shymkent", () => setUserCity("shymkent"), userCity === "shymkent"],
						["London", () => setUserCity("london"), userCity === "london"],
						["Medina", () => setUserCity("medina"), userCity === "medina"],

					]}
					customStyle={true}
				/>
			</div>
			<RadioButton
				setTab={setTab}
				options={[
					{ id: "weather", text: "Weather", icon: <Cloud className="w-[18px] h-[18px]" /> },
					{ id: "airQuality", text: "Air Quality", icon: <AirVent className="w-[18px] h-[18px]" /> },
					{ id: "ecoPlaces", text: "Eco Places", icon: <Leaf className="w-[18px] h-[18px]" /> },
					{ id: "aiAlerts", text: "AI Alerts", icon: <AlertTriangle className="w-[18px] h-[18px]" /> },
				]}
			/>
			{tab === "weather" && (
				<div className="xl:flex block gap-4 justify-between">
					<div className="w-full xl:w-[60%] flex flex-col gap-10 rounded-2xl p-5 shadow-lg shadow-gray-600/20 dark:shadow-gray-950/60 border border-gray-500/20">
						<p className="flex items-center gap-3 text-gray-800 dark:text-white text-[18px] font-semibold">
							<MapPin className="w-[22px] h-[22px] text-gray-800 dark:text-white" />
							{t('ecoMaps.categories.weatherSection.currentWeather')} - {currentCityName()}
						</p>
						<div className="sm:flex blcok gap-2 ">
							<div className="w-full xl:w-[60%] flex flex-col items-center">
								<p className="text-[55px] font-bold text-gray-800 dark:text-white">
									{Math.round(weather.main.temp)}°C
								</p>
								<p className="capitalize text-gray-800 opacity-70 dark:text-white">
									{weather.weather[0].description}
								</p>
								{iconUrl && <img src={iconUrl} alt="weather icon" className="mx-auto" />}
							</div>
							<div className="w-full sm:mt-0 mt-[10px] xl:w-[40%] flex flex-col gap-4">
								<div className="flex justify-between items-center gap-2">
									<div className="flex gap-2 items-center">
										<Droplets className="w-[20px] h-[20px] text-blue-400" />
										<p className="text-gray-800 dark:text-white text-[18px]">{t('ecoMaps.categories.weatherSection.humidity')}</p>
									</div>
									<p className="text-gray-800 dark:text-white text-[18px]">{weather.main.humidity}%</p>
								</div>
								<div className="flex justify-between items-center gap-2">
									<div className="flex gap-2 items-center">
										<WindIcon className="w-[20px] h-[20px] text-gray-500" />
										<p className="text-gray-800 dark:text-white text-[18px]">{t('ecoMaps.categories.weatherSection.windSpeed')}</p>
									</div>
									<p className="text-gray-800 dark:text-white text-[18px]">
										{Math.round(weather.wind.speed)} m/s
									</p>
								</div>
								<div className="flex justify-between items-center gap-2">
									<div className="flex gap-2 items-center">
										<Cloudy className="w-[20px] h-[20px] text-gray-300" />
										<p className="text-[18px] text-gray-800 dark:text-white">{t('ecoMaps.categories.weatherSection.clouds')}</p>
									</div>
									<p className="text-[18px] text-gray-800 dark:text-white">{weather.clouds.all}%</p>
								</div>
								<div className="flex justify-between items-center gap-2 mt-3 border-t border-gray-400/20 pt-3">
									<div className="flex gap-2 items-center">
										<SunMedium className="w-[20px] h-[20px] text-yellow-400" />
										<p className="text-[18px] text-gray-800 dark:text-white">{t('ecoMaps.categories.weatherSection.uvIndex')}</p>
									</div>
									<p className={`${data.uv.text} p-1 px-3 rounded-4xl text-[18px] dark:text-white`}>
										{data.uv.value}
									</p>
								</div>
							</div>
						</div>
					</div>
					<div className="w-full xl:w-[40%] mt-[20px] xl:mt-0 flex flex-col gap-4 rounded-2xl p-5 shadow-lg shadow-gray-600/20 dark:shadow-gray-950/60 border border-gray-500/20">
						<p className="text-gray-800 dark:text-white text-[18px] font-semibold">{t('ecoMaps.categories.weatherSection.4dayForecast')}</p>
						<div className="flex flex-col ">
							{data.forecast.map((d, i) => (
								<div key={d.date} className={`${i !== 3 ? 'border-b border-gray-400/20' : ''} forecast-card flex justify-between items-center`}>
									<p className="text-[20px] text-gray-800 dark:text-white">{getDayOfWeek(new Date(d.date).getTime() / 1000)}</p>
									<div className="flex flex-col items-end gap-1 my-1">
										<p className="text-[20px] text-gray-800 dark:text-white tabular-nums">{Math.round(d.max)}°</p>
										<p className="text-[19px] text-gray-800 dark:text-white opacity-65 tabular-nums">{Math.round(d.min)}°</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			)}
			{tab === "airQuality" && (
				<div className="grid grid-cols-1 md:mb-[10px] md:grid-cols-2 gap-5">
					{airData.map((item) => {
						const color =
							item.percent < 30
								? "text-red-500"
								: item.percent < 60
									? "text-orange-500"
									: item.percent < 90
										? "text-yellow-500"
										: "text-green-500";
						const bgColor =
							item.percent < 30
								? "bg-red-500"
								: item.percent < 60
									? "bg-orange-500"
									: item.percent < 90
										? "bg-yellow-500"
										: "bg-green-500";
						return (
							<div
								key={item.city}
								className="shadow-lg rounded-2xl p-5 text-center border border-gray-400/20"
							>
								<p className="font-semibold text-[20px] text-gray-800 dark:text-white">{item.city}</p>
								<div className="mx-auto text-center my-[10px] flex flex-col text-gray-800 dark:text-white">
									<p className={`${color} text-[36px] font-bold`}>{item.percent.toFixed(1)}%</p>
									<p className="text-[14px] text-gray-700 dark:text-white opacity-70">AQI Value</p>
									<div className="w-full mb-[15px] mt-[20px] overflow-hidden bg-gray-200 dark:bg-gray-700 h-[8px] rounded-xl">
										<div
											className={`${bgColor} h-[8px] `}
											style={{ width: `${item.percent}%` }}
										/>
									</div>
								</div>
								<button
									className="duration-150 dark:text-white hover:scale-105 text-gray-800 hover:bg-green-500 hover:text-white flex justify-center items-center mt-[10px] w-[80%] mx-auto h-[45px] rounded-2xl"
									type="button"
									disabled={loading}
								>
									<p>View Details</p>
								</button>
							</div>
						);
					})}
				</div>
			)}
			{tab === "ecoPlaces" && (
				<div className="mb-[20px] flex flex-col gap-10 z-0">
					<div className="w-full h-[600px] rounded-2xl overflow-hidden shadow-lg">
						<MapContainer
							center={[42.8977, 71.388]}
							zoom={12}
							style={{ height: "100%", width: "100%", zIndex: 0 }}
						>
							<TileLayer
								url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
								attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
							/>

							{ecoPlaces.map((place) => (
								<Marker key={place.name} position={place.coords}>
									<Popup>
										<div className="flex flex-col gap-1">
											<strong>{place.name}</strong>
											<span>Категория: {place.category}</span>
											{place.url && (
												<a
													href={place.url}
													target="_blank"
													rel="noreferrer"
													className="text-blue-500 hover:underline"
												>
													Подробнее
												</a>
											)}
										</div>
									</Popup>
								</Marker>
							))}
						</MapContainer>
					</div>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
						{ecoPlaces.map((place) => (
							<div
								key={place.name}
								className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:scale-105 transform transition duration-300 cursor-pointer border border-gray-400/20"
							>
								<div className="h-40 w-full flex items-center justify-center text-white text-xl font-bold">
									<img src={place.url} alt="клешрояль" className="h-[168px] w-full" />
								</div>
								<div className="p-5 flex flex-col gap-2">
									<h2 className="text-lg font-bold text-gray-800 dark:text-white">{place.name}</h2>
									<p className="text-sm text-green-600 dark:text-green-400 font-semibold">{place.category}</p>
									<p className="text-sm text-gray-600 dark:text-gray-300">
										Координаты: {place.coords[0].toFixed(3)}, {place.coords[1].toFixed(3)}
									</p>
									<a
										href={place.url || "#"}
										target="_blank"
										rel="noreferrer"
										className="mt-2 text-white bg-green-500 hover:bg-green-600 text-center py-2 rounded-xl font-semibold transition"
									>
										Подробнее
									</a>
								</div>
							</div>
						))}
					</div>
				</div>
			)}
			{tab === "aiAlerts" && (
				<div className="mb-[20px] flex flex-col gap-10 z-0">
					<div className="w-full h-[600px] rounded-2xl overflow-hidden shadow-lg">
						<MapContainer
							center={[43, 75]}
							zoom={4}
							style={{ height: "100%", width: "100%" }}
						>
							<TileLayer
								url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
								attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
							/>
							{eventsCA.map((ev) => {
								const geo = ev.geometry[ev.geometry.length - 1];
								return (
									<Marker key={ev.id} position={[geo.coordinates[1], geo.coordinates[0]]}>
										<Popup>
											<div>
												<h2 className="font-bold">{ev.title}</h2>
												<p>Категория: {ev.categories?.[0]?.title || "Unknown"}</p>
												<p>Дата: {geo.date ? new Date(geo.date).toLocaleDateString() : "Unknown"}</p>
											</div>
										</Popup>
									</Marker>
								);
							})}
						</MapContainer>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{events
							.filter(ev => {
								const geo = ev.geometry?.[ev.geometry.length - 1];
								return geo?.coordinates && isInCA(geo.coordinates);
							})
							.map((ev) => {
								const geo = ev.geometry[ev.geometry.length - 1];
								return (
									<div
										key={ev.id}
										className="p-5 rounded-2xl shadow-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 hover:scale-105 transform transition"
									>
										<h2 className="text-lg font-bold text-gray-800 dark:text-white mb-2">{ev.title}</h2>
										<p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
											Категория: {ev.categories?.[0]?.title || "Unknown"}
										</p>
										<p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
											Дата: {geo.date ? new Date(geo.date).toLocaleDateString() : "Unknown"}
										</p>
										<p className="text-sm text-gray-600 dark:text-gray-300">
											Координаты: {geo.coordinates[1].toFixed(2)}, {geo.coordinates[0].toFixed(2)}
										</p>
										<a
											href={ev.sources?.[0]?.url || "#"}
											target="_blank"
											rel="noreferrer"
											className="text-blue-500 hover:underline mt-2 block"
										>
											Подробнее
										</a>
									</div>
								);
							})}
					</div>
				</div>
			)}
		</div>
	);
}
