import React, { useContext, useEffect, useRef, useState } from 'react'
import './secondconatiner.css'
import { CurrencyContext } from '../Crypto Hunter/API/Context'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Link } from 'react-router-dom'
import { faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
export default function Secondcontainer() {
  let Currency = useContext(CurrencyContext)
  const[curPage,pageFun] = useState(10)
const[handleInputData,handleDataFun]= useState('')
  
let curRef = useRef(null)
  let errorStatus = Currency.errorStatus
 useEffect(()=>{
  gsap.to('.white',{
    transform:'translateX(100vw)',
    repeat:-1,
    duration:1.2,
    ease:'none'
  })
 },[errorStatus])
let curApi = Currency.curApi
  return (
    <div className='secondconatiner'>
        <h1 className='topHeading'>Cryptocurrency Prices by Market Cap</h1>
        <div className="inputBox">
        <input type="text" value={handleInputData} onChange={(event)=>handleDataFun(event.target.value)} required/>
        <span className="inputText">Search For a Crypto Currency..</span>
        </div>
    {errorStatus===''?(    <div className='secondGrid grid grid-cols-[40%_20%_20%_20%]'>
      <div className="divs coinLeft">Coin</div>
        <div className="divs">Price</div>
        <div className="divs">24h Change</div>
        <div className="divs">Market Cap</div>

{curApi.filter((val)=>{
  return handleInputData.toLocaleLowerCase()===''?val:val.id.toLocaleLowerCase().includes(handleInputData)
}).slice(curPage-10,curPage).map((val,id)=>{
  return (
    
    <>

    <Link to={`/coin/${val.id}`}>
       <div className="showDataContent firstShowData" style={{cursor:'pointer'}}>
    <img src={val.image} alt="" />
  <div className='title'>
    <h1>{val.symbol}</h1>
    <p>{val.id}</p>
  </div>
  </div>
  </Link>
  <div className="showDataContent">
    <p>  
   {Currency.curCurrency==='inr'?' ₹':'$'} {val.current_price.toLocaleString()}</p>
  </div>
  <div className="showDataContent" style={{color:val.price_change_percentage_24h>0?'rgb(14, 203, 129)':'red'}}><p>{val.price_change_percentage_24h>0?'+':''}{(val.price_change_percentage_24h).toFixed(2)}%</p></div>
  <div className="showDataContent marketcap"><p> {Currency.curCurrency==='inr'?' ₹':'$'} {(val.market_cap.toString()).length>7?`${parseInt((val.market_cap.toString()).length-7).toLocaleString()}M`:val.market_cap}</p></div>
 
 </>
  )
})}
 <div className='pagination col-span-4 text-[gold] font-[400] text-center py-[20px]'>
  <button className='mx-[3px] px-[6px]' onClick={()=>{pageFun(prev=>prev>10?prev-10:prev)}}><FontAwesomeIcon icon={faAngleUp} style={{transform:'rotate(-90deg)'}} /></button>
{[...Array(curApi.length/10)].map((_,id)=>{
  return <button className='mx-[3px] px-[6px]' onClick={()=>{pageFun((id+1)*10)}} style={{backgroundColor:curPage===((id+1)*10)?'rgba(255, 255, 255, 0.275)':''}}>
    {id+1}
  </button>
})}
  <button className='mx-[3px] px-[6px]' onClick={()=>{pageFun(prev=>prev<100?prev+10:prev)}}><FontAwesomeIcon icon={faAngleUp} style={{transform:'rotate(90deg)'}} /></button>
 </div>
      
      </div>):(<div className="w-[100%] h-[1vh] mt-2 col-span-4 bg-[#eebc1d]" style={{borderRadius:'4px',position:'relative',overflow:'hidden'}}><div className='white w-[50%] h-[100%] bg-[white]' style={{position:'relative',transform:'translateX(-100%)'}} ref={curRef}></div></div>)}
  
    </div>
  )
}
