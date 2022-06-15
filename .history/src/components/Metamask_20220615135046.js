import React, { useRef } from "react";
import { useEffect, useContext } from "react";
import Button from "@mui/material/Button";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Card,
  IconButton
} from "@mui/material";
import ExploreIcon from "@mui/icons-material/Explore";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { ethers } from "ethers";
import web3Context from "../Context/web3Context";
import { ReactComponent as MetamaskSvg } from "../images/metamask.svg";
import { getExplorer } from "../helper/getExplorer";
import CloseIcon from '@mui/icons-material/Close';

export default function Metamask({size,text}) {
  const web3 = useContext(web3Context);
  const [open, setOpen] = React.useState(false);

  const chainId = useRef("");

  useEffect(() => {
    function init() {
      if (window.ethereum) {
        web3.ref_web3Enable.current = true;
        web3.setWeb3Enable(true);
        web3.ref_provider.current = new ethers.providers.Web3Provider(
          window.ethereum
        );
        web3.setProvider( web3.ref_provider.current);
      } else {
        web3.ref_web3Enable.current = false;
        web3.setWeb3Enable(false);

        web3.ref_provider.current = null;
        web3.setProvider(null);
      }
    }
    init();
    // eslint-disable-next-line
  }, []);

  async function askPubKey()
  {
   await window.ethereum
    .request({
      method: 'eth_getEncryptionPublicKey',
      params: [ web3.ref_address.current], // you must have access to the specified account
    })
    .then((result) => {
      web3.ref_encryptionPubKey.current = result;
      web3.setEncryptionPubKey(result);
    })
    .catch((error) => {
      if (error.code === 4001) {
        // EIP-1193 userRejectedRequest error
        console.log("We can't encrypt anything without the key.");
      } else {
        console.error(error);
      }
    });

  }

  async function Connect() {

    if (web3.ref_web3Enable.current) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      web3.ref_address.current = accounts[0];
      web3.setAddress(accounts[0]);
      web3.ref_connected.current = true;
      web3.setConnected(true);
      chainId.current = await (
        await web3.ref_provider.current.getNetwork()
      ).chainId;
     web3.ref_explorer.current = getExplorer("0x" + chainId.current.toString(16));
     askPubKey();
    } else {
      handleClickOpen();
    }
  }

  function disconnect(){
    if(web3.ref_web3Enable.current && web3.ref_connected.current)
    {
        web3.ref_connected.current = false;
        web3.setConnected(false);
        web3.ref_address.current = '';
        web3.setAddress('');
        handleClose();
    }
  }
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        size={size}
        variant="contained"
        className="bg-cyan-300 hover:bg-blue-500 mx-2  font-Concert hover:transform hover:scale-105"
        startIcon={<AccountBalanceWalletIcon ></AccountBalanceWalletIcon>}
        onClick={web3.state_address ? handleClickOpen : Connect}
      >
        {web3.state_address
          ? web3.state_address.substring(0, 5) +
            "..." +
            web3.state_address.substring(38)
          : text}
      </Button>

      {web3.state_web3Enable && (
        <Dialog
          open={open}
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle className="text-gray-500 font-Cairo">
            {"Account"}
            <IconButton
          aria-label="close"
          onClick={() => setOpen(false)}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
          </DialogTitle>
          <DialogContent>
            <Card variant="outlined" className="p-5 rounded-lg">
              <span className="text-gray-500 font-Cairos">
                {web3.state_address}
              </span>
              <a
                href={web3.ref_explorer.current + "/address/" + web3.state_address}
                target="_blank"
                rel="noreferrer"
                className="no-underline"
              >
                <div className="flex p-2 hover:text-cyan-400 text-blue-400">
                  <ExploreIcon></ExploreIcon>
                  <span className=" font-Cairos mx-1">View on explorer</span>
                </div>
              </a>
            </Card>
          </DialogContent>
        </Dialog>
      )}

      {!web3.state_web3Enable && (
        <Dialog
          open={open}
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle className="font-Cairo text-gray-400 ">Error
          <IconButton
          aria-label="close"
          onClick={() => setOpen(false)}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton> </DialogTitle>
          <DialogContent>
            <div className="flex flex-col p-2 justify-center items-center text-gray-400 font-Cairo ">
              <span className="text-center my-10 font-Cairo">
                Please Install{" "}
                <a
                  className="underline text-cyan-400 font-Concert hover:text-blue-400 hover:transfo"
                  href="https://metamask.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Metamask extension
                </a>{" "}
                or any other wallet to continue
              </span>
              <a
                className="w-full h-full flex justify-center"
                href="https://metamask.io/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MetamaskSvg className="w-3/4 h-3/4"></MetamaskSvg>
              </a>
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              size="large"
              variant="contained"
              className="bg-cyan-400 hover:bg-blue-500 mx-2  font-Concert hover:transform hover:scale-105"
              onClick={handleClose}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
}
