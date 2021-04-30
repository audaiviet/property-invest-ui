import React from 'react';
import classNames from 'classnames';
import styles from '../assets/jss/nextjs-material-kit/pages/projects';
import { makeStyles } from '@material-ui/core';
import Parallax from '../components/Parallax/Parallax';
import GridContainer from '../components/Grid/GridContainer';
import GridItem from '../components/Grid/GridItem';


interface IProject {
    id: string,
    name: string,
    startDate: Date,
    endDate: Date,
    estimatedDurationInDays: number,
    estimatedCost: number,
    annualInterestRateOffered: number,
    projectManager: string
}

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
    console.log("****Projects= ", projects)

    return (
        <React.Fragment>
            <Parallax small image={require('assets/img/new-york.jpg')}>
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
                        <h1>Projects to invest in</h1>
                        <hr />
                        {projects && projects.map((item, index) => {
                            return (<div key={item.id}><h3>{item.name}</h3></div>)
                        })}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Projects;