import React, { useContext, useRef, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
} from "@mui/material";
import web3Context from "../Context/web3Context";
import { CircularProgress } from "@mui/material";
import abi from "../abi/Account.json";
import { Contract } from "ethers";
export default function EditPasswordButton({ password, account, callback,setDecrypted ,decrypted}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputName = useRef(password.name);
  const inputPassword = useRef(decrypted);
  const web3 = useContext(web3Context);
  const modified = useRef(false);


  async function decrypt() {
        if(!decrypted)
        {
            inputPassword.current = await window.ethereum
            .request({
              method: "eth_decrypt",
              params: [password.password, web3.ref_address.current],
            })

            setDecrypted(inputPassword.current)
        }
        else{
          inputPassword.current = decrypted;
        }
       
  }

  async function editPassword() {

    if (modified.current) {

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

      const contract = new Contract(
        account,
        abi,
        web3.ref_provider.current.getSigner()
      );
      const tx = await contract.updatePassword(
        password.id,
        inputName.current,
        encryptedMessage.toString(),
        ""
      );
      await tx.wait();
      setLoading(false);
      setDecrypted(inputPassword.current);
      handleClose();
      callback();
    } else {
      handleClose();
    }
  }

  function handleClose() {
    setOpen(false);
    setLoading(false);
  }
  return (
    <div className="w-full">
      <div
        onClick={async() => {
        await decrypt();
          setOpen(true);
        }}
        className=" bg-sky-400 w-full h-7 shadow shadow-gray-400 mr-1  flex justify-center items-center rounded-lg hover:bg-blue-500  text-white hover:transform hover:scale-105"
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
                defaultValue={password.name}
                onChange={(e) => {
                  inputName.current = e.target.value;
                  modified.current = true;
                }}
                label="Name"
                className="my-2 text-xs"
                size="small"
                InputProps={{ style: { fontSize: 15 } }}
              />
              <TextField
                required
                size="small"
                onChange={(e) => {
                  inputPassword.current = e.target.value;
                  modified.current = true;
                }}
                defaultValue={inputPassword.current}
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
          {!loading && (
            <Button
              size="medium"
              variant="contained"
              className="bg-cyan-400 hover:bg-blue-500 mx-2  font-Concert hover:transform hover:scale-105"
              onClick={editPassword}
            >
              Save
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
