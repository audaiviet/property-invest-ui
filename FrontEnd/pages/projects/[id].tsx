import React from 'react';
import { useRouter } from 'next/router'
import { Grid, makeStyles } from '@material-ui/core';
import { useProjects } from 'services/ProjectService';
import { IProject } from 'interfaces/IProject';

const useStyles = makeStyles({
    container: {
        height: '400px',
        "backgroundColor": "#34495E"
    },
    details: {
        height: '600px',
        "backgroundColor": "#F1948A"
    },
    background: {
        height: '600px',
        "backgroundColor": "#EDBB99"
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
        <div className={classes.container}></div>
        <Grid container className={classes.details}>
            <h1>I am project numer {id}</h1>
        </Grid>
        <section className={classes.background}>
            <pre>
                {JSON.stringify(project)}
            </pre>
        </section>
    </>);
}

export default Project;