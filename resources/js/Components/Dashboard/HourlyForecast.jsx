export default function HourlyForecast({ forecast }) {
    const now = new Date();

    now.setMinutes(0, 0, 0);

    const upcomingHours = forecast
        .filter(hour => {
            const hourDate = new Date(hour.time);

            return hourDate >= now;
        })
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