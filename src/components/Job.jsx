import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";


const Job = () => {
    return (
        <div className="p-5 rounded-md shadow-xl bg-white border-gray-100">
            <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">2 дня назад</p>
                <Button variant="outline" className="rounded-full" size="icon"><Bookmark /></Button>
            </div>

            <div className="flex items-center gap-2 my-2">
                <Button className="p-6" variant="outline" size="icon">
                    <Avatar>
                        <AvatarImage src="" />
                    </Avatar>
                </Button>
                <div>
                    <h1 className="font-medium text-lg">Название компании</h1>
                    <p className="text-sm text-gray-500">Россия</p>
                </div>
            </div>
            <div>
        <h1 className="font-bold text-lg my-2">Наименование</h1>
        <p className="text-sm text-gray-600">описание рандомное описание рандомное описание рандомное описание рандомное</p>
            </div>
            <div className="flex items-center gap-2 mt-4">
                <Badge className={"text-blue-700 font-bold"} variant="ghost">12 вакантных мест</Badge>
                <Badge className={"text-[#F83002]"} variant="ghost">Частичная занятость</Badge>
                <Badge className={"text-[#7209b7]"} variant="ghost">Высокий доход</Badge>
            </div>
            <div className="flex items-center gap-4 mt-4">
                <Button variant ="outline">Подробнее</Button>
                <Button className="bg-[#7209b7]">Сохранить</Button>
            </div>
        </div>
    )
}

export default Job