import React from "react";
import styles from "../assets/jss/nextjs-material-kit/pages/index";
import { makeStyles } from '@material-ui/core';
import Parallax from "../components/Parallax/Parallax.js";
import GridContainer from "../components/Grid/GridContainer.js";
import GridItem from "../components/Grid/GridItem.js";
import { SectionTitle } from '@components/SectionTitle/SectionTitle';
import { ProjectContainer } from '@components/ProjectContainer/ProjectContainer';
import { QueryClient } from 'react-query';
import { getTestProjectsData, useProjects } from 'services/ProjectService';
import { dehydrate } from 'react-query/hydration';
import { signIn, signOut, useSession } from 'next-auth/client'

export async function getStaticProps(context) {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery('projects', getTestProjectsData)

  return {

    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

const useStyles = makeStyles(styles);

export default function Index(props) {
  const classes = useStyles();
  const { data: projects, status } = useProjects()
  const [session, loading] = useSession()

  return (
    <React.Fragment>
      <Parallax small image={require("assets/img/bg4.jpg")}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem>
              <div className={classes.brand}>
                <h1 className={classes.title}>INVEST IN REAL ESTATE WITH GUARANTEE RETURN OF 6%</h1>
                <h3 className={classes.subtitle}>
                  A new way to invest in properties
                </h3>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <section className={classes.projectSection}>
        <SectionTitle title='Current projects' />
        <ProjectContainer projects={projects}></ProjectContainer>
      </section>
      <div className={classes.sections}>
        <div className={classes.container}>
        </div>
      </div>
    </React.Fragment>
  );
}
