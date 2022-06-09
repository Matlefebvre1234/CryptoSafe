import React, { useContext, useState } from "react";
import { Button } from "@mui/material";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import web3Context from "../Context/web3Context";
import Metamask from "./Metamask";
import { Contract } from "ethers";
import abi from "../abi/Master.json";
import contractAddress from "../abi/contractAddress";
import CircularProgress from "@mui/material/CircularProgress";
export default function CreateAccount({ callback }) {
  const web3 = useContext(web3Context);
  const [loading, setLoading] = useState(false);
  async function createAccount() {
    let signer = web3.ref_provider.current.getSigner();
    let contract = new Contract(contractAddress, abi, signer);
    setLoading(true);
    const tx = await contract.createAccount(web3.ref_address.current,false);
    let receipt = await tx.wait();
    console.log(receipt);
    setLoading(false);
    callback();
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
              className="bg-cyan-300 hover:bg-blue-500 mx-2  font-Concert hover:transform hover:scale-105"
              startIcon={<GroupAddIcon></GroupAddIcon>}
              onClick={createAccount}
            >
              Initialize Account
            </Button>
          ) : (
            <Metamask size="large" text="Connect Wallet To Continue"></Metamask>
          )}
        </div>
      )}
    </div>
  );
}
