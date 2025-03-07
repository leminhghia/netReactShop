import {
  Button,
  Divider,
  Fade,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import { IUser } from "../models/user";
import { History, Logout, Person } from "@mui/icons-material";
import { useLogoutMutation } from "../../features/Account/accountApi";

type Props = {
  user: IUser;
};

const UserMenu = ({ user }: Props) => {
  const [logout] = useLogoutMutation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button color="inherit" size="large" sx={{fontSize:'1.1rem'}} onClick={handleClick}>{user.email}</Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem>
          <ListItemIcon>
            <Person />
            <ListItemText>My profile</ListItemText>
          </ListItemIcon>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <History />
            <ListItemText>My order</ListItemText>
          </ListItemIcon>
        </MenuItem>
        <Divider />
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <Logout />
            <ListItemText>Logout</ListItemText>
          </ListItemIcon>
        </MenuItem>
      </Menu>
    </div>
  );
};
export default UserMenu;
