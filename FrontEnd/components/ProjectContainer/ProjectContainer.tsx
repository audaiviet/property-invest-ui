import GridContainer from '@components/Grid/GridContainer';
import React from 'react';
import { ProjectCard } from '@components/ProjectCard/ProjectCard';
import { IProject } from 'interfaces/IProject';
import { makeStyles } from '@material-ui/core';
import Grid from "@material-ui/core/Grid";
import styles from "../../assets/jss/nextjs-material-kit/components/projectContainerStyle";

const useStyles = makeStyles(styles);

export function ProjectContainer(props: { projects: IProject[]; }) {
    const classes = useStyles();

    const { projects }:{ projects: IProject[] }  = props;
    return (<>
        <GridContainer className={classes.container}>
            {projects.map((item, index) => {
                return (
                <Grid className={classes.item} xs={12} sm={4}>
                    <ProjectCard project={item}></ProjectCard>
                </Grid>);
            })}
        </GridContainer>
    </>);
}
