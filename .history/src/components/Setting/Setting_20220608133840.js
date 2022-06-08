import React from 'react'
import {Drawer,List,ListItem,ListItemButton} from "@mui/material"
export default function setting({open,setOpen}) {

  function handleClose()
  {
    setOpen(false);
  }
 return (
    <Drawer
      anchor={'right'}
      open={open}
      onClose={handleClose}
    >
         <List>
           <ListItem disablePadding className="my-2">
            <ListItemButton>
       
            Double Security

            </ListItemButton>
          </ListItem>
          </List>
    </Drawer>
  )
}
