import ReactMarkdown from 'react-markdown';

export default function BotMessageCard({ message }) {

    return (
        <div className="p-3 w-fit max-w-[90%] text-sm bg-white/25 rounded-tr-2xl rounded-tl-2xl rounded-br-2xl border border-white/30 backdrop-blur-md text-white shadow-sm">
            
            <ReactMarkdown
                components={{
                    ul: ({node, ...props}) => <ul className="list-disc pl-4 mb-2 space-y-1" {...props} />,
                    
                    li: ({node, ...props}) => <li className="leading-relaxed" {...props} />,
                    
                    strong: ({node, ...props}) => <span className="font-bold text-cyan-200" {...props} />,
                    
                    p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />,
                    
                    a: ({node, ...props}) => <a className="text-cyan-300 underline hover:text-cyan-100" target="_blank" rel="noopener noreferrer" {...props} />
                }}
            >
                {message}
            </ReactMarkdown>
        </div>
    );
}