import React, { useEffect, useState } from 'react'
import CoinCard from '../reuseable/CoinCard'
// import Image from 'next/image'
import { taskList } from '../data'
import AOS from 'aos'
import "aos/dist/aos.css";
import DailyReward from '../modals/DailyReward';
import { request } from '../../utils/request';
import { initialUserState } from '../../utils/request';
import JoinTGChannel from '../modals/JoinTGChannel';
import JoinTGGroup from '../modals/JoinTGGroup';
import JoinTwitter from '../modals/JoinTwitter';
import JoinDiscord from '../modals/JoinDiscord';
import JoinMarketCap from '../modals/JoinMarketCap';

const Earn = ({ username }) => {
  const [user, setUser] = useState(initialUserState);
  const [dailyModalOpen, setDailyModalOpen] = useState(false);
  const [joinTGChannelModalOpen, setJoinTGChannelModalOpen] = useState(false);
  const [joinTGGroupModalOpen, setJoinTGGroupModalOpen] = useState(false);
  const [joinTwitterModalOpen, setJoinTwitterModalOpen] = useState(false);
  const [joinDiscordModalOpen, setJoinDiscordModalOpen] = useState(false);
  const [joinCoinMarketCapModalOpen, setJoinCoinMarketCapModalOpen] = useState(false);

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
    let updatedUser = user;
    if (user.coins >= levelData[user.level]) {
        updatedUser.level++;
        updatedUser.earn_pertap++;
    }

    if ((new Date()) - user.timestamp >= 3 * 1000 * 60 * 60 && open === false && user.profit_perhour !== 0) {
        setOpen(true);
    } else if ((new Date()) - user.timestamp >= 1000 * 60 * 60) {
        updatedUser = {
            ...updatedUser,
            coins: updatedUser.coins + updatedUser.profit_perhour,
            timestamp: new Date()
        }
    }
    updatedUser = {
      ...updatedUser,
      timestamp: new Date()
    }
    request('/updateUser', 'POST', { user: user });
  }, [user]);

  const openModal = (desc) => {
    if (checkStatus(desc)) return;
    if (desc.indexOf('channel') !== -1) setJoinTGChannelModalOpen(true);
    else if (desc.indexOf('group') !== -1) setJoinTGGroupModalOpen(true);
    else if (desc.indexOf('Twitter') !== -1) setJoinTwitterModalOpen(true);
    else if (desc.indexOf('Discord') !== -1) setJoinDiscordModalOpen(true);
    else if (desc.indexOf('CoinMarketCap') !== -1) setJoinCoinMarketCapModalOpen(true);
  }

  const checkStatus = (desc) => {
    if (desc.indexOf('channel') !== -1) return user.is_joined_tgchannel;
    else if (desc.indexOf('group') !== -1) return user.is_joined_tggroup;
    else if (desc.indexOf('Twitter') !== -1) return user.is_joined_twitter;
    else if (desc.indexOf('Discord') !== -1) return user.is_joined_discord;
    else if (desc.indexOf('CoinMarketCap') !== -1) return user.is_joined_coinmarket;
  }
  return (
    <div className='pt-[4%] px-[4%] h-[120vh] flex flex-col gap-2'>
      <div className='w-full justify-center flex'>
        <CoinCard
          image='/coin1.svg'
          value={user.coins}
        />
      </div>
      <button className='bg-gradient-to-r from-[#1ED760] to-[#00FC87] w-full py-2 rounded-[8px]'>Earn Your Coins</button>

      <div className='text-white flex flex-col gap-1 '>
        <p>Daily tasks</p>
        <div onClick={() => setDailyModalOpen(true)} className='px-4 py-1 bg-black border border-[#00FC87] flex w-full justify-between items-center rounded-[8px]'>
          <div className=' flex gap-3'>
            <img width={40} height={30} src={"/calendar.svg"} alt='' />
            <div>
              <p className='text-[12px]'>Daily reward</p>
              <span className='flex flex-row gap-1'>
                <img width={20} height={20} src={"/coin1.svg"} alt='' />
                <p className='text-[12px] font-bold'>+6,649,000</p>
              </span>
            </div>
          </div>
          <div>
            <img width={20} height={20} src={"/mark.png"} alt='' />
          </div>
        </div>
      </div>
      <div className='text-white flex flex-col gap-1'>
        <p>Tasks list</p>
        <div data-aos="fade-up-left" className='flex flex-col gap-3'>
          {
            taskList.map((t, i) => (
              <div key={i} className='px-4 py-1 bg-black border border-[#00FC87] flex w-full justify-between items-center rounded-[8px]' onClick={() => openModal(t.desc)}>

                <div className=' flex gap-3'>
                  <img width={40} height={30} src={t.image1} alt='' />
                  <div>
                    <p className='text-[12px]'>{t.desc}</p>
                    <span className='flex flex-row gap-1'>
                      <img width={20} height={20} src={t.image2} alt='' />
                      <p className='text-[12px] font-bold'>{t.amount}</p>
                    </span>
                  </div>
                </div>
                <div>
                  {!checkStatus(t.desc) ?
                    <img width={20} height={20} src={t.image3} alt='' />
                    :
                    <img width={20} height={20} src={"/mark.png"} alt='' />
                  }
                </div>
              </div>
            ))
          }
        </div>
      </div>

      <DailyReward open={dailyModalOpen} setOpen={setDailyModalOpen} user={user} setUser={setUser} />
      <JoinTGChannel open={joinTGChannelModalOpen} setOpen={setJoinTGChannelModalOpen} user={user} setUser={setUser} />
      <JoinTGGroup open={joinTGGroupModalOpen} setOpen={setJoinTGGroupModalOpen} user={user} setUser={setUser} />
      <JoinTwitter open={joinTwitterModalOpen} setOpen={setJoinTwitterModalOpen} user={user} setUser={setUser} />
      <JoinDiscord open={joinDiscordModalOpen} setOpen={setJoinDiscordModalOpen} user={user} setUser={setUser} />
      <JoinMarketCap open={joinCoinMarketCapModalOpen} setOpen={setJoinCoinMarketCapModalOpen} user={user} setUser={setUser} />
    </div>
  )
}

export default Earn