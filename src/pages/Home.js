import { Button } from "@mui/material";
import React, { useEffect } from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";
export default function Home() {

  return (
    <div>
      <Header></Header>

      <div className="flex justify-center item-center w-screen">
        <Link to="/Dashboard" className="no-underline flex items-center justify-center h-auto">
          <Button
            size="medium"
            variant="contained"
            className="bg-cyan-400 hover:bg-blue-500 m-2  font-Neptune hover:transform hover:scale-105"
          >
            Launch App
          </Button>
        
     
        </Link>
        <div class="ml-embedded" data-form="OkliBK"></div>
      </div>
    </div>
  );
}
