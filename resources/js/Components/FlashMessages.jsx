import { useEffect } from "react";
import { toast } from "react-toastify";
import { usePage } from "@inertiajs/react";

export default function FlashMessages() {
    const { flash } = usePage().props;

    useEffect(() => {
        if (flash?.success) {
            if (Array.isArray(flash.success)) {
                flash.success.forEach((msg) => toast.success(msg));
            } else {
                toast.success(flash.success);
            }
        }

        if (flash?.error) {
            if (Array.isArray(flash.error)) {
                flash.error.forEach((msg) => toast.error(msg));
            } else {
                toast.error(flash.error);
            }
        }

        if (flash?.new_badge && Array.isArray(flash.new_badge)) {
            flash.new_badge.forEach((badge) => {
                toast.info(
                    <div className="flex items-center gap-3">
                        <img 
                            src={badge.image} 
                            alt={badge.name} 
                            className="w-10 h-10 object-contain" 
                        />
                        <div>
                            <p className="font-semibold text-md">Nova Medalha!</p>
                            <p className="text-sm">{badge.name}</p>
                        </div>
                    </div>,
                    {
                        icon: false,
                        autoClose: 8000,
                    }
                );
            });
        }
    }, [flash]);

    return null;
}