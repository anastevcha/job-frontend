import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Loader2, Upload } from "lucide-react";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import { motion } from "framer-motion";

const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((store) => store.auth);

    const [input, setInput] = useState({
        fullname: user?.fullname || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills?.join(", ") || "",
        file: null,
    });

    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setInput({ ...input, file });
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            setLoading(true);
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
            });

            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Ошибка при обновлении");
        } finally {
            setLoading(false);
        }

        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[500px]">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold">Редактировать профиль</DialogTitle>
                    </DialogHeader>

                    <form onSubmit={submitHandler} className="py-4 space-y-4">
                        
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="fullname">Имя</Label>
                            <Input
                                id="fullname"
                                name="fullname"
                                value={input.fullname}
                                onChange={changeEventHandler}
                                placeholder="Кирилл Белянин"
                                className="col-span-3"
                            />
                        </div>

                        
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={input.email}
                                onChange={changeEventHandler}
                                placeholder="example@example.com"
                                className="col-span-3"
                            />
                        </div>

                        
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="phone">Номер телефона</Label>
                            <Input
                                id="phone"
                                name="phoneNumber"
                                value={input.phoneNumber}
                                onChange={changeEventHandler}
                                placeholder="+79001234567"
                                className="col-span-3"
                            />
                        </div>

                        
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="bio">Описание</Label>
                            <Input
                                id="bio"
                                name="bio"
                                value={input.bio}
                                onChange={changeEventHandler}
                                placeholder="О себе"
                                className="col-span-3"
                            />
                        </div>

                        
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="skills">Навыки</Label>
                            <Input
                                id="skills"
                                name="skills"
                                value={input.skills}
                                onChange={changeEventHandler}
                                placeholder="HTML, CSS, JavaScript..."
                                className="col-span-3"
                            />
                        </div>

                        
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="resume">Резюме</Label>
                            <div className="col-span-3 flex items-center gap-2">
                                <Input
                                    id="resume"
                                    name="file"
                                    type="file"
                                    accept=".pdf,.docx"
                                    onChange={fileChangeHandler}
                                    className="cursor-pointer"
                                />
                            </div>
                        </div>

                        
                        <DialogFooter>
                            <Button
                                disabled={loading}
                                type="submit"
                                className="w-full mt-4 bg-[#3995ca] hover:bg-[#2e78a3]"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Пожалуйста, подождите
                                    </>
                                ) : (
                                    "Обновить профиль"
                                )}
                            </Button>
                        </DialogFooter>
                    </form>
                </motion.div>
            </DialogContent>
        </Dialog>
    );
};

export default UpdateProfileDialog;