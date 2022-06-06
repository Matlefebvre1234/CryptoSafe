import React, { useContext, useState , useRef} from 'react'
import { Dialog,DialogActions, DialogContent, DialogTitle, Button,TextField } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import web3Context from '../Context/web3Context'
import assert from 'assert'


export default function NewPasswordButton() {

    const [open,setOpen] = useState(false);
    const web3 = useContext(web3Context);

    const inputName = useRef();
    const inputPassword = useRef();

    let encryptionPublicKey;


    function createPassword()
    {
       console.log(inputName.current);
       console.log(inputName.current.value);
        handleClose();
       
        const ethUtil = require('ethereumjs-util');
        const sigUtil = require('@metamask/eth-sig-util');
        
        const encryptedMessage = ethUtil.bufferToHex(
          Buffer.from(
            JSON.stringify(
              sigUtil.encrypt({
                publicKey: web3.ref_encryptionPubKey.current,
                data: 'hello world!',
                version: 'x25519-xsalsa20-poly1305',
              })
            ),
            'utf8'
          )
        );

        console.log('encrypt message = ', encryptedMessage);

    }


    function handleClose()
    {
        setOpen(false);
    }
  return (
    <div>

        <Button
        size='large'
        onClick={() => {setOpen(true)}}
        variant="contained"
        className="bg-sky-400 hover:bg-blue-500 mx-2  font-Concert hover:transform hover:scale-105 font-Cairos text-xs"
        startIcon={<AddIcon></AddIcon>}
      >
        New Password
      </Button>



        <Dialog
          open={open}
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
       
        >
          <DialogTitle className="font-Cairo text-gray-400 p-5 ">New Password</DialogTitle>
          <DialogContent className='flex flex-col items-center justify-center p-5'>
          <TextField
          required
          variant="filled" 
          id="Name"
          ref={inputName}
          label="Name"
          defaultValue="Name"
          className='my-2 text-xs'
          size='small'
          InputProps={{ style: { fontSize: 15 } }}
        />
         <TextField
          required
          size='small'
          ref={inputPassword}
          variant="filled" 
          id="password"
          label="Password"
          defaultValue="*********"
          className='my-2'
          InputProps={{ style: { fontSize: 15 } }}
        />
          </DialogContent>
          <DialogActions className='p-5'>
            <Button
              size="medium"
              variant="contained"
              className="bg-cyan-400 hover:bg-blue-500 mx-2  font-Concert hover:transform hover:scale-105"
              onClick={createPassword}
            >
              create
            </Button>
          </DialogActions>
        </Dialog>

    </div>
  )
}
