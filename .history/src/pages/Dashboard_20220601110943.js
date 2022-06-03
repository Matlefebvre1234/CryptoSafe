import React from 'react'
import Header from '../components/Header'
import CreateAccount from '../components/CreateAccount'
export default function Dashboard() {
  return (
      <div className='w-full h-screen flex flex-col'>
        <Header></Header>
        <CreateAccount></CreateAccount>
      </div>
    
  )
}
