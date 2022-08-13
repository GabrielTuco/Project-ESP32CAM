import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { ConfigurationBar } from '../Components/ConfigurationBar';
import { RightBar } from '../Components/RightBar';


import { SideBar } from '../Components/SideBar';
import { StoreContext } from '../context/StoreProvider';

export const UserPage = () => {

  const [store, dispatch] = useContext(StoreContext);
  const {user,actualHost, cameras} = store;
  console.log(cameras)

  var baseHost = "http://"+actualHost;
  var streamUrl = baseHost + ':81'

  const stopStream = () => {
    window.stop();
    streamButton.innerHTML = 'Iniciar'
  }

  const startStream = () => {
    view.src = `${streamUrl}/stream`
    streamButton.innerHTML = 'Parar'
  }

  var streamButton;
  var view;
  
  useEffect(() => {
    streamButton = document.getElementById('toggle-stream')
    view = document.getElementById('stream')
  }, [])
 
  return (
    <Box>
      <SideBar name={user} cameras={cameras}/>
      <CamBox>
        <img height="100%" width="100%" id="stream" src="" />
        <Buttons>
          <Button>Captura</Button>
          <Button id= "toggle-stream" onClick={()=>{
            const streamEnabled = streamButton.innerHTML === 'Parar'
            if (streamEnabled) {
              stopStream()
            } else {
              startStream()
            }
          }}>Iniciar</Button>
          
        </Buttons>
      </CamBox>
      { <ConfigurationBar host={actualHost}></ConfigurationBar>}
      
      
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
  height:50%;
  width:30%;
  align-self: center;
  border: 1px solid #ccc;
  border-radius: 10px;
`
const Buttons = styled.div`
  padding: 20px 20%;
  display: flex;
  justify-content: space-between;
`
const Button = styled.div`
  width: 20%;
  background-color: #ff3034;
  padding: 5px 12px;
  border-radius: 5px;
  font-size: 16px;
  text-align: center;
`