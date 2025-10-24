export default function InitialQuestionCard({ index, question, onClick }) {
    let classes;

    if (index === 0) { // Top Left
        classes = "p-3 w-full bg-white/25 rounded-tr-2xl rounded-bl-2xl border border-white/30 backdrop-blur-blur flex items-center justify-center text-white text-base cursor-pointer";
    } else if (index === 1) { // Top Right
        classes = "p-3 w-full bg-white/25 rounded-tl-2xl rounded-br-2xl border border-white/30 backdrop-blur-blur flex items-center justify-center text-white text-base cursor-pointer";
    } else if (index === 2) { // Bottom Left
        classes = "p-3 w-full bg-white/25 rounded-tl-2xl rounded-br-2xl border border-white/30 backdrop-blur-blur flex items-center justify-center text-white text-base cursor-pointer";
    } else if (index === 3) { // Bottom Right
        classes = "p-3 w-full bg-white/25 rounded-tr-2xl rounded-bl-2xl border border-white/30 backdrop-blur-blur flex items-center justify-center text-white text-base cursor-pointer";
    }

    return (
        <div className={classes} onClick={onClick}>
            {question}
        </div>
    );
}
