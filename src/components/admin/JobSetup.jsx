import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Button } from '../ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs';
import { motion } from "framer-motion";
import { Briefcase, Edit2} from "lucide-react";

const JOB_API_END_POINT = "http://localhost:8000/api/v1/job"; 

const JobSetup = () => {
    const params = useParams();
    const navigate = useNavigate();

    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0,
        companyId: ""
    });

    const [loading, setLoading] = useState(false);
    const { singleJob } = useSelector((store) => store.job); 
    const { companies } = useSelector((store) => store.company); 

    // Получаем текущую вакансию по ID
    useGetAllAdminJobs();

    
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find(
            (company) => company.name.toLowerCase() === value
        );
        setInput({ ...input, companyId: selectedCompany?._id || "" });
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        if (!input.title || !input.description || !input.requirements) {
            return toast.error("Пожалуйста, заполните обязательные поля");
        }

        setLoading(true);
        try {
            const res = await axios.put(
                `${JOB_API_END_POINT}/update/${params.id}`,
                input,
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true
                }
            );

            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs"); 
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Ошибка при обновлении вакансии");
        } finally {
            setLoading(false);
        }
    };

    // Устанавливаем начальные значения из Redux
    useEffect(() => {
        if (singleJob) {
            setInput({
                title: singleJob.title || "",
                description: singleJob.description || "",
                requirements: singleJob.requirements || "",
                salary: singleJob.salary || "",
                location: singleJob.location || "",
                jobType: singleJob.jobType || "",
                experience: singleJob.experienceLevel || "",
                position: singleJob.position || 0,
                companyId: singleJob.company?._id || "",
            });
        }
    }, [singleJob]);

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
                
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="flex items-center gap-3 mb-6"
                >
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => navigate("/admin/jobs")}
                        className="h-9 w-9 text-gray-500 hover:text-gray-700"
                    >
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <h1 className="font-bold text-2xl">Редактирование вакансии</h1>
                </motion.div>

                
                <motion.form
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    onSubmit={submitHandler}
                    className="bg-white p-6 rounded-xl shadow-md border border-gray-200"
                >
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div>
                            <Label>Название вакансии</Label>
                            <div className="relative mt-2">
                                <Briefcase className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input
                                    type="text"
                                    name="title"
                                    value={input.title}
                                    onChange={changeEventHandler}
                                    placeholder="Фронтенд-разработчик"
                                    className="pl-9 focus:ring-2 focus:ring-[#3995ca]"
                                />
                            </div>
                        </div>

                        <div>
                            <Label>Местоположение</Label>
                            <div className="relative mt-2">
                                <Briefcase className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input
                                    type="text"
                                    name="location"
                                    value={input.location}
                                    onChange={changeEventHandler}
                                    placeholder="Москва"
                                    className="pl-9 focus:ring-2 focus:ring-[#3995ca]"
                                />
                            </div>
                        </div>

                        <div>
                            <Label>Описание</Label>
                            <Input
                                as="textarea"
                                rows="3"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                placeholder="Добавьте описание вакансии..."
                                className="mt-2 resize-none focus:ring-2 focus:ring-[#3995ca]"
                            />
                        </div>

                        <div>
                            <Label>Требования</Label>
                            <Input
                                as="textarea"
                                rows="3"
                                name="requirements"
                                value={input.requirements}
                                onChange={changeEventHandler}
                                placeholder="Какие навыки требуются..."
                                className="mt-2 resize-none focus:ring-2 focus:ring-[#3995ca]"
                            />
                        </div>

                        <div>
                            <Label>Заработная плата (тыс. руб.)</Label>
                            <div className="relative mt-2">
                                <Briefcase className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input
                                    type="text"
                                    name="salary"
                                    value={input.salary}
                                    onChange={changeEventHandler}
                                    placeholder="Зарплата"
                                    className="pl-9 focus:ring-2 focus:ring-[#3995ca]"
                                />
                            </div>
                        </div>

                        <div>
                            <Label>График работы</Label>
                            <div className="relative mt-2">
                                <Briefcase className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input
                                    type="text"
                                    name="jobType"
                                    value={input.jobType}
                                    onChange={changeEventHandler}
                                    placeholder="Полный день / Удалёнка"
                                    className="pl-9 focus:ring-2 focus:ring-[#3995ca]"
                                />
                            </div>
                        </div>

                        <div>
                            <Label>Опыт работы (лет)</Label>
                            <div className="relative mt-2">
                                <Edit2 className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input
                                    type="number"
                                    name="experience"
                                    value={input.experience}
                                    onChange={changeEventHandler}
                                    placeholder="2"
                                    className="pl-9 focus:ring-2 focus:ring-[#3995ca]"
                                />
                            </div>
                        </div>

                        <div>
                            <Label>Количество мест</Label>
                            <div className="relative mt-2">
                                <Briefcase className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input
                                    type="number"
                                    name="position"
                                    value={input.position}
                                    onChange={changeEventHandler}
                                    placeholder="1"
                                    className="pl-9 focus:ring-2 focus:ring-[#3995ca]"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Выбор компании */}
                    {companies && companies.length > 0 ? (
                        <div className="mb-6">
                            <Label>Выберите компанию</Label>
                            <Select onValueChange={selectChangeHandler} defaultValue={input.companyId}>
                                <SelectTrigger className="w-full mt-2">
                                    <SelectValue placeholder="Выберите компанию..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {companies.map((company) => (
                                            <SelectItem key={company._id} value={company.name.toLowerCase()}>
                                                {company.name}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    ) : (
                        <p className="text-xs text-red-600 font-semibold py-4 text-center">
                            ❗ Сначала зарегистрируйте компанию, прежде чем создавать вакансию
                        </p>
                    )}

                    {/* Кнопка отправки */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="mt-6"
                    >
                        {loading ? (
                            <Button disabled className="w-full flex items-center justify-center gap-2">
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Обновление...
                            </Button>
                        ) : (
                            <Button type="submit" className="w-full bg-[#3995ca] hover:bg-[#2e78a3]">
                                Обновить вакансию
                            </Button>
                        )}
                    </motion.div>
                </motion.form>
            </div>
        </motion.div>
    );
};

export default JobSetup;