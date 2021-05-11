import { AddressForm } from '@components/AddressForm/AddressForm';
import { Banner } from '@components/Banner/Banner';
import { SectionTitle } from '@components/SectionTitle/SectionTitle';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import * as React from 'react';

const useStyles = makeStyles({
    background: {
        minHeight: '600px',
        backgroundColor: "#EDBB99"
    },

})
export default function Payment(props) {
    const classes = useStyles()
    return (<>
        <Banner title='Payment transfer' subtitle='Fund your investments here'
            imageUrl='/static/images/didier-weemaels-ZKVBM2_Dp84-unsplash.jpg' />
        <section className={classes.background}>
            <SectionTitle title='Payment information'></SectionTitle>
            <Grid container justify='center'>
                <Grid item xs={11} sm={6}>
                    <AddressForm></AddressForm>
                </Grid>
            </Grid>
        </section>
    </>)
}