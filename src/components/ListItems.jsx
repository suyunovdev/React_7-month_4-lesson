import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";

import { Link } from "react-router-dom";
import { Person, Person2, Person2Outlined, Settings } from "@mui/icons-material";

export const mainListItems = (
  <>
    <Link to="/#">
    <ListItemButton>
      <ListItemIcon>
      <Person/>

      </ListItemIcon>
      <ListItemText primary="Teacher" />
    </ListItemButton>
    </Link>


  <Link to="/">
  <ListItemButton>
      <ListItemIcon>
      <PeopleIcon />

      </ListItemIcon>
      <ListItemText primary="Students" />
    </ListItemButton>

  </Link>

    <ListItemButton>
      <ListItemIcon>
        <Settings />
      </ListItemIcon>
      <ListItemText primary="Settings" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Profile" />
    </ListItemButton>
  </>
);
