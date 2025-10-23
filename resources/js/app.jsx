import './bootstrap';
import '../css/app.css';

import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { Bounce, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const appName = "Wave Rewards";

createInertiaApp({
    title: (title) => `${appName}`,
    resolve: (name) =>
        resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob("./Pages/**/*.jsx")),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <>
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick={false}
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                    transition={Bounce}
                />
                <App {...props} />
            </>
        );
    },
});