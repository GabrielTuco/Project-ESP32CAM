import React, { useContext, useState } from 'react'
import { Camera } from '../Components/Camera';

import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarContent, SidebarFooter,  } from 'react-pro-sidebar';
import '../styles.scss';
import styled from 'styled-components'
import menu from '../images/menu2.svg'
import close from '../images/Recurso 1.svg'
import { StoreContext } from '../context/StoreProvider';
import { types } from '../context/StoreReducer';
import { IoLogOutOutline, IoClose,IoPersonOutline } from 'react-icons/io5';
import { TbDeviceComputerCamera } from "react-icons/tb";
import { AddCamera } from './AddCamera';
import jwtDecode from 'jwt-decode';
import { LoadingScreen } from './LoadingScreen';
import url_base from "../config/variables"
import { useNavigate } from 'react-router-dom';
import { User } from './User';
import { AddUser } from './AddUser';

export const SideBar = (props) => {
    const navigate = useNavigate();
    const [store, dispatch] = useContext(StoreContext);
    const {token} = store;
    const [isLoading, setLoading] = useState(false);
    const [isSelected, setIsSelected] = useState(false);
    const [isModalSelectedCam, setisModalSelectedCam] = useState(false);
    const [isModalSelectedUse, setisModalSelectedUse] = useState(false);
    const [error, setError] = useState("");
    
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

    const changeCam= () => {
        setisModalSelectedCam(!isModalSelectedCam)
    }

    const changeUser= () => {
        setisModalSelectedUse(!isModalSelectedUse)
    }

    const changeLoading= (e) => {
        setLoading(e)
    }

    const BuildCameras= ()=> {
        if(props.cameras.length>0)
            return props.cameras.map((e,i)=>(<Menu key={i}><Camera change ={changeLoading} id= {e.id} name={e.name} ip={e["ip"]}></Camera></Menu>))
        else
            return <></>
    }

    const BuildUsers= ()=> {
        console.log(props.users)
        if(props.users.length>0)
            return props.users.map((e,i)=>(<Menu key={i}><User change ={changeLoading} id= {e.id} name={e.name} ip={e["ip"]}></User></Menu>))
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
              setisModalSelectedCam(!isModalSelectedCam)
              setError('')
            }
         
            
      
          } catch (error) {
            console.error(error)
            setLoading(false)
          }

    }

    const addUser = async() => {
        const user = document.getElementById('user')
        const pass = document.getElementById('password')
        const pass2 = document.getElementById('password2')
        const {uid}= jwtDecode(token)
        if(user.value=="" || pass.value =="" || pass2.value ==""){
            setError('*Debe llenar todos los campos')
            return false;
        }
        if(pass.value.length<6){
            setError('*La contraseña debe ser mayor a 6 caracteres')
            return false;
        }
        if(pass.value != pass2.value){
            setError('*Las contraseñas deben ser iguales')
            return false;
        }

        
        try {
            const body = JSON.stringify({
              user:user.value,
              password:pass.value,
              owner: uid
            })
            
            setLoading(true)
            const response = await fetch(`${url_base}/api/users`,{
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
              const { user, password} = data;
            
              dispatch({
                type: types.AddCamera,
                body: {user, password}
                });
              setisModalSelectedUse(!isModalSelectedUse)
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
                <BoxUser> 
                    <h2 style={{textAlign: 'center', width: '90%'}}>{props.name}</h2> 
                    <Close hidden={isSelected} onClick={()=> {setIsSelected(!isSelected)}}>
                        <IoClose size="2em" style={{margin:"auto"}} src={close}></IoClose>
                    </Close>
                </BoxUser>
            </SidebarHeader>

            <SidebarContent>
                <Menu>
                <SubMenu title="Camaras" icon={<TbDeviceComputerCamera size="1.8em"/>} >
                    <BuildCameras></BuildCameras>
                    <div hidden={isModalSelectedCam}>
                        <BoxButtonAdd  onClick={()=> {setisModalSelectedCam(!isModalSelectedCam)}}>
                            <ButtonAdd >
                                Agregar camara
                            </ButtonAdd>
                        </BoxButtonAdd> 
                    </div>

                    <div hidden={!isModalSelectedCam}>
                        <AddCamera change={changeCam} error={error}></AddCamera>
                        <BoxButtonAdd onClick={addCamera}>
                            <ButtonAdd>
                                Aceptar        
                            </ButtonAdd>
                        </BoxButtonAdd> 
                    </div>
                    
                    
                </SubMenu>
                <SubMenu title="Usuarios" icon={<IoPersonOutline size="1.8em"/>} >
                    <User></User>
                    <div hidden={isModalSelectedUse}>
                        <BoxButtonAdd  onClick={()=> {setisModalSelectedUse(!isModalSelectedUse)}}>
                            <ButtonAdd >
                                Agregar usuario
                            </ButtonAdd>
                        </BoxButtonAdd> 
                    </div>

                    <div hidden={!isModalSelectedUse}>
                        <AddUser change={changeUser} error={error}></AddUser>
                        <BoxButtonAdd onClick={addUser}>
                            <ButtonAdd>
                                Aceptar        
                            </ButtonAdd>
                        </BoxButtonAdd> 
                    </div>
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

const SideBarDiv= styled.div`
    height: 100%;
    display: flex;
    position: absolute;
    left: 0;
`   
const BoxUser= styled.div`
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
