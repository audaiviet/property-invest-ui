import React from 'react';
import classNames from 'classnames';
import styles from '../assets/jss/nextjs-material-kit/pages/projects';
import { makeStyles, Typography } from '@material-ui/core';
import Parallax from '../components/Parallax/Parallax';
import GridContainer from '../components/Grid/GridContainer';
import GridItem from '../components/Grid/GridItem';
import { ProjectCard } from '../components/ProjectCard/ProjectCard';
import { IProject } from 'interfaces/IProject';
interface Props {
    projects: IProject[]
}

const useStyles = makeStyles(styles);

export async function getStaticProps(context) {
    const res = await fetch(process.env.PROJECTS_SERVICE);
    const data: IProject[] = await res.json();

    return {
        props: {
            projects: data || []
        }
    }
}

function Projects({ projects }: Props) {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Parallax image={require('assets/img/new-york.jpg')}>
                <div className={classes.container}>
                    <GridContainer>
                        <GridItem>
                            <div className={classes.brand}>
                                <h1 className={classes.title}>Current investments</h1>
                                <h3 className={classes.subtitle}>
                                    Projects available for investments
                                </h3>
                            </div>
                        </GridItem>
                    </GridContainer>
                </div>
            </Parallax>
            <div className={classNames(classes.main, classes.mainRaised)}>
                <div className={classes.sections}>
                    <div className={classes.container}>
                        <h1 className={classes.title}>Projects to invest in</h1>
                        <hr />
                        {projects && projects.map((item, index) => {
                            return (<div key={item.id}>
                                <ProjectCard project={item} />
                            </div>)
                        })}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Projects;