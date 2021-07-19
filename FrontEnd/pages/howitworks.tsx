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

export default function HowItWorks() {
    const classes = useStyles()

    return (
        <>
            <Banner title='How It Works page' subtitle='How it works.' />
            <section className={classes.investor}>
                <SectionTitle title={'How it works'}></SectionTitle>
            </section>
        </>
    )
}