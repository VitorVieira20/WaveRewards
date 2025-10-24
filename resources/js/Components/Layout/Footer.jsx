import { useState } from "react";
import FacebookIcon from "../Icons/FacebookIcon";
import InstagramIcon from "../Icons/InstagramIcon";
import LinkedinIcon from "../Icons/LinkedinIcon";
import TwitterIcon from "../Icons/TwitterIcon";
import YoutubeIcon from "../Icons/YoutubeIcon";
import ChatbotIcon from "../Icons/ChatbotIcon";
import Chatbot from "../Chatbot/Chatbot";

export default function Footer() {
    const [chatbotOpen, setChatbotOpen] = useState(false);

    return (
        <footer className="relative w-full mt-auto bg-transparent py-6 flex flex-col items-center justify-center text-center">
            {/* Copyright */}
            <div className="text-[#1A3463] text-sm md:text-md font-normal mb-3">
                Copyright © 2025 WaveRewards | All Rights Reserved
            </div>

            {/* Social Icons */}
            <div className="flex flex-row gap-4 justify-center items-center">
                <a href="#" className="hover:scale-110 transition duration-200">
                    <FacebookIcon />
                </a>
                <a href="#" className="hover:scale-110 transition duration-200">
                    <TwitterIcon />
                </a>
                <a href="#" className="hover:scale-110 transition duration-200">
                    <InstagramIcon />
                </a>
                <a href="#" className="hover:scale-110 transition duration-200">
                    <LinkedinIcon />
                </a>
                <a href="#" className="hover:scale-110 transition duration-200">
                    <YoutubeIcon />
                </a>
            </div>

            {/* Chatbot flutuante no canto inferior direito */}
            <button
                onClick={() => setChatbotOpen(true)}
                className="fixed bottom-6 right-6 z-50 transform hover:scale-110 transition duration-200 cursor-pointer"
            >
                <ChatbotIcon />
            </button>

            {chatbotOpen && (
                <>
                    <div
                        onClick={() => setChatbotOpen(false)}
                        className="fixed inset-0 bg-black/60 transition-opacity duration-300 z-40"
                    />
                    <div className="fixed bottom-8 right-8 z-50 transition-all duration-500 opacity-100 scale-100">
                        <Chatbot onClose={() => setChatbotOpen(false)} />
                    </div>
                </>
            )}
        </footer>
    );
}
