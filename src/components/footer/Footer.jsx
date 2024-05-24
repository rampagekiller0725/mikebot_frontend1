// 'use client'
import React, { useState } from 'react'
import {Link, useLocation} from 'react-router-dom'



const Footer = ({username}) => {
    const location = useLocation()
    const pathname = location.pathname;
    const [active, setActive] = useState(pathname)


    const data = [
        {
            image: '/binance.svg',
            title: 'Exchange',
            active: "/exchange",
            link: "/exchange/" + username
        },
        {
            image: '/mine.svg',
            title: 'Mine',
            active: "/mine",
            link: "/mine/" + username
        },
        {
            image: '/friends.svg',
            title: 'Friends',
            active: "/friends",
            link: "/friends/" + username
        },
        {
            image: '/earn.svg',
            title: 'Earn',
            active: "/earn",
            link: "/earn/" + username
        },
        {
            image: '/logo.svg',
            title: 'Airdrop',
            active: "/airdrop",
            link: "/exchange/" + username
        }
    ]
    const handleActiveClicked = (activeItem) => {
        if (activeItem != "/airdrop")   
            setActive(activeItem)
    }

    return (
        <div className='footer fixed bottom-0 z-[7000] h-[88px] flex gap-2 bg-[#272A2F] rounded-t-[28px] w-[100%] items-center justify-center px-[5%]'>
            {
                data.map((d, i) => {
                    return (
                        <Link to={d.link} key={i} onClick={() => handleActiveClicked(d.active)} className={`flex flex-col p-2 w-full ${(active.indexOf(d.active) != -1 && active != "/airdrop" )? "bg-[#1C1F24] rounded-md text-[#FEFEFE]" : "text-[#7C7C7C]"}`}>
                            <div  className='flex flex-col gap-1 items-center'>
                                <img width={30} height={30} src={d.image} alt='' />
                                <p className='text-[14px]'>{d.title}</p>
                            </div>
                        </Link>
                    )
                })
            }
        </div>

    )
}

export default Footer