import Toggle from "../Form/Toggle";

export default function NotificationsCard({ settings, handleToggle }) {

    return (
        <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-6 shadow-sm">
            <h2 className="text-[#1C5E8F] text-xl font-semibold">Notificações</h2>

            <Toggle
                label="Receber notificações por email"
                enabled={settings.email_notifications}
                onChange={(val) => handleToggle('email_notifications', val)}
            />
            <Toggle
                label="Notificações no dispositivo"
                enabled={settings.push_notifications}
                onChange={(val) => handleToggle('push_notifications', val)}
            />
            <Toggle
                label="Resumo semanal de atividades"
                enabled={settings.weekly_digest}
                onChange={(val) => handleToggle('weekly_digest', val)}
            />
            <Toggle
                label="Alertas de novos desafios disponíveis"
                enabled={settings.challenge_alerts}
                onChange={(val) => handleToggle('challenge_alerts', val)}
            />
            <Toggle
                label="Notificações da minha equipa"
                enabled={settings.challenge_alerts}
                onChange={(val) => handleToggle('team_notifications', val)}
            />
        </div>
    );
}