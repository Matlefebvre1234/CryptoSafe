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
    
    async function fetchaccount()
    {
        if(web3.ref_connected.current)
        {
            let test = "allo";
            
            let tr = ethers.utils.formatBytes32String(test);
            console.log(tr)
            let result = parseInt(web3.ref_address.current,32) + parseInt(tr) ;
            let result2 = result.toString(16);
            console.log(web3.ref_address.current);
            console.log(result)
            console.log(result2);
            let contract = new Contract(contractAddress,abi,web3.ref_provider.current.getSigner());
            ref_account.current = await contract.getAccount(web3.ref_address.current);
            if(ref_account.current !== ethers.constants.AddressZero) setAccount(ref_account.current);
            else setAccount(null);
        
        } else{
            setAccount(null);
        }
      
    }
    useEffect(()=>{
         fetchaccount();
      // eslint-disable-next-line  
    },[web3.state_connected])

    const contextPackage = {
        ref_account: ref_account,
        state_account: state_account,
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
