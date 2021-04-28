import React, { Component } from "react";
import styles from "../assets/jss/nextjs-material-kit/pages/index";
import { makeStyles } from '@material-ui/core';
import Parallax from "../components/Parallax/Parallax.js";
import GridContainer from "../components/Grid/GridContainer.js";
import GridItem from "../components/Grid/GridItem.js";

const useStyles = makeStyles(styles);

export default function Index(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Parallax small image={require("assets/img/bg4.jpg")}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem>
              <div className={classes.brand}>
                <h1 className={classes.title}>Property Investment for you</h1>
                <h3 className={classes.subtitle}>
                  A new way to invest in property for real people
                </h3>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classes.sections}>
        <div className={classes.container}>
        </div>
      </div>
    </React.Fragment>
  );
}
