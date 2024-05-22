import React from 'react';
import { request } from '../../utils/request';

const JoinTGGroup = ({ open, setOpen, user, setUser }) => {
    const joinTGGroup = () => {
        window.open('https://t.me/MikeToken'); 
        setUser({
            ...user,
            coins: user.coins + 1000,
            is_joined_tggroup: 1,
        });
        setOpen(false);
    }
    const check = async () => {
        setOpen(false);
    }
    return (
        <div className='modal' style={{ display: open === false ? 'none' : 'block' }}>
            <div className='modal-header align-center justify-center'>
                <img className='relative left-1/2' style={{ transform: 'translate(-50%, 0)' }} width={80} height={80} src={"/chat.svg"} alt='' />
                <p>Join our TG Group</p>
            </div>
            <div className='modal-content'>
                <button type="button" onClick={() => joinTGGroup()} className="w-20 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Join</button>
                <div className='flex items-center gap-2 align-center justify-center'>
                    <img width={30} height={30} src='/coin1.svg' alt='' />
                    <p className="text-sm">+ 1,000</p>
                </div>
                <button type="button" onClick={() => setOpen(false)} className="mt-2 w-full text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Check</button>
            </div>
        </div>
    )
}

export default JoinTGGroup;