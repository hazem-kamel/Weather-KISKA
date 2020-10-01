import React from 'react';
//import bootstrap
// import 'bootstrap/dist/css/bootstrap.min.css';

// import Weather icons
import 'weather-icons/css/weather-icons.css';

class Weather extends React.Component{
  
    constructor(){
        super();
        this.state={
          city:'salzburg',
          country:'Austria',
          icon:undefined,
          main:undefined,
          celsius:undefined,
          temp_max:undefined,
          temp_min:undefined,
          description:'',
          wind:undefined,
          error:false
        }
      }

componentDidMount(){
    this.getWeather();
}
      getWeather = async()=>{
        // e.preventDefault();
                    //Api key
const Api_key='8cc1f7a80f278edcf892761e33af1953'
          const {city , country } =this.state
        const api_call=await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}
        &appid=${Api_key}`
        , { method: 'GET',
        mode: 'cors',
        header:{
          'Access-Control-Allow-Origin': '*'
        }
        })
      const response=await api_call.json();
    //   console.log(response.list)

      this.setState({
        city:`${response.name},${response.sys.country}`,
        country:response.sys.country,
        celsius:this.celsiusConvert(response.main.temp),
        temp_max: this.celsiusConvert(response.main.temp_max),
        temp_min: this.celsiusConvert(response.main.temp_min),
        description:response.weather[0].description,
        icon:response.weather[0].icon,
        wind:response.wind.speed
      })
      this.get_WeatherIcon(this.weatherIcon,response.weather[0].id)
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
                this.setState({icon:this.weatherIcon.Thunderstorm})
                break;
                case rangeID>=300 && rangeID<=321:
                this.setState({icon:this.weatherIcon.Drizzle})
                break;
                case rangeID>=500 && rangeID<=531:
                this.setState({icon:this.weatherIcon.Rain})
                break;
                case rangeID>=600 && rangeID<=622:
                this.setState({icon:this.weatherIcon.Snow})
                break;
                case rangeID>=701 && rangeID<=781:
                this.setState({icon:this.weatherIcon.Atmosphere})
                break;
                case rangeID === 800:
                this.setState({icon:this.weatherIcon.Clear})
                break;
                case rangeID>=801 && rangeID<=804:
                this.setState({icon:this.weatherIcon.Clouds})
                break;
                default:
                  this.setState({icon:this.weatherIcon.Clouds})
        
            }
            
          }
      
      render(){
          const {celsius,description,wind,icon} = this.state
          return (
          <div>
        <i className={`wi ${icon} display-1`}></i>
        <h4>{description}</h4>
        <h3>{celsius}&deg; </h3>
        <h3>{wind} m/s </h3>

          </div>)
      }
}


export default Weather;