import { useState } from 'react'
import './Home.css'
import Header from '../../Components/Header/Header'
import BoardGrid from '../../Components/BoardGrid/BoardGrid'
import { BrowserRouter, Route, Link } from 'react-router-dom'

function Home() {

  return (
    <>
    <Header/>
    <BoardGrid/>
    </>
  )
}

export default Home
