import { createMuiTheme } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#FDFFFC',
      main: '#2EC4B6',
      dark: '#011627',
      contrastText: '#fff',
    },
    /*
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },*/
  },
});

export default theme;
