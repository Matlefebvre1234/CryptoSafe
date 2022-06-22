import React, { useContext, useState } from "react";
import {
  Card,
  CardContent,
  Tooltip,
  Snackbar,
  Alert,
  Grow,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import web3Context from "../Context/web3Context";
import DeleteIcon from "@mui/icons-material/Delete";
import EditPasswordButton from "./EditPasswordButton";
import { decryptWithFakeAddress } from "../helper/encrypt";
import passwordManagerContext from "../Context/PasswordManagerContext";
import Zoom from "@mui/material/Zoom";
export default function PasswordCard({
  password,
  deletePassword,
  account,
  callback,
}) {
  const web3 = useContext(web3Context);
  const passwordContext = useContext(passwordManagerContext);
  const [decrypted, setDecrypted] = useState({ username: "", password: "" });
  const [copySnackBar, setCopySnackbar] = useState(false);
  const [tooltipUsername, setTooltipsUsername] = useState(false);
  const [tooltipPassword, setTooltipsPassword] = useState(false);
  function decrypt() {
    if (decrypted.username === "" || decrypted.password === "") {
      window.ethereum
        .request({
          method: "eth_decrypt",
          params: [password.password, web3.ref_address.current],
        })
        .then(async (decryptedMessage) => {
          window.ethereum
            .request({
              method: "eth_decrypt",
              params: [password.username, web3.ref_address.current],
            })
            .then(async (decryptedUsername) => {
              let lastDecryptionUsername;

              if (passwordContext.ref_doubleSecurity.current) {
                lastDecryptionUsername = await decryptWithFakeAddress(
                  web3.ref_address.current,
                  passwordContext.ref_doubleSecurity.current,
                  decryptedUsername
                );
              } else {
                lastDecryptionUsername = decryptedUsername;
              }

              setDecrypted((prev) => {
                let obj = { ...prev };
                obj.username = lastDecryptionUsername;
                console.log(obj);
                return obj;
              });
              setVisibility(true);
            });
          let lastDecryption;

          if (passwordContext.ref_doubleSecurity.current) {
            lastDecryption = await decryptWithFakeAddress(
              web3.ref_address.current,
              passwordContext.ref_doubleSecurity.current,
              decryptedMessage
            );
          } else {
            lastDecryption = decryptedMessage;
          }

          setDecrypted((prev) => {
            let obj = { ...prev };
            obj.password = lastDecryption;
            return obj;
          });
        })
        .catch((error) => console.log(error.message));
    }
  }

  const [visibility, setVisibility] = useState(false);

  function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
  }

  return (
    <>
      <Card
        variant="outlined"
        className=" rounded-2xl flex items-end w-44 lg:mx-3 my-3 "
      >
        <CardContent className="px-5 pt-5 mb-1 rounded-2xl flex flex-col w-full">
          <span className="font-Concert text-blue-800  text-center text-lg mb-3">
            {password.name}
          </span>
          <div className="flex justify-center items-center w-full px-1">
            <div className="flex items-center mt-3 w-3/5">
              <Tooltip
                open={tooltipUsername}
                title="Copy"
                className={
                  visibility && decrypted
                    ? "hover:text-cyan-400 transform hover:scale-105 cursor-pointer"
                    : ""
                }
                onClose={() => {
                  setTooltipsUsername(false);
                }}
                onOpen={() => {
                  if (visibility && decrypted) {
                    setTooltipsUsername(true);
                  }
                }}
                arrow
                placement="top"
                TransitionComponent={Zoom}
              >
                <span
                  className={"font-Cairotext-black"}
                  onClick={() => {
                    if (visibility && decrypted) {
                      copyToClipboard(decrypted.username);
                      setCopySnackbar(true);
                    }
                  }}
                >
                  {visibility && decrypted ? decrypted.username : "********"}
                </span>
              </Tooltip>
            </div>
            <div className="flex justify-center items-center mb-1 w-2/5 ">
              <div
                onClick={() => {
                  if (!visibility) decrypt();
                  if (
                    visibility ||
                    decrypted.username !== "" ||
                    decrypted.password !== ""
                  )
                    setVisibility((prev) => !prev);
                }}
                className=" bg-bleuMarin w-7 h-7 shadow shadow-gray-400  flex justify-center items-center rounded-lg hover:bg-blue-500  text-white hover:transform hover:scale-105"
              >
                {visibility ? (
                  <VisibilityOffIcon className="text-lg"></VisibilityOffIcon>
                ) : (
                  <VisibilityIcon className="text-lg"></VisibilityIcon>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center mt-3 w-3/5 px-1">
            <Tooltip
              open={tooltipPassword}
              title="Copy"
              className={
                visibility && decrypted
                  ? "hover:text-cyan-400 transform hover:scale-105 cursor-pointer"
                  : ""
              }
              onClose={() => {
                setTooltipsPassword(false);
              }}
              onOpen={() => {
                if (visibility && decrypted) {
                  setTooltipsPassword(true);
                }
              }}
              arrow
              placement="top"
              TransitionComponent={Zoom}
            >
              <span
                className={"font-Cairotext-black"}
                onClick={() => {
                  if (visibility && decrypted) {
                    copyToClipboard(decrypted.password);
                    setCopySnackbar(true);
                  }
                }}
              >
                {visibility && decrypted ? decrypted.password : "********"}
              </span>
            </Tooltip>
          </div>
          <div className="flex justify-between items-center w-full mt-3">
            <EditPasswordButton
              password={password}
              account={account}
              callback={callback}
              setDecrypted={(password) => setDecrypted(password)}
              decrypted={decrypted}
            ></EditPasswordButton>
            <div
              onClick={() => deletePassword(password.id)}
              className=" bg-bleuMarin w-full h-7 shadow shadow-gray-400 ml-1  flex justify-center items-center rounded-lg hover:bg-blue-500  text-white hover:transform hover:scale-105"
            >
              <DeleteIcon className="text-lg"></DeleteIcon>
            </div>
          </div>
        </CardContent>
      </Card>
      <Snackbar
        open={copySnackBar}
        autoHideDuration={3000}
        onClose={() => {
          setCopySnackbar(false);
        }}
        TransitionComponent={Grow}
      >
        <Alert
          variant="filled"
          onClose={() => {
            setCopySnackbar(false);
          }}
          severity="info"
          sx={{ width: "100%" }}
        >
          Copied !
        </Alert>
      </Snackbar>
    </>
  );
}
