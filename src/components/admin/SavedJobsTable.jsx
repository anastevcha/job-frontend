import React from "react";
import { useSelector } from "react-redux";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Briefcase, MapPin, AlertCircle } from "lucide-react";

const SavedJobsTable = () => {
    const { savedJobs } = useSelector((store) => store.job);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="overflow-x-auto bg-white rounded-xl shadow-md border border-gray-200"
        >
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                            Вакансия
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                            Компания
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                            Местоположение
                        </th>
                        <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700 uppercase tracking-wider">
                            Действие
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {Array.isArray(savedJobs) && savedJobs.length > 0 ? (
                        savedJobs.map((job) => (
                            <motion.tr
                                key={job._id}
                                whileHover={{ backgroundColor: "#f9fafb" }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                className="cursor-pointer hover:bg-gray-50 transition-colors"
                            >
                                <td className="px-6 py-4 whitespace-nowrap flex items-center gap-3">
                                    <Briefcase className="h-5 w-5 text-[#3995ca]" />
                                    <span className="font-medium">{job?.title}</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {job?.company?.name || "—"}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap flex items-center gap-2">
                                    <MapPin className="h-4 w-4 text-gray-400" />
                                    <span>{job?.location}</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                    <Button
                                        asChild
                                        variant="outline"
                                        size="sm"
                                        className="text-[#3995ca] border-[#3995ca] hover:bg-[#3995ca] hover:text-white transition-colors"
                                    >
                                        <Link to={`/description/${job._id}`} onClick={(e) => e.stopPropagation()}>
                                            Подробнее
                                        </Link>
                                    </Button>
                                </td>
                            </motion.tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="py-10 text-center">
                                <div className="flex flex-col items-center justify-center">
                                    <Briefcase className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                                    <h3 className="font-medium text-lg">Вы ещё не сохранили ни одной вакансии</h3>
                                    <p className="text-gray-500 mt-2">После сохранения вакансии появятся здесь</p>
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </motion.div>
    );
};

export default SavedJobsTable;