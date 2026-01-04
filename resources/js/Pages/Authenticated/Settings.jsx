import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { router } from "@inertiajs/react";
import ProfileCard from "../../Components/Settings/ProfileCard";
import NotificationsCard from "../../Components/Settings/NotificationsCard";
import PrivacyCard from "../../Components/Settings/PrivacyCard";
import PreferencesCard from "../../Components/Settings/PreferencesCard";
import StravaIntegrationCard from "../../Components/Settings/StravaIntegrationCard";
import MyDataCard from "../../Components/Settings/MyDataCard";
import LeftArrowIcon from "../../Components/Icons/LeftArrowIcon";
import StravaActivitiesModal from "../../Components/Modals/Settings/StravaActivities";
import { useState } from "react";
import { route } from "ziggy-js";

export default function Settings({ auth, user, stravaData, isStravaConnected, settings, timezones }) {
    const [stravaActivitiesOpen, setStravaActivitiesOpen] = useState(false);

    const toggleSetting = (key, value) => {
        router.put(route('settings.update'), {
            [key]: value
        }, {
            preserveScroll: true,
            preserveState: true,
        });
    };

    return (
        <AuthenticatedLayout auth={auth}>
            <h1 className="fixed flex gap-3 w-full text-[#1A3463] pb-4 px-6 md:px-16 text-3xl md:text-5xl font-semibold z-50 bg-linear-to-b from-[#EAF5FA] to-[#DDEFF7] 3xl:to-[#E7F3F9]">
                <button
                    type="button"
                    onClick={() => window.history.back()}
                    className="flex items-center cursor-pointer"
                >
                    <LeftArrowIcon color="#1C5E8F" />
                </button>

                Definições
            </h1>

            <div className="w-full pt-20 px-4 md:px-16 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 items-stretch">
                <ProfileCard user={user} />

                <NotificationsCard settings={settings} handleToggle={toggleSetting} />

                <PrivacyCard settings={settings} handleToggle={toggleSetting} />

                <PreferencesCard settings={settings} timezones={timezones} handleToggle={toggleSetting} />

                <StravaIntegrationCard isStravaConnected={isStravaConnected} stravaData={stravaData} setStravaActivitiesOpen={setStravaActivitiesOpen} />

                <MyDataCard />
            </div>

            <StravaActivitiesModal isOpen={stravaActivitiesOpen} onClose={() => setStravaActivitiesOpen(false)} activities={stravaData} />
        </AuthenticatedLayout>
    );
}