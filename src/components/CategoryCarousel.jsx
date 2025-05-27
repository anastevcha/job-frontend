import React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";
import { motion } from "framer-motion";

const categories = [
    "Фронтенд-разработчик",
    "Бэкенд-разработчик",
    "Разработчик базы данных",
    "Графический дизайнер",
    "Fullstack-разработчик",
    "Менеджер по продажам",
    "Системный аналитик",
    "UX/UI-дизайнер"
];

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-4xl mx-auto my-20"
        >
            <h2 className="text-center text-lg font-medium mb-6 text-gray-700">Попробуйте по популярным категориям</h2>
            <Carousel className="relative">
                <CarouselContent>
                    {categories.map((cat, index) => (
                        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-2"
                            >
                                <Button
                                    onClick={() => searchJobHandler(cat)}
                                    variant="outline"
                                    className="rounded-full w-full justify-start px-4 py-6 text-left hover:bg-[#3995ca] hover:text-white transition-all duration-300"
                                >
                                    {cat}
                                </Button>
                            </motion.div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="left-0 -translate-y-1/2" />
                <CarouselNext className="right-0 -translate-y-1/2" />
            </Carousel>
        </motion.div>
    );
};

export default CategoryCarousel;