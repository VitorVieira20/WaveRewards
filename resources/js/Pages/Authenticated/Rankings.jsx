import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import AuthenticatedLayout from "../../Layouts/AuthenticatedLayout";
import FiltersIcon from "../../Components/Icons/FiltersIcon";
import LeftArrowIcon from "../../Components/Icons/LeftArrowIcon";

const podiumUsers = [
    { place: 1, image: "/images/team/roberto.png", name: "Roberto Andrade" },
    { place: 2, image: "/images/team/leonor.png", name: "Leonor Freitas" },
    { place: 3, image: "/images/team/david.png", name: "David França" },
];

export default function Rankings({ auth, rankings }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [showFilters, setShowFilters] = useState(false);
    const perPage = 8;
    const totalPages = Math.ceil(rankings.length / perPage);
    const currentData = rankings.slice((currentPage - 1) * perPage, currentPage * perPage);

    const nextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
    const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

    return (
        <AuthenticatedLayout auth={auth}>
            <h1 className="fixed flex gap-3 w-full text-[#1A3463] pb-4 px-6 md:px-16 text-3xl md:text-5xl font-semibold z-50 bg-linear-to-b from-[#EAF5FA] to-[#DDEFF7] 3xl:to-[#E7F3F9]">
                <button
                    type="button"
                    onClick={() => window.history.back()}
                    className="flex items-center cursor-pointer"
                >
                    <LeftArrowIcon color="#1C5E8F" />
                </button>

                Rankings
            </h1>

            <div className="flex flex-col lg:flex-row items-center justify-center gap-8 w-full pt-20 px-4 md:px-16">
                <div className="w-full lg:w-3/5 overflow-x-auto relative">
                    <div className="flex justify-between items-end mb-3">
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="flex items-end gap-2 bg-transparent text-[#1C5E8F] p-2 rounded-lg text-lg font-medium transition-all cursor-pointer"
                        >
                            <FiltersIcon />
                            Filtros
                        </button>
                    </div>

                    <table className="min-w-full table-auto bg-white/30 rounded-2xl overflow-hidden text-xs shadow-md">
                        <thead className="bg-[#60B4D9] text-left text-[#1A3463] font-medium">
                            <tr>
                                <th className="px-6 py-4 w-1/5 text-start">Utilizador</th>
                                <th className="px-2 py-4 w-1/5 text-center">Pontos Ganhos</th>
                                <th className="px-2 py-4 w-1/5 text-center">Desafios Cumpridos</th>
                                <th className="px-2 py-4 w-1/5 text-center">Distância Remada</th>
                                <th className="px-6 py-4 w-1/5 text-center">Medalhas</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentData.map((ranking) => (
                                <tr
                                    key={ranking.user.avatar}
                                    className="text-[#5A5A5A] border-b border-white hover:bg-white/50 transition-colors"
                                >
                                    <td className="px-6 py-3 text-start">{ranking.user.name}</td>
                                    <td className="px-4 py-3 text-center">{ranking.points}</td>
                                    <td className="px-4 py-3 text-center">{ranking.challenges}</td>
                                    <td className="px-4 py-3 text-center">{ranking.distance}</td>
                                    <td className="px-4 py-3 text-center">{ranking.medals}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* PAGINAÇÃO */}
                    <div className="flex justify-center items-center gap-2 mt-6">
                        <button
                            onClick={prevPage}
                            disabled={currentPage === 1}
                            className={`p-2 rounded-lg ${currentPage === 1
                                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                : "bg-[#EAF5FA] text-[#1A3463] hover:bg-[#60B4D9] hover:text-white"
                                }`}
                        >
                            <ChevronLeft size={18} />
                        </button>

                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                                ${currentPage === i + 1
                                        ? "bg-[#1A3463] text-white shadow-md"
                                        : "bg-[#EAF5FA] text-[#1A3463] hover:bg-[#60B4D9] hover:text-white"
                                    }`}
                            >
                                {i + 1}
                            </button>
                        ))}

                        <button
                            onClick={nextPage}
                            disabled={currentPage === totalPages}
                            className={`p-2 rounded-lg ${currentPage === totalPages
                                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                : "bg-[#EAF5FA] text-[#1A3463] hover:bg-[#60B4D9] hover:text-white"
                                }`}
                        >
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>

                {/* PÓDIO */}
                <div className="w-full lg:w-2/5 relative flex items-center justify-center px-4 md:px-16 pt-16 lg:pt-0">
                    <img
                        src="/images/podium.png"
                        alt="Pódio"
                        className="w-full h-auto object-contain drop-shadow-lg"
                    />

                    {/* POSIÇÕES DOS UTILIZADORES */}
                    {podiumUsers.map((user) => (
                        <div
                            key={user.place}
                            className="absolute flex flex-col items-center text-center"
                            style={{
                                top:
                                    user.place === 1
                                        ? "-90%"
                                        : user.place === 2
                                            ? "-55%"
                                            : "-45%",
                                left:
                                    user.place === 1
                                        ? "50%"
                                        : user.place === 2
                                            ? "25%"
                                            : "75%",
                                transform: "translate(-50%, 0)",
                            }}
                        >
                            <img
                                src={user.image}
                                alt={user.name}
                                className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-white shadow-md object-cover"
                            />
                            <p className="text-[#1A3463] text-sm font-medium mt-2">
                                {user.name}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
