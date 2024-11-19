import React, { useContext, useState } from 'react'
import './navbar.css'
import { CounterProvider, CurrencyContext } from '../API/Context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
export default function Navbar() {
    const ContextState = useContext(CurrencyContext)
    const[dropdown,dropdownStatus]=useState(false)


    const handleCurrencyChange = (currency) => {
       ContextState. curCurFun(currency); 
        dropdownStatus(false);
    };
    console.log("Current Currency:", ContextState.curCurrency);
  return (
    
      <nav>
            <Link to={'/'}><h1>Crypto Hunter</h1></Link>
            
            <ul>
                <li>
                    <div className="dropdown">
                        <button className="dropdown-button" onClick={() => dropdownStatus(!dropdown)}>
                            {ContextState.curCurrency}
                            <span>
                            <FontAwesomeIcon icon={faCaretDown} /></span>
                        </button>
                        <ul className="dropdown-content" style={{ scale: dropdown ? '1' : '0',top:dropdown?'':'-50%'}} >
                            <li className="dropdown-item" style={{background:ContextState.curCurrency=="USD"?'#606060':''}} onClick={() => handleCurrencyChange('usd')}>USD</li>
                            <li className="dropdown-item" style={{background:ContextState.curCurrency=="INR"?'#606060':''}} onClick={() => handleCurrencyChange('inr')}>INR</li>
                        </ul>
                    </div>
                    
                    
                </li>
                <li><button>Login</button></li>
            </ul>
        </nav>
        
  )
}
