import React, { useContext, useState, useRef } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  CircularProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import web3Context from "../Context/web3Context";
import { Contract } from "ethers";
import abi from "../abi/Account.json";
import { ethers } from "ethers";

export default function NewPasswordButton({ callback, account }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const web3 = useContext(web3Context);

  const inputName = useRef();
  const inputPassword = useRef();

  async function createPassword() {
    setLoading(true);

    const ethUtil = require("ethereumjs-util");
    const sigUtil = require("@metamask/eth-sig-util");

    const encryptedMessage = ethUtil.bufferToHex(
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

    console.log("encrypt message = ", encryptedMessage.toString());


    const override = {
      value: ethers.utils.parseEther("0.05")
  };

    const contract = new Contract(
      account,
      abi,
      web3.ref_provider.current.getSigner()
    );
    console.log(inputName.current);
    console.log(inputName.current.toString());
    const tx = await contract.addPassword(
      Date.now(),
      inputName.current,
      encryptedMessage.toString(),
      override
    );
    await tx.wait();
    setLoading(false);
    handleClose();
  }

  function handleClose() {
    setOpen(false);
  }
  return (
    <div>
      <Button
        size="large"
        onClick={() => {
          setOpen(true);
        }}
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
        <DialogTitle className="font-Cairo text-gray-400 p-5 ">
          New Password
        </DialogTitle>
        <DialogContent className="flex  items-center justify-center p-5">
          {loading ? (
            <CircularProgress></CircularProgress>
          ) : (
            <div className="flex flex-col">
        
              <TextField
                required
                variant="filled"
                id="Name"
                onChange={(e) => {
                  inputName.current = e.target.value;
                }}
                label="Name"
                defaultValue="Name"
                className="my-2 text-xs"
                size="small"
                InputProps={{ style: { fontSize: 15 } }}
              />
              <TextField
                required
                size="small"
                onChange={(e) => {
                  inputPassword.current = e.target.value;
                }}
                variant="filled"
                id="password"
                label="Password"
                defaultValue="*********"
                className="my-2"
                InputProps={{ style: { fontSize: 15 } }}
              />
            </div>
          )}
        </DialogContent>
        <DialogActions className="p-5">
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
  );
}
