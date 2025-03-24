import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";


const Job = ({job}) => {
    const navigate = useNavigate();
    //const jobId="wrwtwtwrwtykzdawrawr";

    const daysAgoFunction=(mongodbTime)=>{
        const createdAt=new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference/(1000*24*60*60));
    }
    return (
        <div className="p-5 rounded-md shadow-xl bg-white border-gray-100">
            <div className="flex items-center justify-between">
            <p className='text-sm text-gray-500'>{daysAgoFunction(job?.createdAt) === 0 ? "Сегодня" : `${daysAgoFunction(job?.createdAt)} дней назад`}</p>
                <Button variant="outline" className="rounded-full" size="icon"><Bookmark /></Button>
            </div>

            <div className="flex items-center gap-2 my-2">
                <Button className="p-6" variant="outline" size="icon">
                    <Avatar>
                        <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbBNaU07xqYvyBtPMzrI2WmdQcyZz8hYg8FA&s" />
                    </Avatar>
                </Button>
                <div>
                    <h1 className="font-medium text-lg">{job?.company?.name}</h1>
                    <p className="text-sm text-gray-500">Россия</p>
                </div>
            </div>
            <div>
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600">{job?.description}</p>
            </div>
            <div className="flex items-center gap-2 mt-4">
                <Badge className={"text-blue-700 font-bold"} variant="ghost">{job?.position} вакантных мест</Badge>
                <Badge className={"text-[#F83002]"} variant="ghost">{job?.jobType}</Badge>
                <Badge className={"text-[#3995ca]"} variant="ghost">{job?.salary} тысяч рублей</Badge>
            </div>
            <div className="flex items-center gap-4 mt-4">
            <Button onClick={()=> navigate(`/description/${job?._id}`)} variant="outline">Подробнее</Button>

                <Button className="bg-[#3995ca]">Сохранить</Button>
            </div>
        </div>
    )
}

export default Job