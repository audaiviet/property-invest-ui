import { ButtonBase, makeStyles } from '@material-ui/core';
import * as React from 'react';

interface Props {
    children: any,
    onClickHandler?: () => void,
    fgColor?: string,
    bgColor?: string,
    width?: string,
    height?: string,
}

const useStyles = makeStyles({
    container: {
        backgroundColor: (props:Props) => props.bgColor||'#811744',
        color: (props:Props) => props.fgColor||'#FFFFFF',
        width: (props:Props) => props.width||'200px',
        height: (props:Props) => props.height||'200px',
        padding: '1em 1em 1em 1em',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        alignItems: 'flex-start'
    },
})

export function BoxButton(props: Props) {
    const { children, onClickHandler = () => { } } = props
    const classes = useStyles(props)
    return (
        <ButtonBase onClick={onClickHandler} className={classes.container} >
            {children}
        </ButtonBase>
    )
}