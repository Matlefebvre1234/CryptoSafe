import React, { useContext, useState, useRef } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  TextField,
  InputAdornment,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import web3Context from "../Context/web3Context";
import Metamask from "./Metamask";
import { Contract } from "ethers";
import abi from "../abi/Master.json";
import abiAccount from "../abi/Account.json";
import contractAddress from "../abi/contractAddress";
import CircularProgress from "@mui/material/CircularProgress";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { ethers } from "ethers";
import passwordManagerContext from "../Context/PasswordManagerContext";

export default function CreateAccount({
  callback,
  setHashDoubleSecurityy,
  setStateDoubleSecurity,
}) {
  const passwordManager = useContext(passwordManagerContext);
  const web3 = useContext(web3Context);
  const [loading, setLoading] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const inputPassword = useRef("");
  const [open, setOpen] = useState(false);
  const [checkboxState, setCheckBoxState] = useState(false);

  async function createAccount() {
    setHashDoubleSecurityy("////");
    let signer = web3.ref_provider.current.getSigner();
    let contract = new Contract(contractAddress, abi, signer);
    setLoading(true);
    const tx = await contract.createAccount(web3.ref_address.current);
    await tx.wait();
    callback().then(async (test) => {
      if (checkboxState) {
        let contractAccount = new Contract(
          passwordManager.ref_account.current,
          abiAccount,
          signer
        );
        let hash = ethers.utils.id(
          web3.ref_address.current + inputPassword.current
        );
        const wallet = new ethers.Wallet(hash);
        let tx2 = await contractAccount.setHashDoubleSecurity(wallet.address);
        await tx2;
        passwordManager.ref_doubleSecurity.current = inputPassword.current;
        setHashDoubleSecurityy(wallet.address);
        setStateDoubleSecurity(inputPassword.current);
      }

      handleClose();
    });
  }

  function handleClose() {
    setOpen(false);
    setLoading(false);
  }

  function validInput() {
    let valid = true;

    if (inputPassword.current === "") {
      setErrorPassword(true);
      valid = false;
    } else {
      setErrorPassword(false);
    }

    if (valid || !checkboxState) {
      createAccount();
    }
  }
  return (
    <div className="h-full w-full flex justify-center items-center">
      {loading ? (
        <CircularProgress></CircularProgress>
      ) : (
        <div>
          {web3.state_connected ? (
            <Button
              size="large"
              variant="contained"
              className="bg-bleuMarin hover:bg-blue-500 mx-2  font-Concert hover:transform hover:scale-105"
              startIcon={<GroupAddIcon></GroupAddIcon>}
              onClick={() => setOpen(true)}
            >
              Initialize Account
            </Button>
          ) : (
            <Metamask size="large" text="Connect Wallet To Continue"></Metamask>
          )}
        </div>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle className="font-Cairo text-gray-400 p-5 ">
          Double Security
          {!loading && (
            <IconButton
              aria-label="close"
              onClick={handleClose}
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
        <DialogContent className="flex flex-col items-center justify-center  p-5">
          {loading && <CircularProgress className="mb-8"></CircularProgress>}
          {!loading && (
            <div className="flex flex-col">
              <p className="text-justify mt-10 font-Cairo leading-normal">
                Do you want to enable Double security feature ? Double security
                is a unique password that you need in addition to your wallet to
                gain access to the account. It help protect your data, if in a
                rare case someone steal your private key.The password will be
                use to encrypt your data a second time to make sure only you can
                access your passwords. This feature can be activate later, but a
                reset of the account will be necessary, so it's better now then
                later.
              </p>

              <FormControlLabel
                className={checkboxState ? "mt-2" : "my-8"}
                control={
                  <Checkbox
                    checked={checkboxState}
                    onClick={() => {
                      setCheckBoxState((prev) => !prev);
                    }}
                  ></Checkbox>
                }
                label="Enable Double security"
              ></FormControlLabel>
              {checkboxState && (
                <div className="flex flex-col justify-center items-center">
                  {" "}
                  <span className="font-Cairo text-sm">
                    Don't lose this password because you want be able to gain
                    acess to your account
                  </span>{" "}
                  <TextField
                    required
                    size="small"
                    error={errorPassword}
                    onChange={(e) => {
                      inputPassword.current = e.target.value;
                    }}
                    id="password"
                    label="Password"
                    type={passwordVisibility ? "text" : "password"}
                    className="mt-2 mb-14 font-Cairo w-52"
                    InputProps={{
                      style: {
                        fontSize: 15,
                        borderRadius: 15,
                        background: "#F6F6F6",
                      },
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => {
                              setPasswordVisibility((prev) => !prev);
                            }}
                          >
                            {passwordVisibility ? (
                              <VisibilityOff></VisibilityOff>
                            ) : (
                              <Visibility></Visibility>
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    InputLabelProps={{ style: { fontSize: 13 } }}
                  />{" "}
                </div>
              )}
            </div>
          )}

          {!loading && (
            <Button
              size="medium"
              variant="contained"
              className="bg-bleuMarin hover:bg-blue-400 m-2 w-3/4  font-Concert hover:transform hover:scale-105"
              onClick={validInput}
            >
              Create Account
            </Button>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
