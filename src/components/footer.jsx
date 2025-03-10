import { FaCarCrash } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-gray-100 rounded-lg shadow-sm dark:bg-gray-900 w-full">
            <div className="w-full p-8 md:py-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    {/* Replaced Flowbite logo with Carinfo branding */}
                    <div className="flex items-center gap-2">
                        <FaCarCrash size={30} color="purple" />
                        <Link to="/">
                            <h1 className="hidden md:block font-extrabold text-2xl text-gray-900 dark:text-white">
                                Carinfo
                            </h1>
                        </Link>
                    </div>

                    <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                        <li>
                            <a href="#" className="hover:underline me-4 md:me-6">About</a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline me-4 md:me-6">Licensing</a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">Contact</a>
                        </li>
                    </ul>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
                    © 2023 <Link to="/" className="hover:underline">Carinfo</Link>. All Rights Reserved.
                </span>
            </div>
        </footer>
    );
};

export default Footer;
