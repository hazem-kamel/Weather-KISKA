import React from 'react';
//import bootstrap
// import 'bootstrap/dist/css/bootstrap.min.css';
import './Weather.css'
// import Weather icons
import 'weather-icons/css/weather-icons.css';
import moment from 'moment'
class Weather extends React.Component{
    constructor(props){
        super(props);
        this.state={
          icon:[],
          error:false,
          fiveWeatherData:[],
          displayData:[],
          state:''
        }
      }
      componentDidMount(){
        this.state.displayData.length=0
        this.state.fiveWeatherData.length=0
        console.log('entered here')
        this.setState({state:this.props.city})
        this.getWeather(this.props.city);
}
componentWillReceiveProps(nextProps,prevState){
    if(nextProps.city !== this.props.city){
      console.log(nextProps.city)
        this.state.displayData.length=0
        this.state.fiveWeatherData.length=0
        this.setState({state:nextProps.city})
        this.getWeather(nextProps.city);
    }
}
      getWeather = async(city)=>{
const Api_key='8cc1f7a80f278edcf892761e33af1953'
        //   const {city , country } =this.state
        // const {city} = this.props
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
        var dayday = moment(day.dt_txt, "YYYY-MM-DD HH:mm:ss")
        temp.push
        ({
            "celsius":this.celsiusConvert(day.main.temp),
            "wind":day.wind.speed,
            "desc":day.weather[0].description,
            "max":this.celsiusConvert(day.main.temp_max),
            "min":this.celsiusConvert(day.main.temp_min),
            "humidity":day.main.humidity,
            "pressure":day.main.pressure,
            "day":dayday.format('dddd')
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
            }
          }
      render(){
          const {celsius,description,wind,icon,displayData} = this.state
          return (
          <div className='container'>
              {
              displayData.map((day,index) => 
           (
                    <div onClick={()=>this.setState({show:!this.state.show})} className="card">
                         <i style={{fontSize:"40px"}} className={`wi ${icon[index]} display-1`}></i> 
           {index === 0 ? <h1>Today</h1> : <h3>{day.day}</h3>}
                  <h2>{day.celsius}&deg; </h2>

                         <h4>{day.desc}</h4>
                         <h3>{day.wind} m/s </h3>
                    </div>
                      
              ))}
          </div>
          )
      }
}


export default Weather;