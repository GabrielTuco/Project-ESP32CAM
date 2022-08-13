import React from 'react'
import styled from 'styled-components'
import cam from '../images/webcam.png'
import {NavLink} from 'react-router-dom'
export const Login = () => {
  return (
    <div style={{display: 'flex', alignContent: 'center', height: '100vh'}}>
      <Box>
        <p style={{color: 'black', textAlign: 'center', fontSize: '22px'}}> Project ESP32 CAM <img height="16px" src={cam}/></p>
        <p style={{color: 'black', textAlign: 'center', fontSize: '20px'}}>Iniciar Sesion</p>
        <form style={{display: 'block', textAlign: 'center'}}>
          <InputLogin placeholder="User" required></InputLogin>
          <InputLogin type="password" placeholder="Password"  required></InputLogin>
          <NavLink to="/UserPage" type='submit'>
          <ButtonLogin type ="submit" value="Entrar">
            
          </ButtonLogin>
          </NavLink>
        </form>
        
      </Box>
    </div>
    
  )
}

const Box= styled.div`
  box-sizing: border-box;
  margin:auto;
  background-color: white;
  padding: 48px 40px 36px;
  max-height: 500px;
  max-width: 448px;
  height: 100vh;
  width: 100%;
  border-radius: 10px;
  
`
const InputLogin= styled.input`
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  border-style: none;
  border-radius: 4px;
  border: solid 1px #cacaca;
  height: 54px;
  margin-bottom: 20px;
  font-size: 14px;
  &:focus{
    outline: solid 2px #3578E5;
   
  }
  
`
const ButtonLogin= styled.input`
  height: 49px;
  width: 100px;
  color: white;
  font-size: 16px;
  border-style: none;
  border-radius: 4px;
  background-color: black;
  &:hover{
    background-color: #494949;
   
  }
  
`
const NavL = styled(NavLink)`
    &[class*="active"] {
        border-bottom: 3px solid #3578E5;
        svg{
            fill:#3578E5
        }
    }
`
