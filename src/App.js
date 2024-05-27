import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Cards from './components/exchange/Exchange';
import MineRoute from './components/mine/MineRoute';
import FriendRoute from './components/friends/FriendRoute';
import EarnRoute from './components/earn/EarnRoute';
import Onboarding from './components/onboarding/Onboarding';
import { initialUserState, request } from './utils/request';
import { levelData } from './utils/tools';

function App() {

  const [user, setUser] = useState(initialUserState);
  var timer = false;

  useEffect(() => {
    if (!user) return;
    let updatedUser = user;
    if (user.coins >= levelData[user.level - 1]) {
      updatedUser.level++;
      updatedUser.earn_pertap++;
    }

    if (timer == false) {
      timer = setInterval(() => {
        increase_pertap();
      }, 1000 * 60);
    }
    if (user.coins >= levelData[user.level-1]) {
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

    if ((new Date()) - user.timestamp >= 1000 * 60 * 60 * 3) {
      updatedUser = {
        ...updatedUser,
        coins: updatedUser.coins + updatedUser.profit_perhour * 3,
        timestamp: new Date()
      }
    }
    request('/updateUser', 'POST', { user: user });
  }, [user]);

  const increase_pertap = () => {
    setUser({
      ...user,
      coins: user.coins + user.earn_pertap
    })
  }

  return (
    <div className="App">
      <div className='bg-black'>
        <BrowserRouter>
          <Routes>
            <Route path='/:username' element={<Onboarding user={user} setUser={setUser} />} />
            <Route path='/exchange/:username' element={<Cards user={user} setUser={setUser} />} />
            <Route path='/mine/:username' element={<MineRoute user={user} setUser={setUser} />} />
            <Route path='/friends/:username' element={<FriendRoute user={user} setUser={setUser} />} />
            <Route path='/earn/:username' element={<EarnRoute user={user} setUser={setUser} />} />
            <Route path='/airdrop/:username' element={<Cards user={user} setUser={setUser} />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
