import { useEffect } from "react";
import { toast } from "react-toastify";
import { usePage } from "@inertiajs/react";

export default function FlashMessages() {
    const { flash } = usePage().props;

    useEffect(() => {
        if (flash?.success) {
            if (Array.isArray(flash.success)) {
                flash.success.forEach((successMessage) => {
                    toast.success(successMessage);
                });
            } else {
                toast.success(flash.success);
            }
        }

        if (flash?.error) {
            if (Array.isArray(flash.error)) {
                flash.error.forEach((errorMessage) => {
                    toast.error(errorMessage);
                });
            } else {
                toast.error(flash.error);
            }
        }
    }, [flash]);

    return null;
}