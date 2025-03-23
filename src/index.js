import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';


import Game from "./Pages/Game.js"
import Start from "./Pages/Start.js"
import Slide1 from "./Pages/Slide1.js"
import Slide2 from "./Pages/Slide2.js"

import { BrowserRouter, Routes, Route } from "react-router-dom";

const root = document.getElementById('root');

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route index element={<Start />} />
      <Route path= "/game" element={<Game />} />
      <Route path= "/slide" element={<Slide1 />} />
      <Route path= "/slide2" element={<Slide2 />} />
    </Routes>
  </BrowserRouter>
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
