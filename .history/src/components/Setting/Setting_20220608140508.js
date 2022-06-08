import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
} from "@mui/material";
import DoubleSecurity from "./DoubleSecurity";
import LocalPoliceIcon from "@mui/icons-material/LocalPolice";

export default function Setting({ open, setOpen }) {
  const [openDoubleSecurity, setOpenDoubleSecurity] = useState(false);

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
          ></DoubleSecurity>
        </ListItem>
      </List>
    </Drawer>
  );
}
