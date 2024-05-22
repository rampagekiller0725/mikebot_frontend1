import React, { useEffect, useState } from 'react'
import Card from '../exchange/Cards'
import { TbChevronRight } from 'react-icons/tb'
import AOS from 'aos'
import "aos/dist/aos.css";
import { initialUserState, request } from '../../utils/request';
import { levelData } from '../../utils/tools';

const Mine = ({ username }) => {
    const [user, setUser] = useState(initialUserState);

    useEffect(() => {
        AOS.init({
            easing: 'ease-in-out',
            duration: 700,
        });

        request('/findUser', 'POST', { name: username }).then((res) => {
            console.log("finduser backend called");
            setUser(res.data.user);
        });
    }, [])

    useEffect(() => {
        if (user === null) return;

        let updatedUser = user;
        if (user.coins >= levelData[user.level]) {
            updatedUser.level++;
            updatedUser.earn_pertap++;
        }

        if ((new Date()) - user.timestamp >= 1000 * 60 * 60) {
            updatedUser = {
                ...updatedUser,
                coins: updatedUser.coins + updatedUser.profit_perhour,
                timestamp: new Date()
            }
        }
        document.getElementsByClassName('child-div')[0].style.width = user.coins / levelData[user.level - 1] * 100 + '%';
        request('/updateUser', 'POST', { user: updatedUser });
    }, [user]);

    const increaseCoin = () => {
        if (user === null) return;
        var plusSpan = document.createElement("span");
        plusSpan.innerHTML = '+' + user.earn_pertap;
        var parentDiv = document.getElementsByClassName('area')[0];
        plusSpan.style = 'position: fixed; color: white; font-weight: bold; font-size: 3em; top: 0px';
        parentDiv.appendChild(plusSpan);

        var pos = 0;
        var id = setInterval(frame, 2);
        function frame() {
            if (pos == 100) {
                clearInterval(id);
                plusSpan.remove();
            } else {
                pos++;
                plusSpan.style.top = pos + 'px';
                plusSpan.style.opacity = 1 - (pos / 100);
            }
        }
        setUser({
            ...user,
            coins: user.coins + user.earn_pertap
        });
    }

    return (
        <div className='pt-[5%] h-[120vh] overflow-y-scroll flex flex-col gap-2 px-[4%]'>
            <div className='w-full flex gap-2 items-center text-white z-[5000]'>
                <div className='w-full border-[1px] border-[#00FC87] flex gap-2 bg-black rounded-md items-center py-2 justify-center'>
                    <img width={20} height={20} src={"/logo.svg"} alt='' />
                    <p>MKT (Mike)</p>
                </div>
                <div className='w-full border-[1px] border-[#00FC87] bg-black flex gap-2 items-center justify-center py-2 rounded-md'>
                    <img width={20} height={20} src={"/binance.png"} alt='' />
                    <p>Binance</p>
                </div>
            </div>
            <Card username={username} user={user} setUser={setUser} />
            <div className='flex flex-col gap-1'>
                <div className='text-white flex w-full justify-between'>
                    <span className='flex items-center gap-2'>
                        <p>Bronze </p>
                        <TbChevronRight />
                    </span>
                    <span className='flex items-center gap-2'>
                        <p className='text-[#B0B4CF]'>Level</p>
                        <p>{user.level}/9</p>
                    </span>
                </div>
                <div>
                    <div className='parent-div'>
                        <div className='child-div'></div>
                    </div>
                </div>
            </div>
            <div data-aos="flip-left" className='flex relative flex-col items-center justify-center area'>
                <img src={"/lvl" + user.level + ".png"} width={270} height={270} className="mineimg" alt='' onClick={increaseCoin} />
            </div>
            <div className='flex flex-row justify-between text-white'>
                <div className='flex flex-row text-white items-center gap-2'>
                    <img width={20} height={20} src={"/strike.svg"} alt='' />
                    <p>1000/1000</p>
                </div>
                <div className='flex flex-row text-white items-center gap-2'>
                    <img width={20} height={20} src={"/boost.svg"} alt='' />
                    <p>Boost</p>
                </div>
            </div>
        </div>
    )
}

export default Mine