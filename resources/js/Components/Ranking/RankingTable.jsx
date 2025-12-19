export default function RankingTable({ activeTab, sortBy, currentData }) {

    return (
        <div className="w-full overflow-x-auto rounded-2xl shadow-sm border border-white/30">
            <table className="min-w-full table-auto bg-white/30 rounded-2xl overflow-hidden text-xs shadow-md">
                <thead className="bg-[#60B4D9] text-left text-[#1A3463] font-medium">
                    <tr>
                        <th className="px-4 py-4 w-[10%] text-center">#</th>
                        <th className="px-6 py-4 w-[30%] text-start">{activeTab === 'users' ? 'Utilizador' : 'Equipa'}</th>
                        <th className={`px-2 py-4 w-[15%] text-center ${sortBy === 'points' ? 'bg-[#1A3463]/10' : ''}`}>Pontos</th>
                        <th className={`px-2 py-4 w-[15%] text-center ${sortBy === 'challenges' ? 'bg-[#1A3463]/10' : ''}`}>Desafios</th>
                        <th className={`px-2 py-4 w-[15%] text-center ${sortBy === 'distance' ? 'bg-[#1A3463]/10' : ''}`}>Dist.</th>
                        <th className={`px-2 py-4 w-[15%] text-center ${sortBy === 'medals' ? 'bg-[#1A3463]/10' : ''}`}>Medalhas</th>
                    </tr>
                </thead>
                <tbody>
                    {currentData.length > 0 ? (
                        currentData.map((ranking) => (
                            <tr
                                key={activeTab === 'users' ? ranking.user.rank : ranking.id}
                                className="text-[#5A5A5A] border-b border-white hover:bg-white/50 transition-colors"
                            >
                                <td className="px-4 py-3 text-center font-bold text-[#1D87BC]">
                                    {ranking.calculatedRank}º
                                </td>
                                <td className="px-6 py-3 text-start font-medium flex items-center gap-2">
                                    {ranking.displayName}
                                </td>
                                <td className={`px-4 py-3 text-center ${sortBy === 'points' ? 'font-bold text-[#1A3463]' : ''}`}>{ranking.points}</td>
                                <td className={`px-4 py-3 text-center ${sortBy === 'challenges' ? 'font-bold text-[#1A3463]' : ''}`}>{ranking.challenges}</td>
                                <td className={`px-4 py-3 text-center ${sortBy === 'distance' ? 'font-bold text-[#1A3463]' : ''}`}>{ranking.distance}km</td>
                                <td className={`px-4 py-3 text-center ${sortBy === 'medals' ? 'font-bold text-[#1A3463]' : ''}`}>{ranking.medals}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="py-8 text-center text-gray-500 italic">
                                Nenhum resultado encontrado.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}