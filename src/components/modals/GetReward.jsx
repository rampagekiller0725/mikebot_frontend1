import React from 'react';

const GetReward = ({open, user, getReward}) => {
    return (
        <div className='modal' style={{ display: open === false ? 'none' : 'block' }}>
            <div className='modal-header'></div>
            <div className='modal-content'>
                <div className='flex items-center gap-2 align-center justify-center'>
                    <img width={80} height={80} src='/coin1.svg' alt='' />
                    <p className="text-6xl">{user.profit_perhour * 3}</p>
                </div>
                <p>The exchange has started working for you</p>
                <button type="button" onClick={getReward} className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Thank you</button>
            </div>
        </div>
    );
}

export default GetReward;