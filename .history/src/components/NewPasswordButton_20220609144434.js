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
import abiMaster from "../abi/Master.json";
import { encryptWithFakeAddress} from "../helper/encrypt";
import contractAddress from "../abi/contractAddress";
export default function NewPasswordButton({ callback, account }) {
  const [open, setOpen] = useState(false);
  const [errorName,setErrorName] = useState(false);
  const [errorPassword,setErrorPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const web3 = useContext(web3Context);

  const inputName = useRef('');
  const inputPassword = useRef('');


  function validInput()
  {
    let valid = true;
    if(inputName.current === '')
    {
      setErrorName(true);
      valid = false;
    }else{
      setErrorName(false);
    }

    if(inputPassword.current ==='')
    {
      setErrorPassword(true);
      valid  = false;
    }else{
      setErrorPassword(false);
    }

    if(valid)
    {
      createPassword();
    }


  }

  async function createPassword() {
    setLoading(true);


    let encrypted = await encryptWithFakeAddress(web3.ref_address.current,"doublesecurity",inputPassword.current);

    console.log('encrypted ' ,encrypted)
    const ethUtil = require("ethereumjs-util");
    const sigUtil = require("@metamask/eth-sig-util");

    const encryptedMessage = ethUtil.bufferToHex(
      Buffer.from(
        JSON.stringify(
          sigUtil.encrypt({
            publicKey: web3.ref_encryptionPubKey.current,
            data: encrypted,
            version: "x25519-xsalsa20-poly1305",
          })
        ),
        "utf8"
      )
    );

    console.log('encryptMetamask ' ,encryptedMessage);

    let contractMaster = new Contract(contractAddress,abiMaster,web3.ref_provider.current.getSigner());
    const fee = await contractMaster.getFee();
    const override = {
      value: fee
  };

    const contract = new Contract(
      account,
      abi,
      web3.ref_provider.current.getSigner()
    );
    const tx = await contract.addPassword(
      Date.now(),
      inputName.current,
      encryptedMessage.toString(),
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
                error={errorName}
                variant="filled"
                id="Name"
                onChange={(e) => {
                  inputName.current = e.target.value;
                }}
                label="Name"
        
                className="my-2 text-xs"
                size="small"
                InputProps={{ style: { fontSize: 15 } }}
              />
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
        </DialogContent>
        <DialogActions className="p-5">
         {!loading && <Button
            size="medium"
            variant="contained"
            className="bg-cyan-400 hover:bg-blue-500 mx-2  font-Concert hover:transform hover:scale-105"
            onClick={validInput}
          >
            create
          </Button>}
        </DialogActions>
      </Dialog>
    </div>
  );
}
