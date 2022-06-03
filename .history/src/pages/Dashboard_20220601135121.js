import React, { useContext, useEffect, useRef,useState } from 'react'
import Header from '../components/Header'
import CreateAccount from '../components/CreateAccount'
import { Contract } from 'ethers'
import contractAddress from '../abi/contractAddress'
import abi from "../abi/Master.json"
import web3Context from '../Context/web3Context'
export default function Dashboard() {
    
    const web3 = useContext(web3Context);
    const ref_account = useRef();
    const [state_account, setAccount] = useState('')
    
    function fetchaccount()
    {
        let contract = new Contract(contractAddress,abi,web3.ref_provider.current.getSigner());
        ref_account.current = contract.listAccount(web3.ref_address.current);
        console.log(ref_account.current);
        if(ref_account.current) setAccount(ref_account.current);
    }
    useEffect(()=>{
        //fetchaccount();
      // eslint-disable-next-line  
    },[])


  return (
      <div className='w-full h-screen flex flex-col'>
        <Header></Header>
       {state_account !== '' ? <div>{state_account} </div>:  <CreateAccount callback={fetchaccount}></CreateAccount> }
      </div>
    
  )
}
