import React from 'react'
import { market } from '../../../utils/exchange_settings'

const MarketTab = ({user, setUser}) => {
    const data = [
        {
            key: "fan_tokens",
            title: "Fan tokens ",
            content: 'Profit per hours',
            image: "/coinmarketcap.svg",
            lvl: "lvl ",
            image2: "/coin1.svg",
        },
        {
            key: "staking",
            title: "Staking ",
            content: 'Profit per hours',
            image: "/coinmarketcap.svg",
            lvl: "lvl ",
            image2: "/coin1.svg",
        },
        {
            key: "btc_pairs",
            title: "BTC pairs",
            content: 'Profit per hours',
            image: "/coinmarketcap.svg",
            lvl: "lvl ",
            image2: "/coin1.svg",
        },
        {
            key: "eth_pairs",
            title: "ETH pairs ",
            content: 'Profit per hours',
            image: "/coinmarketcap.svg",
            lvl: "lvl ",
            image2: "/coin1.svg",
        },
        {
            key: "top_10_cmc_pairs",
            title: "Top 10 CMC Pairs ",
            content: 'Profit per hours',
            image: "/coinmarketcap.svg",
            lvl: "lvl ",
            image2: "/coin1.svg",
        },
        {
            key: "gamefi_tokens",
            title: "GameFi tokens ",
            content: 'Profit per hours',
            image: "/coinmarketcap.svg",
            lvl: "lvl ",
            image2: "/coin1.svg",
        }
    ]

    const clickCard = (d) => {
        if (user.coins >= market[d.key]["upgrade_coins_amount"][user[d.key+'_level']]) {
            let updatedUser = {
                ...user,
                coins: user.coins - market[d.key]["upgrade_coins_amount"][user[d.key+'_level']],
            };
            updatedUser[d.key+'_level'] ++;
            let profit_perhour = 0;
            profit_perhour += market[d.key]["profit_perhours"][updatedUser[d.key + '_level']];
            data.map((md) => {
                if (user[md.key + '_level'] > 0 && md.key !== d.key)
                    profit_perhour += market[md.key]["profit_perhours"][user[md.key+"_level"]];
            });
            updatedUser["profit_perhour"] = profit_perhour;
            setUser(updatedUser);
        }
    }

    return (
        <div className='grid grid-cols-2 overflow-y-auto gap-2 w-full'>
            {
                data.map((d, i) => {
                    return (
                        <div key={i} onClick={() => clickCard(d)} className='bg-[#131414] z-[5000] relative rounded-[8px] flex flex-col bg-gradient-to-r from-[] to-[#00FC87] border-t-[1px] overflow-hidden '>
                            <div className='before:absolute before:inset-y-0 before:w-[0.8px] before:h-full before:content-[""] before:bg-gradient-to-b before:from-[#00FC87] before:to-transparent before:right-0'></div>
                            <div className='before:absolute before:inset-0 before:w-[0.5px] before:h-full before:content-[""] before:bg-gradient-to-b before:from-[#00FC87] before:to-transparent'></div>
                            <div className='flex px-[20px] items-start gap-1 py-4'>
                                <img width={40} height={40} src={d.image} alt='' />
                                <div className='flex flex-col gap-1'>
                                    <p className='text-[10px] font-bold'>{d.title}</p>
                                    <p className='text-[8px]'>{d.content}</p>
                                    <div className='flex items-center gap-2'>
                                        <img width={15} height={15} src={d.image2} alt='' />
                                        <p className='text-[8px]'>+{market[d.key]["profit_perhours"][user[d.key+'_level'] + 1]}</p>
                                    </div>
                                </div>
                            </div>
                            <img className='w-full' width={40} height={3} src={"/Line 6.png"} alt='' />
                            <div className='px-[12px] flex gap-4 items-center'>
                                <p>{d.lvl + (user[d.key+'_level'] ? user[d.key+'_level'] : 0)}</p>
                                <img width={1} height={1} src={"/Line 7.png"} alt='' />
                                <div className='flex items-center gap-2'>
                                    <img width={20} height={20} src={d.image2} alt='' />
                                    <p>{market[d.key]["upgrade_coins_amount"][user[d.key+'_level']]}</p>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default MarketTab