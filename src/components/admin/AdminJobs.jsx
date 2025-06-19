import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";
import { setSearchJobByText } from "@/redux/jobSlice";
import { motion } from "framer-motion";
import { Search, Briefcase, AlertCircle } from "lucide-react";

const AdminJobs = () => {
    useGetAllAdminJobs();
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    
    useEffect(() => {
        dispatch(setSearchJobByText(input));
    }, [input]);

    const { allAdminJobs } = useSelector((store) => store.job);

    // локальная фильтрация, чтобы результат мгновенно отображался
    const filteredJobs = input
        ? allAdminJobs?.filter(
              (job) =>
                  job?.title?.toLowerCase().includes(input.toLowerCase()) ||
                  job?.company?.name?.toLowerCase().includes(input.toLowerCase())
          )
        : allAdminJobs;

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
                    
                    <h1 className="font-bold text-xl flex items-center gap-2">
                        <Briefcase className="h-5 w-5 text-[#3995ca]" />
                        Ваши вакансии
                    </h1>

                    
                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                        <div className="relative w-full sm:max-w-md">
                            <Search className="absolute left-3 top-3 h-4 w-4  text-gray-500" />
                            <Input
                                type="text"
                                placeholder="Поиск по названию, должности"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                className="pl-9 w-full py-2 focus:ring-2 focus:ring-[#3995ca]"
                            />
                        </div>
                        <Button
                            onClick={() => navigate("/admin/jobs/create")}
                            className="bg-[#3995ca] hover:bg-[#2e78a3] text-white whitespace-nowrap"
                        >
                            Новая вакансия
                        </Button>
                    </div>
                </motion.div>

               
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden"
                >
                    {Array.isArray(filteredJobs) && filteredJobs.length > 0 ? (
                        <AdminJobsTable jobs={filteredJobs} />
                    ) : (
                        <div className="p-10 text-center">
                            {input ? (
                                <>
                                    <AlertCircle className="mx-auto h-12 w-12 text-yellow-500 mb-3" />
                                    <h2 className="font-medium text-lg">Ничего не найдено</h2>
                                    <p className="text-gray-500 mt-2">
                                        Нет вакансий по запросу "<strong>{input}</strong>". Попробуйте другой запрос.
                                    </p>
                                </>
                            ) : (
                                <>
                                    <Briefcase className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                                    <h2 className="font-medium text-lg">Вы ещё не создали ни одной вакансии</h2>
                                    <p className="text-gray-500 mt-2">Создайте свою первую вакансию прямо сейчас</p>
                                    <Button
                                        onClick={() => navigate("/admin/jobs/create")}
                                        className="mt-4 bg-[#3995ca] hover:bg-[#2e78a3] text-white"
                                    >
                                        Создать вакансию
                                    </Button>
                                </>
                            )}
                        </div>
                    )}
                </motion.div>
            </div>
        </motion.div>
    );
};

export default AdminJobs;