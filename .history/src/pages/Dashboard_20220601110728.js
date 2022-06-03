import React from 'react'
import Header from '../components/Header'
import createAccount from '../components/createAccount'
export default function Dashboard() {
  return (
      <div className='w-full h-full flex flex-col'>
        <Header></Header>
        <createAccount></createAccount>
      </div>
    
  )
}
