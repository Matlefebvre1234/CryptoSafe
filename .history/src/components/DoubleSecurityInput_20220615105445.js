import React, { useContext, useState, useRef } from "react";
import {
  Button,
  IconButton,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { ethers } from "ethers";
import passwordManagerContext from "../Context/PasswordManagerContext";
import web3Context from "../Context/web3Context";
import HelpIcon from "@mui/icons-material/Help";
import { resetAccount } from "../helper/resetAccount";
export default function DoubleSecurityInput({
  hashDoubleSecurity,
  setHashDoubleSecurity,
}) {
  const [errorInput, setErrorInput] = useState(false);
  const [open, setOpen] = useState(false);
  const [openConfirmation,setOpenConfirmation] = useState();
  const web3 = useContext(web3Context);
  const passwordContext = useContext(passwordManagerContext);
  const input = useRef();

  function handleClose() {
    setOpen(false);
    setOpenConfirmation(false);
  }

  function resetAccountUser()
  {
      resetAccount(web3,passwordContext);
  }

  function submit() {
    if (input.current) {
      setErrorInput(false);

      let hash = ethers.utils.id(web3.ref_address.current + input.current);
      const wallet = new ethers.Wallet(hash);
      console.log("hashDoubleSecurity", hashDoubleSecurity);
      console.log("wallet", wallet.address);
      if (hashDoubleSecurity === wallet.address) {
        passwordContext.ref_doubleSecurity.current = input.current;
        setHashDoubleSecurity(null);
      } else {
        alert("wrong Password");
      }
    } else {
      setErrorInput(true);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <div className="flex flex-col justify-center items-center w-1/2 h-1/2">
        <span className="text-xl, text-black font-Cairo">
          Enter your DoubleSecurity Password{" "}
        </span>
        <TextField
          required
          error={errorInput}
          variant="filled"
          id="Password"
          type="password"
          onChange={(e) => {
            input.current = e.target.value;
          }}
          label="Password"
          className="my-5 text-xs"
          size="small"
          InputProps={{ style: { fontSize: 15 } }}
        />
        <Button
          size="medium"
          variant="contained"
          className="bg-cyan-400 hover:bg-blue-500 m-2  font-Concert hover:transform hover:scale-105"
          onClick={submit}
        >
          Confirm
        </Button>
        <IconButton className=" text-cyan-400" onClick={() => setOpen(true)}>
          <HelpIcon></HelpIcon>
        </IconButton>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle className="font-Cairo text-gray-400 ">Help</DialogTitle>
          <DialogContent>
            <div className="flex flex-col p-2 justify-center items-center text-gray-400 font-Cairo ">
              <p className="text-justify mt-10 font-Cairo leading-normal">
                Your account is lock with the Double Security. Please enter the
                password you used to access your account.
              </p>
              <p className="text-justify  font-Cairo leading-normal">
                If you forgot your passsword you can reset your account with the
                reset button in the bottom. Take note that all your passwords is
                going to be delete and you will note be able to recover them
              </p>
              <Button
                size="medium"
                variant="contained"
                className="bg-cyan-400 hover:bg-blue-500 m-2  font-Concert hover:transform hover:scale-105"
                onClick={() => setOpenConfirmation(true)}
              >
                RESET ACCOUNT
              </Button>
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              size="large"
              variant="contained"
              className="bg-cyan-400 hover:bg-blue-500 mx-2  font-Concert hover:transform hover:scale-105"
              onClick={handleClose}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openConfirmation}
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle className="font-Cairo text-gray-400 ">Reset Account</DialogTitle>
          <DialogContent>
            <div className="flex flex-col p-2 justify-center items-center text-gray-400 font-Cairo ">
              <p className="text-justify mt-10 font-Cairo leading-normal">
               Are you sure you want to reset your account ? You won't be able to recover your password.
              </p>
          
              <Button
                size="medium"
                variant="contained"
                className="bg-red-500  font-Concert hover:transform hover:scale-105"
                onClick={resetAccountUser}
              >
                RESET ACCOUNT
              </Button>
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              size="large"
              variant="contained"
              className="bg-cyan-400 hover:bg-blue-500 mx-2  font-Concert hover:transform hover:scale-105"
              onClick={handleClose}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}
