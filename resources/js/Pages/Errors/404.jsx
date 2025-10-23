import { Link } from "@inertiajs/react";

export default function Error404() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-blue-400 text-center">
            <h1 className="text-blue-950 text-5xl font-semibold font-['Poppins'] leading-tight mb-4 [text-shadow:_0px_4px_4px_rgb(0_0_0_/_0.25)]">
                Oops! Página não encontrada
            </h1>

            <p className="text-cyan-700 text-lg font-normal font-['Poppins'] mb-8 max-w-lg leading-relaxed">
                Parece que te perdeste nas ondas<br />
                A página que procuras não existe ou foi movida.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
                <Link
                    href="/"
                    className="px-9 py-4 bg-cyan-600 text-white rounded-[40px] shadow-[0_4px_6px_rgba(0,0,0,0.3)] font-['Poppins'] font-bold text-lg transition-transform duration-300 hover:scale-105"
                >
                    Voltar à Página Inicial
                </Link>
                <Link
                    href="/contactos"
                    className="px-9 py-4 bg-white border border-gray-300 rounded-[40px] text-blue-950 font-['Poppins'] font-medium text-lg shadow-[0_4px_6px_rgba(0,0,0,0.15)] transition-transform duration-300 hover:scale-105"
                >
                    Contactar Suporte
                </Link>
            </div>
        </div>
    );
}
