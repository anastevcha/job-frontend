import React, { useState } from "react";
import { Button } from "./ui/button";
import { Bookmark, Loader2 } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useSelector, useDispatch } from "react-redux";
import {saveJob, unsaveJob } from "@/redux/jobSlice";
import { motion } from "framer-motion";

const Job = ({ job }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    // получаем список сохранённых вакансий
    const savedJobs = useSelector((store) => store.job.savedJobs);
    const isSaved = savedJobs?.some(savedJob => savedJob._id === job._id);

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
    };

    const saveJobHandler = async () => {
        if (!job?._id) return;

        setLoading(true);
        try {
            if (isSaved) {
                
                const res = await axios.post(
                    `${JOB_API_END_POINT}/unsave/${job._id}`,
                    {},
                    { withCredentials: true }
                );

                if (res.data.success) {
                    toast.info("Вакансия удалена из сохранённых");
                    dispatch(unsaveJob(job._id)); 
                }

            } else {
                
                const res = await axios.post(
                    `${JOB_API_END_POINT}/save/${job._id}`,
                    {},
                    { withCredentials: true }
                );

                if (res.data.success) {
                    toast.success(res.data.message);
                    dispatch(saveJob(job)); 
                }
            }
        } catch (error) {
            console.error("Ошибка при сохранении/удалении вакансии:", error);
            
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-6 rounded-xl shadow-md bg-white border border-gray-200 hover:shadow-lg transition-shadow"
        >
            
            
            <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-gray-500">
                    {daysAgoFunction(job?.createdAt) === 0 ? "Сегодня" : `${daysAgoFunction(job?.createdAt)} дней назад`}
                </span>
                <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full hover:bg-blue-50"
                    onClick={saveJobHandler}
                    disabled={loading}
                >
                    <Bookmark
                        className={`h-4 w-4 ${isSaved ? "fill-blue-500 text-blue-500" : "text-gray-500"}`}
                    />
                </Button>
            </div>

           
            <div className="flex items-center gap-3 mb-4">
                <Avatar className="h-12 w-12 ring-1 ring-gray-300">
                    <AvatarImage src={job?.company?.logo} alt={job?.company?.name} />
                    <AvatarFallback>{job?.company?.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                    <h3 className="font-medium">{job?.company?.name}</h3>
                    <p className="text-sm text-gray-500">Россия</p>
                </div>
            </div>

            
            <h2 className="text-lg font-semibold mb-2 line-clamp-1">{job?.title}</h2>

            
            <p className="text-sm text-gray-600 mb-4 line-clamp-2">{job?.description}</p>

            
            <div className="flex flex-wrap items-center gap-2 mb-4">
                <Badge variant="outline" className="text-blue-700 font-bold px-2 py-1 text-xs">
                    {job?.position} вакантных мест
                </Badge>
                <Badge variant="outline" className="text-[#F83002] font-medium px-2 py-1 text-xs">
                    {job?.jobType}
                </Badge>
                <Badge variant="outline" className="text-[#3995ca] font-medium px-2 py-1 text-xs">
                    {job?.salary} тыс. руб.
                </Badge>
            </div>

            
            <div className="flex flex-col sm:flex-row gap-2 mt-4">
                <Button
                    asChild
                    variant="outline"
                    className="sm:flex-1"
                    onClick={() => navigate(`/description/${job?._id}`)}
                >
                    <span>Подробнее</span>
                </Button>
                <Button
                    onClick={saveJobHandler}
                    disabled={loading}
                    className={`sm:flex-1 ${
                        loading
                            ? "cursor-wait"
                            : isSaved
                                ? "bg-gray-400 hover:bg-gray-400 cursor-not-allowed"
                                : "bg-[#3995ca] hover:bg-[#2e78a3]"
                    }`}
                >
                    {loading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Подождите...
                        </>
                    ) : isSaved ? (
                        "Сохранено"
                    ) : (
                        "Сохранить"
                    )}
                </Button>
            </div>
        </motion.div>
    );
};

export default Job;