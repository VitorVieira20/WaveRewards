import { usePage } from "@inertiajs/react";
import Navbar from "../Components/Navbar";
import FlashMessages from "../Components/FlashMessages";
import Footer from "../Components/Layout/Footer";

export default function Layout({ auth, children }) {
    return (
        <div className="flex flex-col min-h-screen bg-linear-to-b from-[#FFFFFF] to-[#60B4D9] overflow-x-hidden">
            <Navbar auth={auth} />
            <FlashMessages />

            <main className="grow">
                {children}
            </main>

            <Footer />
        </div>
    );
}
