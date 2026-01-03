import { useState } from "react";
import SendMessageIcon from "../Icons/SendMessageIcon";

export default function MessageInput({ onSend }) {
    const [inputValue, setInputValue] = useState("");

    const handleSend = () => {
        const trimmed = inputValue.trim();
        if (trimmed) {
            onSend(trimmed);
            setInputValue("");
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="w-full">
            <div className="flex items-center gap-2">
                <input
                    className="flex-1 h-10 px-4 focus:outline-none text-white text-sm font-normal bg-white/25 rounded-2xl border border-white/30 placeholder:text-white/60 placeholder:text-sm"
                    placeholder="Escrever mensagem"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button
                    onClick={handleSend}
                    className="w-10 h-10 shrink-0 bg-white/25 rounded-2xl border border-white/30 backdrop-blur-md flex items-center justify-center text-white cursor-pointer hover:bg-white/40 transition-colors"
                    aria-label="Enviar mensagem"
                >
                    <SendMessageIcon />
                </button>
            </div>
        </div>
    );
}
