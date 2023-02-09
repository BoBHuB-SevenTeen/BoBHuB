import { createTheme } from '@mui/material/styles';

export const muitheme = createTheme({
  palette: {
    primary: {
      main: '#E59A59', //main
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#712E1E', //icon
    },
    error: {
      main: '#A82A1E', //cancel, delete
    },
    info: {
      main: '#888870', //etc
      contrastText: '#ffffff',
    },
  },
});
