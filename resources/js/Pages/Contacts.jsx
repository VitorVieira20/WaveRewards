import { useForm } from "@inertiajs/react";
import Layout from "../Layouts/Layout";
import AuthenticatedLayout from "../Layouts/AuthenticatedLayout";
import RightArrowIcon from "../Components/Icons/RightArrowIcon";
import EnvelopIcon from "../Components/Icons/EnvelopIcon";
import PhoneIcon from "../Components/Icons/PhoneIcon";
import LocationIcon from "../Components/Icons/LocationIcon";
import ContactsPage from "../Components/Contacts/ContactsPage";

export default function Contacts({ auth }) {
    const { data, setData, post, processing, reset, errors, clearErrors } = useForm({
        name: "",
        email: "",
        phone: "",
        company: "",
        message: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("contacts.send"), {
            onSuccess: () => {
                reset();
                clearErrors();
            },
        });
    };


    return (
        <>
            {auth.user ? (
                <AuthenticatedLayout auth={auth}>
                    <ContactsPage handleSubmit={handleSubmit} data={data} setData={setData} errors={errors} processing={processing} />
                </AuthenticatedLayout>
            ) : (
                <Layout auth={auth}>
                    <ContactsPage handleSubmit={handleSubmit} data={data} setData={setData} errors={errors} processing={processing} />
                </Layout>
            )}
        </>
    );
}
