import TeamIcon from "../Icons/TeamIcon";

export default function TeamInfoCard({ team }) {

    return (
        <div className="flex flex-col items-center text-center bg-white/40 p-2 pb-4 w-full mx-auto md:mx-0
         max-w-[600px] lg:max-w-[300px] relative border-b border-b-[#1A3463]/75 lg:border-b-0 lg:border-r lg:border-r-[#1A3463]/75 rounded-t-xl lg:rounded-t-none lg:rounded-l-xl">
            <TeamIcon />
            <h2 className="text-[#1C5E8F] text-lg font-semibold">A tua equipa</h2>
            <h2 className="text-[#1D87BC] text-xl font-medium mt-3">{team.name}</h2>
            <p className="text-[#1C5E8F] text-md mt-2"><span className="font-medium">Ranking: </span>{team.rank}º lugar</p>
            <p className="text-[#1C5E8F] text-md mt-1"><span className="font-medium">Pontos totais: </span>{team.points} pontos</p>
        </div>
    );
}