import React, { useState } from 'react'
import { Camera } from '../Components/Camera';
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarContent,  } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import styled from 'styled-components'
import menu from '../images/menu2.svg'
import close from '../images/Recurso 1.svg'


export const SideBar = (props) => {
    const [isSelected, setIsSelected] = useState(false);
    const BuildCameras= ()=> {
        return props.cameras.map((e,i)=>(<Menu key={i}><Camera name={e.name} ip={e["ip"]}></Camera></Menu>))
    }

  return (
   

    <SideBarDiv>
        <ProSidebar collapsed={isSelected} collapsedWidth="0px">
            <SidebarHeader>
                <User>  
                    <h2 style={{textAlign: 'center', width: '90%'}}>{props.name}</h2> 
                    <Close hidden={isSelected} onClick={()=> {setIsSelected(!isSelected)}}>
                        <img height="50%" style={{margin:"auto"}} src={close}></img>
                    </Close>
                </User>
                
            </SidebarHeader>

            <SidebarContent>
                <BuildCameras></BuildCameras>
            </SidebarContent>
           
            
        </ProSidebar>

        <ButtonSidebar onClick={()=> {setIsSelected(!isSelected)}} hidden={!isSelected}>
            <img height="100%" width="60%" src={menu} ></img>
        </ButtonSidebar>
    </SideBarDiv>
  )
}
const SideBarDiv= styled.div`
    height: 100%;
    display: flex;
    position: absolute;
    left: 0;
`   


const User= styled.div`
  width: 100%;
  height: 100%;
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
    height: 50%;
    width: 10%;
    border-radius: 50%;
    display: flex;
       
    &:hover{
        background-color: #585858;
    }
`