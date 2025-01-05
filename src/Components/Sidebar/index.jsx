import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

const Sidebar = () => {
    return (
        <div className='sidebar fixed top-0 left-0 bg-[#fff] w-[17%] h-full border-r border-[rgba(0,0,0,0.1)] py-1 px-8'>
            <div className="py-2 w-full">
                <Link to="/">
                    <img src={logo} alt="Logo" className="w-[220px]"
                    />
                </Link>
            </div>

            <ul className="mt-4">
                <li>
                    <Button className="w-full !capitalize !justify-start">Dashboard</Button>
                </li>
            </ul>


        </div>
    );
}

export default Sidebar;
