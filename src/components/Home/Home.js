import React , {useState,useEffect} from 'react'
import TimeAndCity from '../timeandcity/TimeCity'
import Weather from '../weather/Weather'


const Home = () => {
    const [city , updateCity] = useState('Innsbruck')
    const [init,updateInit] = useState('')
    useEffect(()=>{
    },[city])

    const changeCity = () => {
        updateCity(init)
    }
    return(
        <div>
        <TimeAndCity city={city}/>
      <label>Change City</label>
      <input onChange={e=>updateInit(e.target.value)} type="text"></input>
      <button onClick={()=>changeCity()} placeholder="Search another city"></button>
        <Weather city={city}/>
        </div>
    )
    }

export default Home;