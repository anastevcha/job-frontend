import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import { useDispatch, useSelector } from "react-redux";
import { setSearchCompanyByText } from "@/redux/companySlice";
import { motion } from "framer-motion";
import { Search, Briefcase, AlertCircle } from "lucide-react";

const Companies = () => {
    useGetAllCompanies();
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Отправляем текст поиска в Redux
    useEffect(() => {
        dispatch(setSearchCompanyByText(input));
    }, [input]);

    const { companies } = useSelector((store) => store.company);

    // Локальная фильтрация для мгновенного отображения
    const filteredCompanies = input
        ? companies?.filter((company) =>
            company?.name?.toLowerCase().includes(input.toLowerCase())
        )
        : companies;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-gray-50"
        >
            <Navbar />

            <div className="max-w-6xl mx-auto my-10 px-4">
                
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8 p-4 bg-white rounded-xl shadow-sm border border-gray-200"
                >
                    
                    <h1 className="text-xl font-bold flex items-center gap-2">
                        <Briefcase className="h-5 w-5 text-[#3995ca]" />
                        Ваши компании
                    </h1>

                    
                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                        <div className="relative w-full sm:max-w-md">
                            <Search className="absolute left-3 top-3 h-4 w-4  text-gray-500" />
                            <Input
                                type="text"
                                placeholder="Поиск по названию"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                className="pl-9 w-full py-2 focus:ring-2 focus:ring-[#3995ca]"
                            />
                        </div>
                        <Button
                            onClick={() => navigate("/admin/companies/create")}
                            className="bg-[#3995ca] hover:bg-[#2e78a3] text-white whitespace-nowrap"
                        >
                            Новая компания
                        </Button>
                    </div>
                </motion.div>

                
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden"
                >
                    {Array.isArray(filteredCompanies) && filteredCompanies.length > 0 ? (
                        <CompaniesTable companies={filteredCompanies} />
                    ) : (
                        <div className="p-10 text-center">
                            {input ? (
                                <>
                                    <AlertCircle className="mx-auto h-12 w-12 text-yellow-500 mb-3" />
                                    <h2 className="font-medium text-lg">Ничего не найдено</h2>
                                    <p className="text-gray-500 mt-2">
                                        Нет компаний по запросу "<strong>{input}</strong>". Попробуйте другой запрос.
                                    </p>
                                </>
                            ) : (
                                <div className="flex flex-col items-center justify-center">
                                    <Briefcase className="h-12 w-12 text-gray-300 mb-3" />
                                    <h2 className="font-medium text-lg">Список компаний пуст</h2>
                                    <p className="text-gray-500 mt-2">Добавьте свою первую компанию</p>
                                    <Button
                                        onClick={() => navigate("/admin/companies/create")}
                                        className="mt-4 bg-[#3995ca] hover:bg-[#2e78a3] text-white"
                                    >
                                        Создать компанию
                                    </Button>
                                </div>
                            )}
                        </div>
                    )}
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Companies;