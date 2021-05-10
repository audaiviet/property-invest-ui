import { makeStyles, Typography } from '@material-ui/core';
import * as React from 'react';

const useStyle = makeStyles({
    banner: {
        backgroundImage: (props: Props) => props.imageUrl && `url(${props.imageUrl})` || "url('/static/images/joanna-kosinska-bF2vsubyHcQ-unsplash.jpg')",
        height: '450px',
        display: 'flex',
        alignItems: 'center'
    },
    titleBox: {
        marginLeft: "50px"
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
})

interface Props {
    title?: string,
    subtitle?: string,
    imageUrl?: string
}

export function Banner(props: Props) {
    const { title, subtitle } = props
    const classes = useStyle(props)

    return (
        <section className={classes.banner}>
            <div className={classes.titleBox}>
                <Typography gutterBottom variant="h5" component="h1" className={classes.title}>
                    {title}
                </Typography>
                <Typography gutterBottom variant="h5" component="h2" className={classes.subtitle}>
                    {subtitle}
                </Typography>
            </div>
        </section>
    )
}