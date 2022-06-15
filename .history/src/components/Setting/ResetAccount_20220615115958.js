import React, { useContext, useRef, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  CircularProgress,
  Button,
} from "@mui/material";
import web3Context from "../../Context/web3Context";
import passwordManagerContext from "../../Context/PasswordManagerContext";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { resetAccount } from "../../helper/resetAccount";
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
        ResetAccount
      </DialogTitle>
      <DialogContent className="flex  items-center justify-center p-5">
        {!loading && !created && (


          <div className="flex flex-col">
            <p className="text-justify m-10 font-Cairo leading-normal">
               You can reset your account if you want. This process will delete all your encrypted passwords on the Blockchain
               <br></br>
               <br></br>
                Make sure you save all your password somewhere safe before continuing. You won't be able to recover them.
              </p>
              <Button
            size="medium"
            variant="contained"
            className="bg-red-500 hover:bg-red-400 mx-2  font-Concert hover:transform hover:scale-105"
            onClick={()=> setOpenConfirmation(true)}
          >
            I understand and wish to continue
          </Button>
          </div>
        )}
      </DialogContent>
      <Dialog
      open={openConfirmation}
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle className="font-Cairo text-gray-400 p-5 ">
        Reset Account
      </DialogTitle>
      <DialogContent className="flex  items-center justify-center p-5">
        {loading && <CircularProgress></CircularProgress>}{" "}
        {!loading && !created && (


          <div className="flex flex-col">
 <p className="text-justify m-10 font-Cairo leading-normal">
                Make sure you save all your password somewhere safe before continuing. You won't be able to recover them.
              </p>
              <Button
            size="medium"
            variant="contained"
            className="bg-red-500 hover:bg-red-400 mx-2  font-Concert hover:transform hover:scale-105"
            onClick={()=> setOpenConfirmation(true)}
          >
            Reset Account
          </Button>
          </div>
        )}


        {!loading && created && 
        <div className="flex flex-col justify-center items-center">
            <CheckCircleIcon className="text-6xl text-green-400"></CheckCircleIcon>
            <span className="font-Cairo text-black mt-10">Password set successfully !</span>
            </div>}
      </DialogContent>
      <DialogActions className="p-5">
        {!loading && !created && (
          <Button
            size="medium"
            variant="contained"
            className="bg-red-500 hover:bg-red-400 mx-2  font-Concert hover:transform hover:scale-105"
            onClick={validInput}
          >
            Activate Double Security
          </Button>
        )}
      </DialogActions>
    </Dialog>

    </Dialog>
    
  );
}
