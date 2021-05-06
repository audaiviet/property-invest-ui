import { Typography, makeStyles } from '@material-ui/core';
import * as React from 'react';

const styles = makeStyles({
    title: {
        fontSize: "1.5rem",
        fontWeight: "bold",
        display: "inline-block",
        position: "relative",
        marginBottom: "0",
        textTransform: "uppercase",
        lineHeight: "3.8rem",
    },
    subtitle: {
        fontSize: "1.313rem",
        maxWidth: "510px",
        margin: "0 0 0"
    },
    titleBox: {
        marginLeft: "50px"
    }

})
interface Props {
    title: string;
    subtitle?: string;
}
export function SectionTitle({ title, subtitle }: Props) {
    const classes = styles()
    return (
        <div className={classes.titleBox}>
            <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
                {title}
            </Typography>
            <Typography gutterBottom variant="h5" component="h3" className={classes.subtitle}>
                {subtitle}
            </Typography>
        </div>
    )
}