import React from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Briefcase, Clock, CheckCircle, XCircle } from "lucide-react";

const statusColors = {
    "рассматривается": "bg-yellow-100 text-yellow-800",
    "принято": "bg-green-100 text-green-800",
    "отклонено": "bg-red-100 text-red-800",
};

const AppliedJobTable = () => {
    const { allAppliedJobs } = useSelector((store) => store.job);

    // Фильтруем только те отклики, где job НЕ null
    const validAppliedJobs = allAppliedJobs?.filter(
        (appliedJob) => appliedJob?.job
    );

    if (!Array.isArray(allAppliedJobs) || validAppliedJobs.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center py-10 bg-white rounded-xl shadow-md border border-gray-200"
            >
                <Briefcase className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                <h3 className="font-medium text-lg">Вы ещё никуда не откликнулись</h3>
                <p className="text-gray-500 mt-2">После отклика вакансии появятся здесь</p>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden"
        >
            <Table>
                <TableCaption>Список вакансий, на которые вы откликнулись</TableCaption>
                <TableHeader>
                    <TableRow className="bg-gray-50">
                        <TableHead>Дата</TableHead>
                        <TableHead>Должность</TableHead>
                        <TableHead>Компания</TableHead>
                        <TableHead className="text-right">Статус</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {validAppliedJobs.map((appliedJob) => (
                        <motion.tr
                            key={appliedJob._id}
                            whileHover={{ backgroundColor: "#f9fafb" }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className="cursor-pointer hover:bg-gray-50"
                        >
                            <TableCell className="px-6 py-4 whitespace-nowrap">
                                {new Date(appliedJob.createdAt).toLocaleDateString("ru-RU")}
                            </TableCell>
                            <TableCell className="px-6 py-4 whitespace-nowrap font-medium">
                                {appliedJob.job?.title || "—"}
                            </TableCell>
                            <TableCell className="px-6 py-4 whitespace-nowrap">
                                {appliedJob.job?.company?.name || "Не указана"}
                            </TableCell>
                            <TableCell className="px-6 py-4 whitespace-nowrap text-right">
                                <Badge className={`capitalize ${statusColors[appliedJob.status]}`}>
                                    {appliedJob.status === "рассматривается" && <Clock className="inline-block h-4 w-4 mr-1" />}
                                    {appliedJob.status === "принято" && <CheckCircle className="inline-block h-4 w-4 mr-1" />}
                                    {appliedJob.status === "отклонено" && <XCircle className="inline-block h-4 w-4 mr-1" />}
                                    {appliedJob.status}
                                </Badge>
                            </TableCell>
                        </motion.tr>
                    ))}
                </TableBody>
            </Table>
        </motion.div>
    );
};

export default AppliedJobTable;