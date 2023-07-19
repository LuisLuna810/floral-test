import { Divider, ListItemButton, ListItemIcon } from "@mui/material";
import { ActionIconsContainerDesktop, ActionIconsContainerMobile, MyList } from "../../styles/appbar";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Colors } from "../../styles/theme";
import React, {useEffect} from "react";

import {useDispatch, useSelector} from "react-redux"

export default function Actions({ matches }) {

  const Component = matches ? ActionIconsContainerMobile : ActionIconsContainerDesktop;
  const dispatch = useDispatch()

  const cart = useSelector(state => state.cart)

  return (
    <Component>
      <MyList type="row">
        <ListItemButton
          sx={{
            justifyContent: "center",
          }}
          to="/cart"
        >
          <ListItemIcon
            sx={{
              display: "flex",
              justifyContent: "center",
              color: "white",
            }}
            primary="Cart"
          ><Badge badgeContent={cart?.length} sx={{color: "white"}} >
            <ShoppingCartIcon /></Badge>
          </ListItemIcon>
        </ListItemButton>
        
        <ListItemButton
          sx={{
            justifyContent: "center",
          }}
          to="/account"
        >
          <ListItemIcon
            sx={{
              display: "flex",
              justifyContent: "center",
              color: "white",
            }}
          >
            <PersonIcon  />
          </ListItemIcon>
        </ListItemButton>
        <Divider orientation="vertical" flexItem />
      </MyList>
    </Component>
  );
}
