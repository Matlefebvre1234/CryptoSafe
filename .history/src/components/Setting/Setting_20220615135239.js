import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
} from "@mui/material";
import DoubleSecurity from "./DoubleSecurity";
import ResetAccount from "./ResetAccount";
import LocalPoliceIcon from "@mui/icons-material/LocalPolice";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
export default function Setting({ open, setOpen, fetchPassword }) {
  const [openDoubleSecurity, setOpenDoubleSecurity] = useState(false);
  const [openResetAccount, setOpenResetAccount] = useState(false);
  function handleClose() {
    setOpen(false);
  }

  return (
    <Drawer anchor={"right"} open={open} onClose={handleClose}>
      <List>
        <ListItem disablePadding className="my-2">
          <ListItemButton onClick={() => setOpenDoubleSecurity(true)}>
            <ListItemIcon>
              <LocalPoliceIcon></LocalPoliceIcon>
            </ListItemIcon>
            Double security
          </ListItemButton>
          <DoubleSecurity
            open={openDoubleSecurity}
            setOpen={setOpenDoubleSecurity}
            fetchPassword={fetchPassword}
          ></DoubleSecurity>
        </ListItem>
        <ListItem disablePadding className="my-2">
          <ListItemButton onClick={() => setOpenResetAccount(true)}>
            <ListItemIcon>
              <RestartAltIcon></RestartAltIcon>
            </ListItemIcon>
            Reset Account
          </ListItemButton>
          <ResetAccount
            open={openResetAccount}
            setOpen={setOpenResetAccount}
            fetchPassword={fetchPassword}
          ></ResetAccount>
        </ListItem>
      </List>
    </Drawer>
  );
}
