import React from "react";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Metamask from "./Metamask";
export default function Header() {
  return (
    <Paper elevation={4}>
      <div className="flex justify-around mx-auto p-5 items-center">
        <span className="text-4xl text-cyan-400  font-Concert hover:text-blue-400 hover:transform hover:scale-105 antialiased">
          CryptoSafe
        </span>
        <div className="flex justify-center items-center">
          <div className="flex justify-around mx-2">
            <Link
              to="/"
              className="mx-2 font-Concert text-cyan-400 antialiased text-lg no-underline hover:text-blue-400 hover:transform hover:scale-105  "
            >
              Dashboard
            </Link>
            <Link
              to="/"
              className="mx-2 font-Concert text-cyan-400 antialiased text-lg no-underline hover:text-blue-400 hover:transform hover:scale-105  "
            >
              Pricing
            </Link>
            <Link
              to="/"
              className="mx-2 font-Concert text-cyan-400  text-lg antialiased no-underline hover:text-blue-400 hover:transform hover:scale-105 hover: "
            >
              Contact us
            </Link>
          </div>
          <Metamask></Metamask>
        </div>
      </div>
    </Paper>
  );
}
