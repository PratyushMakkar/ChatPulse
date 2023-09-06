import React, { useEffect, useState } from "react";
import "./FrontPage.css"

import socket from "../components/socket";

const FrontPage = () => {
  const [showText, setShowText] = useState(false)
  const [inputValue, setInputValue] = useState("");
  const newRoom = () => {
    window.location.href = '/create'
  }

  const blurElements = document.querySelectorAll('.blur-effect');
  blurElements.forEach(element => {
    element.addEventListener('mouseleave', (e) => {
      element.blur()
    });
  });

  useEffect(() => {
    socket.on('connectCallback', (data) => {
      console.log("Connected!");
      window.location.href = '/room';
    })
  }, [])

  return (
    <div className="flex-container">
      <div className="header-container">
        <div className="header">Header Here</div>
      </div>
      <h1 className="title">Web RTC App</h1>
      <div className="content" >
        <button onClick={newRoom} className="button btn btn-primary button blur-effect">
          <div className= "button-label">CREATE SERVER</div>
        </button>
        {showText ? 
        <form onSubmit={() => {
              socket.emit('connected', { room: inputValue });
        }}>
        <input 
              className="name-input"
              type="text"
              id="text-input"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}

              style={{"padding-left": '0.4vw', "padding-bottom": "0.2vh"}}></input> 
              <button type="submit"></button>
        </form>
         : 
        <button onClick={() => {
          setShowText(true);
        }} className="btn btn-primary button blur-effect">
          <div className= "button-label">ENTER SERVER</div>
        </button>}
        
      </div>
    </div>  
  );
};

export default FrontPage;
