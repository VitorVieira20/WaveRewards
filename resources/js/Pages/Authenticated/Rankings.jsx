import { useEffect, useMemo, useState } from "react";
import { Users, User, Filter } from "lucide-react";
import { motion } from "framer-motion";
import AuthenticatedLayout from "../../Layouts/AuthenticatedLayout";
import LeftArrowIcon from "../../Components/Icons/LeftArrowIcon";
import Podium from "../../Components/Ranking/Podium";
import Pagination from "../../Components/Ranking/Pagination";
import RankingTable from "../../Components/Ranking/RankingTable";

export default function Rankings({ auth, rankings, teams }) {
    const [activeTab, setActiveTab] = useState('users');
    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState("points");
    const perPage = 8;

    const rawData = activeTab === 'users' ? rankings : (teams || []);

    const processedData = useMemo(() => {
        let data = [...rawData];
        data.sort((a, b) => b[sortBy] - a[sortBy]);
        return data.map((item, index) => ({
            ...item,
            calculatedRank: index + 1,
            displayName: activeTab === 'users' ? item.user.name : item.name,
            displayAvatar: activeTab === 'users' ? item.user.avatar : item.avatar
        }));
    }, [rawData, sortBy, activeTab]);

    const totalPages = Math.ceil(processedData.length / perPage);

    const currentData = useMemo(() => {
        const start = (currentPage - 1) * perPage;
        const end = currentPage * perPage;
        return processedData.slice(start, end);
    }, [processedData, currentPage, perPage]);

    const podiumUsers = processedData.slice(0, 3);

    useEffect(() => {
        setCurrentPage(1);
    }, [activeTab, sortBy]);

    const sortOptions = [
        { key: 'points', label: 'Pontos' },
        { key: 'challenges', label: 'Desafios' },
        { key: 'distance', label: 'Distância' },
        { key: 'medals', label: 'Medalhas' },
    ];

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

            <div className="flex flex-col lg:flex-row items-start justify-center gap-8 w-full pt-28 px-4 md:px-16 pb-10">
                <div className="w-full lg:w-3/5 relative flex flex-col gap-6">
                    <div className="bg-white/30 p-2 rounded-2xl shadow-sm border border-gray-100 flex flex-col xl:flex-row items-center justify-between gap-4">
                        <div className="w-full xl:w-auto bg-gray-100/80 p-1.5 rounded-xl flex relative isolate">
                            <button
                                onClick={() => setActiveTab('users')}
                                className={`relative z-10 flex-1 xl:flex-none flex items-center justify-center gap-2 px-6 py-2 rounded-2xl text-md font-medium transition-colors duration-300 ${activeTab === 'users' ? 'text-white' : 'text-gray-800 hover:text-[#1A3463]'
                                    } cursor-pointer`}
                            >
                                {activeTab === 'users' && (
                                    <motion.div
                                        layoutId="activeTabBackground"
                                        className="absolute inset-0 bg-[#6EA8C5] rounded-2xl shadow-md -z-10"
                                        transition={{ type: "spring", stiffness: 200, damping: 30 }}
                                    />
                                )}
                                <User size={16} />
                                Individual
                            </button>

                            <button
                                onClick={() => setActiveTab('teams')}
                                className={`relative z-10 flex-1 xl:flex-none flex items-center justify-center gap-2 px-6 py-2 rounded-2xl text-md font-medium transition-colors duration-300 ${activeTab === 'teams' ? 'text-white' : 'text-gray-800 hover:text-[#1A3463]'
                                    } cursor-pointer`}
                            >
                                {activeTab === 'teams' && (
                                    <motion.div
                                        layoutId="activeTabBackground"
                                        className="absolute inset-0 bg-[#6EA8C5] rounded-2xl shadow-md -z-10"
                                        transition={{ type: "spring", stiffness: 200, damping: 30 }}
                                    />
                                )}
                                <Users size={16} />
                                Equipas
                            </button>
                        </div>

                        <div className="w-full xl:flex-1 flex flex-col md:flex-row gap-4 items-center justify-center lg:justify-end">
                            <div className="flex flex-col md:flex-row items-center justify-center gap-3 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 scrollbar-hide">
                                <div className="flex items-center gap-1 text-[#1A3463]">
                                    <Filter size={14} />
                                    <span className="text-sm font-semibold uppercase tracking-wide">Ordenar:</span>
                                </div>
                                <div className="flex bg-gray-50 rounded-2xl p-1 gap-1">
                                    {sortOptions.map((opt) => (
                                        <button
                                            key={opt.key}
                                            onClick={() => setSortBy(opt.key)}
                                            className={`relative px-4 py-1.5 rounded-2xl text-sm font-normal whitespace-nowrap transition-colors z-10 ${sortBy === opt.key ? 'text-white' : 'text-gray-800 hover:text-[#1A3463]'
                                                } cursor-pointer`}
                                        >
                                            {sortBy === opt.key && (
                                                <motion.div
                                                    layoutId="sortBackground"
                                                    className="absolute inset-0 bg-[#6EA8C5] rounded-2xl shadow-sm ring-1 ring-black/5 -z-10"
                                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                                />
                                            )}
                                            {opt.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <RankingTable activeTab={activeTab} sortBy={sortBy} currentData={currentData} />
                    <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                </div>

                <Podium activeTab={activeTab} sortOptions={sortOptions} sortBy={sortBy} podiumUsers={podiumUsers} />
            </div>
        </AuthenticatedLayout>
    );
}