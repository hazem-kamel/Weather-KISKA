import React from 'react';
//import bootstrap
// import 'bootstrap/dist/css/bootstrap.min.css';
import './Weather.css'
// import Weather icons
import 'weather-icons/css/weather-icons.css';

class Weather extends React.Component{
  
    constructor(){
        super();
        this.state={
          city:'salzburg',
          country:'Austria',
          icon:[],
          main:null,
          celsius:null,
          temp_max:null,
          temp_min:null,
          description:null,
          wind:null,
          error:false,
          fiveWeatherData:[],
          displayData:[]
        }
      }

componentWillMount(){
    this.getWeather();
}
      getWeather = async()=>{
const Api_key='8cc1f7a80f278edcf892761e33af1953'
          const {city , country } =this.state
        const api_call=await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city} &appid=${Api_key}`,
         { method: 'GET',
        mode: 'cors',
        header:{
          'Access-Control-Allow-Origin': '*'
        }
        })
      const response=await api_call.json();
        this.state.fiveWeatherData.push(response.list[0])
    response.list.map(forecast => {
        if(forecast.dt_txt.split(' ')[0] !== response.list[0].dt_txt.split(' ')[0] && forecast.dt_txt.split(' ')[1] === response.list[0].dt_txt.split(' ')[1] ) {
            this.state.fiveWeatherData.push(forecast)
        }
    })
    let temp=[]
    this.state.fiveWeatherData.map(day => {
        // this.state.displayData.push
        temp.push
        ({
            "celsius":this.celsiusConvert(day.main.temp),
            "wind":day.wind.speed,
            "desc":day.weather[0].description,
            "max":this.celsiusConvert(day.main.temp_max),
            "min":this.celsiusConvert(day.main.temp_min),
        })
          this.get_WeatherIcon(this.weatherIcon,day.weather[0].id)
    })
     this.setState({displayData:temp})
          }
          celsiusConvert(temp){
            let celsius=Math.floor(temp-273.15)
            return celsius
          }
          weatherIcon={
            Thunderstorm:'wi-thunderstorm',
            Drizzle:'wi-sleet',
            Rain:'wi-storm-showers',
            Snow:'wi-snow',
            Atmosphere:'wi-fog',
            Clear:'wi-day-sunny',
            Clouds:'wi-day-fog'
          }
          get_WeatherIcon(icons,rangeID){
            switch(true){
              case rangeID>=200 && rangeID<=232:
                this.state.icon.push(this.weatherIcon.Thunderstorm)
                break;
                case rangeID>=300 && rangeID<=321:
                this.state.icon.push(this.weatherIcon.Drizzle)
                break;
                case rangeID>=500 && rangeID<=531:
                this.state.icon.push(this.weatherIcon.Rain)
                break;
                case rangeID>=600 && rangeID<=622:
                this.state.icon.push(this.weatherIcon.Snow)
                break;
                case rangeID>=701 && rangeID<=781:
                this.state.icon.push(this.weatherIcon.Atmosphere)
                break;
                case rangeID === 800:
                this.state.icon.push(this.weatherIcon.Clear)
                break;
                case rangeID>=801 && rangeID<=804:
                this.state.icon.push(this.weatherIcon.Clouds)
                break;
                default:
                    this.state.icon.push(this.weatherIcon.Clouds)
                //   this.setState({icon:this.weatherIcon.Clouds})
            }
          }
      render(){
          const {celsius,description,wind,icon,displayData} = this.state
          return (
          <div>
              {
                console.log(displayData,displayData.length)
              }
              {
              displayData.map((day,index) => 
           (
                    <div className="card">
                         <i className={`wi ${icon[index]} display-1`}></i> 
                         <h4>{day.desc}</h4>
                         <h3>{day.celsius}&deg; </h3>
                         <h3>{day.wind} m/s </h3>
                    </div>
                      
              ))}
          </div>
          )
      }
}


export default Weather;