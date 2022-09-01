import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { ConfigurationBar } from '../Components/ConfigurationBar';
import { SideBar } from '../Components/SideBar';
import { StoreContext } from '../context/StoreProvider';


export const MainPage = () => {
  const navigate = useNavigate();
  const [store, dispatch] = useContext(StoreContext);
  const {user,actualHost, cameras, token, users, type} = store;
    
  let streamButton;
  let view;
  let enrollButton;
  useEffect(() => {
    
    if(token=="" || user==""){
      alert("Debe iniciar sesión")
      navigate('/');
    }
    streamButton = document.getElementById('toggle-stream2')
    enrollButton = document.getElementById('face_enroll')
    view = document.getElementById('stream')
  }, [])
  
  streamButton = document.getElementById('toggle-stream2')
  view = document.getElementById('stream')

  let baseHost = "http://"+actualHost;
  let streamUrl = baseHost + ':81'

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

  const stopStream = () => {
    window.stop();
    streamButton.innerHTML = 'Iniciar'
  }

  const startStream = () => {
    view.src = `${streamUrl}/stream`
    streamButton.innerHTML = 'Parar'
  }

  if(baseHost !== actualHost && view!=null) stopStream()
 
  return (
    <Box>
      <SideBar name={user} cameras={cameras} users={users}/>
      <CamBox>
        <img height="100%" width="100%" id="stream" src="" />
        <Buttons>
          <Button>Captura</Button>
          <Button id= "face_enroll" onClick={()=>updateConfig(enrollButton)}>Guardar Rostro</Button>
          <Button id= "toggle-stream2" onClick={(event)=>{
            const streamEnabled = streamButton.innerHTML === 'Parar'
            if (streamEnabled) {
              stopStream()
            } else {
              startStream()
            }
          }}>Iniciar</Button>
          
        </Buttons>
      </CamBox>
      { type? <ConfigurationBar host={actualHost}></ConfigurationBar>:<></>}
      
      
    </Box>
  )
}

const Box= styled.div`
  height:100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const CamBox = styled.div`
  height:100%;
  width:100%;
  max-width: 600px;
  max-height: 470px;
  align-self: center;
  border: 1px solid #ccc;
  border-radius: 10px;
  @media (max-width: 600px){
    max-height: 250px;
    max-width: 350px;
  }
`
const Buttons = styled.div`
  padding-top: 12px;
  display: flex;
  justify-content: space-between;
`
const Button = styled.div`
 
  background-color: #ff3034;
  padding: 5px 12px;
  border-radius: 5px;
  font-size: 16px;
  text-align: center;
  &:hover{
    background-color: #ff5e61;
  }

  @media (max-width: 500px){
    
  }
`
