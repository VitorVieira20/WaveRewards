import { useState } from "react";
import FlashMessages from "../Components/FlashMessages";
import Footer from "../Components/Layout/Footer";
import AuthenticatedLayoutNavbar from "../Components/Layout/AuthenticatedNavbar";

export default function AuthenticatedLayout({ auth, children }) {
    const [chatbotOpen, setChatbotOpen] = useState(false);

    return (
        <div
            className="flex flex-col min-h-screen overflow-x-hidden"
            style={{
                background: "linear-gradient(to bottom, #FFFFFF, #60B4D9)",
                backgroundAttachment: "fixed",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
            }}
        >
            <div
                className={`transition-all duration-300 ${chatbotOpen ? "blur-xs" : ""
                    }`}
            >
                <AuthenticatedLayoutNavbar auth={auth} />
                <FlashMessages />
                <main className="grow pt-16 md:pt-20">{children}</main>
            </div>

            <Footer chatbotOpen={chatbotOpen} setChatbotOpen={setChatbotOpen} />
        </div>
    );
}
