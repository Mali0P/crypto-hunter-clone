import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Cryptohunter from './Crypto Hunter/Cryptohunter';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import CoinPageProvider from './Crypto Hunter/CoinPage/CoinPageProvider';
import Practice from './Practice';

const routes = createBrowserRouter([{
  path:'/',
  element:<Cryptohunter/>
},{
path:'/coin/:id'
, element:<CoinPageProvider/>
} ,
{
  path:'parc',
  element:<Practice/>
}
])

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
<RouterProvider router={routes}/>
  </React.StrictMode>
);

reportWebVitals();
