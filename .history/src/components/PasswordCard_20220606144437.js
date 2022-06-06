import React, { useContext, useState } from "react";
import { Button, Card, CardContent } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import EditIcon from "@mui/icons-material/Edit";
import web3Context from "../Context/web3Context";

export default function PasswordCard({ password }) {

    const web3 = useContext(web3Context);
    const [decrypted, setDecrypted] = useState();
    function decrypt()
    {
      window.ethereum
      .request({
        method: 'eth_decrypt',
        params: [password.password, web3.ref_address.current],
      })
      .then((decryptedMessage) => {
        console.log('The decrypted message is:', decryptedMessage)
        setDecrypted(decryptedMessage);
      }
    
      )
      .catch((error) => console.log(error.message));

    }


  const [visibility, setVisibility] = useState(false);
  return (
    <Card variant="outlined" className=" rounded-2xl flex items-end w-44 lg:mx-3 my-3 ">
      <CardContent className="px-5 pt-5 mb-1 rounded-2xl flex flex-col w-full">
        <span className="font-Concert text-blue-400  text-center text-lg mb-3">
          {password.name}
        </span>
        <div className="flex justify-center items-center w-full px-1">
          <div className="flex items-center mt-3 w-3/5">
            <span className="font-Cairotext-black">
              {(visibility && decrypted) ? decrypt : "********"}
            </span>
          </div>
          <div className="flex justify-center items-center mb-1 w-2/5 ">
            <div
              onClick={() => {setVisibility(prev => !prev)
              decrypt()}}
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

        <Button
          size="small"
          variant="contained"
          className="bg-sky-400 hover:bg-blue-500 mt-2 font-Concert hover:transform hover:scale-105 font-Cairos text-xs w-full h-6"
          startIcon={<EditIcon></EditIcon>}
        >
          Edit
        </Button>
      </CardContent>
    </Card>
  );
}
