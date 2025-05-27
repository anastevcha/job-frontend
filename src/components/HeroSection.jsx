import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        if (query.trim()) {
            dispatch(setSearchedQuery(query));
            navigate("/browse");
        } else {
            alert("Введите запрос для поиска вакансий");
        }
    };

    return (
        <div className="text-center px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col gap-5 my-16"
            >
                
                <motion.span
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mx-auto px-5 py-2 rounded-full bg-gradient-to-r from-[#3995ca] to-[#7209b7] text-white font-medium inline-block w-fit"
                >
                    Дипломный проект
                </motion.span>

                
                <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="text-4xl sm:text-5xl font-bold leading-tight max-w-3xl mx-auto"
                >
                    Находите, откликайтесь & <br /> устраивайтесь на{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F83002] to-[#3995ca]">
                        работу мечты
                    </span>
                </motion.h1>

                
                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="text-lg text-gray-600 max-w-xl mx-auto"
                >
                    Приложение для управления рекрутинговыми процессами
                </motion.p>

                
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="flex w-full max-w-2xl shadow-xl border border-gray-200 pl-4 pr-2 py-2 rounded-full items-center gap-3 mx-auto bg-white focus-within:ring-2 focus-within:ring-[#3995ca] transition-all"
                >
                    <input
                        type="text"
                        placeholder="Например: Фронтенд-разработчик"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="outline-none border-none w-full text-lg px-2"
                    />
                    <Button
                        onClick={searchJobHandler}
                        className="rounded-full bg-gradient-to-r from-[#3995ca] to-[#7209b7] hover:from-[#2a7ab0] hover:to-[#5f32ad] transition-all"
                    >
                        <Search className="h-5 w-5" />
                    </Button>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default HeroSection;