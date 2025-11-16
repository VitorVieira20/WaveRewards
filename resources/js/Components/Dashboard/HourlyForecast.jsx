export default function HourlyForecast({ forecast }) {
    const currentHour = new Date().getHours();

    const upcomingHours = forecast
        .filter(hour => new Date(hour.time).getHours() >= currentHour)
        .slice(0, 6);

    const formatHour = (timeString) => {
        return new Date(timeString).toLocaleTimeString('pt-PT', { hour: '2-digit' }) + 'h';
    };

    return (
        <div className="grid grid-cols-6 gap-1 text-center">
            {upcomingHours.map((hour, index) => (
                <div key={index} className="flex flex-col items-center">
                    <span className="text-sm font-medium text-gray-700">{formatHour(hour.time)}</span>
                    <img src={hour.icon} alt={hour.text} className="w-8 h-8 my-1" />
                    <span className="text-lg font-semibold text-[#1A3463]">{Math.round(hour.temp)}°</span>
                </div>
            ))}
        </div>
    );
}