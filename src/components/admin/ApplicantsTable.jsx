import React from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '../ui/table';
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from '../ui/popover';
import { MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'sonner';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle } from 'lucide-react';

const shortlistingStatus = [
    { label: "Принять", value: "принято", color: "text-green-600" },
    { label: "Отклонить", value: "отклонено", color: "text-red-600" },
];

const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application);

    const statusHandler = async (status, id) => {
        try {
            const res = await axios.post(
                `${APPLICATION_API_END_POINT}/status/${id}/update`,
                { status },
                { withCredentials: true }
            );

            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            console.error("Ошибка при изменении статуса:", error);
            toast.error(error.response?.data?.message || "Не удалось обновить статус");
        }
    };

    if (!applicants || !Array.isArray(applicants.applications) || applicants.applications.length === 0) {
        return (
            <div className="text-center py-10 text-gray-500">
                Нет откликнувшихся кандидатов
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <Table>
                <TableCaption>Список ваших откликнувшихся кандидатов</TableCaption>
                <TableHeader>
                    <TableRow className="bg-gray-50">
                        <TableHead>Полное имя</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Контакты</TableHead>
                        <TableHead>Резюме</TableHead>
                        <TableHead>Дата</TableHead>
                        <TableHead className="text-right">Операции</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {applicants.applications.map((item) => (
                        <TableRow key={item._id}>
                            <TableCell>{item?.applicant?.fullname}</TableCell>
                            <TableCell>{item?.applicant?.email}</TableCell>
                            <TableCell>{item?.applicant?.phoneNumber || "—"}</TableCell>
                            <TableCell>
                                {item.applicant?.profile?.resume ? (
                                    <a
                                        className="text-blue-600 underline"
                                        href={item.applicant.profile.resume}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {item.applicant.profile.resumeOriginalName}
                                    </a>
                                ) : (
                                    <span className="text-gray-400">NA</span>
                                )}
                            </TableCell>
                            <TableCell className="text-gray-500">
                                {item?.createdAt.split("T")[0]}
                            </TableCell>
                            <TableCell className="text-right cursor-pointer">
                                <Popover>
                                    <PopoverTrigger>
                                        <MoreHorizontal />
                                    </PopoverTrigger>
                                    <PopoverContent className="w-32 p-2 space-y-1">
                                        {shortlistingStatus.map((option, index) => (
                                            <motion.div
                                                key={index}
                                                whileHover={{ backgroundColor: "#f3f4f6" }}
                                                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm cursor-pointer ${option.color}`}
                                                onClick={() => statusHandler(option.value, item._id)}
                                            >
                                                {option.value === "принято" ? (
                                                    <CheckCircle className="h-4 w-4" />
                                                ) : (
                                                    <XCircle className="h-4 w-4" />
                                                )}
                                                <span>{option.label}</span>
                                            </motion.div>
                                        ))}
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </motion.div>
    );
};

export default ApplicantsTable;