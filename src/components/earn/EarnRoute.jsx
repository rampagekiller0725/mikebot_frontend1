import React from 'react'
import Nav from '../Navigation/nav'
import Earn from './Earn'
import Footer from '../footer/Footer'
import { useParams } from 'react-router-dom'

const EarnRoute = ({user, setUser}) => {
  const { username } = useParams()

  return (
    <div>
        <Nav username={username}/>
        <Earn username={username} user={user} setUser={setUser} />
        <Footer username={username}/>
    </div>
  )
}

export default EarnRoute