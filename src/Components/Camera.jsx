import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { StoreContext } from '../context/StoreProvider';
import { types } from '../context/StoreReducer';
import ButtonOnOff from './ButtonOnOff'


export const Camera = (props) => {

    const [store, dispatch] = useContext(StoreContext);
    const {user,actualHost, cameras} = store;
    
    const onSelected = ()=>{
        if(actualHost!=props.ip)
        dispatch({
            type: types.ChangeActualHost,
            body: props.ip
        });
    }
    
  return (
    <Box onClick={onSelected} isSelected={actualHost===props.ip}>
        <div>
            <Word>Nombre: {props.name}</Word>
            <Word style={{marginLeft:"40px"}}>IP: {props.ip}</Word>
        </div>
        <ButtonOnOff host={actualHost}   />
        
        
    </Box>
  )
}

const Box = styled.div`
    height: 100%;
    margin: 0px 10px;
    background-color: ${(props )=> (props.isSelected ? "#4b4b4b" : "")};
    display: flex;
    justify-content: space-between;
    border-radius:10px;
    align-items: center;
    padding: 8px 3%;
    
    &:hover{
        background-color: #4b4b4b;
    }
`

const Word = styled.p`
    font-family:  Geneva, Tahoma, sans-serif;
    
    color: white;
    box-sizing: border-box;
    padding: 0 5px ;
    margin: 0px;
    font-size: .9375rem;
`

