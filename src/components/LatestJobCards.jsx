import React from "react";
import { Badge } from "./ui/badge";

const LatestJobCards = () => {
    return (
        <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer">
            <div>
                <h1 className="font-medium text-lg">Название компании</h1>
                <p className="text-sm text-gray-500">Россия</p>
            </div>
            <div>
                <h1 className="font-bold text-lg my-2">Наименование компании</h1>
                <p className="text-sm text-gray-600">что то рандомное описание что то рандомное описание что то рандомное описание что то рандомное описание</p>
            </div>
            <div className="flex items-center gap-2 mt-4">
                <Badge className={"text-blue-700 font-bold"} variant="ghost">12 позиций</Badge>
                <Badge className={"text-[#F83002]"} variant="ghost">Частичная занятость</Badge>
                <Badge className={"text-[#7209b7]"} variant="ghost">Высокий доход</Badge>
            </div>
        </div>
    )
}

export default LatestJobCards