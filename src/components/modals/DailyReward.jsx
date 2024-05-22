import React from 'react';
import DailyCard from './DailyCard';

const DailyReward = ({ open, setOpen, user, setUser }) => {
    const dayConfig = [
        {
            text: "Day 1",
            reward: 500,
            index: 1,
        },
        {
            text: "Day 2",
            reward: 1000,
            index: 2,
        },
        {
            text: "Day 3",
            reward: 2500,
            index: 3,
        },
        {
            text: "Day 4",
            reward: 5000,
            index: 4,
        },
        {
            text: "Day 5",
            reward: 15000,
            index: 5,
        },
        {
            text: "Day 6",
            reward: 25000,
            index: 6,
        },
        {
            text: "Day 7",
            reward: 100000,
            index: 7,
        },
        {
            text: "Day 8",
            reward: 500000,
            index: 8,
        },
        {
            text: "Day 9",
            reward: 1000000,
            index: 9,
        },
        {
            text: "Day 10",
            reward: 5000000,
            index: 10,
        }
    ];

    const getReward = (reward, index) => {
        if (user.daily_reward_value + 1 == index) {
            if ((new Date() - user.daily_reward_time) > 1000 * 60 * 60 * 24) {
                setUser({
                    ...user,
                    coins: user.coins + reward,
                    daily_reward_time: new Date(),
                    daily_reward_value: user.daily_reward_value + 1
                })
            }
        }
        console.log(reward);
        console.log(index);
    }

    return (
        <div className='modal' style={{ display: open === false ? 'none' : 'block' }}>
            <div className='modal-header align-center justify-center'>
                <img className='relative left-1/2' style={{transform: 'translate(-50%, 0)'}} width={80} height={80} src={"/calendar.svg"} alt='' />
                <p>Daily reward</p>
                <p className="text-sm">Accrue coins for logging into the game daily without skipping</p>
            </div>
            <div className='modal-content'>
                <div className='grid grid-cols-3 gap-2 z-[5000]'>
                    {dayConfig.map((d) => (
                        <DailyCard key={d.text} data={d} isSelected={user.daily_reward_value > (d.index-1) ? true : false} getReward={getReward}/>
                    ))}
                </div>
                <button type="button" onClick={() => setOpen(false)} className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Thank you</button>
            </div>
        </div>
    )
}

export default DailyReward;