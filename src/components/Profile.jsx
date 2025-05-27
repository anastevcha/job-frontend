import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import SavedJobsTable from "./admin/SavedJobsTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAplliedJobs";
import useGetSavedJobs from "@/hooks/useGetSavedJobs";
import { motion } from "framer-motion";

const isResume = true;

const Profile = () => {
    useGetAppliedJobs();
    useGetSavedJobs();

    const [open, setOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("applied");
    const { user } = useSelector((store) => store.auth);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl mx-auto mt-10 mb-6"
            >
                
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white border border-gray-200 rounded-2xl p-8 shadow-md"
                >
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-4">
                            <Avatar className="h-24 w-24 ring-2 ring-[#3995ca]">
                                <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
                                <AvatarFallback>{user?.fullname.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <h1 className="text-2xl font-semibold">{user?.fullname}</h1>
                                <p className="text-gray-600">{user?.profile?.bio || "Нет описания"}</p>
                            </div>
                        </div>
                        <Button onClick={() => setOpen(true)} variant="outline" size="icon" aria-label="Редактировать профиль">
                            <Pen className="h-4 w-4" />
                        </Button>
                    </div>

                    
                    <div className="my-6 space-y-3">
                        <div className="flex items-center gap-3 text-gray-700">
                            <Mail className="text-gray-500" size={18} />
                            <span>{user?.email}</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-700">
                            <Contact className="text-gray-500" size={18} />
                            <span>{user?.phoneNumber || "Не указан"}</span>
                        </div>
                    </div>

                    
                    <div className="my-6">
                        <h2 className="font-medium">Навыки</h2>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {user?.profile?.skills && user.profile.skills.length > 0 ? (
                                user.profile.skills.map((item, index) => (
                                    <Badge key={index} className="bg-[#3995ca] hover:bg-[#2e78a3] text-white">
                                        {item}
                                    </Badge>
                                ))
                            ) : (
                                <span className="text-sm text-gray-500">NA</span>
                            )}
                        </div>
                    </div>

                   
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label className="text-md font-bold">Резюме</Label>
                        {isResume ? (
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href={user?.profile?.resume}
                                className="text-blue-500 hover:underline cursor-pointer break-all"
                            >
                                {user?.profile?.resumeOriginalName}
                            </a>
                        ) : (
                            <span className="text-gray-500">Не загружено</span>
                        )}
                    </div>
                </motion.div>

                
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white rounded-2xl shadow-lg p-6 mt-6"
                >
                    <div className="flex gap-4 mb-4 border-b">
                        <button
                            onClick={() => setActiveTab("applied")}
                            className={`py-2 px-4 font-medium ${activeTab === "applied" ? "border-b-2 border-[#3995ca]" : "text-gray-500"}`}
                        >
                            Откликнутые
                        </button>
                        <button
                            onClick={() => setActiveTab("saved")}
                            className={`py-2 px-4 font-medium ${activeTab === "saved" ? "border-b-2 border-[#3995ca]" : "text-gray-500"}`}
                        >
                            Сохранённые
                        </button>
                    </div>

                    {activeTab === "applied" && <AppliedJobTable />}
                    {activeTab === "saved" && <SavedJobsTable />}
                </motion.div>
            </motion.div>

            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    );
};

export default Profile;