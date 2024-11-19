import React from 'react'
import { CounterProvider } from '../API/Context'
import Navbar from '../Navbar/Navbar'
import Coinpage from './Coinpage'

export default function CoinPageProvider() {
  return (
<>
<CounterProvider>
    <Navbar/>
    <Coinpage/>
</CounterProvider>
</>
  )
}
