import React from 'react';
import { toMoneyFormat } from '../../utils/tools';

const DailyCard = ({data, isSelected, getReward}) => {
    return (
        <div className={isSelected ? "bg-green-500 rounded-lg" : "bg-gray-900 p-2 rounded-lg"} onClick={() => getReward(data.reward, data.index)}>
            <p className="text-sm">{data.text}</p>
            <img className='relative left-1/2' style={{transform: 'translate(-50%, 0)'}} width={30} height={30} src='/coin1.svg' alt='' />
            <p className="text-sm">{toMoneyFormat(data.reward)}</p>
        </div>
    );
}

export default DailyCard;