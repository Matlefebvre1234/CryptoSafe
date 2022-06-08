import React , {useState} from 'react'
import {Drawer,List,ListItem,ListItemButton,ListItemIcon} from "@mui/material"
import DoubleSecurity from './DoubleSecurity';
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';

export default function setting({open,setOpen}) {


  const [openDoubleSecurity, setOpenDoubleSecurity] = useState(false);

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
            <ListItemButton onClick={()=> setOpenDoubleSecurity(true)}>
            <ListItemIcon>
              <LocalPoliceIcon></LocalPoliceIcon>
            <DoubleSecurity open={openDoubleSecurity} setOpen={setOpenDoubleSecurity} ></DoubleSecurity>
            </ListItemIcon>
           
            Double security
            </ListItemButton>
          </ListItem>
          </List>
    </Drawer>
  )
}
