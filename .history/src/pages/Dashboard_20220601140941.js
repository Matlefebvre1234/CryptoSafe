import React, { useContext, useEffect, useRef,useState } from 'react'
import Header from '../components/Header'
import CreateAccount from '../components/CreateAccount'
import { Contract, ethers } from 'ethers'
import contractAddress from '../abi/contractAddress'
import abi from "../abi/Master.json"
import web3Context from '../Context/web3Context'
export default function Dashboard() {
    
    const web3 = useContext(web3Context);
    const ref_account = useRef();
    const [state_account, setAccount] = useState()
    
    async function fetchaccount()
    {
        if(web3.ref_connected.current)
        {
            console.log("fetching")
            let contract = new Contract(contractAddress,abi,web3.ref_provider.current.getSigner());
            ref_account.current = await contract.listAccount(web3.ref_address.current);
            if(ref_account.current !== ethers.constants.AddressZero) setAccount(ref_account.current);
            else setAccount(null);
        
        }
      
    }
    useEffect(()=>{
         fetchaccount();
      // eslint-disable-next-line  
    },[web3.state_connected])


  return (
      <div className='w-full h-screen flex flex-col'>
        <Header></Header>
       {state_account ? <div>{state_account} </div>:  <CreateAccount callback={fetchaccount}></CreateAccount> }
      </div>
    
  )
}
