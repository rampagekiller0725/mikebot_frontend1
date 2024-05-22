import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom'
import Card from './Cards'
import Others from './Others'
import Nav from '../Navigation/nav'
import AOS from 'aos'
import "aos/dist/aos.css";
import Footer from '../footer/Footer'
import { initialUserState, request } from '../../utils/request'
import GetReward from '../modals/GetReward';
import { levelData } from '../../utils/tools';

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

    if (user.coins >= levelData[user.level]) {
      updatedUser.level ++;
      updatedUser.earn_pertap ++;
    }

    if ((new Date()) - user.timestamp >= 1000 * 60 * 60) {
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
    setOpen(false);
    setUser(updatedUser);
  }

  return (
    <div>
      <Nav username={username} />
      <Card username={username} user={user} setUser={setUser} />
      <Others username={username} user={user} setUser={setUser} />
      <Footer username={username} />
      <GetReward user={user} open={open} getReward={getReward} />
    </div>
  )
}

export default Cards