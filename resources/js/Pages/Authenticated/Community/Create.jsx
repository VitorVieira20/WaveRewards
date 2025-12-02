import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";
import { useState } from "react";
import XIcon from "../../../Components/Icons/XIcon";
import CustomTagSelect from "../../../Components/CustomTagSelect";
import LeftArrowIcon from "../../../Components/Icons/LeftArrowIcon";

export default function CommunityCreate({ auth, tags }) {
    const [selectedTags, setSelectedTags] = useState([]);

    const availableTags = tags.filter(tag => !selectedTags.includes(tag.label));

    const { data, setData, post, processing, errors } = useForm({
        content: '',
        tags: [],
    });

    const handleTagChange = (selectedOptions) => {
        setSelectedTags([selectedOptions.label]);
        setData("tags", [selectedOptions.value]);
    };

    const handleRemoveTag = (tagToRemove) => {
        setSelectedTags(prev => prev.filter(tag => tag !== tagToRemove));

        const tagToRemoveObj = tags.find(tag => tag.label === tagToRemove);

        if (tagToRemoveObj) {
            setData("tags", data.tags.filter(tagId => tagId !== tagToRemoveObj.value));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('community.store'));
    };

    return (
        <AuthenticatedLayout auth={auth}>
            <h1 className="fixed flex gap-3 w-full text-[#1A3463] pb-4 px-6 md:px-16 text-3xl md:text-5xl font-semibold z-50 bg-linear-to-b from-[#EAF5FA] to-[#DDEFF7] 3xl:to-[#E7F3F9]">
                <button
                    type="button"
                    onClick={() => window.history.back()}
                    className="flex items-center cursor-pointer"
                >
                    <LeftArrowIcon color="#1C5E8F" />
                </button>

                Comunidade
            </h1>

            <div className="pt-24 pb-10 px-4 md:px-16 min-h-screen">
                <div className="bg-[#FFFFFF]/40 backdrop-blur-sm rounded-3xl p-8 max-w-full mx-auto shadow-sm">
                    <h2 className="text-[#1C5E8F] text-xl font-semibold mb-6">Novo comentário</h2>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                        <div>
                            <label className="block text-[#1C5E8F] font-semibold text-md mb-2">Descrição:</label>
                            <textarea
                                rows="6"
                                placeholder="Escreve a tua mensagem..."
                                value={data.content}
                                onChange={e => setData('content', e.target.value)}
                                className="w-full rounded-2xl border-none p-4 text-sm text-[#1C5E8F] bg-white resize-none focus:ring-2 focus:ring-[#1C5E8F]/20"
                            ></textarea>
                            {errors.content && <p className="text-red-500 text-xs mt-1">{errors.content}</p>}
                        </div>

                        <div>
                            <label className="block text-[#1C5E8F] font-semibold text-md mb-2">Tags:</label>
                            <div className="flex flex-wrap gap-2 mt-2">

                                {selectedTags.length === 0 && (
                                    <CustomTagSelect
                                        text="Escolha a Tag..."
                                        options={availableTags}
                                        value={data.tags}
                                        onChange={handleTagChange}
                                    />
                                )}

                                {selectedTags.map((tag, index) => (
                                    <span key={index} className="flex items-center gap-1 px-4 py-2 bg-[#1C5E8F] text-white text-md rounded-full">
                                        {tag ? tag.charAt(0).toUpperCase() + tag.slice(1) : ""}
                                        <button type="button" onClick={() => handleRemoveTag(tag)} className="text-[#1C5E8F] hover:text-[#1C5E8F]/70 cursor-pointer">
                                            <XIcon className="w-4 h-4" />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-end mt-4">
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-[#6EA8C5] hover:bg-[#5A92AF] text-white font-bold py-3 px-10 rounded-full shadow-lg transition-transform active:scale-95 disabled:opacity-70 cursor-pointer hover:scale-105"
                            >
                                Partilhar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}