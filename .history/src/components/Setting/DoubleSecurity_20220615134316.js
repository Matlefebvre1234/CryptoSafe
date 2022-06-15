import React, { useContext, useRef, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  CircularProgress,
  TextField,
  Button,
  IconButton
} from "@mui/material";
import web3Context from "../../Context/web3Context";
import passwordManagerContext from "../../Context/PasswordManagerContext";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { resetAccount } from "../../helper/resetAccount";
import CloseIcon from '@mui/icons-material/Close';
export default function DoubleSecurity({ open, setOpen, fetchPassword}) {
  const [loading, setLoading] = useState();
  const [created, setCreated] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState();
  const inputPassword = useRef();
  const web3 = useContext(web3Context);
  const passwordManager = useContext(passwordManagerContext);

  const [errorPassword, setErrorPassword] = useState(false);
  function handleClose() {
    setLoading(false);
    setOpen(false);
    setOpenConfirmation(false);
  }

  function validInput() {
    let valid = true;

    if (inputPassword.current === "") {
      setErrorPassword(true);
      valid = false;
    } else {
      setErrorPassword(false);
    }

    if (valid) {
      createDoubleSecurity();
    }
  }

  async function createDoubleSecurity() {
    setLoading(true);

    await resetAccount(web3,passwordManager,inputPassword.current);
    passwordManager.ref_doubleSecurity.current = inputPassword.current;
    fetchPassword();
    setCreated(true);
    setLoading(false);
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle className="font-Cairo text-gray-400 p-5 ">
        Double Security
        {!loading && <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>}   
      </DialogTitle>
      <DialogContent className="flex  items-center justify-center p-5">
        {!loading && !created && (


          <div className="flex flex-col justify-center items-center">
            <p className="text-justify m-10 font-Cairo leading-normal">
               You can enable Double security with a Master Password. This password will be use to encrypt and decrypt all your passwords.
               This way, if someone steal your private key, they will need this unique password to access your account.
               <br></br>
               <br></br>
               This process need to reset your account to enable this feature. Make sure you save all your password somewhere safe before continuing.
              </p>
              <Button
            size="medium"
            variant="contained"
            className="bg-red-500 hover:bg-red-400 mx-2 w-3/4   font-Concert hover:transform hover:scale-105"
            onClick={()=> setOpenConfirmation(true)}
          >
            I understand and wish to continue
          </Button>
          </div>
        )}
      </DialogContent>
      <Dialog
      open={openConfirmation}
      onClose={(!loading && created) ? () =>{setOpenConfirmation(false)} : handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle className="font-Cairo text-gray-400 p-5 ">
        Double Security
        {!loading && <IconButton
          aria-label="close"
          onClick={(!loading && created) ? () =>{setOpenConfirmation(false)} : handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>}   
      </DialogTitle>
      <DialogContent className="flex flex-col items-center justify-center  p-5">
        {loading && <CircularProgress className="mb-8"></CircularProgress>}
        {!loading && !created && (


          <div className="flex flex-col">
            <p className="text-justify mt-10 font-Cairo leading-normal">
              Enter a unique password. It's the only password you need to remember. If you lost it you will not be able to access your account anymore.
              </p>
            <TextField
              required
              size="small"
              error={errorPassword}
              onChange={(e) => {
                inputPassword.current = e.target.value;
              }}
              variant="filled"
              id="password"
              label="Password"
              className="my-2"
              InputProps={{ style: { fontSize: 15 } }}
            />
          </div>
        )}


        {!loading && created && 
        <div className="flex flex-col justify-center items-center">
            <CheckCircleIcon className="text-6xl text-green-400"></CheckCircleIcon>
            <span className="font-Cairo text-black mt-10">Password set successfully !</span>
            </div>}
            {!loading && !created && (
          <Button
            size="medium"
            variant="contained"
            className="bg-red-500 hover:bg-red-400 m-2 w-3/4  font-Concert hover:transform hover:scale-105"
            onClick={validInput}
          >
            Activate Double Security
          </Button>
        )}
      </DialogContent>
  
    </Dialog>

    </Dialog>
    
  );
}
