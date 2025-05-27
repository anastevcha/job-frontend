import React from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="p-5 rounded-xl shadow-md bg-white border border-gray-200 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => navigate(`/description/${job._id}`)}
        >
            
            <div className="flex items-center gap-3 mb-4">
                <Avatar className="h-10 w-10 ring-1 ring-gray-300">
                    <AvatarImage src={job?.company?.logo} alt={job?.company?.name} />
                    <AvatarFallback>{job?.company?.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                    <h3 className="font-semibold text-sm">{job?.company?.name}</h3>
                    <p className="text-xs text-gray-500">Россия</p>
                </div>
            </div>

            
            <h2 className="text-lg font-bold mb-2 line-clamp-1">{job?.title}</h2>

            
            <p className="text-sm text-gray-600 mb-4 line-clamp-2">{job?.description}</p>

            
            <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="outline" className="text-blue-700 font-medium px-2 py-1 text-xs">
                    {job?.position} мест
                </Badge>
                <Badge variant="outline" className="text-[#F83002] font-medium px-2 py-1 text-xs">
                    {job?.jobType}
                </Badge>
                <Badge variant="outline" className="text-[#3995ca] font-medium px-2 py-1 text-xs">
                    от {job?.salary} тыс. руб.
                </Badge>
            </div>

            <Button asChild variant="outline" className="w-full mt-2 border-[#3995ca] text-[#3995ca] hover:bg-[#e6f0ff]">
                <Link to={`/description/${job._id}`}>
                    Подробнее →
                </Link>
            </Button>
        </motion.div>
    );
};

export default LatestJobCards;