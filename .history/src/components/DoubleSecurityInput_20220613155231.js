import React, { useContext, useState, useRef } from 'react'
import { Button, TextField } from '@mui/material';
import {ethers} from 'ethers';
import passwordManagerContext from '../Context/PasswordManagerContext';
export default function DoubleSecurityInput({hashDoubleSecurity,setHashDoubleSecurity}) {

    const [errorInput,setErrorInput] = useState(false);
    const passwordContext = useContext(passwordManagerContext);
    const input = useRef();


    function submit()
    {
        if(input.current !== '')
        {
            setErrorInput(false);

            let hash = ethers.utils.id(input.current);
            console.log(hashDoubleSecurity);
            console.log(hash)
            console.log(input.current.value);
            if(hashDoubleSecurity === hash)
            {
                passwordContext.ref_doubleSecurity.current = input.current;
                setHashDoubleSecurity(null);
            }
            else{
                alert("wrong Password");
            }
        }
        else{
            setErrorInput(true);
        }
    }

  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
        <div className='flex flex-col justify-center items-center w-1/2 h-1/2'>
        <span className='text-xl, text-black font-Cairo my-5'>Enter your DoubleSecurity Password </span>
    <TextField
      required
      error={errorInput}
      variant="filled"
      id="Pasword"
      onChange={(e) => {
          console.log(e);
        input.current = e;
        
      }}
      label="Password"

      className="my-2 text-xs"
      size="small"
      InputProps={{ style: { fontSize: 15 } }}
    />
     <Button
              size="medium"
              variant="contained"
              className="bg-cyan-400 hover:bg-blue-500 mx-2  font-Concert hover:transform hover:scale-105"
              onClick={submit}
            >
              Confirm
            </Button>
        </div>
   
  </div>
  )
}
