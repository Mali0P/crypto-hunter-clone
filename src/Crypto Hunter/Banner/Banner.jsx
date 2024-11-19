import React from 'react'
import './Banner.css'
import bgImage from '../Assets/bgImage.jpg'
import Marquee from './Marquee/Marquee'
export default function Banner() {
  return (
    <div className='banner'>
        <img src={bgImage} alt="backgroundImage" />
        <div className="content">
            <h2>Crypto Hunter</h2>
            <p>Get all the Info regarding your favorite Crypto Currency</p>
       <div className="marquee">
        <Marquee/>
       </div>
        </div>
    </div>
  )
}
