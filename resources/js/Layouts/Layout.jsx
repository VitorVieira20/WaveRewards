import { usePage } from "@inertiajs/react";
import FlashMessages from "../Components/FlashMessages";
import Footer from "../Components/Layout/Footer";
import LayoutNavbar from "../Components/Layout/Navbar";

export default function Layout({ auth, children }) {
    return (
        <div
            className="flex flex-col min-h-screen overflow-x-hidden"
            style={{
                background: 'linear-gradient(to bottom, #FFFFFF, #60B4D9)',
                backgroundAttachment: 'fixed',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <LayoutNavbar auth={auth} />
            <FlashMessages />

            <main className="grow pt-16 md:pt-20">
                {children}
            </main>

            <Footer />
        </div>
    );
}
