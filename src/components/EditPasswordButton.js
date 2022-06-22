import React, { useContext, useRef, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  IconButton,
  Snackbar,
  Alert,
  Grow,
} from "@mui/material";
import web3Context from "../Context/web3Context";
import { CircularProgress } from "@mui/material";
import abi from "../abi/Account.json";
import CloseIcon from "@mui/icons-material/Close";
import { Contract } from "ethers";
import passwordManagerContext from "../Context/PasswordManagerContext";
import { decryptWithFakeAddress } from "../helper/encrypt";
export default function EditPasswordButton({
  password,
  account,
  callback,
  setDecrypted,
  decrypted,
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputName = useRef(password.name);
  const inputPassword = useRef(decrypted.password);
  const inputUsername = useRef(decrypted.username);
  const web3 = useContext(web3Context);
  const passwordContext = useContext(passwordManagerContext);
  const modified = useRef(false);
  const [openSnakBar, setOpenSnackBar] = useState(false);
  const [errorName, setErrorName] = useState(false);
  const [errorUsername, setErrorUsername] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const fieldUsername = useRef();
  const fieldPassword = useRef();
  async function decrypt() {
    if (decrypted.username === "" || decrypted.password === "") {
      let lastDecryptionPassword;
      let lastDecryptionUsername;

      inputPassword.current = await window.ethereum.request({
        method: "eth_decrypt",
        params: [password.password, web3.ref_address.current],
      });

      inputUsername.current = await window.ethereum.request({
        method: "eth_decrypt",
        params: [password.username, web3.ref_address.current],
      });
      if (passwordContext.ref_doubleSecurity.current) {
        lastDecryptionPassword = await decryptWithFakeAddress(
          web3.ref_address.current,
          passwordContext.ref_doubleSecurity.current,
          inputPassword.current
        );
        lastDecryptionUsername = await decryptWithFakeAddress(
          web3.ref_address.current,
          passwordContext.ref_doubleSecurity.current,
          inputUsername.current
        );

        inputUsername.current = lastDecryptionUsername;
        inputPassword.current = lastDecryptionPassword;
      } else {
        lastDecryptionPassword = inputPassword.current;
        lastDecryptionUsername = inputUsername.current;
      }

      setDecrypted({
        username: lastDecryptionUsername,
        password: lastDecryptionPassword,
      });
    } else {
      inputPassword.current = decrypted.password;
      inputUsername.current = decrypted.username;
    }
  }

  async function editPassword() {
    if (modified.current) {
      setLoading(true);
      const ethUtil = require("ethereumjs-util");
      const sigUtil = require("@metamask/eth-sig-util");

      const encryptedPassword = ethUtil.bufferToHex(
        Buffer.from(
          JSON.stringify(
            sigUtil.encrypt({
              publicKey: web3.ref_encryptionPubKey.current,
              data: inputPassword.current,
              version: "x25519-xsalsa20-poly1305",
            })
          ),
          "utf8"
        )
      );

      const encryptedUsername = ethUtil.bufferToHex(
        Buffer.from(
          JSON.stringify(
            sigUtil.encrypt({
              publicKey: web3.ref_encryptionPubKey.current,
              data: inputUsername.current,
              version: "x25519-xsalsa20-poly1305",
            })
          ),
          "utf8"
        )
      );

      const contract = new Contract(
        account,
        abi,
        web3.ref_provider.current.getSigner()
      );
      const tx = await contract.updatePassword(
        password.id,
        inputName.current,
        encryptedUsername.toString(),
        encryptedPassword.toString()
      );
      await tx.wait();
      setLoading(false);
      setDecrypted({
        username: inputUsername.current,
        password: inputPassword.current,
      });
      handleClose();
      callback();
    } else {
      handleClose();
    }
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
      editPassword();
    }
  }
  return (
    <div className="w-full">
      <div
        onClick={async () => {
          await decrypt();
          setOpen(true);
        }}
        className=" bg-bleuMarin w-full h-7 shadow shadow-gray-400 mr-1  flex justify-center items-center rounded-lg hover:bg-blue-500  text-white hover:transform hover:scale-105"
      >
        <EditIcon className="text-lg"></EditIcon>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle className="font-Cairo text-gray-400 p-5 ">
          Edit Password
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
            <div className="flex flex-col">
              <TextField
                required
                error={errorName}
                size="small"
                id="Name"
                defaultValue={password.name}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    fieldUsername.current.focus();
                  }
                }}
                onChange={(e) => {
                  inputName.current = e.target.value;
                  modified.current = true;
                }}
                label="Name"
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
                inputRef={fieldUsername}
                error={errorUsername}
                onChange={(e) => {
                  inputUsername.current = e.target.value;
                  modified.current = true;
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    fieldPassword.current.focus();
                  }
                }}
                defaultValue={inputUsername.current}
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
                error={errorPassword}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    validInput();
                  }
                }}
                onChange={(e) => {
                  inputPassword.current = e.target.value;
                  modified.current = true;
                }}
                defaultValue={inputPassword.current}
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
            </div>
          )}
        </DialogContent>
        <DialogActions className="p-2">
          {!loading && (
            <Button
              size="medium"
              variant="contained"
              className="bg-bleuMarin hover:bg-blue-500  font-Neptune hover:transform hover:scale-105"
              onClick={validInput}
            >
              Save
            </Button>
          )}
        </DialogActions>
      </Dialog>
      <Snackbar
        open={openSnakBar}
        autoHideDuration={3000}
        onClose={() => {
          setOpenSnackBar(false);
        }}
        TransitionComponent={Grow}
      >
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
