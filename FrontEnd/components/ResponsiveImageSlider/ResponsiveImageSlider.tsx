import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from '@material-ui/core';

import GridContainer from "@components/Grid/GridContainer.js";
import Card from "@components/Card/Card.js";

import { Carousel as Slider } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'

import styles from "assets/jss/nextjs-material-kit/components/carouselStyle";

const useStyles = makeStyles(styles);
const images: string[] = ['/static/images/bg.jpg', '/static/images/bg2.jpg', '/static/images/bg3.jpg', '/static/images/bg7.jpg']


export function ResponsiveImageSlider() {
    const classes = useStyles();
    return (
        <div className={classes.section}>
            <div className={classes.container}>
                <GridContainer>
                    <Grid item xs={12} sm={12} md={8} className={classes.marginAuto}>
                        <Card carousel>
                            <Slider showThumbs={false}>
                                {images.map((item, index) => {
                                    return (
                                        <div key={item}>
                                            <img src={item} alt="A project image" className="slick-image" />
                                        </div>
                                    );
                                })}
                            </Slider>
                        </Card>
                    </Grid>
                </GridContainer>
            </div>
        </div>
    );
}
