import React, { useState } from 'react';
import classNames from 'classnames';
import styles from '../../assets/jss/nextjs-material-kit/pages/projects';
import { makeStyles, Typography } from '@material-ui/core';
import Parallax from '../../components/Parallax/Parallax';
import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';
import { IProject } from 'interfaces/IProject';
import { ProjectContainer } from '@components/ProjectContainer/ProjectContainer';
import { getProjectsByPage, getTestProjectsData, IPageCursor } from 'services/ProjectService';
import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';
interface Props {
    projects: IProject[]
}

const useStyles = makeStyles(styles);
const nullPageCursor: IPageCursor = { page: 0, before: undefined, after: undefined, next: true }

export async function getStaticProps(context) {
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery(['projects', nullPageCursor], () => getProjectsByPage(nullPageCursor))

    return {

        props: {
            dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
        },
    }
}

interface faunadbDoc {
    ts: number,
    ref: unknown,
    data: IProject,
}

function Projects() {
    const classes = useStyles();
    const [pageCursor, setPageCursor] = useState(nullPageCursor)
    const {
        isLoading,
        isError,
        error,
        data: response,
        isFetching,
        isPreviousData,
    } = useQuery(['projects', pageCursor], () => getProjectsByPage(pageCursor), { keepPreviousData: true })

    let projects: IProject[] = [], before: unknown = undefined, after: unknown = undefined
    if (response.success) {
        before = response.data.before
        after = response.data.after
        projects = Array.from(response.data.data).map((item: faunadbDoc, idx): IProject => item.data as IProject)
    } else {
        projects = [], before = undefined, after = undefined
    }
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
                        <div>
                            {isLoading ? (
                                <div>Loading...</div>
                            ) : isError ? (
                                <div>Error: {error.message}</div>
                            ) : (
                                <div>
                                    <ProjectContainer projects={projects}></ProjectContainer>
                                </div>
                            )}
                            <span>Current Page: {pageCursor.page + 1}</span>
                            <button
                                onClick={() => setPageCursor({
                                    page: Math.max(pageCursor.page - 1, 0),
                                    after: after,
                                    before: before,
                                    next: false
                                })}
                                disabled={!before}
                            >
                                Previous Page
                            </button>{' '}
                            <button
                                onClick={() => {
                                    if (!isPreviousData && after) {
                                        setPageCursor({
                                            page: pageCursor.page + 1,
                                            after: after,
                                            before: before,
                                            next: true
                                        })
                                    }
                                }}
                                // Disable the Next Page button until we know a next page is available
                                disabled={isPreviousData || !after}
                            >
                                Next Page
                            </button>
                            {isFetching ? <span> Loading...</span> : null}{' '}
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Projects;