const medalsInformation = [
    { medal: '/storage/medals/gold.png', quantity: 4 },
    { medal: '/storage/medals/silver.png', quantity: 5 },
    { medal: '/storage/medals/bronze.png', quantity: 6 },
];

export default function MedalsCard() {

    return (
        <div className="flex flex-col w-full bg-white/40 p-4 rounded-2xl gap-2">
            <h2 className="text-xl text-[#1C5E8F] font-semibold">Medalhas</h2>

            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex flex-row bg-[#1D87BC]/40 pl-4 pr-4 pt-2 pb-2 rounded-2xl shadow-sm gap-1 border border-[#1C5E8F]/50 w-full justify-between items-center">
                    {medalsInformation.map((medal, index) => (
                        <div key={index} className="flex flex-col items-center gap-2">
                            <img
                                src={medal.medal}
                                className="w-20 object-cover"
                            />
                            <p className="text-[#1C5E8F] font-normal">{medal.quantity} medalhas</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}