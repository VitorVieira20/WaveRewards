import { router } from "@inertiajs/react";

export default function MyDataCard() {
    const handleExport = () => {
        window.location.href = route('settings.export');
    };

    const handleDeleteAccount = () => {
        if (confirm("Tem a certeza que deseja eliminar a sua conta? Poderá recuperá-la contactando o suporte.")) {
            router.post(route('settings.destroy'), {
                _method: 'DELETE'
            });
        }
    };

    return (
        <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-6 shadow-sm">
            <h2 className="text-[#1C5E8F] text-xl font-semibold">Os Meus Dados</h2>

            <div className="flex flex-col justify-center items-center gap-4 mt-2">
                <p className="text-[#1D87BC] text-sm text-center">Descarrega todas as tuas atividades e <br />estatísticas</p>

                <button
                    onClick={handleExport}
                    className="w-full sm:w-auto flex-1 max-w-[300px] bg-linear-to-r from-[#1C5E8F]/50 via-[#1C5E8F]/75 to-[#1C5E8F] text-white px-6 py-2.5 transition-all duration-300 transform hover:scale-105 hover:shadow-lg tracking-wide text-sm font-medium rounded-full cursor-pointer justify-center shadow-md"
                >
                    Exportar Dados
                </button>

                <p className="text-[#1D87BC] text-sm text-center">Eliminar permanentemente a tua conta e <br />todos os dados</p>

                <button
                    className="w-full sm:w-auto flex-1 max-w-[300px] bg-linear-to-r from-[#CE2828]/50 via-[#CE2828]/75 to-[#CE2828] text-white px-6 py-2.5 transition-all duration-300 transform hover:scale-105 hover:shadow-lg tracking-wide text-sm font-medium rounded-full cursor-pointer justify-center shadow-md"
                >
                    Eliminar Conta
                </button>
            </div>
        </div>
    );
}