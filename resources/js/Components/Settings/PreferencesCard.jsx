import Select from "../Form/Select";

export default function PreferencesCard({ settings, handleToggle }) {

    return (
        <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-6 shadow-sm">
            <h2 className="text-[#1C5E8F] text-xl font-semibold">Preferências</h2>

            {/* Idioma */}
            <Select
                label="Idioma da Aplicação:"
                value={settings.language}
                onChange={(val) => handleToggle("language", val)}
                options={[
                    { value: "pt", label: "Português" },
                    { value: "en", label: "Inglês" },
                    { value: "es", label: "Espanhol" },
                ]}
            />

            {/* Unidades de Distância */}
            <Select
                label="Unidades de Distância:"
                value={settings.distance_unit}
                onChange={(val) => handleToggle("distance_unit", val)}
                options={[
                    { value: "km", label: "Sistema Métrico (km)" },
                    { value: "mi", label: "Sistema Imperial (mi)" }
                ]}
            />

            {/* Unidades de Temperatura */}
            <Select
                label="Unidades de Temperatura:"
                value={settings.temperature_unit}
                onChange={(val) => handleToggle("temperature_unit", val)}
                options={[
                    { value: "c", label: "Celsius (°C)" },
                    { value: "f", label: "Fahrenheit (°F)" }
                ]}
            />

            {/* Fuso Horário */}
            <Select
                label="Fuso Horário:"
                value={settings.timezone}
                onChange={(val) => handleToggle("timezone", val)}
                options={[
                    { value: "Europe/Lisbon", label: "Europa - Lisboa" },
                    { value: "Europe/Madrid", label: "Europa - Madrid" },
                    { value: "UTC", label: "UTC" },
                    { value: "America/New_York", label: "EUA - Nova Iorque" },
                    { value: "America/Los_Angeles", label: "EUA - Los Angeles" },
                    { value: "America/Sao_Paulo", label: "Brasil - São Paulo" }
                ]}
            />

        </div>
    );
}
