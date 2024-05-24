import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom'
import Card from './Cards'
import Others from './Others'
import Nav from '../Navigation/nav'
import AOS from 'aos'
import "aos/dist/aos.css";
import Footer from '../footer/Footer'
import GetReward from '../modals/GetReward';

const Cards = ({user, setUser}) => {
  const { username } = useParams()
  const [open, setOpen] = useState(false);

  useEffect(() => {
    AOS.init({
      easing: 'ease-in-out',
      duration: 700,
    });
  }, [])

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