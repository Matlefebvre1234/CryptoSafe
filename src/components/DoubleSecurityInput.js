import React, { useContext, useState, useRef } from "react";
import {
  Button,
  IconButton,
  TextField,
  Dialog,
  DialogContent,
  DialogTitle,
  InputAdornment,
} from "@mui/material";
import { ethers } from "ethers";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import passwordManagerContext from "../Context/PasswordManagerContext";
import web3Context from "../Context/web3Context";
import HelpIcon from "@mui/icons-material/Help";
import { resetAccount } from "../helper/resetAccount";
import CloseIcon from "@mui/icons-material/Close";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    test: {
      // Purple and green play nicely together.
      main: "#4DE7ED",
    },
  },
});

export default function DoubleSecurityInput({
  hashDoubleSecurity,
  setHashDoubleSecurity,
  setStateDoubleSecurity,
}) {
  const [errorInput, setErrorInput] = useState(false);
  const [open, setOpen] = useState(false);
  const [visibility, setVisibility] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const web3 = useContext(web3Context);
  const passwordContext = useContext(passwordManagerContext);
  const input = useRef();

  function handleClose() {
    setOpen(false);
    setOpenConfirmation(false);
  }

  async function resetAccountUser() {
    await resetAccount(web3, passwordContext);
    handleClose();
    setHashDoubleSecurity(null);
  }

  function submit() {
    if (input.current) {
      setErrorInput(false);

      let hash = ethers.utils.id(web3.ref_address.current + input.current);
      const wallet = new ethers.Wallet(hash);
      if (hashDoubleSecurity === wallet.address) {
        passwordContext.ref_doubleSecurity.current = input.current;
        setStateDoubleSecurity(input.current);
        console.log(hashDoubleSecurity);
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
        <span className=" 2xl:text-lg text-center text-black font-Cairo">
          Enter your DoubleSecurity Password{" "}
        </span>
        <ThemeProvider theme={theme}>
          <TextField
            required
            autoFocus={true}
            color="test"
            error={errorInput}
            id="Password"
            type={visibility ? "text" : "password"}
            onChange={(e) => {
              input.current = e.target.value;
            }}
            label="Password"
            size="small"
            className="my-5 font-Cairo w-48"
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                submit();
              }
            }}
            InputProps={{
              style: {
                fontSize: 15,
                borderRadius: 15,
                background: "#F6F6F6",
                paddingRight: 0,
              },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => {
                      setVisibility((prev) => !prev);
                    }}
                  >
                    {visibility ? (
                      <VisibilityOff></VisibilityOff>
                    ) : (
                      <Visibility></Visibility>
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            InputLabelProps={{ style: { fontSize: 13 } }}
          />
        </ThemeProvider>

        <Button
          size="medium"
          variant="contained"
          className="bg-bleuMarin hover:bg-blue-500 m-2  font-Neptune hover:transform hover:scale-105"
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
          <DialogTitle className="font-Neptune text-sm text-gray-400 ">
            Help
            <IconButton
              aria-label="close"
              onClick={() => setOpen(false)}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
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
                className="bg-blue-800 hover:bg-blue-500 m-2  font-Neptune hover:transform hover:scale-105"
                onClick={() => setOpenConfirmation(true)}
              >
                RESET ACCOUNT
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        <Dialog
          open={openConfirmation}
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle className="font-Neptune text-sm text-gray-400 ">
            Reset Account
            <IconButton
              aria-label="close"
              onClick={() => setOpenConfirmation(false)}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <div className="flex flex-col p-2 justify-center items-center text-gray-400 font-Cairo ">
              <p className="text-justify mt-10 font-Cairo leading-normal">
                Are you sure you want to reset your account ? You won't be able
                to recover your password.
              </p>

              <Button
                size="medium"
                variant="contained"
                className="bg-red-500  font-Neptune hover:transform hover:scale-105"
                onClick={resetAccountUser}
              >
                RESET ACCOUNT
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
