import React from 'react';
import { Meta } from '@storybook/react';
import { BoxButton } from './BoxButton';
import { Grid } from '@material-ui/core';

export default {
    title: 'PropertyInvest/BoxButton',
    component: BoxButton
} as Meta;

const classes = {
    container: {
        display: 'flex'
    },
    items: {
        display: 'block'
    }
}

const Template = ({
    onClickHandler = () => alert("I've just been clicked!"),
    bgColor,
    fgColor,
    width,
    height
}) => (
    <BoxButton bgColor={bgColor} fgColor={fgColor} width={width} height={height} onClickHandler={onClickHandler}>
        <Grid container style={classes.container}>
            <Grid item xs={12}>
                <h3>ABOUT</h3>
                <span style={classes.items}>About us</span>
                <span style={classes.items}>News</span>
                <span style={classes.items}>Statistics</span>
                <span style={classes.items}>Charity</span>
                <span style={classes.items}>Careers</span>
                <span style={classes.items}>Contact Us</span>
                <span style={classes.items}>Blog</span>
            </Grid>
        </Grid>
    </BoxButton>
);

export const Standard = Template.bind({})

export const Green = Template.bind({})
Green.args = { bgColor: 'green', onClickHandler: () => { alert("I am Green and I've just been clicked!") } }

export const Blue = Template.bind({})
Blue.args = {
    bgColor: 'blue',
    fgColor: 'yellow'
}

export const Tall = Template.bind({})
Tall.args = {
    height: '300px'
}

export const Short = Template.bind({})
Short.args = {
    height: '100px'
}
