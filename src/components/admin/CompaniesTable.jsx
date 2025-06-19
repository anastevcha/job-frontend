import React, { useEffect, useState } from "react";
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
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, Trash2, MoreHorizontal } from "lucide-react";
import { useSelector, useDispatch } from "react-redux"; 
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import axios from "axios";
import { toast } from "sonner";


const COMPANY_API_END_POINT = "http://localhost:8000/api/v1/company";

const CompaniesTable = () => {
    const { companies, searchCompanyByText } = useSelector((store) => store.company);
    const [filteredCompanies, setFilteredCompanies] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch(); 

    useEffect(() => {
        if (!companies || !Array.isArray(companies)) return;

        const filtered = searchCompanyByText
            ? companies.filter(company =>
                company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase())
            )
            : companies;

        setFilteredCompanies(filtered);
    }, [companies, searchCompanyByText]);

   
    const deleteCompanyHandler = async (e, companyId) => {
        e.stopPropagation();

        const confirmDelete = window.confirm("Вы уверены, что хотите удалить эту компанию?");
        if (!confirmDelete) return;

        try {
            const res = await axios.delete(`${COMPANY_API_END_POINT}/${companyId}`, {
                withCredentials: true,
            });

            if (res.data.success) {
                toast.success(res.data.message);

                
                dispatch({
                    type: "company/setCompanies",
                    payload: companies.filter(c => c._id !== companyId),
                });
            }
        } catch (error) {
            console.error("Ошибка при удалении компании:", error);
            toast.error(error.response?.data?.message || "Не удалось удалить компанию");
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-6 bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden"
        >
            <Table>
                <TableCaption>Список ваших последних зарегистрированных компаний</TableCaption>
                <TableHeader>
                    <TableRow className="bg-gray-50">
                        <TableHead className="w-[100px]">Логотип</TableHead>
                        <TableHead>Название</TableHead>
                        <TableHead>Дата регистрации</TableHead>
                        <TableHead className="text-right">Операции</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredCompanies.length > 0 ? (
                        filteredCompanies.map((company) => (
                            <motion.tr
                                key={company._id}
                                whileHover={{ backgroundColor: "#f9fafb" }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                onClick={() => navigate(`/admin/companies/setup/${company._id}`)}
                                className="cursor-pointer hover:bg-gray-50 transition-colors"
                            >
                                <TableCell className="py-4">
                                    <Avatar className="h-10 w-10 ring-1 ring-gray-300">
                                        <AvatarImage src={company.logo || "/default-logo.png"} alt={company.name} />
                                    </Avatar>
                                </TableCell>
                                <TableCell className="font-medium">{company.name}</TableCell>
                                <TableCell className="text-gray-500">
                                    {new Date(company.createdAt).toLocaleDateString("ru-RU")}
                                </TableCell>
                                <TableCell className="text-right">
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <MoreHorizontal className="h-4 w-4 text-gray-500" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="p-2 space-y-1 min-w-[160px]">
                                            
                                            <div
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    navigate(`/admin/companies/${company._id}`);
                                                }}
                                                className="flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-gray-100 cursor-pointer"
                                            >
                                                <Edit2 className="w-4 h-4 text-blue-600" />
                                                <span>Редактировать</span>
                                            </div>

                                            
                                            <div
                                                onClick={(e) => deleteCompanyHandler(e, company._id)}
                                                className="flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-red-100 cursor-pointer text-red-600"
                                            >
                                                <Trash2 className="w-4 h-4 text-red-600" />
                                                <span>Удалить</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </motion.tr>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                                {searchCompanyByText
                                    ? `По запросу "${searchCompanyByText}" ничего не найдено`
                                    : "Компаний пока нет"}
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </motion.div>
    );
};

export default CompaniesTable;