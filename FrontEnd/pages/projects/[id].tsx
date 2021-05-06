import React from 'react';
import { useRouter } from 'next/router'
import { Grid, makeStyles, Typography } from '@material-ui/core';
import { useProjects } from 'services/ProjectService';
import { IProject } from 'interfaces/IProject';
import Carousel from '@components/Carousel/Carousel';
import { SectionTitle } from '@components/SectionTitle/SectionTitle';

const useStyles = makeStyles({
    banner: {
        backgroundImage: "url('/static/images/joanna-kosinska-bF2vsubyHcQ-unsplash.jpg')",
        height: '400px',
        display: 'flex',
        alignItems: 'center'
    },
    title: {
        fontSize: "4.2rem",
        fontWeight: "600",
        display: "inline-block",
        position: "relative",
        marginBottom: "0"
    },
    subtitle: {
        fontSize: "1.313rem",
        maxWidth: "510px",
        margin: "0 0 0"
    },
    details: {
        height: '600px',
        backgroundColor: "#F1948A"
    },
    background: {
        height: '600px',
        backgroundColor: "#EDBB99"
    },
    visuals: {
        backgroundColor: "#FFFFFF",
        minHeight: '600px',
    },
    titleBox: {
        marginLeft: "50px"
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

function Project(props) {
    const router = useRouter()
    const { id } = router.query
    const classes = useStyles();
    const { data, status } = useProjects()
    const projects = data || [];
    const project: IProject = projects.find((item, index) => item.id === id)
    return (<>
        <section className={classes.banner}>
            <div className={classes.titleBox}>
                <Typography gutterBottom variant="h5" component="h1" className={classes.title}>
                    Project details
                </Typography>
                <Typography gutterBottom variant="h5" component="h2" className={classes.subtitle}>
                    For project {project && project.name}
                </Typography>
            </div>
        </section>
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
        </section>
    </>);
}

export default Project;