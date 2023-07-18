import {
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import {

  AppbarContainer,
  AppbarHeader,
  MyList,
} from "../../styles/appbar";
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import logo from "../../utils/image/logo.png.png"


import SearchIcon from "@mui/icons-material/Search";

import Actions from "./actions";
import { useUIContext } from "../../context/ui";

export default function AppbarDesktop({ matches }) {

  const { setShowSearchBox } = useUIContext();

  return (
    <AppbarContainer>
      <Box sx={{ marginRight: "48px" }}> <img style={{ maxWidth: "160px" }} src={logo} alt="todo floral" /></Box>
      <MyList type="row">
        <ListItemButton component={RouterLink} to="/" style={{ textDecoration: 'none' }}>
          <ListItemText primary="Home" />
        </ListItemButton>
        
        <ListItemButton component={RouterLink} to="/productos" style={{ textDecoration: 'none' }}>
          <ListItemText primary="Productos" />
        </ListItemButton>
        <ListItemButton component={RouterLink} to="/snackcart" style={{ textDecoration: 'none' }}>
          <ListItemText primary="Cotizar Snacks" />
        </ListItemButton>
        
<ListItemButton component={RouterLink} to="/servicios" style={{ textDecoration: 'none' }}>
          <ListItemText primary="Servicios" />
        </ListItemButton>


        {/* <ListItemButton onClick={() => setShowSearchBox(true)}>
          <ListItemIcon>
            <SearchIcon />
          </ListItemIcon>
        </ListItemButton> */}
      </MyList>
      <Actions matches={matches} />
    </AppbarContainer>
  );
}
