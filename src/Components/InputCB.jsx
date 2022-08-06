import React from 'react'

export const InputCB = (props) => {
  return (
    <div className="input-group" id="awb-group">
        <label htmlFor="awb">AWB</label>
        <div className="switch">
            <input id="awb" type="checkbox" className="default-action" defaultChecked="checked"/>
            <label className="slider" htmlFor="awb"></label>
        </div>
    </div>
  )
}

