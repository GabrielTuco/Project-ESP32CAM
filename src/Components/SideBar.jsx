import React, { useContext, useState } from 'react'
import { Camera } from '../Components/Camera';

import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarContent, SidebarFooter,  } from 'react-pro-sidebar';
import '../styles.scss';
import styled from 'styled-components'
import menu from '../images/menu2.svg'
import close from '../images/Recurso 1.svg'
import add from '../images/agregar.svg'
import { StoreContext } from '../context/StoreProvider';
import { types } from '../context/StoreReducer';
import cam from '../images/webcam.png'
import { IoLogOutOutline, IoClose,IoPersonOutline } from 'react-icons/io5';
import { TbDeviceComputerCamera } from "react-icons/tb";
import { AddCamera } from './AddCamera';
import jwtDecode from 'jwt-decode';
import { LoadingScreen } from './LoadingScreen';
import url_base from "../config/variables"
import { useNavigate } from 'react-router-dom';

export const SideBar = (props) => {
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const [store, dispatch] = useContext(StoreContext);
    const {token} = store;
    const [isSelected, setIsSelected] = useState(false);
    const [isModalSelected, setIsModalSelected] = useState(false);
    const [error, setError] = useState("");
    
    const BuildCameras= ()=> {
        if(props.cameras.length>0)
            return props.cameras.map((e,i)=>(<Menu key={i}><Camera name={e.name} ip={e["ip"]}></Camera></Menu>))
        else
            return <></>
    }
    const logout = ()=> {
        dispatch({
            type: types.Logout,
            
        });
        navigate('/');
        
    }

    const addCamera = async() => {
        const name = document.getElementById('name')
        const ip = document.getElementById('ip')
        const {uid}= jwtDecode(token)
        if(name.value=="" || ip.value ==""){
            setError('*Debe llenar todos los campos')
            return false;
        }
        
        if(!isValidIP(ip.value)){
            
            setError('*Formato de la dirección IP es incorrecta')
            return false;
        }
        
        
        try {
            const body = JSON.stringify({
              name:name.value,
              ip:ip.value,
              owner: uid
            })
            
            setLoading(true)
            const response = await fetch(`${url_base}/api/camera`,{
              method:'POST',
              body,
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
            })
            
            if(response.status == 404){
              setLoading(false)
              alert("Error: Server not found")
              
            }
            else if (response.status == 400){
              setLoading(false)
              const data = await response.json()
              setError(data.msg)
                  
              return
      
            } else{
              setLoading(false)
              const data = await response.json(); 
              const { user, cameras, token } = data;
            
              dispatch({
                type: types.AddCamera,
                body: {name: name.value, ip: ip.value}
                });
              setIsModalSelected(!isModalSelected)
              setError('')
            }
         
            
      
          } catch (error) {
            console.error(error)
            setLoading(false)
          }

    }

  return (
    <SideBarDiv>
        <ProSidebar collapsed={isSelected} collapsedWidth="0px">
            <SidebarHeader>
                <User> 
                    <h2 style={{textAlign: 'center', width: '90%'}}>{props.name}</h2> 
                    <Close hidden={isSelected} onClick={()=> {setIsSelected(!isSelected)}}>
                        <IoClose size="2em" style={{margin:"auto"}} src={close}></IoClose>
                    </Close>
                </User>
            </SidebarHeader>

            <SidebarContent>
                <Menu>
                <SubMenu title="Camaras" icon={<TbDeviceComputerCamera size="1.8em"/>} >
                    <BuildCameras></BuildCameras>
                    <div hidden={isModalSelected}>
                        <BoxButtonAdd  onClick={()=> {setIsModalSelected(!isModalSelected)}}>
                            <ButtonAdd >
                                Agregar otra camara
                            </ButtonAdd>
                        </BoxButtonAdd> 
                    </div>

                    <div hidden={!isModalSelected}>
                        <AddCamera error={error}></AddCamera>
                        <BoxButtonAdd onClick={addCamera}>
                            <ButtonAdd>
                                Aceptar        
                            </ButtonAdd>
                        </BoxButtonAdd> 
                    </div>
                    
                    
                </SubMenu>
                <SubMenu title="Usuarios" icon={<IoPersonOutline size="1.8em"/>} >
                    
                </SubMenu>
                </Menu>
            </SidebarContent>

            <SidebarFooter>
                <Menu>
                    
                    <div onClick={logout}>
                    <MenuItem icon={<Close style={{borderRadius: "50%"}}>
                                <IoLogOutOutline size="1.8em" style={{margin:"auto"}} src={close}></IoLogOutOutline>
                            </Close>}>
                                Cerrar Sesión

                    </MenuItem>
                    </div>
                </Menu>
            </SidebarFooter>

        </ProSidebar>
        <ButtonSidebar onClick={()=> {setIsSelected(!isSelected)}} hidden={!isSelected}>
                        <img height="100%" width="60%" src={menu} ></img>
        </ButtonSidebar>

        {
          isLoading ? <LoadingScreen/>: <></>
        }
    </SideBarDiv>
  )
}
//
 /*
        <ModalAddCam >
            <HeaderModal >
                <p style={{textAlign: 'center', width: '90%', fontSize: '14px'}}>Add Camera</p> 
                <CloseModal onClick={()=> {setIsModalSelected(!isModalSelected)}}>
                            <img height="50%" style={{margin:"auto"}} src={close}></img>
                </CloseModal>
            </HeaderModal>
            <BoxInputCam>
                
                <Button type="submit" onClick={addCamera} value="Agregar"></Button>
            </BoxInputCam>
            
        </ModalAddCam>*/

