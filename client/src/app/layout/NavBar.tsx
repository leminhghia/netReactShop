import { DarkMode, LightMode } from "@mui/icons-material";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";

type Props = {
  toggleDarkMode: () => void;
  darkMode: boolean
}

const NavBar = ({toggleDarkMode,darkMode}:Props) => {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6">Re-Store</Typography>
        <IconButton onClick={toggleDarkMode}>
          {darkMode ? <DarkMode/> : <LightMode sx={{color:'yellow'}}/>}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
export default NavBar;
