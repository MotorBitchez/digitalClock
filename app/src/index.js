import React from 'react';
import ReactDOM from 'react-dom'; 
import {css, injectGlobal} from 'react-emotion';
import axios from 'axios'; 
import {DigitalClock} from './DigitalClock';
import Futura from './fonts/Futura.ttc';

injectGlobal`
  html, body {
    height: 100vh;
    width: 100vw; 
    margin: 0;
  } 

  #app{
    width: 100vw;
    height: 100vh;
  }

  @font-face {
    font-family: 'Futura';
    src: url(${Futura}) format('truetype');
  }
`;

const appStyle= css`
  width: 100%;
  height: 100%;
  background: red;
`;

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      fetched: false,
      content: {},
      date: new Date(),
      orientation: 'horizontal'
    };
  }

  componentDidMount(){
    axios.get('/info')
      .then(res => {
        this.setState({
          fetched: true,
          content: res.data.content, 
          orientation: res.data.orientation,
        });
      })
    setInterval(() => this.setState({date: new Date()}), 60000); 
  }

  render(){
    let {content} = this.state;

    if(!this.state.fetched) return null;

    return( 
      <DigitalClock date={this.state.date} 
        hour12={content.hour12} 
        color={content.color} 
        timezone={content.timezone}
        orientation={this.state.orientation}/> 
    )
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('app')
);