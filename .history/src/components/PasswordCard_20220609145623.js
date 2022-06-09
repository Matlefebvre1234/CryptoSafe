import React, { useContext, useState } from "react";
import { Card, CardContent } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import web3Context from "../Context/web3Context";
import DeleteIcon from "@mui/icons-material/Delete";
import EditPasswordButton from "./EditPasswordButton";
import { decryptWithFakeAddress } from "../helper/encrypt";
import passwordManagerContext from "../Context/PasswordManagerContext";
export default function PasswordCard({ password, deletePassword,account,callback }) {
  const web3 = useContext(web3Context);
  const passwordContext = useContext(passwordManagerContext)
  const [decrypted, setDecrypted] = useState();

  function decrypt() {
    
    if (!decrypted) {
      window.ethereum
        .request({
          method: "eth_decrypt",
          params: [password.password, web3.ref_address.current],
        })
        .then(async(decryptedMessage) => {

          let lastDecryption
          if(passwordContext.ref_doubleSecurity.current) {
             lastDecryption = await decryptWithFakeAddress(web3.ref_address.current,passwordContext.ref_doubleSecurity.current,decryptedMessage);
          }
          else{
            lastDecryption = decryptedMessage;
          }

          setDecrypted(lastDecryption);
        })
        .catch((error) => console.log(error.message));
    }
  }

  const [visibility, setVisibility] = useState(false);
  return (
    <Card
      variant="outlined"
      className=" rounded-2xl flex items-end w-44 lg:mx-3 my-3 "
    >
      <CardContent className="px-5 pt-5 mb-1 rounded-2xl flex flex-col w-full">
        <span className="font-Concert text-blue-400  text-center text-lg mb-3">
          {password.name}
        </span>
        <div className="flex justify-center items-center w-full px-1">
          <div className="flex items-center mt-3 w-3/5">
            <span className="font-Cairotext-black">
              {visibility && decrypted ? decrypted : "********"}
            </span>
          </div>
          <div className="flex justify-center items-center mb-1 w-2/5 ">
            <div
              onClick={() => {
                setVisibility((prev) => !prev);
                if (!visibility) decrypt();
              }}
              className=" bg-sky-400 w-7 h-7 shadow shadow-gray-400  flex justify-center items-center rounded-lg hover:bg-blue-500  text-white hover:transform hover:scale-105"
            >
              {visibility ? (
                <VisibilityOffIcon className="text-lg"></VisibilityOffIcon>
              ) : (
                <VisibilityIcon className="text-lg"></VisibilityIcon>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center w-full mt-3">
          <EditPasswordButton password={password} account={account} callback={callback} setDecrypted={(password)=> setDecrypted(password)} decrypted={decrypted} ></EditPasswordButton>
          <div
            onClick={() => deletePassword(password.id)}
            className=" bg-sky-400 w-full h-7 shadow shadow-gray-400 ml-1  flex justify-center items-center rounded-lg hover:bg-blue-500  text-white hover:transform hover:scale-105"
          >
            <DeleteIcon className="text-lg"></DeleteIcon>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
