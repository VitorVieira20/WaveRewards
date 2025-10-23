import { useState } from "react";
import SendMessageIcon from "../Icons/SendMessageIcon";

export default function MessageInput({ onSend }) {
    const [inputValue, setInputValue] = useState("");

    // Envia a mensagem se tiver texto e limpa o campo
    const handleSend = () => {
        const trimmed = inputValue.trim();
        if (trimmed) {
            onSend(trimmed);
            setInputValue("");
        }
    };

    // Envia ao pressionar Enter
    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="w-full relative">
            <div className="flex flex-row gap-4">
                <input
                    className="flex-grow h-10 px-4 resize-none focus:outline-none text-white text-sm font-normal bg-white/25 rounded-2xl border border-white/30 backdrop-blur-blur placeholder:text-white placeholder:text-sm placeholder:font-normal"
                    placeholder="Escrever mensagem"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    rows={1}
                />
                <button
                    onClick={handleSend}
                    className="w-10 h-10 bg-white/25 rounded-2xl border border-white/30 backdrop-blur-blur flex items-center justify-center text-white text-base cursor-pointer"
                    aria-label="Enviar mensagem"
                >
                    <SendMessageIcon />
                </button>
            </div>
        </div>
    );
}
