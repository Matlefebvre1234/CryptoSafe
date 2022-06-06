import React, { useContext, useState } from 'react'
import { Dialog,DialogActions, DialogContent, DialogTitle, Button,TextField } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import web3Context from '../Context/web3Context'



export default function NewPasswordButton() {

    const [open,setOpen] = useState(false);
    const web3 = useContext(web3Context);
    let encryptionPublicKey;


    function createPassword()
    {
       
        handleClose();
        window.ethereum
          .request({
            method: 'eth_getEncryptionPublicKey',
            params: [ web3.ref_address.current], // you must have access to the specified account
          })
          .then((result) => {
            encryptionPublicKey = result;

            const ethUtil = require('ethereumjs-util');
            const sigUtil = require('@metamask/eth-sig-util');
            
            const encryptedMessage = ethUtil.bufferToHex(
              Buffer.from(
                JSON.stringify(
                  sigUtil.encrypt({
                    publicKey: encryptionPublicKey,
                    data: 'hello world!',
                    version: 'x25519-xsalsa20-poly1305',
                  })
                ),
                'utf8'
              )
            );
    
            console.log('encrypt message = ', encryptedMessage);
    
    
            window.ethereum
            .request({
              method: 'eth_decrypt',
              params: [encryptedMessage, web3.ref_address.current],
            })
            .then((decryptedMessage) =>
              console.log('The decrypted message is:', decryptedMessage)
            )
            .catch((error) => console.log(error.message));
    
    
          })
          .catch((error) => {
            if (error.code === 4001) {
              // EIP-1193 userRejectedRequest error
              console.log("We can't encrypt anything without the key.");
            } else {
              console.error(error);
            }
          });



       


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
          label="Name"
          defaultValue="Name"
          className='my-2 text-xs'
          size='small'
          InputProps={{ style: { fontSize: 15 } }}
        />
         <TextField
          required
          size='small'
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
