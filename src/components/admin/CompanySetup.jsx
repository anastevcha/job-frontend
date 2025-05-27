import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import useGetCompanyById from "@/hooks/useGetCompanyById";
import { motion } from "framer-motion";
import { Avatar, AvatarImage } from "../ui/avatar";


const CompanySetup = () => {
    const params = useParams();
    useGetCompanyById(params.id);
    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null,
    });
    const { singleCompany } = useSelector((store) => store.company);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Обработчики событий
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setInput({ ...input, file });
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("website", input.website);
        formData.append("location", input.location);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            setLoading(true);
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
            });

            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/companies");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Ошибка при обновлении компании");
        } finally {
            setLoading(false);
        }
    };

    // Заполняем форму данными из Redux
    useEffect(() => {
        if (singleCompany?._id) {
            setInput({
                name: singleCompany.name || "",
                description: singleCompany.description || "",
                website: singleCompany.website || "",
                location: singleCompany.location || "",
                file: singleCompany.logo || null,
            });
        }
    }, [singleCompany]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-gray-50"
        >
            <Navbar />

            <div className="max-w-xl mx-auto my-10 px-4">
                <motion.form
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    onSubmit={submitHandler}
                    className="bg-white p-6 rounded-xl shadow-md border border-gray-200"
                >
                    {/* Кнопка "Назад" + Заголовок */}
                    <motion.div
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="flex items-center gap-3 mb-6"
                    >
                        <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => navigate("/admin/companies")}
                            className="h-9 w-9 text-gray-500 hover:text-gray-700"
                        >
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <h1 className="font-bold text-xl">Редактирование компании</h1>
                    </motion.div>

                    {/* Форма */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <Label>Название компании</Label>
                            <Input
                                type="text"
                                name="name"
                                value={input.name}
                                onChange={changeEventHandler}
                                placeholder="Введите название"
                            />
                        </div>
                        <div>
                            <Label>Местоположение</Label>
                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                                placeholder="Введите местоположение"
                            />
                        </div>
                        <div className="col-span-2">
                            <Label>Описание</Label>
                            <Input
                                as="textarea"
                                rows="4"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                placeholder="Добавьте описание компании..."
                                className="resize-none"
                            />
                        </div>
                        <div>
                            <Label>Веб-сайт</Label>
                            <Input
                                type="text"
                                name="website"
                                value={input.website}
                                onChange={changeEventHandler}
                                placeholder="https://example.com "
                            />
                        </div>
                        <div>
                            <Label>Логотип</Label>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={changeFileHandler}
                                className="cursor-pointer"
                            />
                            
                            {input.file && (
                                <div className="mt-2 flex items-center gap-2">
                                    <Avatar className="h-10 w-10 ring-1 ring-gray-300">
                                        {typeof input.file === "string" ? (
                                            <AvatarImage src={input.file} alt="Логотип компании" />
                                        ) : (
                                            <AvatarImage src={URL.createObjectURL(input.file)} alt="Предпросмотр логотипа" />
                                        )}
                                    </Avatar>
                                    <span className="text-xs text-gray-500 truncate max-w-[140px]">
                                        {typeof input.file === "string" ? "Файл уже загружен" : input.file.name}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Кнопка отправки */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="mt-6"
                    >
                        {loading ? (
                            <Button disabled className="w-full flex items-center justify-center gap-2">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                <span>Обновление...</span>
                            </Button>
                        ) : (
                            <Button type="submit" className="w-full bg-[#3995ca] hover:bg-[#2e78a3]">
                                Обновить
                            </Button>
                        )}
                    </motion.div>
                </motion.form>
            </div>
        </motion.div>
    );
};

export default CompanySetup;