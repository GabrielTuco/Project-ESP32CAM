import { useState,useEffect } from 'react'

import './App.css'

function App() {
  

  useEffect(() => {
    var baseHost = "http://192.168.0.11"
  var streamUrl = baseHost + ':81'

  const hide = el => {
    el.classList.add('hidden')
  }
  const show = el => {
    el.classList.remove('hidden')
  }

  const disable = el => {
    el.classList.add('disabled')
    el.disabled = true
  }

  const enable = el => {
    el.classList.remove('disabled')
    el.disabled = false
  }

  const updateValue = (el, value, updateRemote) => {
    updateRemote = updateRemote == null ? true : updateRemote
    let initialValue
    if (el.type === 'checkbox') {
      initialValue = el.checked
      value = !!value
      el.checked = value
    } else {
      initialValue = el.value
      el.value = value
    }

    if (updateRemote && initialValue !== value) {
      updateConfig(el);
    } else if(!updateRemote){
      if(el.id === "aec"){
        value ? hide(exposure) : show(exposure)
      } else if(el.id === "agc"){
        if (value) {
          show(gainCeiling)
          hide(agcGain)
        } else {
          hide(gainCeiling)
          show(agcGain)
        }
      } else if(el.id === "awb_gain"){
        value ? show(wb) : hide(wb)
      } else if(el.id === "face_recognize"){
        value ? enable(enrollButton) : disable(enrollButton)
      }
    }
  }

  function updateConfig (el) {
    let value
    switch (el.type) {
      case 'checkbox':
        value = el.checked ? 1 : 0
        break
      case 'range':
      case 'select-one':
        value = el.value
        break
      case 'button':
      case 'submit':
        value = '1'
        break
      default:
        return
    }

    const query = `${baseHost}/control?var=${el.id}&val=${value}`

    fetch(query)
      .then(response => {
        console.log(`request to ${query} finished, status: ${response.status}`)
      })
  }

  document
    .querySelectorAll('.close')
    .forEach(el => {
      el.onclick = () => {
        hide(el.parentNode)
      }
    })

  // read initial values
  fetch(`${baseHost}/status`)
    .then(function (response) {
      return response.json()
    })
    .then(function (state) {
      document
        .querySelectorAll('.default-action')
        .forEach(el => {
          updateValue(el, state[el.id], false)
        })
    })

  const view = document.getElementById('stream')
  const viewContainer = document.getElementById('stream-container')
  const stillButton = document.getElementById('get-still')
  const streamButton = document.getElementById('toggle-stream')
  const enrollButton = document.getElementById('face_enroll')
  const closeButton = document.getElementById('close-stream')

  const stopStream = () => {
    window.stop();
    streamButton.innerHTML = 'Start Stream'
  }

  const startStream = () => {
    view.src = `${streamUrl}/stream`
    show(viewContainer)
    streamButton.innerHTML = 'Stop Stream'
  }

  // Attach actions to buttons
  stillButton.onclick = () => {
    stopStream()
    view.src = `${baseHost}/capture?_cb=${Date.now()}`
    show(viewContainer)
  }

  closeButton.onclick = () => {
    stopStream()
    hide(viewContainer)
  }

  streamButton.onclick = () => {
    const streamEnabled = streamButton.innerHTML === 'Stop Stream'
    if (streamEnabled) {
      stopStream()
    } else {
      startStream()
    }
  }

  enrollButton.onclick = () => {
    updateConfig(enrollButton)
  }

  // Attach default on change action
  document
    .querySelectorAll('.default-action')
    .forEach(el => {
      el.onchange = () => updateConfig(el)
    })

  // Custom actions
  // Gain
  const agc = document.getElementById('agc')
  const agcGain = document.getElementById('agc_gain-group')
  const gainCeiling = document.getElementById('gainceiling-group')
  agc.onchange = () => {
    updateConfig(agc)
    if (agc.checked) {
      show(gainCeiling)
      hide(agcGain)
    } else {
      hide(gainCeiling)
      show(agcGain)
    }
  }

  // Exposure
  const aec = document.getElementById('aec')
  const exposure = document.getElementById('aec_value-group')
  aec.onchange = () => {
    updateConfig(aec)
    aec.checked ? hide(exposure) : show(exposure)
  }

  // AWB
  const awb = document.getElementById('awb_gain')
  const wb = document.getElementById('wb_mode-group')
  awb.onchange = () => {
    updateConfig(awb)
    awb.checked ? show(wb) : hide(wb)
  }

  // Detection and framesize
  const detect = document.getElementById('face_detect')
  const recognize = document.getElementById('face_recognize')
  const framesize = document.getElementById('framesize')

  framesize.onchange = () => {
    updateConfig(framesize)
    if (framesize.value > 5) {
      updateValue(detect, false)
      updateValue(recognize, false)
    }
  }

  detect.onchange = () => {
    if (framesize.value > 5) {
      alert("Please select CIF or lower resolution before enabling this feature!");
      updateValue(detect, false)
      return;
    }
    updateConfig(detect)
    if (!detect.checked) {
      disable(enrollButton)
      updateValue(recognize, false)
    }
  }

  recognize.onchange = () => {
    if (framesize.value > 5) {
      alert("Please select CIF or lower resolution before enabling this feature!");
      updateValue(recognize, false)
      return;
    }
    updateConfig(recognize)
    if (recognize.checked) {
      enable(enrollButton)
      updateValue(detect, true)
    } else {
      disable(enrollButton)
    }
  }



}, [])



  return (
    <div className="App">
      

      <section className="main">
      <div id="logo">
                <label htmlFor="nav-toggle-cb" id="nav-toggle">&#9776;&nbsp;&nbsp;Toggle OV2640 settings</label>
            </div>
            <div id="content">
                <div id="sidebar">
                    <input type="checkbox" id="nav-toggle-cb" defaultChecked="checked"/>
                    <nav id="menu">
                        <div className="input-group" id="framesize-group">
                            <label htmlFor="framesize">Resolution</label>
                            <select id="framesize" className="default-action" defaultChecked="0">
                                <option value="10">UXGA(1600x1200)</option>
                                <option value="9">SXGA(1280x1024)</option>
                                <option value="8">XGA(1024x768)</option>
                                <option value="7">SVGA(800x600)</option>
                                <option value="6">VGA(640x480)</option>
                                <option value="5">CIF(400x296)</option>
                                <option value="4">QVGA(320x240)</option>
                                <option value="3">HQVGA(240x176)</option>
                                <option value="0">QQVGA(160x120)</option>
                            </select>
                        </div>
                        <div className="input-group" id="quality-group">
                            <label htmlFor="quality">Quality</label>
                            <div className="range-min">10</div>
                            <input type="range" id="quality" min="10" max="63" defaultValue="10" className="default-action"/>
                            <div className="range-max">63</div>
                        </div>
                        <div className="input-group" id="brightness-group">
                            <label htmlFor="brightness">Brightness</label>
                            <div className="range-min">-2</div>
                            <input type="range" id="brightness" min="-2" max="2" defaultValue="0" className="default-action"/>
                            <div className="range-max">2</div>
                        </div>
                        <div className="input-group" id="contrast-group">
                            <label htmlFor="contrast">Contrast</label>
                            <div className="range-min">-2</div>
                            <input type="range" id="contrast" min="-2" max="2" defaultValue="0" className="default-action"/>
                            <div className="range-max">2</div>
                        </div>
                        <div className="input-group" id="saturation-group">
                            <label htmlFor="saturation">Saturation</label>
                            <div className="range-min">-2</div>
                            <input type="range" id="saturation" min="-2" max="2" defaultValue="0" className="default-action"/>
                            <div className="range-max">2</div>
                        </div>
                        <div className="input-group" id="special_effect-group">
                            <label htmlFor="special_effect">Special Effect</label>
                            <select id="special_effect" className="default-action" defaultChecked="0">
                                <option value="0">No Effect</option>
                                <option value="1">Negative</option>
                                <option value="2">Grayscale</option>
                                <option value="3">Red Tint</option>
                                <option value="4">Green Tint</option>
                                <option value="5">Blue Tint</option>
                                <option value="6">Sepia</option>
                            </select>
                        </div>
                        <div className="input-group" id="awb-group">
                            <label htmlFor="awb">AWB</label>
                            <div className="switch">
                                <input id="awb" type="checkbox" className="default-action" defaultChecked="checked"/>
                                <label className="slider" htmlFor="awb"></label>
                            </div>
                        </div>
                        <div className="input-group" id="awb_gain-group">
                            <label htmlFor="awb_gain">AWB Gain</label>
                            <div className="switch">
                                <input id="awb_gain" type="checkbox" className="default-action" defaultChecked="checked"/>
                                <label className="slider" htmlFor="awb_gain"></label>
                            </div>
                        </div>
                        <div className="input-group" id="wb_mode-group">
                            <label htmlFor="wb_mode">WB Mode</label>
                            <select id="wb_mode" className="default-action" defaultChecked="0">
                                <option value="0" >Auto</option>
                                <option value="1">Sunny</option>
                                <option value="2">Cloudy</option>
                                <option value="3">Office</option>
                                <option value="4">Home</option>
                            </select>
                        </div>
                        <div className="input-group" id="aec-group">
                            <label htmlFor="aec">AEC SENSOR</label>
                            <div className="switch">
                                <input id="aec" type="checkbox" className="default-action" defaultChecked="checked"/>
                                <label className="slider" htmlFor="aec"></label>
                            </div>
                        </div>
                        <div className="input-group" id="aec2-group">
                            <label htmlFor="aec2">AEC DSP</label>
                            <div className="switch">
                                <input id="aec2" type="checkbox" className="default-action" defaultChecked="checked"/>
                                <label className="slider" htmlFor="aec2"></label>
                            </div>
                        </div>
                        <div className="input-group" id="ae_level-group">
                            <label htmlFor="ae_level">AE Level</label>
                            <div className="range-min">-2</div>
                            <input type="range" id="ae_level" min="-2" max="2" defaultValue="0" className="default-action"/>
                            <div className="range-max">2</div>
                        </div>
                        <div className="input-group" id="aec_value-group">
                            <label htmlFor="aec_value">Exposure</label>
                            <div className="range-min">0</div>
                            <input type="range" id="aec_value" min="0" max="1200" defaultValue="204" className="default-action"/>
                            <div className="range-max">1200</div>
                        </div>
                        <div className="input-group" id="agc-group">
                            <label htmlFor="agc">AGC</label>
                            <div className="switch">
                                <input id="agc" type="checkbox" className="default-action" defaultChecked="checked"/>
                                <label className="slider" htmlFor="agc"></label>
                            </div>
                        </div>
                        <div className="input-group hidden" id="agc_gain-group">
                            <label htmlFor="agc_gain">Gain</label>
                            <div className="range-min">1x</div>
                            <input type="range" id="agc_gain" min="0" max="30" defaultValue="5" className="default-action"/>
                            <div className="range-max">31x</div>
                        </div>
                        <div className="input-group" id="gainceiling-group">
                            <label htmlFor="gainceiling">Gain Ceiling</label>
                            <div className="range-min">2x</div>
                            <input type="range" id="gainceiling" min="0" max="6" defaultValue="0" className="default-action"/>
                            <div className="range-max">128x</div>
                        </div>
                        <div className="input-group" id="bpc-group">
                            <label htmlFor="bpc">BPC</label>
                            <div className="switch">
                                <input id="bpc" type="checkbox" className="default-action"/>
                                <label className="slider" htmlFor="bpc"></label>
                            </div>
                        </div>
                        <div className="input-group" id="wpc-group">
                            <label htmlFor="wpc">WPC</label>
                            <div className="switch">
                                <input id="wpc" type="checkbox" className="default-action" defaultChecked="checked"/>
                                <label className="slider" htmlFor="wpc"></label>
                            </div>
                        </div>
                        <div className="input-group" id="raw_gma-group">
                            <label htmlFor="raw_gma">Raw GMA</label>
                            <div className="switch">
                                <input id="raw_gma" type="checkbox" className="default-action" defaultChecked="checked"/>
                                <label className="slider" htmlFor="raw_gma"></label>
                            </div>
                        </div>
                        <div className="input-group" id="lenc-group">
                            <label htmlFor="lenc">Lens Correction</label>
                            <div className="switch">
                                <input id="lenc" type="checkbox" className="default-action" defaultChecked="checked"/>
                                <label className="slider" htmlFor="lenc"></label>
                            </div>
                        </div>
                        <div className="input-group" id="hmirror-group">
                            <label htmlFor="hmirror">H-Mirror</label>
                            <div className="switch">
                                <input id="hmirror" type="checkbox" className="default-action" defaultChecked="checked"/>
                                <label className="slider" htmlFor="hmirror"></label>
                            </div>
                        </div>
                        <div className="input-group" id="vflip-group">
                            <label htmlFor="vflip">V-Flip</label>
                            <div className="switch">
                                <input id="vflip" type="checkbox" className="default-action" defaultChecked="checked"/>
                                <label className="slider" htmlFor="vflip"></label>
                            </div>
                        </div>
                        <div className="input-group" id="dcw-group">
                            <label htmlFor="dcw">DCW (Downsize EN)</label>
                            <div className="switch">
                                <input id="dcw" type="checkbox" className="default-action" defaultChecked="checked"/>
                                <label className="slider" htmlFor="dcw"></label>
                            </div>
                        </div>
                        <div className="input-group" id="colorbar-group">
                            <label htmlFor="colorbar">Color Bar</label>
                            <div className="switch">
                                <input id="colorbar" type="checkbox" className="default-action"/>
                                <label className="slider" htmlFor="colorbar"></label>
                            </div>
                        </div>
                        <div className="input-group" id="face_detect-group">
                            <label htmlFor="face_detect">Face Detection</label>
                            <div className="switch">
                                <input id="face_detect" type="checkbox" className="default-action"/>
                                <label className="slider" htmlFor="face_detect"></label>
                            </div>
                        </div>
                        <div className="input-group" id="face_recognize-group">
                            <label htmlFor="face_recognize">Face Recognition</label>
                            <div className="switch">
                                <input id="face_recognize" type="checkbox" className="default-action"/>
                                <label className="slider" htmlFor="face_recognize"></label>
                            </div>
                        </div>
                        <section id="buttons">
                            <button id="get-still">Get Still</button>
                            <button id="toggle-stream">Start Stream</button>
                            <button id="face_enroll" className="disabled" disabled="disabled">Enroll Face</button>
                        </section>
                    </nav>
                </div>
                <figure>
                    <div id="stream-container" className="image-container hidden">
                        <div className="close" id="close-stream">×</div>
                        <img id="stream" src=""/>
                    </div>
                </figure>
            </div>
        </section>            
    </div>
  )
}

export default App
