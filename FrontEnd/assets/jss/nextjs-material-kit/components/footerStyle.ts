import { container, defaultFont, primaryColor, title } from "assets/jss/nextjs-material-kit.js";

const footerStyle: any = {
  title: {
    ...title,
    marginTop: "30px",
    minHeight: "32px",
    textDecoration: "none",
    color: "#FFFFFF",
    fontSize: '20px',
    fontWeight: '500'
  },
  links: {
    ...defaultFont,
    textDecoration: "none",
    fontSize: '17px',
    fontWeight: '400',
    display: 'block',
    color: '#FFFFFF'
  },
  typo: {
    paddingLeft: "25%",
    marginBottom: "40px",
    position: "relative",
    width: "100%"
  },
  block: {
    color: "inherit",
    padding: "0.9375rem",
    fontWeight: "500",
    fontSize: "12px",
    textTransform: "uppercase",
    borderRadius: "3px",
    textDecoration: "none",
    position: "relative",
    display: "block"
  },
  left: {
    float: "left!important",
    display: "block"
  },
  right: {
    margin: "0",
    float: "right!important"
  },
  footer: {
    padding: "0.9375rem 0",
    textAlign: "left",
    display: "flex",
    zIndex: "2",
    position: "relative",
    backgroundColor: '#666666',
    flexDirection: 'column'
  },
  a: {
    color: primaryColor,
    textDecoration: "none",
    backgroundColor: "transparent"
  },
  footerWhiteFont: {
    "&,&:hover,&:focus": {
      color: "#FFFFFF"
    }
  },
  container,
  list: {
    marginBottom: "0",
    padding: "0",
    marginTop: "0"
  },
  inlineBlock: {
    display: "inline-block",
    padding: "0px",
    width: "auto"
  },
  icon: {
    width: "18px",
    height: "18px",
    position: "relative",
    top: "3px"
  },
  noLeftPadding: {
    "paddingLeft": '0'
  },
  noRightPadding: {
    "paddingRight": '0.5rem'
  }
};
export default footerStyle;
