import { Banner } from '@components/Banner/Banner';
import { SectionTitle } from '@components/SectionTitle/SectionTitle';
import { makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles({
    investor: {
        minHeight: '600px',
        backgroundColor: "#ACE7FF"
    },
    info: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '600px',
        backgroundColor: "#0074d9",
        color: 'yellow'
    }
})

export default function About() {
    const classes = useStyles()

    return (
        <>
            <Banner title='About page' subtitle='What we are about.' />
            <section className={classes.investor}>
                <SectionTitle title={'About'}></SectionTitle>
            </section>
        </>
    )
}