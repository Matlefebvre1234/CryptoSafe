import React, { useState } from "react";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import Paper from "@mui/material/Paper";
import Metamask from "./Metamask";
import { Drawer, List, ListItem, ListItemButton } from "@mui/material";
import { ReactComponent as NeptuneLogo } from "../images/NeptuneLogo.svg";
import { ReactComponent as NeptuneLogoText } from "../images/LogoTextNeptune.svg";
export default function Header() {
  const [openMenu, setOpenMenu] = useState();

  return (
    <Paper elevation={4} className="">
      <div className="flex lg:justify-around justify-between px- p-5 items-center bg-bleuMarin">
        <div className="flex justify-center items-center">
          <NeptuneLogo className="2xl:w-32 2xl:h-32 xl:w-24 xl:h-24 w-20 h-20 hover:transform hover:scale-110"></NeptuneLogo>
          <NeptuneLogoText className="lg:w-60 lg:h-28 w-40 h-20 hover:transform hover:scale-110"></NeptuneLogoText>
        </div>

        <MenuIcon
          className="lg:hidden text-white"
          onClick={() => setOpenMenu((prev) => !prev)}
        ></MenuIcon>

        {openMenu && (
          <Drawer
            open={openMenu}
            onClose={() => setOpenMenu(false)}
            anchor="right"
          >
            <List>
              <ListItem disablePadding className="my-2">
                <ListItemButton>
                  <Link
                    to="/"
                    className=" font-Cairo text-black  flex justify-end w-full antialiased  no-underline hover:text-cyan-400 hover:transform hover:scale-105  "
                  >
                    Dashboard
                  </Link>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding className="my-2">
                <ListItemButton>
                  <Link
                    to="/allo"
                    className=" font-Cairo text-black flex justify-end w-full antialiased  no-underline hover:text-cyan-400 hover:transform hover:scale-105  "
                  >
                    Pricing
                  </Link>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding className="my-2">
                <ListItemButton>
                  <Link
                    to="/"
                    className="flex justify-end w-full font-Cairo text-black  antialiased no-underline hover:text-cyan-400 hover:transform hover:scale-105 hover: "
                  >
                    Contact us
                  </Link>
                </ListItemButton>
              </ListItem>
              <Metamask className="my-2"></Metamask>
            </List>
          </Drawer>
        )}
        <div className="lg:flex justify-center items-center hidden">
          <div className="flex justify-around mx-2">
            <Link
              to="/"
              className="mx-2 font-Neptune text-white  antialiased 2xl:text-lg  no-underline hover:text-cyan-400 hover:transform hover:scale-105  "
            >
              Dashboard
            </Link>
            <Link
              to="/"
              className="mx-2 font-Neptune text-white antialiased 2xl:text-lg   no-underline hover:text-cyan-400 hover:transform hover:scale-105  "
            >
              Pricing
            </Link>
            <Link
              to="/"
              className="mx-2 font-Neptune text-white antialiased 2xl:text-lg  no-underline hover:text-cyan-400 hover:transform hover:scale-105 hover: "
            >
              Contact us
            </Link>
          </div>
          <Metamask size="large" text="Metamask"></Metamask>
        </div>
      </div>
    </Paper>
  );
}
