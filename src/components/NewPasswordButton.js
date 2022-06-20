import React, { useContext, useState, useRef } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  CircularProgress,
  IconButton,
  Snackbar,
  Alert,
  Grow
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import web3Context from "../Context/web3Context";
import { Contract } from "ethers";
import abi from "../abi/Account.json";
import abiMaster from "../abi/Master.json";
import { encryptWithFakeAddress } from "../helper/encrypt";
import contractAddress from "../abi/contractAddress";
import passwordManagerContext from "../Context/PasswordManagerContext";
export default function NewPasswordButton({ callback, account }) {
  const [openSnakBar, setOpenSnackBar] = useState(false);
  const [open, setOpen] = useState(false);
  const [errorName, setErrorName] = useState(false);
  const [errorUsername, setErrorUsername] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const web3 = useContext(web3Context);
  const fieldName = useRef();
  const fieldUsername = useRef();
  const fieldPassword = useRef();
  const passwordContext = useContext(passwordManagerContext);
  const inputName = useRef("");
  const inputPassword = useRef("");
  const inputUsername = useRef("");

  function validInput() {
    let valid = true;

    if (
      inputName.current.length > 50 ||
      inputUsername.current.length > 50 ||
      inputPassword.current.length > 50
    ) {
      setOpenSnackBar(true);
      valid = false;
    } else {
      handleCloseSnackBar();
    }
    if (inputName.current === "") {
      setErrorName(true);
      valid = false;
    } else {
      setErrorName(false);
    }

    if (inputPassword.current === "") {
      setErrorPassword(true);
      valid = false;
    } else {
      setErrorPassword(false);
    }

    if (inputUsername.current === "") {
      setErrorUsername(true);
      valid = false;
    } else {
      setErrorUsername(false);
    }

    if (valid) {
      createPassword();
    }
  }

  async function createPassword() {
    setLoading(true);

    let encryptedPassword;
    let encryptedUsername;
    if (passwordContext.ref_doubleSecurity.current) {
      encryptedPassword = await encryptWithFakeAddress(
        web3.ref_address.current,
        passwordContext.ref_doubleSecurity.current,
        inputPassword.current
      );

      encryptedUsername = await encryptWithFakeAddress(
        web3.ref_address.current,
        passwordContext.ref_doubleSecurity.current,
        inputUsername.current
      );
    } else {
      encryptedUsername = inputUsername.current;
      encryptedPassword = inputPassword.current;
    }

    const ethUtil = require("ethereumjs-util");
    const sigUtil = require("@metamask/eth-sig-util");

    const encryptedMessagePassword = ethUtil.bufferToHex(
      Buffer.from(
        JSON.stringify(
          sigUtil.encrypt({
            publicKey: web3.ref_encryptionPubKey.current,
            data: encryptedPassword,
            version: "x25519-xsalsa20-poly1305",
          })
        ),
        "utf8"
      )
    );

    const encryptedMessageUsername = ethUtil.bufferToHex(
      Buffer.from(
        JSON.stringify(
          sigUtil.encrypt({
            publicKey: web3.ref_encryptionPubKey.current,
            data: encryptedUsername,
            version: "x25519-xsalsa20-poly1305",
          })
        ),
        "utf8"
      )
    );

    let contractMaster = new Contract(
      contractAddress,
      abiMaster,
      web3.ref_provider.current.getSigner()
    );
    const fee = await contractMaster.getFee();
    const override = {
      value: fee,
    };

    const contract = new Contract(
      account,
      abi,
      web3.ref_provider.current.getSigner()
    );
    const tx = await contract.addPassword(
      Date.now(),
      inputName.current,
      encryptedMessageUsername.toString(),
      encryptedMessagePassword.toString(),
      override
    );
    await tx.wait();
    setLoading(false);
    handleClose();
    callback();
  }

  function handleClose() {
    setOpen(false);
    setLoading(false);
    setErrorName(false);
    setErrorPassword(false);
    setErrorUsername(false);
    handleCloseSnackBar();
  }

  function handleCloseSnackBar() {
    setOpenSnackBar(false);
  }


  return (
    <div>
      <Button
        size="large"
        onClick={() => {
          setOpen(true);
        }}
        variant="contained"
        className="bg-blue-800 hover:bg-blue-500 mx-2  font-Concert hover:transform hover:scale-105 font-Cairos text-xs"
        startIcon={<AddIcon></AddIcon>}
      >
        New Password
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle className="font-Cairo text-gray-400 p-5 ">
          New Password
          {!loading && (
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
          )}
        </DialogTitle>
        <DialogContent className="flex  items-center justify-center p-5">
          {loading ? (
            <CircularProgress></CircularProgress>
          ) : (
            <form className="flex flex-col">
              <TextField
                required
                autoFocus={true}
                error={errorName}
                id="Name"
                inputRef={fieldName}
                onKeyDown={(e)=> {if(e.key ==='Enter'){
                  console.log("enter");

                  fieldUsername.current.focus()
                }}}
                onChange={(e) => {
                  inputName.current = e.target.value;
                }}
                label="Name"
                className="my-2 text-xs font-Cairo"
                size="small"
                InputProps={{
                  style: {
                    fontSize: 15,
                    borderRadius: 15,
                    background: "#F6F6F6",
                  },
                }}
                InputLabelProps={{ style: { fontSize: 13 } }}
              />

              <TextField
                required
                inputRef={fieldUsername}
                size="small"
                error={errorUsername}
                onChange={(e) => {
                  inputUsername.current = e.target.value;
                }}
                onKeyDown={(e)=> {if(e.key ==='Enter'){
                  fieldPassword.current.focus()
                }}}
                id="username"
                label="Username"
                className="my-2 font-Cairo"
                InputProps={{
                  style: {
                    fontSize: 15,
                    borderRadius: 15,
                    background: "#F6F6F6",
                  },
                }}
                InputLabelProps={{ style: { fontSize: 13 } }}
              />

              <TextField
                required
                size="small"
                inputRef={fieldPassword}
                onKeyDown={(e)=> {if(e.key ==='Enter'){
                  validInput();
                }}}
                error={errorPassword}
                onChange={(e) => {
                  inputPassword.current = e.target.value;
                }}
                id="password"
                label="Password"
                className="my-2 font-Cairo"
                InputProps={{
                  style: {
                    fontSize: 15,
                    borderRadius: 15,
                    background: "#F6F6F6",
                  },
                }}
                InputLabelProps={{ style: { fontSize: 13 } }}
              />
            </form>
          )}
        </DialogContent>
        <DialogActions className="p-2">
          {!loading && (
            <Button
              size="medium"
              variant="contained"
              className="bg-blue-800 hover:bg-blue-500  font-Concert hover:transform hover:scale-105"
              onClick={validInput}
            >
              create
            </Button>
          )}
        </DialogActions>
      </Dialog>
      <Snackbar open={openSnakBar} autoHideDuration={3000} onClose={() =>{setOpenSnackBar(false)}} TransitionComponent={Grow}>
        <Alert
          variant="filled"
          onClose={handleCloseSnackBar}
          severity="error"
          sx={{ width: "100%" }}
        >
          The max lenght of caracters for the name ,the username and the
          password is 50 !
        </Alert>
      </Snackbar>
    </div>
  );
}
