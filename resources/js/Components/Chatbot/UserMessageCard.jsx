export default function UserMessageCard({ message }) {

    return (
        <div className="p-3 w-[80%] mr-1 text-sm bg-white/25 rounded-tl-2xl rounded-bl-2xl rounded-br-2xl border border-white/30 backdrop-blur-blur flex items-center justify-center text-white cursor-pointer">
            {message}
        </div>
    );
}