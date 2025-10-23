export default function BotMessageCard({ message }) {

    return (
        <div className="p-3 w-[80%] text-sm bg-white/25 rounded-tr-2xl rounded-tl-2xl rounded-br-2xl border border-white/30 backdrop-blur-blur flex items-center justify-center text-white cursor-pointer">
            {message}
        </div>
    );
}