import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom'
import Card from './Cards'
import Others from './Others'
import Nav from '../Navigation/nav'
import AOS from 'aos'
import "aos/dist/aos.css";
import Footer from '../footer/Footer'
import { initialUserState, request } from '../../utils/request'

const Cards = () => {
  const { username } = useParams()
  const [open, setOpen] = useState(false);

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

    if (user.coins >= 5000) {
      updatedUser.coins -= 5000;
      updatedUser.level ++;
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
    request('/updateUser', 'POST', { user: updatedUser });
  }, [user]);

  const getReward = () => {
    const updatedUser = {
      ...user,
      coins: user.profit_perhour * 3,
      timestamp: new Date()
    }
    request('/updateUser', 'POST', {user: updatedUser});
  }

  return (
    <div>
      <Nav username={username} />
      <Card username={username} user={user} setUser={setUser} />
      <Others username={username} user={user} setUser={setUser} />
      <Footer username={username} />
      <div className='getreward-modal' style={{ display: open === false ? 'none' : 'block' }}>
        <div className='modal-header'></div>
        <div className='modal-content'>
          <div className='flex items-center gap-2 align-center justify-center'>
            <img width={80} height={80} src='/coin1.svg' alt='' />
            <p className="text-6xl">{user.profit_perhour * 3}</p>
          </div>
          <p>The exchange has started working for you</p>
          <button type="button" onClick={getReward} class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Thank you</button>

        </div>
      </div>
    </div>
  )
}

export default Cards