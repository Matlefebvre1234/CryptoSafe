import React, { useContext, useRef, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  CircularProgress,
  TextField,
  Button,
} from "@mui/material";
import web3Context from "../../Context/web3Context";
import passwordManagerContext from "../../Context/PasswordManagerContext";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { resetAccount } from "../../helper/resetAccount";
export default function DoubleSecurity({ open, setOpen, fetchPassword}) {
  const [loading, setLoading] = useState();
  const [created, setCreated] = useState(false);
  const inputPassword = useRef();
  const web3 = useContext(web3Context);
  const passwordManager = useContext(passwordManagerContext);

  const [errorPassword, setErrorPassword] = useState(false);
  function handleClose() {
    setLoading(false);
    setOpen(false);
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
      </DialogTitle>
      <DialogContent className="flex  items-center justify-center p-5">
        {loading && <CircularProgress></CircularProgress>}{" "}
        {!loading && !created && (
          <div className="flex flex-col">
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
      </DialogContent>
      <DialogActions className="p-5">
        {!loading && !created && (
          <Button
            size="medium"
            variant="contained"
            className="bg-cyan-400 hover:bg-blue-500 mx-2  font-Concert hover:transform hover:scale-105"
            onClick={validInput}
          >
            create
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
