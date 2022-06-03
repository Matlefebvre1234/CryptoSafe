import React from 'react'
import { Card } from '@mui/material'
export default function PasswordCard({password}) {
  return (
    <Card variant='outlined' className='p-5 rounded-2xl'>
      <div className='flex flex-col justify-center items-center'>
      <span className='font-Cairo text-black text-lg'>{password.name}</span>
      <span className='font-Cairo text-black'>**********</span>
      </div>
   
      
    </Card>
  )
}
