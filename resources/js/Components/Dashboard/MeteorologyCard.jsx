import { useState } from "react";
import HourlyForecast from "./HourlyForecast";
import WeeklyForecast from "./WeeklyForecast";
import LeftArrowIcon from "../../Components/Icons/LeftArrowIcon";
import RightArrowIcon from "../../Components/Icons/RightArrowIcon";
import WeatherIcon from "../../Components/Icons/WeatherIcon";
import { route } from "ziggy-js";
import { Link } from "@inertiajs/react";
import PlusIcon from "../Icons/PlusIcon";

export default function MeteorologyCard({ weatherData }) {
    const [locationIndex, setLocationIndex] = useState(0);

    const [activeTab, setActiveTab] = useState('hoje');

    const nextLocation = () => {
        setLocationIndex((prevIndex) => (prevIndex + 1) % weatherData.length);
    };
    const prevLocation = () => {
        setLocationIndex((prevIndex) => (prevIndex - 1 + weatherData.length) % weatherData.length);
    };

    const currentCity = weatherData[locationIndex];

    if (!weatherData || weatherData.length === 0) {
        return (
        <div className="flex flex-col justify-start items-center bg-white/40 p-2 pb-4 w-full max-w-[600px] lg:max-w-[300px] relative text-[#1A3463] border-t border-t-[#1A3463]/75 lg:border-t-0 lg:border-l lg:border-l-[#1A3463]/75 rounded-b-xl lg:rounded-l-none lg:rounded-r-xl">
                <p className="text-[#1C5E8F]">Sem dados de meteorologia.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col justify-start items-center bg-white/40 p-2 pb-4 w-full max-w-[600px] lg:max-w-[300px] relative text-[#1A3463] border-t border-t-[#1A3463]/75 lg:border-t-0 lg:border-l lg:border-l-[#1A3463]/75 rounded-b-xl lg:rounded-l-none lg:rounded-r-xl">
            <div className="relative w-full flex justify-center items-center mb-1">
                <WeatherIcon />
                <Link href={route('meteorology.index')} className="absolute top-0 right-0 p-1 rounded-full hover:bg-[#1D87BC]/20 transition">
                    <PlusIcon className="w-6 h-6 text-[#1D87BC]" />
                </Link>
            </div>

            <h2 className="text-[#1C5E8F] text-lg font-semibold">Meteorologia</h2>

            <div className="flex justify-between items-center w-full px-2 mt-2">
                <button
                    onClick={prevLocation}
                    className="p-1 rounded-full hover:bg-[#1D87BC]/20 transition disabled:opacity-30 cursor-pointer"
                    disabled={weatherData.length <= 1}
                >
                    <LeftArrowIcon color="#1D87BC" />
                </button>
                <h3 className="text-[#1D87BC] text-xl font-medium">
                    {currentCity.location.split(',')[0]}
                </h3>
                <button
                    onClick={nextLocation}
                    className="p-1 rounded-full hover:bg-[#1D87BC]/20 transition disabled:opacity-30 cursor-pointer"
                    disabled={weatherData.length <= 1}
                >
                    <RightArrowIcon color="#1D87BC" />
                </button>
            </div>

            <div className="flex gap-4 mt-3">
                <button
                    onClick={() => setActiveTab('hoje')}
                    className={`text-lg font-medium ${activeTab === 'hoje' ? 'text-[#1A3463] border-b-2 border-[#1A3463]' : 'text-gray-500 hover:text-gray-700'} cursor-pointer`}
                >
                    Hoje
                </button>
                <button
                    onClick={() => setActiveTab('semana')}
                    className={`text-lg font-medium ${activeTab === 'semana' ? 'text-[#1A3463] border-b-2 border-[#1A3463]' : 'text-gray-500 hover:text-gray-700'} cursor-pointer`}
                >
                    Semana
                </button>
            </div>

            <div className="w-full mt-4 min-h-[100px]">
                {activeTab === 'hoje' ? (
                    <HourlyForecast forecast={currentCity.forecast_hourly} />
                ) : (
                    <WeeklyForecast forecast={currentCity.forecast_week} />
                )}
            </div>
        </div>
    );
}