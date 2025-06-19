import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { JOB_API_END_POINT } from "@/utils/constant";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

const companyArray = [];

const PostJob = () => {
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
    const navigate = useNavigate();
    const { companies } = useSelector((store) => store.company);
    const [loading, setLoading] = useState(false);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find(
            (company) => company.name.toLowerCase() === value
        );
        if (selectedCompany) {
            setInput({ ...input, companyId: selectedCompany._id });
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();

       
        if (!input.title || !input.description || !input.requirements || !input.companyId) {
            return toast.error("Пожалуйста, заполните все обязательные поля");
        }

        setLoading(true);
        try {
            const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });

            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            console.error("Ошибка при публикации вакансии:", error);
            toast.error(error.response?.data?.message || "Не удалось опубликовать вакансию");
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

            <div className="flex items-center justify-center w-full my-10 px-4">
                <motion.form
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    onSubmit={submitHandler}
                    className="bg-white p-6 rounded-xl shadow-md border border-gray-200 w-full max-w-4xl"
                >
                   
                    <motion.h1
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="font-bold text-2xl flex items-center gap-2 mb-6"
                    >
                        <Briefcase className="h-6 w-6 text-[#3995ca]" />
                        <span>Создание новой вакансии</span>
                    </motion.h1>

                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        
                        <div>
                            <Label className="flex items-center gap-2">
                                <Briefcase className="h-4 w-4 text-gray-400" />
                                Название вакансии
                            </Label>
                            <Input
                                type="text"
                                name="title"
                                value={input.title}
                                onChange={changeEventHandler}
                                placeholder="Фронтенд-разработчик"
                                className="mt-2 pl-9 focus:ring-2 focus:ring-[#3995ca]"
                            />
                        </div>

                        
                        <div>
                            <Label className="flex items-center gap-2">
                                <Briefcase className="h-4 w-4 text-gray-400" />
                                Местоположение
                            </Label>
                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                                placeholder="Москва"
                                className="mt-2 pl-9 focus:ring-2 focus:ring-[#3995ca]"
                            />
                        </div>

                        
                        <div className="md:col-span-2">
                            <Label className="flex items-center gap-2">
                                <Briefcase className="h-4 w-4 text-gray-400" />
                                Описание
                            </Label>
                            <Input
                                as="textarea"
                                rows="3"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                placeholder="Добавьте описание вакансии..."
                                className="mt-2 pl-9 resize-none focus:ring-2 focus:ring-[#3995ca]"
                            />
                        </div>

                       
                        <div className="md:col-span-2">
                            <Label className="flex items-center gap-2">
                                <Briefcase className="h-4 w-4 text-gray-400" />
                                Требования
                            </Label>
                            <Input
                                as="textarea"
                                rows="3"
                                name="requirements"
                                value={input.requirements}
                                onChange={changeEventHandler}
                                placeholder="Какие навыки требуются..."
                                className="mt-2 pl-9 resize-none focus:ring-2 focus:ring-[#3995ca]"
                            />
                        </div>

                        
                        <div>
                            <Label className="flex items-center gap-2">
                                <Briefcase className="h-4 w-4 text-gray-400" />
                                Заработная плата (тысяч рублей)
                            </Label>
                            <Input
                                type="text"
                                name="salary"
                                value={input.salary}
                                onChange={changeEventHandler}
                                placeholder="Например: 100"
                                className="mt-2 pl-9 focus:ring-2 focus:ring-[#3995ca]"
                            />
                        </div>

                        
                        <div>
                            <Label className="flex items-center gap-2">
                                <Briefcase className="h-4 w-4 text-gray-400" />
                                График работы
                            </Label>
                            <Input
                                type="text"
                                name="jobType"
                                value={input.jobType}
                                onChange={changeEventHandler}
                                placeholder="Полный день / Удалёнка"
                                className="mt-2 pl-9 focus:ring-2 focus:ring-[#3995ca]"
                            />
                        </div>

                        
                        <div>
                            <Label className="flex items-center gap-2">
                                <Briefcase className="h-4 w-4 text-gray-400" />
                                Опыт работы (лет)
                            </Label>
                            <Input
                                type="number"
                                name="experience"
                                value={input.experience}
                                onChange={changeEventHandler}
                                placeholder="Например: 2"
                                className="mt-2 pl-9 focus:ring-2 focus:ring-[#3995ca]"
                            />
                        </div>

                        
                        <div>
                            <Label className="flex items-center gap-2">
                                <Briefcase className="h-4 w-4 text-gray-400" />
                                Количество мест
                            </Label>
                            <Input
                                type="number"
                                name="position"
                                value={input.position}
                                onChange={changeEventHandler}
                                placeholder="Например: 1"
                                className="mt-2 pl-9 focus:ring-2 focus:ring-[#3995ca]"
                            />
                        </div>
                    </div>

                    
                    {companies.length > 0 ? (
                        <div className="mb-6">
                            <Label>Выберите компанию</Label>
                            <Select onValueChange={selectChangeHandler}>
                                <SelectTrigger className="w-full mt-2">
                                    <SelectValue placeholder="Выберите компанию" />
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
                        <p className="text-xs text-red-600 font-semibold py-4">
                            ❗ Сначала зарегистрируйте компанию, прежде чем создавать вакансию
                        </p>
                    )}

                    
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="mt-6"
                    >
                        {loading ? (
                            <Button disabled className="w-full flex items-center justify-center gap-2">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                <span>Публикуется...</span>
                            </Button>
                        ) : (
                            <Button type="submit" className="w-full bg-[#3995ca] hover:bg-[#2e78a3]">
                                Опубликовать вакансию
                            </Button>
                        )}
                    </motion.div>
                </motion.form>
            </div>
        </motion.div>
    );
};

export default PostJob;