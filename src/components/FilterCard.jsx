import React, { useEffect, useState } from "react";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { motion } from "framer-motion";

const filterData = [
    {
        filterType: "Местоположение",
        array: ["Москва", "Санкт-Петербург", "Новосибирск", "Казань", "Екатеринбург"],
    },
    {
        filterType: "Должность",
        array: ["Фронтенд-разработчик", "Бэкенд-разработчик", "Fullstack-разработчик"],
    },
    {
        filterType: "Заработная плата (в тысячах рублей)",
        array: ["0-40", "42-80", "82-150"],
    },
];

const FilterCard = () => {
    const [selectedFilters, setSelectedFilters] = useState({});
    const dispatch = useDispatch();

    
    useEffect(() => {
        const activeFilters = Object.values(selectedFilters).flat();
        const query = activeFilters.join(" ");
        dispatch(setSearchedQuery(query));
    }, [selectedFilters]);

   
    const toggleFilter = (filterType, value) => {
        setSelectedFilters((prev) => {
            const current = prev[filterType] || [];
            const updated = current.includes(value)
                ? current.filter((item) => item !== value)
                : [...current, value];

            return {
                ...prev,
                [filterType]: updated
            };
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full bg-white p-5 rounded-xl shadow-md border border-gray-200"
        >
            <h2 className="font-bold text-lg mb-4">Фильтрация вакансий</h2>
            <hr className="mb-4" />

            {filterData.map((data, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="mb-6 last:mb-0"
                >
                    <h3 className="text-sm font-medium text-gray-500">{data.filterType}</h3>
                    <div className="mt-2 space-y-2">
                        {data.array.map((item, idx) => {
                            const id = `id${index}-${idx}`;
                            const isSelected = selectedFilters[data.filterType]?.includes(item);

                            return (
                                <div key={id} className="flex items-center gap-2">
                                    <Checkbox
                                        id={id}
                                        checked={isSelected}
                                        onCheckedChange={() => toggleFilter(data.filterType, item)}
                                    />
                                    <Label htmlFor={id}>{item}</Label>
                                </div>
                            );
                        })}
                    </div>
                </motion.div>
            ))}
        </motion.div>
    );
};

export default FilterCard;