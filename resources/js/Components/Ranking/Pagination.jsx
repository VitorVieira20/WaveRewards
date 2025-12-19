import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ totalPages, currentPage, setCurrentPage }) {

    const nextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
    const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

    return (
        <>
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-6">
                    <button
                        onClick={prevPage}
                        disabled={currentPage === 1}
                        className={`p-2 rounded-lg ${currentPage === 1
                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                            : "bg-[#EAF5FA] text-[#1A3463] hover:bg-[#60B4D9] hover:text-white"
                            } cursor-pointer`}
                    >
                        <ChevronLeft size={18} />
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                                ${currentPage === i + 1
                                    ? "bg-[#1A3463] text-white shadow-md"
                                    : "bg-[#EAF5FA] text-[#1A3463] hover:bg-[#60B4D9] hover:text-white"
                                } cursor-pointer`}
                        >
                            {i + 1}
                        </button>
                    ))}

                    <button
                        onClick={nextPage}
                        disabled={currentPage === totalPages}
                        className={`p-2 rounded-lg ${currentPage === totalPages
                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                            : "bg-[#EAF5FA] text-[#1A3463] hover:bg-[#60B4D9] hover:text-white"
                            } cursor-pointer`}
                    >
                        <ChevronRight size={18} />
                    </button>
                </div>
            )}</>
    );
}