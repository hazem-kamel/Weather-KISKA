import { render } from '@testing-library/react';
import React from 'react';
import moment from 'moment'
import './TimeCity.css'
const TimeAndCity = props => {
   return(
       <div style={{display:"flex"}}>
           <div className="time">
   <h3>{moment().format("h:mm a")}</h3>
   <h4>{moment().format("dddd, MMMM Do YYYY")}</h4>
           </div>
           <div className="city">
               <h3>{props.city}</h3>
               <h5>Austria</h5>
           </div>
       </div>
   )
}
export default TimeAndCity