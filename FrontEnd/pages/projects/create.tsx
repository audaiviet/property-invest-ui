import { Banner } from '@components/Banner/Banner';
import { SectionTitle } from '@components/SectionTitle/SectionTitle';
import { Button, Grid, makeStyles } from '@material-ui/core';
import { Constants } from '../../constants';
import * as React from 'react';
import { useRef, useState } from 'react';
import { ProjectForm } from '@components/ProjectForm/ProjectForm';

const useStyles = makeStyles({
    editor: {
        minHeight: '600px',
        display: 'flex',
        flexDirection: 'column',
    },
    filesTable: {
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: '2rem',
        paddingRight: '2rem',
    },
    filesTableHeading: {
        fontSize: '1.2rem',
        fontWeight: 'bold',
    },
    input: {
        display: 'none',
    },
    pageBody: {
        marginLeft: '4rem',
        marginRight: '4rem',
        display: 'flex',
        flexDirection: 'column',
    }
})

export default function AddProject() {
    const formRef = useRef(null)
    const classes = useStyles()
    const [filesLoaded, setFilesLoaded] = useState([])
    const [filesLoading, setFilesLoading] = useState([])

    const upload = (event) => {
        setFilesLoading(Array.from<File>(event.target.files))

        const files: FileList = event.target.files
        const formData = new FormData();
        Array.from(files).forEach(file => {
            formData.append(event.target.name, file)
        })
        fetch('/api/project/uploadphotos', { // Your POST endpoint
            method: 'POST',
            body: formData
        }).then(
            response => response.json() // if the response is a JSON object
        ).then(
            success => {
                setFilesLoaded(filesLoaded.concat(filesLoading))
                console.log(success)
            } // Handle the success response object
        ).catch(
            error => console.log(error) // Handle the error response object
        );

        formRef.current?.reset()
    };

    return (<>
        <Banner title='Add New Project' />
        <Grid container className={classes.pageBody}>
            <Grid item>
                <SectionTitle title='Project details'></SectionTitle>
                <ProjectForm></ProjectForm>
            </Grid>
            <Grid item className={classes.editor}>
                <SectionTitle title='Photos uploaded'></SectionTitle>
                <Grid container>
                    <Grid item>
                        <form ref={formRef} encType="multipart/form-data">
                            <input
                                name={Constants.PROJECT_PHOTOS}
                                accept="image/*"
                                className={classes.input}
                                id="contained-button-file"
                                multiple
                                type="file"
                                onChange={upload}
                            />
                            <label htmlFor="contained-button-file">
                                <Button variant="contained" color="primary" component="span">
                                    Upload photos
                                </Button>
                            </label>
                        </form>
                    </Grid>
                </Grid>
                <Grid container className={classes.filesTable}>
                    <Grid container item className={classes.filesTableHeading}>
                        <Grid item xs={12} sm={4}>
                            File name
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            File size
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            File type
                        </Grid>
                    </Grid>
                    {filesLoaded && filesLoaded.map((item, index) => {
                        return (
                            <Grid container item>
                                <Grid item xs={12} sm={4}>
                                    {item.name}
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    {item.size}
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    {item.type}
                                </Grid>
                            </Grid>
                        )
                    })}
                </Grid>
            </Grid>
        </Grid>
    </>)
}