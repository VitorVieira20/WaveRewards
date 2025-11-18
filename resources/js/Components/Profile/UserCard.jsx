import { useForm } from "@inertiajs/react";
import LocationPinIcon from "../Icons/LocationPinIcon";

export default function UserCard({ user, onOpenPasswordModal }) {

    const { post, processing } = useForm();

    const handleLogout = (e) => {
            e.preventDefault();
            post(route("logout"));
        };

    return (
        <div className="flex flex-col justify-between gap-1 bg-white/40 w-full lg:w-2/5 rounded-2xl p-4 h-full shadow-sm">
            <div className="flex flex-col md:flex-row items-center md:items-start pt-2">
                <div className="flex flex-row justify-center items-center gap-2 px-4">
                    <img
                        src={user.avatar}
                        className="border-4 border-[#60B4D9] w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover"
                    />
                </div>
                <div className="flex flex-col gap-1 text-sm font-medium text-[#1C5E8F] pl-4 md:pl-2 mt-2 md:mt-0 text-center md:text-left leading-tight">
                    <p>Nome: <span className="font-normal">Vitor Vieira</span></p>
                    <p>Username: <span className="font-normal">vitor_vieira_20</span></p>
                    <div className="flex flex-row items-center justify-center md:justify-start gap-1">
                        <LocationPinIcon color="#3699C5" className="w-4 h-4" />
                        <span className="font-normal">Caniço, Madeira</span>
                    </div>
                    <p>Membro desde: <span className="font-normal">Março 2025</span></p>
                    <p>Nível: <span className="font-normal">Avançado</span></p>
                </div>
            </div>

            <div className="border border-[#1C679A]/50 mx-6 my-1"></div>

            <div className="flex flex-col md:flex-row justify-center items-center gap-3 mb-1">
                <button onClick={handleLogout} disabled={processing}
                    className="flex bg-linear-to-r from-[#1C5E8F]/50 via-[#1C5E8F]/75 to-[#1C5E8F] text-white px-5 py-2 transition-all duration-300 transform hover:scale-105 tracking-wide text-xs sm:text-sm font-medium rounded-full cursor-pointer whitespace-nowrap">
                    Terminar sessão
                </button>
                <button onClick={onOpenPasswordModal} className="flex bg-white/40 text-[#3699C5] px-5 py-2 transition-all duration-300 transform hover:scale-105 tracking-wide text-xs sm:text-sm font-medium rounded-full cursor-pointer whitespace-nowrap">
                    Mudar password
                </button>
            </div>
        </div>
    );
}