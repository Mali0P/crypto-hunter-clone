import { createContext, useState } from "react";

export const CurrencyContext = createContext('')

export const CounterProvider = (props)=>{
    const[curCurrency,curCurFun] = useState('inr')

    const[curApi,curApiFun] = useState([])
    const[errorStatus,errorFun] = useState('')

    return <CurrencyContext.Provider value={{curCurrency,curCurFun,curApi,curApiFun,errorStatus,errorFun
    }}>
     
      {props.children}
     
    </CurrencyContext.Provider>
}