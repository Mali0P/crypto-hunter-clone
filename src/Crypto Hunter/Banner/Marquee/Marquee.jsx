import React, { useContext, useEffect, useRef, useState } from 'react'
import { TrendingCoins } from '../../API/APICur'
import { CurrencyContext } from '../../API/Context'
import axios from 'axios'
import './Marquee.css'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Link } from 'react-router-dom'

export default function Marquee() {
  

let CurState = useContext(CurrencyContext)
let Data = TrendingCoins(CurState.curCurrency)
  const ulRef = useRef(null)
  

  let errorStatus = CurState.errorStatus

 
useGSAP(()=>{
  gsap.from(ulRef.current ,{
transform:"translateX(0%)",
repeat:-1,
duration:7,
ease:'none'
  })
}

)





let curApi = CurState.curApi





let fetchApi = async () => {
  try {
    const result = await axios.get(`${Data}`);
    CurState.curApiFun(result.data);
  } catch (error) {
    CurState.errorFun(error.message);
  }
};



useEffect(()=>{
fetchApi();
},[CurState.curCurrency])
  return(
  <ul className='marqueeData' ref={ulRef}>
    {errorStatus===''?
    curApi.slice(0,10).map((val,id)=>{
    
      let price =  val.current_price.toLocaleString();
      return (
        <li key={id} className='dataMarquee'> 
        <Link to={`/coin/${val.id}`}>
        <img src={val.image} alt="image" />
        <p style={{textTransform:'uppercase'}}>{val.symbol} <span style={{color:val.price_change_percentage_24h>0?'rgb(14, 203, 129)':'red'}}>{val.price_change_percentage_24h>0?'+':''}{(val.price_change_percentage_24h).toFixed(2)}%</span></p>
        <h3>{CurState.curCurrency==="inr"?'₹':'$ '}{price}</h3>
        </Link>
        </li>
      )
      
    
})
   :''}
    {errorStatus===''?
    curApi.slice(0,10).map((val,id)=>{
    
      let price =  val.current_price.toLocaleString();
      return (
        <li key={id} className='dataMarquee'> 
        <Link to={`/coin/${val.id}`}>
        <img src={val.image} alt="image" />
        <p style={{textTransform:'uppercase'}}>{val.symbol} <span style={{color:val.price_change_percentage_24h>0?'rgb(14, 203, 129)':'red'}}>{val.price_change_percentage_24h>0?'+':''}{(val.price_change_percentage_24h).toFixed(2)}%</span></p>
        <h3>{CurState.curCurrency==="inr"?'₹':'$ '}{price}</h3>
        </Link>
        </li>
      )
      
    
})
   :''}

  
 

  </ul>
  )
}
