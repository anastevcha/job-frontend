import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from '@/utils/constant';
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2 } from 'lucide-react';

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });
    const { loading, user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        if (!input.role) {
            return toast.error("Выберите роль: соискатель или работодатель");
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: { 'Content-Type': "application/json" },
                withCredentials: true,
            });

            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Ошибка при входе");
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
            <div className="flex items-center justify-center min-h-[80vh] px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-md bg-white border border-gray-200 rounded-xl shadow-lg p-6"
                >
                    <h1 className="font-bold text-2xl mb-6 text-center">Вход в аккаунт</h1>

                    <form onSubmit={submitHandler}>
                        {/* Email */}
                        <div className="my-4">
                            <Label>Электронная почта</Label>
                            <Input
                                type="email"
                                value={input.email}
                                name="email"
                                onChange={changeEventHandler}
                                placeholder="kirillbelyanin@gmail.com"
                                required
                            />
                        </div>

                        {/* Password */}
                        <div className="my-4">
                            <Label>Пароль</Label>
                            <Input
                                type="password"
                                value={input.password}
                                name="password"
                                onChange={changeEventHandler}
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        {/* Role Selection */}
                        <div className="my-5">
                            <Label>Вы —</Label>
                            <div className="flex gap-4 mt-3">
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

                        {/* Submit Button */}
                        {loading ? (
                            <Button disabled className="w-full my-4">
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Пожалуйста, подождите
                            </Button>
                        ) : (
                            <Button type="submit" className="w-full my-4 bg-[#3995ca] hover:bg-[#2e78a3]">
                                Войти
                            </Button>
                        )}

                        {/* Register link */}
                        <p className="text-sm text-center text-gray-600 mt-4">
                            Ещё не зарегистрированы?{" "}
                            <Link to="/signup" className="text-[#3995ca] hover:underline">
                                Создать аккаунт
                            </Link>
                        </p>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default Login;