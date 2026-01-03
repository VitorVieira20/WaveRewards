import { route } from "ziggy-js";

export default function StravaIntegrationCard({ isStravaConnected }) {

    return (
        <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-6 shadow-sm">
            <h2 className="text-[#1C5E8F] text-xl font-semibold">Integrações</h2>

            <div className="flex flex-col justify-center items-center gap-4 mt-2">
                <p className="text-[#1D87BC] text-sm text-center">Sincroniza as tuas atividades <br />automaticamente</p>

                <img
                    src="/images/strava-icon.png"
                    alt="Strava Icon"
                    className="w-20 h-20"
                />

                {isStravaConnected ? (
                    <button
                        disabled
                        className="
                            w-full sm:w-auto flex-1 max-w-[300px]
                            bg-linear-to-r from-[#1C5E8F]/50 via-[#1C5E8F]/75 to-[#1C5E8F]
                            text-white px-6 py-2.5 text-sm font-medium rounded-full
                            tracking-wide justify-center shadow-md
                            transition-all duration-300 transform

                            cursor-pointer hover:scale-105 hover:shadow-lg

                            disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none
                            disabled:hover:scale-100 disabled:hover:shadow-none
                        "
                    >
                        Conta Conectada
                    </button>

                ) : (
                    <a
                        href={route("strava.redirect")}
                        className="w-full text-center inline-block sm:w-auto flex-1 max-w-[300px] bg-linear-to-r from-[#1C5E8F]/50 via-[#1C5E8F]/75 to-[#1C5E8F] text-white px-6 py-2.5 transition-all duration-300 transform hover:scale-105 hover:shadow-lg tracking-wide text-sm font-medium rounded-full cursor-pointer justify-center shadow-md"
                    >
                        Conectar com Strava
                    </a>
                )}
            </div>
        </div>
    );
}