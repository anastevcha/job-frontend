import React from "react";
import { motion } from "framer-motion";

const Footer = () => {
    return (
        <footer className="border-t border-t-gray-200 py-10 bg-white">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col md:flex-row justify-between items-center"
                >
                    {/* Логотип и авторство */}
                    <div className="mb-6 md:mb-0 text-center md:text-left">
                        <h2 className="text-2xl font-bold text-[#3995ca]">Трудовой мост</h2>
                        <p className="text-sm text-gray-500 mt-2">© 2025 Дипломный проект. Все права защищены.</p>
                    </div>

                    {/* Социальные сети */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="flex space-x-6"
                    >
                        <a href="https://telegram.com " className="hover:text-[#3995ca] transition-colors" aria-label="Telegram">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                                <path d="M9.99 14.5l2.5 2.5 5-5-2.5-2.5-1.75 1.75L9.99 14.5z" />
                            </svg>
                        </a>
                        <a href="https://twitter.com " className="hover:text-[#F83002] transition-colors" aria-label="Twitter">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 4.557a9.835 9.835 0 0 1-2.828.775 4.934 4.934 0 0 0 2.165-2.724 9.867 9.867 0 0 1-3.127 1.195 4.924 4.924 0 0 0-8.38 4.49A13.978 13.978 0 0 1 1.67 3.149 4.93 4.93 0 0 0 3.16 9.724a4.903 4.903 0 0 1-2.229-.616v.062a4.93 4.93 0 0 0 3.946 4.827 4.902 4.902 0 0 1-2.224.084 4.93 4.93 0 0 0 4.6 3.417A9.869 9.869 0 0 1 0 21.543a13.978 13.978 0 0 0 7.548 2.212c9.057 0 14.01-7.507 14.01-14.01 0-.213-.004-.425-.015-.636A10.012 10.012 0 0 0 24 4.557z" />
                            </svg>
                        </a>
                        <a href="https://linkedin.com " className="hover:text-[#0077B5] transition-colors" aria-label="LinkedIn">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.447 20.452H16.85v-5.569c0-1.327-.027-3.037-1.852-3.037-1.854 0-2.137 1.446-2.137 2.94v5.666H9.147V9.756h3.448v1.464h.05c.48-.91 1.653-1.871 3.401-1.871 3.634 0 4.307 2.39 4.307 5.498v5.605zM5.337 8.29c-1.105 0-2-.896-2-2 0-1.106.895-2 2-2 1.104 0 2 .895 2 2 0 1.104-.896 2-2 2zM7.119 20.452H3.553V9.756h3.566v10.696zM22.225 0H1.771C.791 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451c.979 0 1.771-.774 1.771-1.729V1.729C24 .774 23.205 0 22.225 0z" />
                            </svg>
                        </a>
                    </motion.div>
                </motion.div>

                
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-8 text-center text-sm text-gray-500 border-t border-gray-200 pt-6"
                >
                    <p>Создано как часть дипломного проекта по разработке веб-приложения для управления рекрутинговыми процессами.</p>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;