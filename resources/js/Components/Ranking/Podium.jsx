import { useState, useEffect } from "react";

export default function Podium({ podiumUsers }) {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const isMobile = windowWidth < 768;
    const isTablet = windowWidth >= 768 && windowWidth < 1280;

    return (
        <div className="w-full lg:w-2/5 flex flex-col items-center sticky top-24 mt-14 lg:mt-0">
            <div className="rounded-3xl w-full pt-0 md:pt-14">
                <div className="relative flex items-center justify-center w-full min-h-[300px]">
                    <img
                        src="/images/podium.png"
                        alt="Pódio"
                        className="w-full h-auto object-contain drop-shadow-xl mt-20"
                    />

                    {podiumUsers.map((ranking, index) => {
                        const visualPos = index === 0 ? 1 : index === 1 ? 2 : 3;

                        let stylePosition = {};

                        if (visualPos === 1) {
                            if (isMobile) {
                                stylePosition = { top: "0%", left: "50%" };
                            } else if (isTablet) {
                                stylePosition = { top: "-12%", left: "50%" };
                            } else {
                                stylePosition = { top: "-20%", left: "50%" };
                            }
                        } 
                        else if (visualPos === 2) {
                            if (isMobile) {
                                stylePosition = { top: "28%", left: "18%" };
                            } else if (isTablet) {
                                stylePosition = { top: "20%", left: "18%" };
                            } else { // Desktop
                                stylePosition = { top: "18%", left: "18%" };
                            }
                        } 
                        else if (visualPos === 3) {
                            if (isMobile) {
                                stylePosition = { top: "31%", left: "82%" };
                            } else if (isTablet) {
                                stylePosition = { top: "26%", left: "82%" };
                            } else { // Desktop
                                stylePosition = { top: "25%", left: "83%" };
                            }
                        }

                        return (
                            <div
                                key={index}
                                className="absolute flex flex-col items-center text-center transition-all duration-500 ease-out"
                                style={{
                                    ...stylePosition,
                                    transform: "translate(-50%, 0)",
                                    zIndex: visualPos === 1 ? 10 : 5
                                }}
                            >
                                <div className="relative group">
                                    {visualPos === 1 && (
                                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-yellow-500 animate-bounce drop-shadow-sm">
                                            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M5 16L3 5L8.5 10L12 4L15.5 10L21 5L19 16H5ZM19 19C19 19.5523 18.5523 20 18 20H6C5.44772 20 5 19.5523 5 19V18H19V19Z" /></svg>
                                        </div>
                                    )}

                                    <img
                                        src={ranking.displayAvatar}
                                        alt={ranking.displayName}
                                        className={`
                                            rounded-full border-4 border-white shadow-md object-cover bg-white
                                            ${visualPos === 1 ? 'w-24 h-24 md:w-32 md:h-32' : 'w-16 h-16 md:w-20 md:h-20'}
                                        `}
                                        onError={(e) => {
                                            e.target.src = `https://placehold.co/100x100/1A3463/white?text=${ranking.displayName.charAt(0)}`;
                                        }}
                                    />
                                </div>

                                    <p className="text-[#1A3463] text-sm font-medium md:text-base truncate max-w-[90px] md:max-w-[120px]">
                                        {ranking.displayName}
                                    </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}