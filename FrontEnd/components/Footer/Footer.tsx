/*eslint-disable*/
import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// material-ui core components
import { Grid, List, ListItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import styles from "assets/jss/nextjs-material-kit/components/footerStyle";
import GridContainer from '@components/Grid/GridContainer';
import Link from 'next/link';

interface Props {
  whiteFont?: boolean
}

const useStyles = makeStyles(styles);

export default function Footer(props: Props) {
  const classes = useStyles();
  const { whiteFont } = props;
  const footerClasses = classNames({
    [classes.footer]: true,
    [classes.footerWhiteFont]: whiteFont
  });
  const copyRightYear = classNames({
    [classes.block]: true,
    [classes.noRightPadding]: true
  });
  const companyLink = classNames({
    [classes.block]: true,
    [classes.noLeftPadding]: true
  });
  return (
    <footer className={footerClasses}>
      <GridContainer>
        <div className={classes.container}>
          <Grid container className={classes.row}>
            <Grid item xs={12} sm={3}>
              <div className={classes.typo}>
                <h3 className={classes.title}>ABOUT</h3>
                <Link href='/'><a className={classes.links}>About us</a></Link>
                <Link href='/'><a className={classes.links}>News</a></Link>
                <Link href='/'><a className={classes.links}>Statistics</a></Link>
                <Link href='/'><a className={classes.links}>Charity</a></Link>
                <Link href='/'><a className={classes.links}>Careers</a></Link>
                <Link href='/'><a className={classes.links}>Contact Us</a></Link>
                <Link href='/profile'><a className={classes.links}>Blog</a></Link>
              </div>
            </Grid>
            <Grid item xs={12} sm={3}>
              <div className={classes.typo}>
                <h3 className={classes.title}>INVEST</h3>
                <Link href='/'><a className={classes.links}>How to Invest</a></Link>
                <Link href='/'><a className={classes.links}>Open an Account</a></Link>
                <Link href='/'><a className={classes.links}>Projects</a></Link>
                <Link href='/'><a className={classes.links}>FAQs</a></Link>
              </div>
            </Grid>
            <Grid item xs={12} sm={3}>
              <div className={classes.typo}>
                <h3 className={classes.title}>LEGAL</h3>
                <Link href='/'><a className={classes.links}>Privacy Policy</a></Link>
                <Link href='/'><a className={classes.links}>Risk Statement</a></Link>
                <Link href='/'><a className={classes.links}>Cookie Policy</a></Link>
                <Link href='/'><a className={classes.links}>Terms of Use</a></Link>
              </div>
            </Grid>
            <Grid item xs={3} sm={12}></Grid>
          </Grid>
        </div>
        <div className={classes.container}>
          <div className={classes.left}>
            <List className={classes.list}>
              <ListItem className={classes.inlineBlock}>
                <a
                  href="https://www.creative-tim.com/?ref=njsmk-footer"
                  className={classes.block}
                  target="_blank"
                >
                  Creative Tim
              </a>
              </ListItem>
              <ListItem className={classes.inlineBlock}>
                <a
                  href="https://www.creative-tim.com/presentation?ref=njsmk-footer"
                  className={classes.block}
                  target="_blank"
                >
                  About us
              </a>
              </ListItem>
              <ListItem className={classes.inlineBlock}>
                <a
                  href="http://blog.creative-tim.com/?ref=njsmk-footer"
                  className={classes.block}
                  target="_blank"
                >
                  Blog
              </a>
              </ListItem>
              <ListItem className={classes.inlineBlock}>
                <a
                  href="https://www.creative-tim.com/license?ref=njsmk-footer"
                  className={classes.block}
                  target="_blank"
                >
                  Licenses
              </a>
              </ListItem>
            </List>
          </div>
          <div className={classes.right}>
            <List className={classes.list}>
              <ListItem className={classes.inlineBlock}>
                <span className={copyRightYear}>&copy; {new Date().getFullYear()}</span>
              </ListItem>
              <ListItem className={classes.inlineBlock}>
                <Link href="/"><a target="_blank" className={companyLink}>PropertyInvest</a></Link>
              </ListItem>
            </List>
          </div>
        </div>
      </GridContainer>
    </footer>
  );
}
