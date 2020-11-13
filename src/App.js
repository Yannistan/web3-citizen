import React, {useContext, useState, useEffect} from 'react'
import { Heading, VStack, HStack,Text, Button, Input } from '@chakra-ui/core'
import { ethers } from 'ethers'
import { Web3Context } from './hooks/useWeb3'
import {
  Citizen_address,
  Citizen_abi,
} from './contracts/Citizens'


function App() {
  const [web3State, login] = useContext(Web3Context)
  const [citizen, setCitizen] = useState(null)
  const [inputAddress, setInputAddress] = useState('0x0')
  const [numberToken, setNumberToken] = useState(0);
  const [inputAge, setInputAge] = useState(null)
  const [inputIll, setInputIll] = useState(false);
  const [Age, setGetAge] = useState(null)
  const [Ill, setIll] = useState(false);

  const handleOnClickGetAge = async () => {
    console.log(citizen)
    const res = await citizen.registerCitizen(inputAddress, inputAge, inputIll)

 //   setGetAge(res.toString())
  }

  const handleOnClickNumberToken = async () => {
    const res = await citizen.registerCitizen(inputAddress, inputAge, inputIll)
  //  setNumberToken(res.toString())
  }

/*  const handleOnClickInput = async () => {
    const tx = await citizen.registerCitizen ( inputAddress, inputAge, inputIll)
  } */

  useEffect(() => {
    if (web3State.signer !== null) {
      setCitizen(
        new ethers.Contract(
          Citizen_address,
          Citizen_abi,
          web3State.signer
        )
      )
    }
  }, [web3State.signer])

  return(
    <>
    <Text>Web3: {web3State.is_web3 ? 'injected' : 'no-injected'}</Text>
      <Text>Network id: {web3State.chain_id}</Text>
      <Text>Network name: {web3State.network_name}</Text>
      <Text>MetaMask installed: {web3State.is_metamask ? 'yes' : 'no'}</Text>
      <Text>logged: {web3State.is_logged ? 'yes' : 'no'}</Text>
      <Text>{web3State.account}</Text>
      {!web3State.is_logged && (
        <>
          <Button onClick={login}>login</Button>
        </>
      )}
           {citizen !== null && web3State.chain_id === 4 && (
        <>
        <VStack>
        <Button onClick={handleOnClickNumberToken}>NombreToken</Button>
        <Text>{numberToken}</Text>

        <Button onClick={handleOnClickGetAge}>Register</Button>
        <Text>{Age}</Text> 

       
      </VStack>
      <HStack>
        <Text>Address</Text>
        <Input
          value={inputAddress}
          onChange={(e) => {
            setInputAddress(e.currentTarget.value)
          }}
        />
      </HStack>
        <HStack>
        <Text>Age :</Text>
        <Input
          value={inputAge}
          onChange={(e) => {
            setInputAge(e.currentTarget.value)
          }}
        />
      </HStack>
      
        <HStack>
        <Text>isIll :</Text>
        <Input
          value={inputIll}
          onChange={(e) => {
            setInputIll(e.currentTarget.value)
          }}
        />
      </HStack>
    </>
  )}
</>
  );
}

export default App
