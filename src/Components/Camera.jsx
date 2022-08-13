import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { StoreContext } from '../context/StoreProvider';
import { types } from '../context/StoreReducer';
import ButtonOnOff from './ButtonOnOff'


export const Camera = (props) => {

    const [store, dispatch] = useContext(StoreContext);
    var {user,actualHost, cameras} = store;
    
    
    const onSelected = ()=>{
        if(actualHost!=props.ip)
        dispatch({
            type: types.ChangeActualHost,
            name: props.ip
        });
    }
    
  return (
    <Box onClick={onSelected} isSelected={actualHost===props.ip}>
        <div>
            <Word>Name: {props.name}</Word>
            <Word style={{marginLeft:"25px"}}>IP: {props.ip}</Word>
        </div>
        <ButtonOnOff height="25px"  />
        
        
    </Box>
  )
}

const Box = styled.div`
    height: 7%;
    background-color: ${(props )=> (props.isSelected ? "#4b4b4b" : "#323232")};
    display: flex;
    justify-content: space-between;
    border-radius: 10px;
    align-items: center;
    padding: 0 3%;
    
    &:hover{
        background-color: #4b4b4b;
    }
`

const Word = styled.p`
    font-family: Roboto, Arial, sans-serif;
    
    color: white;
    box-sizing: border-box;
    padding: 0 5px ;
    margin: 0;
    font-size: .9375rem;
`

