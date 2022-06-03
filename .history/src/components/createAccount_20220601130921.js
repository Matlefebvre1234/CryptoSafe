import React, { useContext } from 'react'
import { Button } from '@mui/material'
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import web3Context from "../Context/web3Context";
import Metamask from './Metamask';
import { Contract } from 'ethers';
import abi from "../abi/Master.json"
import contractAddress from '../abi/contractAddress';
export default function CreateAccount() {

    const web3 = useContext(web3Context);


    function createAccount()
    {
         let overrides = {
    
            // The amount to send with the transaction (i.e. msg.value)
            value: 50000000000000000,
    
        
        };

        
        let signer = web3.ref_provider.current.getSigner();
        let contract = new Contract(contractAddress,abi,signer);
      contract.createAccount(web3.ref_address,overrides);
    }

  return (
      <div className='h-full w-full flex justify-center items-center'>
   {web3.state_connected ? <Button
       size='large'
       variant="contained"
       className="bg-cyan-300 hover:bg-blue-500 mx-2  font-Concert hover:transform hover:scale-105"
       startIcon={<GroupAddIcon></GroupAddIcon>}
       onClick={createAccount}
     >
       Initialize Account
     </Button> : 
     
     <Metamask size='large' text='Connect Wallet To Continue' ></Metamask> }

     
      </div>
      )
}
