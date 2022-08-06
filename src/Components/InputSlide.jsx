import React from 'react'

export const InputSlide = () => {
  return (
    <div className="input-group" id="quality-group">
        <label htmlFor="quality">Quality</label>
        <div className="range-min">10</div>
        <input type="range" id="quality" min="10" max="63" defaultValue="10" className="default-action"/>
        <div className="range-max">63</div>
    </div>
  )
}
