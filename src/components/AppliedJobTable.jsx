import React from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";

const AppliedJobTable = () => {
    return (
        <div>
            <Table>
                <TableCaption>Список ваших откликов на вакансии</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Дата</TableHead>
                        <TableHead>Должность</TableHead>
                        <TableHead>Компания</TableHead>
                        <TableHead className="text-right">Статус</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        [1, 2].map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>12-01-2025</TableCell>
                                <TableCell>Фронтенд-разработчик</TableCell>
                                <TableCell>Яндекс</TableCell>
                                <TableCell className="text-right"><Badge>Выбрано</Badge></TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default AppliedJobTable