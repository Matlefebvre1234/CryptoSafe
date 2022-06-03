import React, { useContext } from 'react'
import { Button } from '@mui/material'
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import web3Context from "../Context/web3Context";
import Metamask from './Metamask';
export default function CreateAccount() {

    const web3 = useContext(web3Context);

  return (
      <div className='h-full w-full flex justify-center items-center'>
   {web3.state_connected ? <Button
       size='large'
       variant="contained"
       className="bg-cyan-300 hover:bg-blue-500 mx-2  font-Concert hover:transform hover:scale-105"
       startIcon={<GroupAddIcon></GroupAddIcon>}
       
     >
       Initialize Account
     </Button> : <Metamask size='large' text='Connect Wallet To Continue' ></Metamask> }

     
      </div>
      )
}
