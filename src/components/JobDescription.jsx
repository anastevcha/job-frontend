import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Loader2, ArrowLeft } from "lucide-react";

const JobDescription = () => {
    const { singleJob } = useSelector((store) => store.job);
    const { user } = useSelector((store) => store.auth);
    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();

   const isApplied = useSelector((store) => {
    const user = store.auth.user;
    const applications = store.job.singleJob?.applications;

    if (!user || !applications) return false;

    return applications.some(app => 
        String(app.applicant) === String(user._id)
    );
});

    const [loading, setLoading] = useState(false);

    // Авто-проверка при загрузке страницы
    useEffect(() => {
        if (!user || !singleJob) return;

        const applied = singleJob.applications?.some(
            (app) => app.applicant === user._id
        );

        if (applied) {
            toast.info("Вы уже откликнулись на эту вакансию");
        }
    }, [user, singleJob]);

    useEffect(() => {
    const fetchSingleJob = async () => {
        try {
            const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
                withCredentials: true,
            });

            if (res.data.success) {
                dispatch(setSingleJob(res.data.job));
            }
        } catch (error) {
            console.error("Ошибка при загрузке вакансии:", error);
        }
    };

    fetchSingleJob();
}, [jobId, dispatch]);

    const applyJobHandler = async () => {
    if (!user) {
        return toast.info("Пожалуйста, войдите в аккаунт");
    }

    setLoading(true);
    try {
        const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {
            withCredentials: true,
        });

        if (res.data.success) {
            dispatch(setSingleJob(res.data.job)); // Получаем обновлённый `job`
            toast.success(res.data.message);
        }
    } catch (error) {
        console.error("Ошибка при отклике:", error);
        toast.error(error.response?.data?.message || "Ошибка при отклике на вакансию");
    } finally {
        setLoading(false);
    }
};

    // Форматирование даты
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("ru-RU");
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-7xl mx-auto my-10 px-4"
        >
            {/* Кнопка "Назад" + Заголовок */}
            <motion.div
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.4 }}
                className="mb-6"
            >
                <Button
                    variant="outline"
                    onClick={() => window.history.back()}
                    className="mb-4"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Назад
                </Button>

                <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b pb-4">
                    <h1 className="text-2xl font-bold">{singleJob?.title}</h1>
                    <p className="text-sm text-gray-600 mt-1">Опубликовано: {formatDate(singleJob?.createdAt)}</p>
                </div>
            </motion.div>

            {/* Кнопка "Откликнуться" */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="mt-4"
            >
                <Button
                    onClick={isApplied ? undefined : applyJobHandler}
                    disabled={isApplied || loading}
                    className={`w-full sm:w-auto ${isApplied
                            ? "bg-gray-500 hover:bg-gray-600 cursor-not-allowed"
                            : "bg-[#3995ca] hover:bg-[#2e78a3]"
                        }`}
                >
                    {loading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Подождите...
                        </>
                    ) : isApplied ? (
                        "Уже откликнулись"
                    ) : (
                        "Откликнуться"
                    )}
                </Button>
            </motion.div>

            {/* Информация о вакансии */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8"
            >
                <div>
                    <h2 className="font-medium text-lg mb-4">Информация</h2>
                    <ul className="space-y-3">
                        <li className="flex items-start gap-2">
                            <span className="font-bold min-w-[120px]">Должность:</span>
                            <span>{singleJob?.title}</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="font-bold min-w-[120px]">Местоположение:</span>
                            <span>{singleJob?.location}</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="font-bold min-w-[120px]">Опыт работы:</span>
                            <span>{singleJob?.experienceLevel} лет</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="font-bold min-w-[120px]">Зарплата:</span>
                            <span>{singleJob?.salary} тысяч рублей</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="font-bold min-w-[120px]">Количество мест:</span>
                            <span>{singleJob?.position}</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="font-bold min-w-[120px]">Всего откликов:</span>
                            <span>{singleJob?.applications?.length}</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="font-bold min-w-[120px]">Дата публикации:</span>
                            <span>{formatDate(singleJob?.createdAt)}</span>
                        </li>
                    </ul>
                </div>

                <div>
                    <h2 className="font-medium text-lg mb-4">Описание</h2>
                    <p className="text-gray-700 whitespace-pre-line">{singleJob?.description}</p>
                </div>
            </motion.div>

            {/* Бейджи под описанием */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-6 flex flex-wrap gap-2"
            >
                <Badge variant="outline" className="text-blue-700 font-semibold">
                    {singleJob?.position} вакантных мест
                </Badge>
                <Badge variant="outline" className="text-[#F83002] font-semibold">
                    {singleJob?.jobType}
                </Badge>
                <Badge variant="outline" className="text-[#3995ca] font-semibold">
                    {singleJob?.salary} тыс. руб.
                </Badge>
            </motion.div>
        </motion.div>
    );
};

export default JobDescription;