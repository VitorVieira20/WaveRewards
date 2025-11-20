import Toggle from "../Form/Toggle";

export default function PrivacyCard({ settings, handleToggle }) {

    return (
        <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-6 shadow-sm">
            <h2 className="text-[#1C5E8F] text-xl font-semibold">Privacidade</h2>

            <Toggle
                label="Perfil Público:"
                enabled={settings.public_profile}
                onChange={(val) => handleToggle('public_profile', val)}
            />
            <p className="text-sm text-[#1D87BC] font-normal mb-3 -mt-2">O meu perfil é visível para outros utilizadores</p>

            <Toggle
                label="Partilha de Atividades:"
                enabled={settings.share_activities}
                onChange={(val) => handleToggle('share_activities', val)}
            />
            <p className="text-sm text-[#1D87BC] font-normal mb-3 -mt-2">Mostrar as minhas atividades no feed da comunidade</p>

            <Toggle
                label="Dados de Localização:"
                enabled={settings.share_location}
                onChange={(val) => handleToggle('share_location', val)}
            />
            <p className="text-sm text-[#1D87BC] font-normal mb-3 -mt-2">Permitir acesso à localização para rotas</p>

        </div>
    );
}