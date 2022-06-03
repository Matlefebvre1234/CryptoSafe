import React from 'react'

export default function PasswordManager({state_account,setAccount}) {
  return (
    <div className='flex p-5 flex-row font-Cairo'>
        <span>
            Your Contract Account : {state_account}
        </span>
    </div>
  )
}
