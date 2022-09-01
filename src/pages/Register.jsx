import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import {NavLink, useNavigate} from 'react-router-dom'
import { IoIosArrowRoundBack } from "react-icons/io";
import { StoreContext } from '../context/StoreProvider'
import url_base from "../config/variables"
import { LoadingScreen } from '../Components/LoadingScreen';

export const Register = () => {
    const navigate = useNavigate();
    const [store, dispatch] = useContext(StoreContext);
    const [isLoading, setLoading] = useState(false);
    const [user,setUser]= useState({user: '', password: '', password2: '', msg:''});
    
    const onPressRegister = async () => {
      
      if(user.user=='' || user.password=='' || user.password2=='') {
        setUser((old)=>({...old, msg:'*Debe llenar todos los campos'}))
        return false;
      }
      if(user.password.length<6){
        setUser((old)=>({...old, msg:'*La contraseña debe ser mayor a 6 caracteres'}))
        return false;
      }
      if(user.password != user.password2){
        setUser((old)=>({...old, msg:'*Las contraseñas deben ser iguales'}))
        return false;
      }

      const body = {
        user: user.user,
        password: user.password,
        type: true
      }
      setLoading(true)
      const response = await fetch(`${ url_base }/api/users`,{
          method:'POST',
          body:JSON.stringify(body),
          headers: { 'Content-Type': 'application/json' }
      })
      
      if(response.status == 404){
        setLoading(false)
        alert("Error: Server not found")
        
      }
      else if (response.status == 400){
        setLoading(false)
        const data = await response.json()
        setUser((old)=>({...old, msg:data.msg}))  
        return

      } else{
        navigate('/MainPage');
      }
      
    }
  
    return (
      <div style={{display: 'flex', alignContent: 'center', height: '100vh'}}>
        <Box>
          <ArrowBack to="/login"> 
            <IoIosArrowRoundBack style={{color: 'black', height: '30px', width: '30px', position: 'absolute', left: 15, top: 15}}/>
          </ArrowBack>
          <p style={{color: 'black', textAlign: 'center', fontSize: '24px', marginBottom: '30px'}}>Crear Cuenta</p>
          <p style={{color: 'black', textAlign: 'left', fontSize: '14px'}}>Creará una cuenta de administrador</p>
          <div style={{display: 'block', textAlign: 'center'}}>
            <InputLogin onChange={(event)=> setUser((old)=>({...old, user:event.target.value, msg:''}))} placeholder="Usuario" name="user" required></InputLogin>
            <InputLogin onChange={(event)=> setUser((old)=>({...old, password:event.target.value, msg:''}))} type="password" placeholder="Constraseña" name="password"  required></InputLogin>
            <InputLogin onChange={(event)=> setUser((old)=>({...old, password2:event.target.value, msg:''}))} type="password" placeholder="Confirmar contraseña" name="password2" required></InputLogin>
            <ButtonLogin type ="submit" value="Aceptar" onClick={onPressRegister} />
          </div>
          <Error>{user.msg}</Error>
        </Box>
        {
          isLoading ? <LoadingScreen/>: <></>
        }
      </div>
    )
}

const Box= styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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
const ArrowBack = styled(NavLink)`
    svg{
        border-radius: 50%;
        &:hover{
            background-color: #dfdfdf;
        }
        

    }
`
const Error = styled.p`
  color: red;
  font-size: 12px;

`