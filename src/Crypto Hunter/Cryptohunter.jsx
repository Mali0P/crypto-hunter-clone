import React from 'react';
import Navbar from './Navbar/Navbar';
import { CounterProvider } from './API/Context';
import Banner from './Banner/Banner';
import '../index.css';
import Secondcontainer from '../SecondContainer/Secondcontainer';

export default function Cryptohunter() {
    return (
        
        <CounterProvider>
                <Navbar />
                <Banner />
                <Secondcontainer />
                
               
                </CounterProvider>
    
    );
}
