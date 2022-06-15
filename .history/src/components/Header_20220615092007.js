import React, { useState } from "react";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import Paper from "@mui/material/Paper";
import Metamask from "./Metamask";
import { Drawer, List, ListItem, ListItemButton } from "@mui/material";
import { ReactComponent as NeptuneLogo } from "../images/NeptuneLogo.svg";
export default function Header() {
  const [openMenu, setOpenMenu] = useState();

  return (
    <Paper elevation={4} className="">
      <div className="flex lg:justify-around justify-between px- p-5 items-center bg-neutral-900">
        <div className="flex justify-center items-center">
          <NeptuneLogo className="2xlg:w-32 2xlg:h-32 xlg:w-24 xlg:h-24 w-20 h-20 hover:transform hover:scale-110"></NeptuneLogo>
          <span className=" text-xl 2xlg:text-4xl lg:text-2xl text-cyan-300  font-Concert hover:text-blue-400 hover:transform hover:scale-105 antialiased">
            Neptune
          </span>
        </div>

        <MenuIcon
          className="lg:hidden text-black"
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
              className="mx-2 font-Cairo text-black  antialiased 2xl:text-xl  no-underline hover:text-cyan-400 hover:transform hover:scale-105  "
            >
              Dashboard
            </Link>
            <Link
              to="/"
              className="mx-2 font-Cairo text-black antialiased 2xl:text-xl   no-underline hover:text-cyan-400 hover:transform hover:scale-105  "
            >
              Pricing
            </Link>
            <Link
              to="/"
              className="mx-2 font-Cairo text-black antialiased 2xl:text-xl  no-underline hover:text-cyan-400 hover:transform hover:scale-105 hover: "
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
