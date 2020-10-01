import React , {useState,useEffect} from 'react'
import TimeAndCity from '../timeandcity/TimeCity'
import Weather from '../weather/Weather'
import './Home.css'

const Home = () => {
    const [city , updateCity] = useState('Salzburg')
    const [init,updateInit] = useState('')
    useEffect(()=>{
    },[])

    const changeCity = () => {
        console.log(city)
        updateCity(init)
    }
    console.log(city)
    return(
    
        <div>
        <TimeAndCity city={city}/>
      <label style={{color:"white",fontWeight:"bold"}}>Change City</label>
      <input  className='inputStyle' onChange={e=>updateInit(e.target.value)} type="text"></input>
      <button className="buttonStyling" onClick={()=>changeCity()} placeholder="Search another city">Search</button>
        <Weather city={city}/>
        </div>
    )
    }

export default Home;