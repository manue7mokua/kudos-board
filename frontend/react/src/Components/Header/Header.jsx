import React from 'react'
import './Header.css'
import kudosicon from '../../assets/kudosmate.png'

const Header = () => {
  return (
    <div className='header-content'>
        <img src={kudosicon} alt='kudos website icon' className='webapp-logo'/>
        <h1 id='app-name'>KUDO|_|BOARD</h1>
    </div>
  )
}

export default Header
