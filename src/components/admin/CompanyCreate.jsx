import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button"; 
import axios from "axios";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CompanyCreate = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [companyName, setCompanyName] = useState("");
    const [loading, setLoading] = useState(false);

    const registerNewCompany = async () => {
        // Проверка на пустой ввод
        if (!companyName || companyName.trim() === "") {
            toast.error("Пожалуйста, введите название компании");
            return;
        }

        setLoading(true);
        try {
            const res = await axios.post(
                `${COMPANY_API_END_POINT}/register`,
                { companyName },
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true
                }
            );

            if (res?.data?.success) {
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.error("Ошибка при регистрации компании:", error);
            toast.error(error.response?.data?.message || "Ошибка регистрации компании");
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-gray-50"
        >
            <Navbar />

            <div className="max-w-4xl mx-auto px-4 py-10">
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="bg-white p-8 rounded-xl shadow-md border border-gray-200"
                >
                    {/* Заголовок */}
                    <motion.h1
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="font-bold text-2xl mb-2 flex items-center gap-3"
                    >
                        <Briefcase className="h-6 w-6 text-[#3995ca]" />
                        Название вашей компании
                    </motion.h1>
                    <motion.p
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-gray-500 mb-6"
                    >
                        Какое название у вашей компании? Вы можете изменить это позже.
                    </motion.p>

                    {/* Поле ввода */}
                    <motion.div
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mb-8"
                    >
                        <Label className="flex items-center gap-2">
                            <Briefcase className="h-4 w-4 text-gray-500" />
                            Название компании
                        </Label>
                        <Input
                            type="text"
                            placeholder="Microsoft, Google, Яндекс..."
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            className="mt-2 w-full focus:ring-2 focus:ring-[#3995ca] focus:outline-none"
                            aria-label="Введите название компании"
                        />
                    </motion.div>

                    {/* Кнопки */}
                    <motion.div
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="flex flex-col sm:flex-row gap-3 mt-6"
                    >
                        <Button
                            variant="outline"
                            onClick={() => navigate("/admin/companies")}
                            disabled={loading}
                            className="w-full sm:w-auto"
                            type="button"
                        >
                            Отмена
                        </Button>
                        <Button
                            onClick={registerNewCompany}
                            disabled={loading}
                            className="w-full sm:w-auto bg-[#3995ca] hover:bg-[#2e78a3] text-white"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Регистрация...
                                </>
                            ) : (
                                "Продолжить"
                            )}
                        </Button>
                    </motion.div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default CompanyCreate;