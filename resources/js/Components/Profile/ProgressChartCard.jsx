import { useState } from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const weeklyData = [
    { name: 'Semana 1', valor: 80 },
    { name: 'Semana 2', valor: 120 },
    { name: 'Semana 3', valor: 800 },
    { name: 'Semana 4', valor: 300 },
    { name: 'Semana 5', valor: 9000 },
    { name: 'Semana 6', valor: 100 },
    { name: 'Semana 7', valor: 800 },
    { name: 'Semana 8', valor: 1500 },
];

const monthlyData = [
    { name: 'Jan', valor: 1200 },
    { name: 'Fev', valor: 800 },
    { name: 'Mar', valor: 3000 },
    { name: 'Abr', valor: 2500 },
    { name: 'Mai', valor: 9000 },
];

const yearlyData = [
    { name: '2023', valor: 1000 },
    { name: '2024', valor: 4000 },
    { name: '2025', valor: 9500 },
];

export default function ProgressChartCard() {
    const [activeFilter, setActiveFilter] = useState('semana');

    let chartData;
    if (activeFilter === 'semana') {
        chartData = weeklyData;
    } else if (activeFilter === 'mes') {
        chartData = monthlyData;
    } else {
        chartData = yearlyData;
    }

    const getButtonClass = (filterName) => {
        return activeFilter === filterName
            ? "bg-white/60 text-[#3699C5] shadow-md cursor-pointer focus:outline-none"
            : "bg-white/40 text-[#3699C5] hover:bg-white/60 cursor-pointer focus:outline-none";
    };

    return (
        <div className="bg-white/40 w-full lg:w-3/5 rounded-2xl p-4 h-full flex flex-col shadow-sm">
            <div className="mb-1">
                <h2 className="text-[#1C5E8F] text-lg font-semibold leading-none">Progresso</h2>
                <h3 className="text-[#1C5E8F] text-sm text-center font-normal">Atividade ao longo do tempo</h3>
            </div>

            <div className="w-full h-64 lg:h-auto lg:grow min-h-0 px-0 md:px-2">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={chartData}
                        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#1C5E8F" strokeOpacity={0.2} />
                        <YAxis
                            scale="log"
                            domain={[1, 10000]}
                            allowDataOverflow
                            tick={{ fill: '#1C5E8F', fontSize: 10 }}
                            stroke="#1C5E8F"
                            width={45}
                            tickLine={false}
                            axisLine={false}
                        />
                        <XAxis
                            dataKey="name"
                            tick={{ fill: '#1C5E8F', fontSize: 10 }}
                            stroke="#1C5E8F"
                            tickLine={false}
                            axisLine={false}
                            dy={5}
                            interval="preserveStartEnd"
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                borderColor: '#1C5E8F',
                                borderRadius: '8px',
                                padding: '5px',
                                fontSize: '12px'
                            }}
                            labelStyle={{ color: '#1A3463', fontWeight: 'bold' }}
                            itemStyle={{ color: '#3699C5' }}
                        />
                        <Line
                            type="monotone"
                            dataKey="valor"
                            stroke="#3699C5"
                            strokeWidth={2.5}
                            dot={{ r: 3, fill: '#3699C5' }}
                            activeDot={{ r: 6, stroke: '#1A3463' }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div className="flex justify-center items-center gap-3 mt-2">
                <button onClick={() => setActiveFilter('semana')} className={`px-4 py-1 rounded-full text-xs font-medium transition-all duration-200 ${getButtonClass('semana')}`}>
                    Semana
                </button>
                <button onClick={() => setActiveFilter('mes')} className={`px-4 py-1 rounded-full text-xs font-medium transition-all duration-200 ${getButtonClass('mes')}`}>
                    Mês
                </button>
                <button onClick={() => setActiveFilter('ano')} className={`px-4 py-1 rounded-full text-xs font-medium transition-all duration-200 ${getButtonClass('ano')}`}>
                    Ano
                </button>
            </div>
        </div>
    );
}