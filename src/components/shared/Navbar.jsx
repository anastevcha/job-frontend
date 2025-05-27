import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { LogOut, User2, Home, Briefcase, Search } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate('/');
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || 'Ошибка при выходе');
        }
    };

    return (
        <motion.header
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="bg-white shadow-sm sticky top-0 z-50"
        >
            <div className="flex items-center justify-between px-6 mx-auto max-w-7xl h-16">
                {/* Логотип */}
                <Link to="/" className="text-2xl font-bold">Трудовой<span className='text-[#3995ca]'>Мост</span></Link>

                {/* Навигационное меню */}
                <nav className="flex items-center gap-12">
                    <ul className="flex font-medium items-center gap-8 text-gray-700">
                        {!user ? (
                            <>
                                <motion.li whileHover={{ scale: 1.05 }}><Link to="/">Главная</Link></motion.li>
                                <motion.li whileHover={{ scale: 1.05 }}><Link to="/jobs">Вакансии</Link></motion.li>
                                <motion.li whileHover={{ scale: 1.05 }}><Link to="/browse">Поиск</Link></motion.li>
                            </>
                        ) : user.role === 'recruiter' ? (
                            <>
                                <motion.li whileHover={{ scale: 1.05 }}><Link to="/admin/companies">Компании</Link></motion.li>
                                <motion.li whileHover={{ scale: 1.05 }}><Link to="/admin/jobs">Вакансии</Link></motion.li>
                            </>
                        ) : (
                            <>
                                <motion.li whileHover={{ scale: 1.05 }}><Link to="/">Главная</Link></motion.li>
                                <motion.li whileHover={{ scale: 1.05 }}><Link to="/jobs">Вакансии</Link></motion.li>
                                <motion.li whileHover={{ scale: 1.05 }}><Link to="/browse">Поиск</Link></motion.li>
                            </>
                        )}
                    </ul>

                    {/* Кнопки или профиль пользователя */}
                    <div className="flex items-center gap-4">
                        {!user ? (
                            <div className="flex items-center gap-2">
                                <motion.div whileHover={{ scale: 1.05 }}>
                                    <Link to="/login">
                                        <Button variant="outline">Вход</Button>
                                    </Link>
                                </motion.div>
                                <motion.div whileHover={{ scale: 1.05 }}>
                                    <Link to="/signup">
                                        <Button className="bg-[#3995ca] hover:bg-[#2e78a3]">Регистрация</Button>
                                    </Link>
                                </motion.div>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <motion.div whileHover={{ scale: 1.1 }} className="cursor-pointer">
                                        <Avatar className="h-10 w-10">
                                            <AvatarImage src={user?.profile?.profilePhoto} alt="avatar" />
                                            <AvatarFallback>{user.fullname.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                    </motion.div>
                                </PopoverTrigger>
                                <PopoverContent className="w-80 p-4 rounded-xl border border-gray-200 shadow-lg bg-white">
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="space-y-4"
                                    >
                                        <div className="flex items-center gap-4">
                                            <Avatar className="h-12 w-12">
                                                <AvatarImage src={user?.profile?.profilePhoto} alt="avatar" />
                                                <AvatarFallback>{user.fullname.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <h4 className="font-semibold">{user?.fullname}</h4>
                                                <p className="text-sm text-muted-foreground">{user?.profile?.bio || "Без описания"}</p>
                                            </div>
                                        </div>

                                        <div className="flex flex-col text-gray-600 space-y-2 pt-2">
                                            {user && user.role === 'student' && (
                                                <motion.div whileHover={{ x: 5 }} className="flex items-center gap-2">
                                                    <User2 className="h-4 w-4" />
                                                    <Button variant="link" asChild>
                                                        <Link to="/profile">Показать профиль</Link>
                                                    </Button>
                                                </motion.div>
                                            )}

                                            <motion.div whileHover={{ x: 5 }} className="flex items-center gap-2">
                                                <LogOut className="h-4 w-4" />
                                                <Button variant="link" onClick={logoutHandler}>
                                                    Выйти
                                                </Button>
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                </PopoverContent>
                            </Popover>
                        )}
                    </div>
                </nav>
            </div>
        </motion.header>
    );
};

export default Navbar;