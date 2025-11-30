import FacebookIcon from "../Icons/FacebookIcon";
import InstagramIcon from "../Icons/InstagramIcon";
import LinkedinIcon from "../Icons/LinkedinIcon";
import TwitterIcon from "../Icons/TwitterIcon";
import YoutubeIcon from "../Icons/YoutubeIcon";

export default function Footer() {
    return (
        <footer className="relative w-full mt-auto bg-transparent py-6 flex flex-col items-center justify-center">
            <div className="text-[#1A3463] text-sm md:text-md font-normal mb-3 text-center md:text-left">
                Copyright © 2025 WaveRewards | All Rights Reserved
            </div>

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
        </footer>
    );
}