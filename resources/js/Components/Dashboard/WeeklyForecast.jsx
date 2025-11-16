export default function WeeklyForecast({ forecast }) {
    const formatDay = (dateString) => {
        const date = new Date(dateString);
        if (date.toDateString() === new Date().toDateString()) {
            return 'Hoje';
        }
        const dayName = date.toLocaleDateString('pt-PT', { weekday: 'short' });
        return dayName.charAt(0).toUpperCase() + dayName.slice(1, 3);
    };

    return (
        <div className="grid grid-cols-7 gap-1 text-center">
            {forecast.map((day, index) => (
                <div key={index} className="flex flex-col items-center">
                    <span className="text-sm font-medium text-gray-700">{formatDay(day.date)}</span>
                    <img src={day.icon} alt={day.text} className="w-8 h-8 my-1" />

                    <div className="flex flex-col items-center">
                        <span className="text-lg font-semibold text-[#1A3463]">{Math.round(day.max)}°</span>
                        <span className="text-sm font-medium text-gray-500">{Math.round(day.min)}°</span>
                    </div>
                </div>
            ))}
        </div>
    );
}