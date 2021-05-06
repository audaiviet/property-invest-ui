import React from "react";
// react component for creating beautiful carousel
import SlickSlider from "react-slick";
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "@components/Grid/GridContainer.js";
import Card from "@components/Card/Card.js";

import styles from "assets/jss/nextjs-material-kit/components/carouselStyle";
import { Grid } from '@material-ui/core';

const useStyles = makeStyles(styles);

export default function Carousel({images}) {
  images = images||[];
  const classes = useStyles();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false
  };
  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <GridContainer>
          <Grid item xs={12} sm={12} md={8} className={classes.marginAuto}>
            <Card carousel>
              <SlickSlider {...settings}>
                {images.map((item, index) => {
                  return (
                    <div key={item}>
                    <img src={item} alt="A project image" className="slick-image" />
                  </div>
                  );
                })}
              </SlickSlider>
            </Card>
          </Grid>
        </GridContainer>
      </div>
    </div>
  );
}
