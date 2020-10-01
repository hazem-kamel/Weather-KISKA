import React from 'react';
import TimeAndCity from './components/timeandcity/TimeCity'
import Weather from './components/weather/Weather'
import './App.css';

function App() {
  return (
    <div className="App">
      <TimeAndCity/>
      <Weather/>
    </div>
  );
}

export default App;
