import React from 'react'
import Nav from '../Navigation/nav'
import Friends from './Friends'
import Footer from '../footer/Footer'
import { useParams } from 'react-router-dom'

const FriendRoute = ({user, setUser}) => {
  const { username } = useParams()

  return (
    <div>
        <Nav username={username}/>
        <Friends username={username} user={user} setUser={setUser} />
        <Footer username={username}/>
    </div>
  )
}

export default FriendRoute