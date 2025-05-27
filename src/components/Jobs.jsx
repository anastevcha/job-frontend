import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector((store) => store.job);
    const [filteredJobs, setFilteredJobs] = useState(allJobs);

    // Логика фильтрации
    useEffect(() => {
        if (!allJobs || allJobs.length === 0) {
            setFilteredJobs([]);
            return;
        }

        if (!searchedQuery || searchedQuery.trim() === "") {
            setFilteredJobs(allJobs);
            return;
        }

        const queryWords = searchedQuery
            .toLowerCase()
            .split(" ")
            .filter((word) => word.trim() !== "");

        
        const locations = ["москва", "санкт-петербург", "екатеринбург", "казань", "новосибирск"];
        const positions = ["фронтенд-разработчик", "бэкенд-разработчик", "fullstack-разработчик"];
        const salaries = ["0-40", "42-80", "82-150"];

        const selectedLocations = queryWords.filter(word => locations.includes(word));
        const selectedPositions = queryWords.filter(word => positions.includes(word));
        const selectedSalaries = queryWords.filter(word => salaries.includes(word));

        const filtered = allJobs.filter((job) => {
            const title = job.title?.toLowerCase() || "";
            const description = job.description?.toLowerCase() || "";
            const location = job.location?.toLowerCase() || "";
            const salary = job.salary || "";

            //  Должность — хотя бы одно слово должно совпасть в title или description
            const matchPosition = selectedPositions.length === 0 ||
                selectedPositions.some(
                    word => title.includes(word) || description.includes(word)
                );

            //  Местоположение — хотя бы одно совпадение
            const matchLocation = selectedLocations.length === 0 ||
                selectedLocations.some(word => location.includes(word));

            //  Зарплата — проверяем диапазон
            const matchSalary = selectedSalaries.length === 0 ||
                selectedSalaries.some(range => {
                    const [minStr, maxStr] = range.split("-").map(part => part.trim());
                    const min = parseInt(minStr);
                    const max = parseInt(maxStr);
                    return salary >= min && salary <= max;
                });

           
            return matchPosition && matchLocation && matchSalary;
        });

        setFilteredJobs(filtered);
    }, [allJobs, searchedQuery]);

    return (
        <div>
            <Navbar />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="max-w-7xl mx-auto mt-5"
            >
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Боковая панель фильтров */}
                    <div className="md:w-1/4 lg:w-1/5">
                        <FilterCard />
                    </div>

                    
                    <motion.div
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="flex-1 h-[88vh] overflow-y-auto pb-5"
                    >
                        {filteredJobs.length <= 0 ? (
                            <motion.p
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -20, opacity: 0 }}
                                className="text-center text-gray-500 py-10"
                            >
                                Вакансии не найдены
                            </motion.p>
                        ) : (
                            <motion.div
                                layout
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                            >
                                {filteredJobs.map((job) => (
                                    <motion.div
                                        key={job._id}
                                        layout
                                        initial={{ opacity: 0, x: 100 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -100 }}
                                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                                    >
                                        <Job job={job} />
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default Jobs;