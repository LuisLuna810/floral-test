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
import { AppbarContainer, AppbarHeader, MyList } from "../../styles/appbar";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import logo from "../../utils/image/logo.png.png";

import SearchIcon from "@mui/icons-material/Search";

import Actions from "./actions";
import { useUIContext } from "../../context/ui";

export default function AppbarDesktop({ matches }) {
  const { setShowSearchBox } = useUIContext();

  return (
    <AppbarContainer sx={{backgroundColor: "#5f2c3e", margin: "0", maxHeight: "100px"}}>
      <Box>
        {" "}
        <img style={{ maxWidth: "100px" }} src={logo} alt="todo floral" />
      </Box>
      <MyList type="row" sx={{ justifyContent: "flex-end" }}>
        <ListItemButton
          component={RouterLink}
          to="/"
          style={{ textDecoration: "none", maxWidth: "7rem", color: "white"}}
        >
          <ListItemText sx={{textAlign: "center"}} primary="Home" />
        </ListItemButton>

        <ListItemButton
          component={RouterLink}
          to="/productos"
          style={{ textDecoration: "none", maxWidth: "7rem", color: "white"}}
        >
          <ListItemText sx={{textAlign: "center"}} primary="Productos" />
        </ListItemButton>
        <ListItemButton
          component={RouterLink}
          to="/snackcart"
          style={{ textDecoration: "none", maxWidth: "9rem", color: "white"}}
        >
          <ListItemText sx={{textAlign: "center"}} primary="Cotizar Snacks" />
        </ListItemButton>

        <ListItemButton
          component={RouterLink}
          to="/servicios"
          style={{ textDecoration: "none", maxWidth: "7rem", color: "white"}}
        >
          <ListItemText sx={{textAlign: "center"}} primary="Servicios" />
        </ListItemButton>
      </MyList>
      <Actions matches={matches} />
    </AppbarContainer>
  );
}
