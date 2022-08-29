import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { StoreContext } from '../context/StoreProvider';
import { types } from '../context/StoreReducer';
import ButtonOnOff from './ButtonOnOff'
import { IoTrashOutline } from "react-icons/io5";
export const AddCamera = (props) => {
  return (
    <Container>
      <Box >
          <BoxInput>
              <Input  id="name" placeholder='Nombre de la camara'></Input>
              <Input id="ip" placeholder='IP de la camara (x.x.x.x)'></Input>
          </BoxInput>
          <Close>
            <IoTrashOutline size="1.5em"/>
          </Close>
          
      </Box>
      <Error>
        {props.error}
      </Error>

    </Container>
    
    
  )
}

const Container = styled.div`
    height: 100%;
    margin: 0px 10px;
    background-color: #4b4b4b;
    
    
    justify-content: space-between;
    border-radius:10px;
    align-items: center;
    padding: 8px 3%;
    
    &:hover{
        background-color: #4b4b4b;
    }
`

const Box = styled.div`
    height: 100%;
    width : 100%;
    
    display: flex;
    justify-content: space-between;
  
    align-items: center;
    
    
    
`
const BoxInput= styled.div`
  margin-top: auto;
  margin-bottom: auto;
`

const Input = styled.input`
  height: 10px;
  display: flex;
  padding: 10px;
  box-sizing: border-box;
  border-style: none;
  border-radius: 4px;
  border: solid 1px #cacaca;
  margin: 5px 0px;
  font-size: 14px;
  &:focus{
    outline: solid 2px #000000;
   
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
const Error = styled.p`
  color: #ff3b3b;
  font-size: 12px;
  text-align: left;
  margin: 3px 2px;

`