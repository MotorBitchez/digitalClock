import React from 'react';
import {css} from 'react-emotion';
import PropTypes from 'prop-types';


function getTimeZonedDate(offset, date){

  let utcDate = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
  
  
  offset = offset.slice(2); 
  
  let offsetHour = parseInt(offset.split(':')[0]); 
  let offsetMinute = parseInt(offset.split(':')[1]);
  console.log(offsetHour, offsetMinute);
  if (offsetHour < 0) offsetMinute *= -1;
  return new Date(
    utcDate.getFullYear(), 
    utcDate.getMonth(), 
    utcDate.getDate(), 
    utcDate.getHours() + offsetHour, 
    utcDate.getMinutes() + offsetMinute, 
    utcDate.getUTCSeconds()
  );
}


export const DigitalClock = ({date, hour12, color, timezone, orientation}) => {
  hour12 = hour12 === 'true';
  
  let time = new Intl.DateTimeFormat('en-GB', {hour12: hour12, hour: 'numeric', minute: '2-digit'}).format(getTimeZonedDate(timezone, date));
  let dateObj = new Intl.DateTimeFormat('en-GB', {hour12: hour12, day: 'numeric', month: 'long', year: 'numeric'}).format(getTimeZonedDate(timezone, date));
  
  
  let hourTypeSpan = '';
  let fontColor = 'black';
  let dateBackground = 'black';
  let dateFontColor = 'white';
  let clockStyle = clock;
  
  if(color == 'black'){ 
    fontColor = 'white';
    dateBackground = 'white';
    dateFontColor = 'black';
  }

  if(orientation == 'vertical'){
    clockStyle = verticalClock;
  }
  
  if(hour12){ 
    if(time.indexOf('am') !== -1){
      time = time.replace('am', '').trim();
      hourTypeSpan = <span  style={{color: fontColor}} id= "hour-type">A.M</span>;
    }else{
      time = time.replace('pm', '').trim(); 
      hourTypeSpan = <span  style={{color: fontColor}} id= "hour-type">P.M</span>;
    }
  }else{
    if(time.startsWith('0')){
      time = time.slice(1);
    }
  }




  return( 
    <div className={clockContainer} style={{background: color}}> 
      
      <div className={dateStyle}>
        <span style={{background: dateBackground, color: dateFontColor}}>{dateObj}</span>
      </div>
      <span className={clockStyle}>
          {hourTypeSpan} 
          <span style={{color: fontColor}}>{time}</span> 
      </span>
    </div>
  );
};

DigitalClock.propTypes = {
  date: PropTypes.object.isRequired
}

const clockContainer = css`
  width: 100vw; 
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; 
`;
 

const clock = css`
  position: relative;  
  display: inline-block;  

  #hour-type{
    position: absolute;
    top: 20px;
    left: -20px;
    font-size: 40px;
  }

  span{
    font-family: Futura;
    font-size: 400px; 
  }
`;


const verticalClock = css`
  position: relative;  
  display: inline-block;  

  #hour-type{
    position: absolute;
    top: 20px;
    left: -20px;
    font-size: 40px;
  }

  span{
    font-family: Futura;
    font-size: 350px; 
  }
`;


const dateStyle= css`
  position: absolute;
  top: 9px;
  left: 0;
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;

  span{
    font-family: Futura;
    display: inline-block;
    padding: 5px 20px 20px 20px; 
    font-size: 25px;
    border-radius: 0 0 70% 70%;
  }
`;
