import { useState } from "react";
import FlashMessages from "../Components/FlashMessages";
import Footer from "../Components/Layout/Footer";
import AuthenticatedLayoutNavbar from "../Components/Layout/AuthenticatedNavbar";
import ChatbotIcon from "../Components/Icons/ChatbotIcon"; 
import Chatbot from "../Components/Chatbot/Chatbot"; 

export default function AuthenticatedLayout({ auth, children }) {
    const [chatbotOpen, setChatbotOpen] = useState(false);

    return (
        <div
            className="min-h-screen flex flex-col relative overflow-x-hidden"
            style={{
                background: "linear-gradient(to bottom, #FFFFFF, #60B4D9)",
                backgroundAttachment: "fixed",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
            }}
        >
            <div
                className={`transition-all duration-300 pb-32 ${chatbotOpen ? "blur-xs" : ""
                    }`}
            >
                <AuthenticatedLayoutNavbar auth={auth} />
                <FlashMessages />
                <main className="grow pt-20">{children}</main>
            </div>

            <div className={`absolute bottom-0 w-full left-0 ${chatbotOpen ? 'blur-xs' : ''}`}>
                <Footer />
            </div>

            <div className={`fixed top-28 right-4 z-50 flex flex-col items-end gap-2 ${chatbotOpen ? 'blur-xs pointer-events-none' : ''}`}>
                <button
                    onClick={() => setChatbotOpen(true)}
                    className="bg-[#1A3463] p-3 rounded-full hover:scale-110 transition-transform duration-300 shadow-lg cursor-pointer flex items-center justify-center w-14 h-14"
                >
                    <div className="text-white scale-125">
                         <ChatbotIcon />
                    </div>
                </button>
            </div>

            {chatbotOpen && (
                <>
                    <div
                        onClick={() => setChatbotOpen(false)}
                        className="fixed inset-0 bg-black/60 transition-opacity duration-300 z-50"
                    />
                    <div className="fixed bottom-4 right-4 z-50 transition-all duration-500 opacity-100 scale-100">
                        <Chatbot onClose={() => setChatbotOpen(false)} />
                    </div>
                </>
            )}
        </div>
    );
}