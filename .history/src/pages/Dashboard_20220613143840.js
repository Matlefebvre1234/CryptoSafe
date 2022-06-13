import React, { useContext, useEffect, useRef,useState } from 'react'
import Header from '../components/Header'
import CreateAccount from '../components/CreateAccount'
import { Contract, ethers } from 'ethers'
import contractAddress from '../abi/contractAddress'
import abi from "../abi/Master.json"
import web3Context from '../Context/web3Context'
import PasswordManager from '../components/PasswordManager'
import passwordManagerContext from '../Context/PasswordManagerContext'


export default function Dashboard() {
    
    const web3 = useContext(web3Context);
    const ref_account = useRef();
    const [state_account, setAccount] = useState()
    const ref_doubleSecurity = useRef();

    async function fetchaccount()
    {
        if(web3.ref_connected.current)
        {

            let contract = new Contract(contractAddress,abi,web3.ref_provider.current.getSigner());
            ref_account.current = await contract.getAccount(web3.ref_address.current);
            if(ref_account.current !== ethers.constants.AddressZero) setAccount(ref_account.current);
            else setAccount(null);
        
        } else{
            setAccount(null);
        }
      
    }

 
    async function fetchPassword () {
        const contract = new Contract(
          state_account,
          abi,
          web3.ref_provider.current.getSigner()
        );
        const arr = await contract.getlistPassword();
        return arr;
      }
    


    useEffect(()=>{
         fetchaccount();
      // eslint-disable-next-line  
    },[web3.state_connected])

    const contextPackage = {
        ref_account: ref_account,
        ref_doubleSecurity: ref_doubleSecurity,
        state_account: state_account,
        fetchPassword:fetchPassword,
        setAccount: setAccount
    }
  return (
      <div className='w-full h-screen flex flex-col'>

          <passwordManagerContext.Provider value={contextPackage}>
          <Header></Header>
       {state_account ? <PasswordManager state_account={state_account} setAccount={setAccount}></PasswordManager>:  <CreateAccount callback={fetchaccount}></CreateAccount> }
          </passwordManagerContext.Provider>
     
      </div>
    
  )
}
