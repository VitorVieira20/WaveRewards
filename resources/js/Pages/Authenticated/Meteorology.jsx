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
            <h1 className="text-[#1A3463] px-6 md:px-16 text-4xl md:text-5xl font-semibold">
                Meteorologia
            </h1>

            <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar w-full h-[calc(100vh-110px)] mt-4">
                {weatherData.map((city, index) => (
                    <motion.div
                        key={index}
                        className="min-w-full h-full snap-center shrink-0 px-10 py-6 flex flex-col items-center justify-start"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        {/* Localização */}
                        <h2 className="text-[#1C5E8F] text-5xl font-normal text-center">
                            {city.location}
                        </h2>

                        {/* Data */}
                        <p className="text-[#1C5E8F] mt-2 text-2xl font-light">
                            {formatDate(city.date)}
                        </p>

                        {/* Condição + Temperatura */}
                        <div className="flex flex-row justify-center items-center gap-6 mt-6">
                            <img src={city.condition_icon} className="h-32" />
                            <h3 className="text-[85px] leading-none text-[#1C5E8F]/80">
                                {city.temp}°C
                            </h3>
                        </div>

                        {/* Humidade / Vento / UV */}
                        <div className="grid grid-cols-3 gap-6 mt-10 w-full max-w-2xl">
                            <div className="bg-[#FFFFFF]/15 p-4 rounded-lg text-center shadow-xl">
                                <p className="text-2xl text-white">
                                    <span className="font-bold">{city.humidity}</span>%
                                </p>
                                <p className="text-md text-white">Humidade</p>
                            </div>

                            <div className="bg-[#FFFFFF]/15 p-4 rounded-lg text-center shadow-xl">
                                <p className="text-2xl text-white">
                                    <span className="font-bold">{city.wind}</span> km/h
                                </p>
                                <p className="text-md text-white">Vento</p>
                            </div>

                            <div className="bg-[#FFFFFF]/15 p-4 rounded-lg text-center shadow-xl">
                                <p className="font-bold text-2xl text-white">{city.uv}</p>
                                <p className="text-md text-white">Índice UV</p>
                            </div>
                        </div>

                        {/* Previsão 4 dias */}
                        <div className="flex justify-center items-center bg-white/30 p-4 mt-10 gap-10 rounded-2xl w-full max-w-2xl">
                            {city.forecast.map((day, i) => (
                                <div key={i} className="text-center">
                                    <img src={day.icon} className="w-12 mx-auto" />
                                    <p className="font-semibold mt-2 text-lg text-white">
                                        {day.max}°
                                    </p>
                                    <p className="text-sm text-white capitalize">
                                        {new Date(day.date).toLocaleDateString("pt-PT", {
                                            weekday: "long",
                                        })}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </AuthenticatedLayout>
    );
}
