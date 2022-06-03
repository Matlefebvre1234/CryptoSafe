import React, { useContext, useEffect, useState } from 'react'
import web3Context from '../Context/web3Context'
import { Contract } from 'ethers';
import abi from "../abi/Account.json"
import { CircularProgress } from '@mui/material';
import PasswordCard from './PasswordCard';
export default function PasswordManager({state_account,setAccount}) {

    const web3 = useContext(web3Context);
    const [listPassword, setListPassword] = useState();
    const [loading, setLoading] = useState (true);

   async function fetchPassword()
    {
        const contract = new Contract(state_account,abi,web3.ref_provider.current.getSigner());
        setListPassword(await contract.getlistPassword());
        setLoading(false);
    }

    useEffect(()=>{
      fetchPassword();
    },[])
  return (
    <div className='flex p-5 flex-row font-Cairo'>
        <span>
            Your Contract Account : {state_account}
        </span>
        <div className='felx justify-center items-center flex-wrap'>
        {loading && <CircularProgress></CircularProgress>}
        {!loading && listPassword && listPassword.map(password => <PasswordCard className="m-2" password={password}></PasswordCard> )}
     
        </div>
    </div>
  )
}
