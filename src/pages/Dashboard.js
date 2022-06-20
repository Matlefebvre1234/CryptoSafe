import React, { useContext, useEffect, useRef,useState } from 'react'
import Header from '../components/Header'
import CreateAccount from '../components/CreateAccount'
import { Contract, ethers } from 'ethers'
import contractAddress from '../abi/contractAddress'
import abi from "../abi/Master.json"
import abiAccount from "../abi/Account.json";
import web3Context from '../Context/web3Context'
import PasswordManager from '../components/PasswordManager'
import passwordManagerContext from '../Context/PasswordManagerContext'
import DoubleSecurityInput from '../components/DoubleSecurityInput'


export default function Dashboard() {
    
    const web3 = useContext(web3Context);
    const ref_account = useRef();
    const [state_account, setAccount] = useState();
    const  [accountStorage,setAccountStorage] = useState('');
    const ref_doubleSecurity = useRef();
    const [hashDoubleSecurity,setHashDoubleSecurity]= useState();

    async function fetchaccount()
    {
        if(web3.ref_connected.current)
        {

            let contract = new Contract(contractAddress,abi,web3.ref_provider.current.getSigner());
            ref_account.current = await contract.getAccount(web3.ref_address.current);
            if(ref_account.current !== ethers.constants.AddressZero){
                let contractAccount = new Contract(ref_account.current,abiAccount,web3.ref_provider.current.getSigner());
                setAccountStorage(await contractAccount.accountStorage());

                setAccount(ref_account.current);
            } 
            else setAccount(null);
            
            await fetchDoubleSecurity();
        
        } else{
            setAccount(null);
        }
      
    }

    async function fetchDoubleSecurity()
    {
        if(ref_account.current !== ethers.constants.AddressZero)
        {
            let contract = new Contract(ref_account.current,abiAccount,web3.ref_provider.current.getSigner());
            const hash =  await contract.getHashDoubleSecurity();
              setHashDoubleSecurity(hash);
        }
    }
    
    
    useEffect(()=>{
         fetchaccount();
      // eslint-disable-next-line  
    },[web3.state_connected])

    const contextPackage = {
        ref_account: ref_account,
        ref_doubleSecurity: ref_doubleSecurity,
        state_account: state_account,
        setAccount: setAccount
    }
  return (
      <div className='w-full h-screen flex flex-col'>

          <passwordManagerContext.Provider value={contextPackage}>
          <Header></Header>

        {state_account && hashDoubleSecurity && !ref_doubleSecurity.current && <DoubleSecurityInput hashDoubleSecurity={hashDoubleSecurity} setHashDoubleSecurity={setHashDoubleSecurity} ></DoubleSecurityInput>}

        { state_account && !hashDoubleSecurity && <PasswordManager accountStorage={accountStorage} state_account={state_account} setAccount={setAccount}></PasswordManager>}
       {!state_account && <CreateAccount callback={fetchaccount}></CreateAccount> }
          </passwordManagerContext.Provider>
     
      </div>
    
  )
}
