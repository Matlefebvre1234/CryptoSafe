import { Button } from "@mui/material";
import React from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import Subscibe from "../components/Subscibe";
import { ReactComponent as NeptuneLogo } from "../images/NeptuneLogo.svg";
import LocalPoliceIcon from "@mui/icons-material/LocalPolice";
export default function Home() {
  return (
    <div>
      <Header></Header>
      <div className="flex justify-center bg-black items-center flex-col w-full h-[650px] mb-14">
        <div className="flex flex-col justify-center items-center w-full h-1/2">
          <span className="text-5xl text-cyan-400 text-bleu-800 font-Neptune text-center mb-2">
            Only you can access your passwords.
          </span>
          <span className="text-4xl text-white font-Cairo text-center my-5">
            {" "}
            First Decentralize Password Manager.
          </span>
          <Link
            to="/Dashboard"
            className="no-underline flex items-center justify-center h-auto"
          >
            <Button
              size="medium"
              variant="contained"
              className="bg-cyan-400 hover:bg-blue-500 m-2  font-Neptune hover:transform hover:scale-105"
            >
              Launch App
            </Button>
          </Link>
        </div>
      </div>
      <div className="flex flex-col xl:flex-row p-5 justify-center items-center mb-32">
        <NeptuneLogo className="w-72 h-72 mx-28"></NeptuneLogo>
        <div className="flex flex-col item-center justify-center">
          <p className="text-black font-Neptune text-3xl text-center">Why choose Neptune ?</p>
          <div className="flex items-center  text-lg font-Cairo my-4">
            <LocalPoliceIcon className="text-cyan-400 mr-4"></LocalPoliceIcon>
            <span><span className="font-Concert mr-1">Decentralize: </span> Your data
            can't be lost !</span>
          </div>
          <div className="flex items-center  text-lg font-Cairo my-4">
            <LocalPoliceIcon className="text-cyan-400 mr-4"></LocalPoliceIcon>
            <span><span className="font-Concert mr-1">Secure: </span>   No one... Even us can't decrypt your data!</span>
          </div>

          <div className="flex items-center  text-lg font-Cairo my-4">
            <LocalPoliceIcon className="text-cyan-400 mr-4"></LocalPoliceIcon>
            <span><span className="font-Concert mr-1">Almost Free: </span> Cost pennies to use !</span>
          </div>
          <div className="flex items-center  text-lg font-Cairo my-4">
            <LocalPoliceIcon className="text-cyan-400 mr-4"></LocalPoliceIcon>
            <span><span className="font-Concert mr-1">Almost Free: </span> Cost pennies to use !</span>
          </div>
          <span className="flex items-center  text-lg font-Cairo my-4">
            <LocalPoliceIcon className="text-cyan-400 mr-4"></LocalPoliceIcon>
            <span className="font-Concert">Easy to use: </span> 
            Connect your wallet and enjoy in a few click !
          </span>
        </div>
      </div>

      <div className="bg-bleuMarin w-full h-[300px] flex justify-center items-center">
        <Subscibe></Subscibe>
      </div>
    </div>
  );
}
