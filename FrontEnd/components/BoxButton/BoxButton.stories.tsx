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

export const Standard = () => <BoxButton onClickHandler={()=>{alert("I've just been clicked!")}}>
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