const SideBarDiv= styled.div`
    height: 100%;
    display: flex;
    position: absolute;
    left: 0;
`   
const User= styled.div`
  width: 100%;
  height: 60px;
  box-sizing: border-box;
  display:flex;
  align-items:center;
  align-content: center;
  justify-content: space-between;
  padding: 0 4%;
`
const ButtonSidebar= styled.div`
    height: 50px;
    width: 50px;
    text-align: center;
    
    &:hover{
        background-color: #323232;
    }
`
const Close= styled.div`
    height: 30px;
    width: 30px;
    border-radius: 50%;
    display: flex;
    align-items:center;
    justify-content: center;
       
    &:hover{
        background-color: #585858;
    }
`
const CloseModal= styled.div`
    height: 13px;
    width: 13px;
    border-radius: 50%;
    display: flex;
       
    &:hover{
        background-color: #585858;
    }
`

const BoxButtonAdd= styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px 0px;
    
`

const ButtonAdd= styled.div`
    height: 30px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 16px;
    margin: 0px 10px;
    background-color: #ff3034;
    border-radius: 10px;
    &:hover{
        background-color: #fc4d50;
    }    
`
const ModalAddCam= styled.div`
    margin-top: 12%;
    min-height: 140px;
    height: 15%;
    width: 150px;
    background-color: #323232;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;

`
const HeaderModal= styled.div`
  width: 100%;
  height: 40px;
  background-color: #2b2b2b;
  box-sizing: border-box;
  display:flex;
  align-items:center;
  align-content: center;
  justify-content: space-between;
  padding: 0 4%;
  border-top-right-radius: 10px;
`
const BoxInputCam = styled.form`
    width: 100%;
    display: block;
    text-align: center;
   
`

const InputCam = styled.input`
    width: 85%;
    border-style: none;
    border-radius: 5px;
    margin-bottom: 10px;
    outline: none;
`
const Button = styled.input`
  margin-top: 5px;
  border-style: none;
  color: #fff;
  background-color: #ff3034;
  padding: 5px 12px;
  border-radius: 5px;
  font-size: 16px;
  text-align: center;

  &:hover{
        background-color: #fc4d50;
    }    
`
function isValidIP(str="") {
    let verdad = str.split('.');
    if(verdad.length != 4)
      return false;
    for(let i in verdad){
      if(!/^\d+$/g.test(verdad[i])
      ||+verdad[i]>255
      ||+verdad[i]<0
      ||/^[0][0-9]{1,2}/.test(verdad[i]))
        return false;
    }
    return true
}