import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";

const Signup = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });

    const { loading, user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        if (!input.role) {
            return toast.error("Выберите роль: соискатель или работодатель");
        }

        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true,
            });

            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/login");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Ошибка при регистрации");
        } finally {
            dispatch(setLoading(false));
        }
    };

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    return (
        <div>
            <Navbar />
            <div className="flex items-center justify-center min-h-[80vh] px-4 py-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-lg bg-white border border-gray-200 rounded-xl shadow-lg p-6"
                >
                    <h1 className="font-bold text-2xl mb-6 text-center">Регистрация</h1>

                    <form onSubmit={submitHandler} className="space-y-4">
                        {/* Full Name */}
                        <div className="space-y-2">
                            <Label>Полное имя</Label>
                            <Input
                                type="text"
                                name="fullname"
                                value={input.fullname}
                                onChange={changeEventHandler}
                                placeholder="Кирилл Белянин"
                                required
                            />
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <Label>Электронная почта</Label>
                            <Input
                                type="email"
                                name="email"
                                value={input.email}
                                onChange={changeEventHandler}
                                placeholder="kirillbelyanin@gmail.com"
                                required
                            />
                        </div>

                        {/* Phone Number */}
                        <div className="space-y-2">
                            <Label>Номер телефона</Label>
                            <Input
                                type="text"
                                name="phoneNumber"
                                value={input.phoneNumber}
                                onChange={changeEventHandler}
                                placeholder="89001234567"
                                required
                            />
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <Label>Пароль</Label>
                            <Input
                                type="password"
                                name="password"
                                value={input.password}
                                onChange={changeEventHandler}
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        {/* Role Selection */}
                        <div className="my-5 space-y-2">
                            <Label>Вы —</Label>
                            <div className="flex gap-4">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <Input
                                        type="radio"
                                        name="role"
                                        value="student"
                                        checked={input.role === 'student'}
                                        onChange={changeEventHandler}
                                        className="cursor-pointer"
                                    />
                                    Соискатель
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <Input
                                        type="radio"
                                        name="role"
                                        value="recruiter"
                                        checked={input.role === 'recruiter'}
                                        onChange={changeEventHandler}
                                        className="cursor-pointer"
                                    />
                                    Работодатель
                                </label>
                            </div>
                        </div>

                        {/* Avatar Upload */}
                        <div className="space-y-2">
                            <Label>Фото профиля</Label>
                            <Input
                                accept="image/*"
                                type="file"
                                onChange={changeFileHandler}
                                className="cursor-pointer"
                            />
                        </div>

                        {/* Submit Button */}
                        {loading ? (
                            <Button disabled className="w-full my-4">
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Пожалуйста, подождите
                            </Button>
                        ) : (
                            <Button type="submit" className="w-full my-4 bg-[#3995ca] hover:bg-[#2e78a3]">
                                Зарегистрироваться
                            </Button>
                        )}

                        {/* Login link */}
                        <p className="text-sm text-center text-gray-600 mt-4">
                            Уже зарегистрированы?{" "}
                            <Link to="/login" className="text-[#3995ca] hover:underline">
                                Войти
                            </Link>
                        </p>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default Signup;