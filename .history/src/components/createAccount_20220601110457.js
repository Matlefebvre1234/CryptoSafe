import React from 'react'
import { ethers } from 'ethers'
import { Button } from '@mui/material'
import GroupAddIcon from '@mui/icons-material/GroupAdd';
export default function createAccount() {
  return (
      <div>
    <Button
       
       variant="contained"
       className="bg-cyan-300 hover:bg-blue-500 mx-2  font-Concert hover:transform hover:scale-105"
       startIcon={<GroupAddIcon></GroupAddIcon>}
       
     >
       Initialize Account
     </Button>
      </div>
      )
}
