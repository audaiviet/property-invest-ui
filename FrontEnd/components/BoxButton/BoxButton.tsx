import { ButtonBase, makeStyles } from '@material-ui/core';
import * as React from 'react';

const useStyles = makeStyles({
    container: {
        backgroundColor: '#811744',
        color: 'white',
        width: '200px',
        height: '200px',
        padding: '1em 1em 1em 1em',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        alignItems: 'flex-start'
    },
})

export function BoxButton(props) {
    const { children, onClickHandler = () => { } } = props
    const classes = useStyles()
    return (
        <ButtonBase onClick={onClickHandler} className={classes.container}>
            {children}
        </ButtonBase>
    )
}