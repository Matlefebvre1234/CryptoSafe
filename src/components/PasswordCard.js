import React, { useState } from "react";
import { Button, Card } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
export default function PasswordCard({ password }) {
  const [visibility, setVisibility] = useState(false);
  return (
    <Card variant="outlined" className="p-5 rounded-2xl">
      <div className="flex flex-col justify-center items-center">
        <span className="font-Cairo text-black text-lg">{password.name}</span>
        <div className="flex justify-center items-center">
          <span className="font-Cairo text-black">
            {visibility ? password.password : "********"}
          </span>

          <Button
            size="small"
            variant="contained"
            className="bg-sky-400 hover:bg-blue-500 mx-2  font-Concert hover:transform hover:scale-105 font-Cairos text-xs"
            startIcon={
              visibility ? (
                <VisibilityOffIcon></VisibilityOffIcon>
              ) : (
                <VisibilityIcon></VisibilityIcon>
              )
            }
            onClick={() => {
              setVisibility((prev) => !prev);
            }}
          ></Button>
        </div>
      </div>
    </Card>
  );
}
