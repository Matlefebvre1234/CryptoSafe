import React from 'react'
import { Card } from '@mui/material'
export default function PasswordCard({password}) {
  return (
    <Card variant='outlined' className='w-10 h-10'>
      <div className='flex flex-col justify-center items-center'>
      <span className='font-Cairo text-black text-lg'>{password.name}</span>
      <span className='font-Cairo text-black'>**********</span>
      </div>
   
      
    </Card>
  )
}
