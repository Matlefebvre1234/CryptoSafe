import React, { useRef, useState } from 'react'
import { TextField, Button} from '@mui/material'
export default function Subscibe() {

    const [errorEmail,setErrorEmail] = useState(false);
    const inputEmail = useRef();


    function validInput()
    {
        var mailformat = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

        console.log(mailformat.test(inputEmail.current));

        if(!mailformat.test(inputEmail.current))
        {
     
            setErrorEmail(true);
        }
        else {

            setErrorEmail(false);

            const data = new FormData();
            data.append('fields[email]',inputEmail.current)
            fetch("https://assets.mailerlite.com/jsonp/82955/forms/58744326987974450/subscribe",{
                method:"POST",
                body: data
            }).then(res => res.json()).then(res => console.log(res));
        }
    }
    
  return (
    <div>
      <p className='text-center text-white font-Neptune text-2xl my-5'> Don't mist importants updates and alerts <br></br> about the plateform ! </p>
<div className='flex flex-col xl:flex-row justify-center items-center'>
<TextField
                required
                autoFocus={true}
                error={errorEmail}
                id="Name"
                inputRef={inputEmail}
                onChange={(e) => {
                  inputEmail.current = e.target.value;
                }}
                label="Email"
                className="my-2 text-xs font-Cairo w-80 "
                size="small"
                InputProps={{
                  style: {
                    fontSize: 15,
                    borderRadius: 15,
                    background: "#FFFFFF",
                  },
                }}
                InputLabelProps={{ style: { fontSize: 13 } }}
              />
             <Button
              size="medium"
              variant="contained"
              className="bg-cyan-400 hover:bg-blue-500 xl:mx-2 font-Neptune hover:transform hover:scale-105"
              onClick={validInput}
            >
              Subscribe
            </Button>
</div>

    </div>
  )
}
