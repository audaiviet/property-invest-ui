import { Banner } from '@components/Banner/Banner';
import { SectionTitle } from '@components/SectionTitle/SectionTitle';
import { makeStyles } from '@material-ui/core';
import { useSession } from 'next-auth/client';
import React from 'react';

export interface UserProps {

}

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

export default function User() {
    const [session, loading] = useSession() //TODO - Need to use useEffect
    const classes = useStyles()

    return (
        <>
            { session &&
                <>
                    <Banner title='Investor page' subtitle='Your details and investments'
                        imageUrl='/static/images/ian-dooley-DJ7bWa-Gwks-unsplash.jpg' />
                    <section className={classes.investor}>
                        <SectionTitle title={session?.user?.name}></SectionTitle>
                    </section>
                </>
            }

            { !session &&
                <section className={classes.info}>
                    <SectionTitle title='Please log in'></SectionTitle>
                </section>
            }
        </>
    )
}