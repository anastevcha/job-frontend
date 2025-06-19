import React from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../ui/popover";
import { Edit2, Eye, Trash2, MoreHorizontal } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import axios from "axios";
import { toast } from "sonner";

const JOB_API_END_POINT = "http://localhost:8000/api/v1/job";

const AdminJobsTable = ({ jobs }) => {
    const navigate = useNavigate();

    if (!Array.isArray(jobs)) {
        return (
            <div className="text-center py-10 text-gray-500">
                Список вакансий пуст
            </div>
        );
    }

    // функция удаления вакансии
    const deleteJobHandler = async (e, jobId) => {
        e.stopPropagation();

        if (!jobId) {
            return toast.error("ID вакансии отсутствует");
        }

        const confirmDelete = window.confirm("Вы уверены, что хотите удалить эту вакансию?");
        if (!confirmDelete) return;

        try {
            const res = await axios.delete(`${JOB_API_END_POINT}/${jobId}`, {
                withCredentials: true,
            });

            if (res.data.success) {
                toast.success(res.data.message);


                const updatedJobs = jobs.filter(job => job._id !== jobId);
                setJobs(updatedJobs);
            }
        } catch (error) {
            console.error("Ошибка при удалении вакансии:", error);
            toast.error(error.response?.data?.message || "Не удалось удалить вакансию");
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <Table>
                <TableCaption>Список ваших последних опубликованных вакансий</TableCaption>
                <TableHeader>
                    <TableRow className="bg-gray-50">
                        <TableHead>Компания</TableHead>
                        <TableHead>Должность</TableHead>
                        <TableHead>Дата публикации</TableHead>
                        <TableHead className="text-right">Операции</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {jobs.length > 0 ? (
                        jobs.map((job) => (
                            <motion.tr
                                key={job._id}
                                whileHover={{ backgroundColor: "#f9fafb" }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                className="cursor-pointer"
                                onClick={() => navigate(`/admin/jobs/${job._id}`)}
                            >
                                <TableCell className="py-4">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-8 w-8 ring-1 ring-gray-300">
                                            <AvatarImage src={job?.company?.logo} alt={job?.company?.name} />
                                        </Avatar>
                                        <span>{job?.company?.name}</span>
                                    </div>
                                </TableCell>
                                <TableCell>{job?.title}</TableCell>
                                <TableCell className="text-gray-500">
                                    {new Date(job?.createdAt).toLocaleDateString("ru-RU")}
                                </TableCell>
                                <TableCell className="text-right">
                                    <div onClick={(e) => e.stopPropagation()}>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <MoreHorizontal className="h-4 w-4 text-gray-500" />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="p-2 space-y-1 min-w-[160px]">

                                                <div
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        navigate(`/admin/jobs/${job._id}`);
                                                    }}
                                                    className="flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-gray-100 cursor-pointer"
                                                >
                                                    <Edit2 className="w-4 h-4 text-blue-600" />
                                                    <span>Редактировать</span>
                                                </div>


                                                <div
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        navigate(`/admin/jobs/${job._id}/applicants`);
                                                    }}
                                                    className="flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-gray-100 cursor-pointer"
                                                >
                                                    <Eye className="w-4 h-4 text-green-600" />
                                                    <span>Откликнувшиеся</span>
                                                </div>


                                                <div
                                                    onClick={(e) => deleteJobHandler(e, job._id)}
                                                    className="flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-red-100 cursor-pointer text-red-600"
                                                >
                                                    <Trash2 className="w-4 h-4 text-red-600" />
                                                    <span>Удалить</span>
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                </TableCell>
                            </motion.tr>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                                Вакансий пока нет
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </motion.div>
    );
};

export default AdminJobsTable;