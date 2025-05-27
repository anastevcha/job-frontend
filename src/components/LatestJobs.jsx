import React from "react";
import LatestJobCards from "./LatestJobCards";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const LatestJobs = () => {
    const { allJobs } = useSelector((store) => store.job);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-7xl mx-auto my-20"
        >
            <h1 className="text-4xl font-bold">
                Последние & Лучшие{" "}
                <span className="text-[#3995ca]">открытые вакансии</span>
            </h1>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-gray-600 mt-2"
            >
                Найдите подходящую работу из последних предложений
            </motion.p>

            <motion.div
                initial="hidden"
                whileInView="visible"
                variants={{
                    hidden: {},
                    visible: {
                        transition: {
                            staggerChildren: 0.15,
                        },
                    },
                }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
            >
                {allJobs.length <= 0 ? (
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="col-span-full text-center text-gray-500 text-lg py-10"
                    >
                        Вакансии не найдены
                    </motion.span>
                ) : (
                    allJobs.slice(0, 6).map((job) => (
                        <motion.div
                            key={job._id}
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0 }
                            }}
                        >
                            <LatestJobCards job={job} />
                        </motion.div>
                    ))
                )}
            </motion.div> 
        </motion.div>
    );
};

export default LatestJobs;