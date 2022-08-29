import React, { useState } from 'react'

const ButtonOnOff = ({host}) => {
  
  const [color, setColor] = useState("#555454");

  
  fetch(`"http://"+${host}/status`)
  .then(function (response) {
    return response.json()
  })
  .then(function (state) {
    setColor("#1df55e")
      
  }).catch((error)=>{
    setColor("#e62f1f")
  })

  return (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 115.96 115.96"
    height="25px"
    
  >
    <g data-name="Capa 2">
      <g data-name="Capa 1">
        <circle
          cx={57.98}
          cy={57.98}
          r={57.98}
          style={{
            fill: "#4a494a",
          }}
        />
        <circle
          cx={57.98}
          cy={57.98}
          r={44.55}
          style={{
            fill: `${color}`,
          }}
        />
      </g>
    </g>
  </svg>)
}

export default ButtonOnOff
