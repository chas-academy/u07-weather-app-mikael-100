import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import Search from './components/Search.tsx'
import ApiWeather from './components/ApiWeather.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <App />
    <Search></Search>
    {/* <ApiWeather></ApiWeather> */}
  </>,
)
