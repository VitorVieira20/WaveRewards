import { useState } from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

export default function ProgressChartCard({ data }) {
    const [activeFilter, setActiveFilter] = useState('semana');

    const chartData = data[activeFilter] || [];

    const labels = { semana: "Semana", mes: "Mês", ano: "Ano" };
    const filterString = labels[activeFilter] || activeFilter;
    
    return (
        <div className="bg-white/40 w-full lg:w-3/5 rounded-2xl p-4 h-full flex flex-col shadow-sm">
            <div className="mb-1">
                <h2 className="text-[#1C5E8F] text-lg font-semibold leading-none">Progresso</h2>
                <h3 className="text-[#1C5E8F] text-sm text-center font-normal">Pontos acumulados por {filterString}</h3>
            </div>

            <div className="w-full h-64 lg:h-auto lg:grow min-h-0 px-0 md:px-2">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1C5E8F" strokeOpacity={0.2} />
                        <YAxis
                            domain={['auto', 'auto']}
                            tick={{ fill: '#1C5E8F', fontSize: 10 }}
                            stroke="#1C5E8F"
                        />
                        <XAxis
                            dataKey="name"
                            tick={{ fill: '#1C5E8F', fontSize: 10 }}
                            stroke="#1C5E8F"
                        />
                        <Tooltip />
                        <Line
                            type="monotone"
                            dataKey="valor"
                            stroke="#3699C5"
                            strokeWidth={3}
                            dot={{ r: 4, fill: '#3699C5' }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div className="flex justify-center items-center gap-3 mt-2">
                {['semana', 'mes', 'ano'].map((filter) => (
                    <button
                        key={filter}
                        onClick={() => setActiveFilter(filter)}
                        className={`px-4 py-1 rounded-full text-xs font-medium transition-all ${activeFilter === filter ? "bg-white/60 shadow-md" : "bg-white/40"
                            } text-[#3699C5] cursor-pointer`}
                    >
                        {filter.charAt(0).toUpperCase() + filter.slice(1)}
                    </button>
                ))}
            </div>
        </div>
    );
}