import { Button } from "@mui/material";
import React from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import Subscibe from "../components/Subscibe";
export default function Home() {

  return (
    <div>
      <Header></Header>
      <div className="flex justify-center items-center flex-col w-full h-screen">
      <div className="flex flex-col justify-center items-center w-full h-1/2">
       <span className="text-7xl text-black font-Cairo text-center mb-2">Only you can access your passwords.</span>
       <span className="text-4xl text-black font-Cairo text-center my-5"> First Decentralize Password Manager.</span>
       <Link to="/Dashboard" className="no-underline flex items-center justify-center h-auto">
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
     
      

        <Subscibe></Subscibe>
    </div>
  );
}
