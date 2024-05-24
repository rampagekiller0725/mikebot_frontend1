// Nav.tsx
import React from 'react';
import { TbChevronLeft, TbX } from 'react-icons/tb';
import { Link } from 'react-router-dom';
// import Image from 'next/image';
// import { HiOutlineDotsVertical } from "react-icons/hi";



const Nav = ({ handleClick, showNav, username }) => {
    return (
        <div className={`py-2 flex pb-2 items-center gap-[25%] w-full text-white px-[4%] bg-black`}>
            {/* <TbX className='text-3xl font-bold' onClick={handleClick} />  */}
            <Link to={"/exchange/"+username}>
                <TbChevronLeft className='text-3xl'/>
            </Link>
            <div className='flex flex-row items-center gap-3'>
                <img width={25} height={25} src={"/logo.svg"} alt='' />
                <p className='text-[18px] font-bold text-[#FEFEFE]'>{username}</p>
            </div>
            {/* <HiOutlineDotsVertical className='text-[#FEFEFE] text-3xl hidden' /> */}
        </div>
    );
}

export default Nav;
