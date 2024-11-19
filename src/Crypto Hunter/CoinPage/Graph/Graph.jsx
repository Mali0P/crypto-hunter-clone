import axios from 'axios'
import { color, toPadding } from 'chart.js/helpers';
import './Graphcss.css'
import React, { useEffect, useState } from 'react'
import { Chart } from "react-google-charts";
export default function Graph({currency,days,coinname}) {
    const[dataApi,dataFun] = useState([])
const [graphData, setGraphData] = useState([["Date","Prices"]])

const fetchApi = async()=>{
    try{
    let interData = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinname}/market_chart?vs_currency=${currency}&days=${days}`)
  dataFun(interData.data)
    }
    catch(error){
      dataFun(error.message)
    }
  }
  useEffect(()=>{
    fetchApi()
    console.log(days)
    
    },[currency, days, coinname])

    
useEffect(()=>{
    let dataCopy = [["Date",`Price (Past ${days}Days) in ${(currency).toUpperCase()}`]];
    if(dataApi.prices){
      dataApi.prices.map((value)=>{
        const [timestamp, price] = value;
        const formattedDate = new Date(timestamp).toLocaleString().split(',')[0].slice(0,-5);
        dataCopy.push([formattedDate, price]);
      })
    }
    setGraphData(dataCopy)
  },[dataApi,coinname])
  const options = {
    series: {
      0: { 
        color: 'rgb(254, 215, 0)', 
        
        lineWidth: '100%',
            
      },
    }
    ,
    hAxis: { 
        textStyle: {
            color: 'rgb(133, 133, 133)'  
          },
        gridlines: {
          count: 0          
        },

      },
      vAxis: {  textStyle: {
        color: 'rgb(133, 133, 133)' ,
 
      },
       
        gridlines: {
          count: 0         
        },
        position: 'bottom',
      },
      legend: { 
        position: 'top',
        alignment: 'center', 
        textStyle: {
          color: 'rgb(133, 133, 133)'  
        }
      },
    backgroundColor: {
        fill: 'transparent',    
      },
      
      chartArea: {
        backgroundColor: {
          fill: 'transparent'     
        },
    
        width: '80%',       
        height: '70%' 
        
      }
    }

  return (
    <div className='graphDiv'>
        {
            dataApi.prices?(
            
            <Chart className='edit'
                chartType="LineChart"
                width="100%"
                height="80vh"
                
                data={graphData}
                options={options}
                legendToggle
              />
            ):(<div className="loadingBarGraph">
                <div className="loaderSpin"></div>
            </div>)
}

    </div>
  )
}
