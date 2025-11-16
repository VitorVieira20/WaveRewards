import AuthenticatedLayout from "../../Layouts/AuthenticatedLayout";
import { motion } from "framer-motion";

export default function Meteorology({ auth, weatherData }) {
    function formatDate(dateString) {
        const date = new Date(dateString.replace(" ", "T"));
        const day = date.getDate();
        const hours = date.toTimeString().slice(0, 5);

        const months = [
            "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
            "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
        ];

        const month = months[date.getMonth()];
        return `${day} ${month}, ${hours}`;
    }

    return (
        <AuthenticatedLayout auth={auth}>
            <h1 className="fixed w-full text-[#1A3463] pb-4 px-6 md:px-16 text-3xl md:text-5xl font-semibold z-50 bg-linear-to-b from-[#EAF5FA] to-[#EAF5FA] md:to-[#DDEFF7] 3xl:to-[#E7F3F9]">
                Meteorologia
            </h1>

            <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar w-full h-[calc(100vh-110px)] mt-10">
                {weatherData.map((city, index) => (
                    <motion.div
                        key={index}
                        className="
                            w-[95%] sm:min-w-[75%] md:min-w-full
                            h-full snap-center shrink-0
                            px-4 md:px-10 py-6
                            mx-auto
                            flex flex-col items-center justify-start
                        "
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        {/* Localização */}
                        <h2 className="text-[#1C5E8F] text-3xl md:text-5xl font-normal text-center">
                            {city.location}
                        </h2>

                        {/* Data */}
                        <p className="text-[#1C5E8F] mt-2 text-lg md:text-2xl font-light">
                            {formatDate(city.date)}
                        </p>

                        {/* Ícone + Temp (row em desktop, column em mobile) */}
                        <div className="
                            flex flex-col md:flex-row
                            justify-center items-center
                            gap-2 md:gap-6 mt-6
                        ">
                            <img src={city.condition_icon} className="h-24 md:h-32" />
                            <h3 className="text-6xl md:text-[85px] leading-none text-[#1C5E8F]/80">
                                {city.temp}°C
                            </h3>
                        </div>

                        {/* Humidade / Vento / UV */}
                        <div
                            className="
                                grid grid-cols-1 md:grid-cols-3
                                gap-4 md:gap-6
                                mt-10 w-full max-w-xl
                            "
                        >
                            <div className="bg-[#FFFFFF]/15 p-4 rounded-lg text-center shadow-xl">
                                <p className="text-xl md:text-2xl text-white">
                                    <span className="font-bold">{city.humidity}</span>%
                                </p>
                                <p className="text-sm md:text-md text-white">Humidade</p>
                            </div>

                            <div className="bg-[#FFFFFF]/15 p-4 rounded-lg text-center shadow-xl">
                                <p className="text-xl md:text-2xl text-white">
                                    <span className="font-bold">{city.wind}</span> km/h
                                </p>
                                <p className="text-sm md:text-md text-white">Vento</p>
                            </div>

                            <div className="bg-[#FFFFFF]/15 p-4 rounded-lg text-center shadow-xl">
                                <p className="font-bold text-xl md:text-2xl text-white">{city.uv}</p>
                                <p className="text-sm md:text-md text-white">Índice UV</p>
                            </div>
                        </div>

                        {/* Forecast (grid no mobile, linha no desktop) */}
                        <div
                            className="
        bg-white/30 p-4 mt-10 rounded-2xl w-full max-w-xl
        flex md:flex-row
        md:justify-center md:gap-10
    "
                        >
                            {/* MOBILE → GRID 2 COLS */}
                            <div className="grid grid-cols-2 gap-6 w-full md:hidden">
                                {city.forecast.map((day, i) => (
                                    <div key={i} className="text-center">
                                        <img src={day.icon} className="w-10 mx-auto" />
                                        <p className="font-semibold mt-2 text-md text-white">{day.max}°</p>
                                        <p className="text-xs text-white capitalize">
                                            {new Date(day.date).toLocaleDateString("pt-PT", {
                                                weekday: "long",
                                            })}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {/* DESKTOP → LINHA */}
                            <div className="hidden md:flex gap-10 w-full justify-center">
                                {city.forecast.map((day, i) => (
                                    <div key={i} className="text-center">
                                        <img src={day.icon} className="w-12 mx-auto" />
                                        <p className="font-semibold mt-2 text-lg text-white">{day.max}°</p>
                                        <p className="text-sm text-white capitalize">
                                            {new Date(day.date).toLocaleDateString("pt-PT", {
                                                weekday: "long",
                                            })}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </AuthenticatedLayout>
    );
}
