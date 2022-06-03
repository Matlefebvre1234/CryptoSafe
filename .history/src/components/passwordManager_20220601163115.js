import React, { useContext } from 'react'
import web3Context from '../Context/web3Context'
import { Contract } from 'ethers';
import abi from "../abi/Account.json"

export default function PasswordManager({state_account,setAccount}) {

    const web3 = useContext(web3Context);


    function fetchPassword()
    {
        const contract = new Contract(state_account,abi,web3.ref_provider.current.getSigner());
    }

  return (
    <div className='flex p-5 flex-row font-Cairo'>
        <span>
            Your Contract Account : {state_account}
        </span>
    </div>
  )
}
