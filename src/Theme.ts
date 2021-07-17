import { createMuiTheme } from "@material-ui/core/styles";
import createBreakpoints from "@material-ui/core/styles/createBreakpoints";
import { color } from './ColorPalette'
import red from '@material-ui/core/colors/red';

const breakpoints = createBreakpoints({});

declare module "@material-ui/core/styles/createTypography" {
  interface TypographyOptions {
    tab: {
      fontFamily: string;
      textTransform: string;
      fontWeight: number;
      fontSize: string;
    };
    container: {
      fontFamily: string;
      textTransform: string;
      fontSize: string;
      color: string;
    };
    caption: {
      color: string;
      opacity?: string;
      fontFamily: string;
      fontWeight?: number;
      fontSize: string;
      textTransform?: string;
      textAlign?: string;
      margin?: string;
    };
    caption2: {
      color: string;
      opacity?: string;
      fontFamily: string;
      fontWeight?: number;
      fontSize: string;
      textTransform?: string;
      textAlign?: string;
      margin?: string;
    };
  }
}

declare module "@material-ui/core/styles/createPalette" {
  interface CommonColors {    
    dimGray: string
    offWhite: string
    frostBlue: string
    cadetBlue: string
  }
}

export default createMuiTheme({
  palette: {
    common: {    
      dimGray: `${color.dimGray}`,
      offWhite: `${color.offWhite}`,
    },
    primary: {
      main: `${color.dimGray}`,
      // main: white,
    },
    secondary: {
      main: `${color.slateBlue}`,
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
  props: {
    MuiTypography: {
      variantMapping: {
        
      },
    },
  },
  typography: { // Typography take priority over classes objects for the classNames.
    body1: {
      color: color.dimGray,
      fontSize: '0.85rem',
      fontFamily: 'Inter',
      lineHeight: 1.6,
      [breakpoints.up("sm")]: {
        fontSize: '0.98rem'
      },
    },
    body2: {
      color: color.dimGray,
      fontSize: '0.75rem',
      fontFamily: 'Inter',
      lineHeight: 1.55,
      [breakpoints.up("sm")]: {
        fontSize: '0.85rem'
      },
    },
    h2: {
      fontFamily: 'Arial',
      color: color.dimGray,
      fontSize: "1.5rem",
      letterSpacing: '0.6px',
      wordSpacing: '3.5px',
      [breakpoints.up("sm")]: {
        fontSize: '2rem'
      },
    },
    h3: {
      fontFamily: 'Arial',
      color: color.dimGray,
      fontSize: "1.15rem",
      letterSpacing: '0.5px',
      [breakpoints.up("sm")]: {
        fontSize: '1.45rem'
      },
    },
    h4: {
      fontFamily: 'Arial',
      color: color.dimGray,
      fontSize: "0.9rem",
      letterSpacing: '0.2px',
      [breakpoints.up("sm")]: {
        fontSize: '1.05rem'
      },
    },
    h5: {
      fontFamily: 'Roboto',
      fontWeight: 450,
      color: color.dimGray,
      fontSize: '0.85rem',
      letterSpacing: '0.2px',
      [breakpoints.up("sm")]: {
        fontSize: '1.05rem'
      },
    },
    tab: {
      fontFamily: "Lora",
      textTransform: "none",
      fontWeight: 700,
      fontSize: "1rem",
    },
    container: {
      color: "#c1c1c1",
      fontFamily: "Lora",
      textTransform: "none",
      fontSize: "0.8rem",
    },
    caption: {
      color: color.dimGray,
      opacity: '0.9',
      fontFamily: 'Inter',
      fontSize: '0.68rem',
      fontWeight: 400,
      textAlign: 'center',
      margin: '0px auto',
      textTransform: 'none',
      [breakpoints.up('sm')]: {
        fontSize: '0.85rem'
      }
    },
    caption2: {
      color: color.dimGray,
      opacity: '0.9',
      fontFamily: 'Arial',
      fontSize: '0.95rem',
      fontWeight: 400,
      textAlign: 'center',
      textTransform: 'none',
      // margin: '0px auto',
    },
    subtitle1: {
      color: color.dimGray,
      fontSize: '0.75rem',
      fontFamily: 'Arial',
      lineHeight: 1.6,
      [breakpoints.up("sm")]: {
        fontSize: '0.85rem'
      },
    }
  },
})
