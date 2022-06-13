import React, { useContext, useEffect, useState } from "react";
import web3Context from "../Context/web3Context";
import { Contract } from "ethers";
import abi from "../abi/Account.json";
import { Button, CircularProgress, Card } from "@mui/material";
import ExploreIcon from "@mui/icons-material/Explore";
import PasswordCard from "./PasswordCard";
import NewPasswordButton from "./NewPasswordButton";
import Setting from "../components/Setting/Setting";
import SettingsIcon from "@mui/icons-material/Settings";
export default function PasswordManager({ state_account, setAccount }) {
  const web3 = useContext(web3Context);
  const [listPassword, setListPassword] = useState();
  const [loading, setLoading] = useState(true);
  const [openSetting, setOpenSetting] = useState(false);
  const fetchPassword = async () => {
    const contract = new Contract(
      state_account,
      abi,
      web3.ref_provider.current.getSigner()
    );
    const arr = await contract.getlistPassword();
    setListPassword(arr.filter((e) => Number(e.id) !== 0));
    setLoading(false);
  };

  const deletePassword = async (id) => {
    const contract = new Contract(
      state_account,
      abi,
      web3.ref_provider.current.getSigner()
    );
    const tx = await contract.deletePassword(id);
    await tx.wait();
    fetchPassword();
  };

  useEffect(() => {
    fetchPassword();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="p-5">
      <Card variant="outlined" className="p-5">
        <div className="w-full">
          <Card className="p-5 flex lg:flex-row flex-col justify-center items-center bg-neutral-100 ">
            <span className="font-Concert text-black text-xs lg:text-sm mx-2 my-2">
              {" "}
              Your Contract Account :{" "}
            </span>
            <span className="font-Cairo lg:mx-2 lg:my-0 my-2 text-black text-sm lg:text-sm">
              {state_account}
            </span>

            <a
              href={
                web3.ref_explorer.current + "/address/" + web3.state_address
              }
              target="_blank"
              rel="noreferrer"
              className="no-underline mx-3 flex justify-center items-center my-2"
            >
              <Button
                size="small"
                variant="contained"
                className="bg-sky-400 hover:bg-blue-500 mx-2  font-Concert hover:transform hover:scale-105 font-Cairos text-xs"
                startIcon={<ExploreIcon></ExploreIcon>}
              >
                Explorer
              </Button>
            </a>
          </Card>
        </div>

        {!loading && web3.state_encryptionPubKey && (
          <div className=" pt-3 lg:p-5 flex w-full justify-center lg:justify-start">
            <NewPasswordButton
              callback={fetchPassword}
              account={state_account}
            ></NewPasswordButton>
            <Button
              size="large"
              onClick={() => {
                setOpenSetting(true);
              }}
              variant="contained"
              className="bg-sky-400 hover:bg-blue-500 mx-2  font-Concert hover:transform hover:scale-105 font-Cairos text-xs"
              startIcon={<SettingsIcon></SettingsIcon>}
            >
              Settings
            </Button>
            <Setting open={openSetting} setOpen={setOpenSetting}></Setting>
          </div>
        )}
        <div className="flex flex-col lg:flex-row justify-center w-full items-center flex-wrap my-10">
          {(loading || !web3.state_encryptionPubKey) && (
            <CircularProgress></CircularProgress>
          )}
          {!loading &&
            web3.state_encryptionPubKey &&
            listPassword &&
            listPassword.map((password) => (
              <PasswordCard
                key={password.password}
                password={password}
                deletePassword={deletePassword}
                account={state_account}
                callback={fetchPassword}
              ></PasswordCard>
            ))}
        </div>
      </Card>
    </div>
  );
}
