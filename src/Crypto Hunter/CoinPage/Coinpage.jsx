import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './coinpage.css';
import { SingleCoin } from '../API/APICur';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import { CounterProvider } from '../API/Context';
import { CurrencyContext } from '../API/Context'
import HtmlParser from 'react-html-parser';
import Graph from './Graph/Graph';


export default function Coinpage() {
    const [err, errStatus] = useState('');

    const[curDate,curDateFun] = useState(1)
    const [apiData, apiDataFun] = useState({});
    let baseName = (useLocation().pathname).split('/')[2];
let CurrencyStatus =  useContext(CurrencyContext)
const getFirstTwoSentences = (description) => {
    if (!description) return ""; // Handle empty or undefined description
    const sentences = description.split('.');
    return sentences.slice(0, 2).join('.') + '.';
  };
    let coinapi = async () => {
        try {
            console.log('Fetching data...'); 
            const finalData = await axios.get(SingleCoin(baseName));
            apiDataFun(finalData.data);
        } catch (error) {
            errStatus(error.message);
        }
    };

    useEffect(() => {
        coinapi()
        console.log(CurrencyStatus.curCurrency)

    }, [err,CurrencyStatus.curCurrency]);

    return (
     
        <div className='showCoinDetails'>
          
            {console.log('Error:', err)} 
            {err === '' ? (
                <div className="nextPage w-[100%] mt-[24px] h-[90vh]">
                    <div className="leftData">
                        <ul>{console.log(apiData)}
                            <li>
                                <img src={apiData.image?.large} alt={apiData.name} />
                            </li>
                            <li>
                                <h1>{apiData.name}</h1>
                            </li>
                            <li>
                            <p>{HtmlParser(getFirstTwoSentences(apiData.description?.en))}</p>
                            </li>
                            <li>
                                <h2>Rank: <span> {apiData.market_cap_rank}</span></h2>
                            </li>
                            <li>
                                <h2>Current Price: <span> {apiData.market_data?.current_price ? (CurrencyStatus.curCurrency === 'inr' ?'₹ '+ (apiData.market_data.current_price.inr).toLocaleString() :'$'+ apiData.market_data.current_price.usd).toLocaleString()  : null}
                                </span></h2>
                            </li>
                            <li>
                                <h2>Market Cap: <span>{` ${CurrencyStatus.curCurrency==='inr'?'₹':'$'} ${apiData.market_data?.market_cap?.inr.toLocaleString()}`}</span></h2>
                            </li>
                        </ul>
                    </div>
                    <div className="rightGraph">
<Graph currency={CurrencyStatus.curCurrency} days={curDate} coinname={baseName}/>
<div className="buttonDivs text-[white]">
    <button className={curDate===1?'active':''} onClick={()=>{curDateFun(1)}}>24 Hours</button>
    <button className={curDate===30?'active':''} onClick={()=>{curDateFun(30)}}>30 Days</button>
    <button className={curDate===90?'active':''} onClick={()=>{curDateFun(90)}}>3 Months</button>
    <button className={curDate===365?'active':''} onClick={()=>{curDateFun(365)}}>1 Year</button>
</div>

                    </div>
                </div>
            ) : (
                <div className='errorloader'><div className="loading"></div></div>
            )}
        </div>
       
 
    );
}
