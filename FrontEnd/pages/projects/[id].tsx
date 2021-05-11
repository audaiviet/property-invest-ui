import React from 'react';
import { useRouter } from 'next/router'
import { Grid, makeStyles } from '@material-ui/core';
import { useProjects } from 'services/ProjectService';
import { IProject } from 'interfaces/IProject';
import Carousel from '@components/Carousel/Carousel';
import { SectionTitle } from '@components/SectionTitle/SectionTitle';
import { BoxButton } from '@components/BoxButton/BoxButton';
import { Banner } from '@components/Banner/Banner';

const useStyles = makeStyles({
    background: {
        height: '600px',
        backgroundColor: "#EDBB99"
    },
    visuals: {
        backgroundColor: "#FFFFFF",
        minHeight: '600px',
    },
    financials: {
        backgroundColor: "#ffffcc",
        height: '600px',
    },
    invest: {
        backgroundColor: "#ccffff",
        height: '600px',
    }

})

function InvestmentOption({ text }) {
    const router = useRouter()
    return (
        <Grid container justify='center'>
            <Grid item>
                <BoxButton height='100px' onClickHandler={() => {router.push("/payment");}}>
                    <h3>{text}</h3>
                </BoxButton>
            </Grid>
        </Grid>
    )
}

export default function Project(props) {
    const router = useRouter()
    const { id } = router.query
    const classes = useStyles();
    const { data, status } = useProjects()
    const projects = data || [];
    const project: IProject = projects.find((item, index) => item.id === id)
    return (<>
        <Banner title='Project details' subtitle={`For project ${project && project.name}`} />
        <section className={classes.background}>
            <SectionTitle title='Background information'></SectionTitle>
        </section>
        <section className={classes.visuals}>
            <SectionTitle title='Project photos'></SectionTitle>
            <Carousel images={project && project.images}></Carousel>
        </section>
        <section className={classes.financials}>
            <SectionTitle title='Financials'></SectionTitle>
        </section>
        <section className={classes.invest}>
            <SectionTitle title='Your investment otions'></SectionTitle>
            <Grid container direction="row" justify="center">
                <Grid item xs={12} sm={4}>
                    <InvestmentOption text='£1000 at 8%'></InvestmentOption>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <InvestmentOption text='£5000 at 8%'></InvestmentOption>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <InvestmentOption text='£10000 at 8%'></InvestmentOption>
                </Grid>
            </Grid>
        </section>
    </>);
}