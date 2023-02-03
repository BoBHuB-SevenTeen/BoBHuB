import { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import AdminHeaderNav from './components/AdminHeaderNav';
import AdminSideBar from './components/AdminSideBar';
import AdminMainSection from './components/AdminMainSection';

export const drawerWidth: number = 240;

const mdTheme = createTheme();

function Admin() {
  const [open, setOpen] = useState(true);
  const [selectedButton, setSelectedButton] = useState<'users' | 'restaurants'>('users');
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const clickUsersBtn = () => {
    setSelectedButton('users');
  };
  const clickRestaurantBtn = () => {
    setSelectedButton('restaurants');
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AdminHeaderNav open={open} toggleDrawer={toggleDrawer} />
        <AdminSideBar
          open={open}
          toggleDrawer={toggleDrawer}
          clickUsersBtn={clickUsersBtn}
          clickRestaurantBtn={clickRestaurantBtn}
        />
        <AdminMainSection selectedButton={selectedButton} />
      </Box>
    </ThemeProvider>
  );
}

export default Admin;
