import { Banner } from '@components/Banner/Banner';
import { SectionTitle } from '@components/SectionTitle/SectionTitle';
import { Button, makeStyles } from '@material-ui/core';
import { Constants } from '../../constants';
import * as React from 'react';
import { useRef } from 'react';

const useStyles = makeStyles({
    editor: {
        minHeight: '600px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        display: 'none',
    },
})

export default function AddProject() {
    const formRef = useRef(null)
    const classes = useStyles()

    const upload = (event) => {

        const files: File[] = event.target.files
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
            success => console.log(success) // Handle the success response object
        ).catch(
            error => console.log(error) // Handle the error response object
        );

        formRef.current?.reset()
    };

    return (<>
        <Banner title='Add New Project' />
        <section className={classes.editor}>
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
        </section>
    </>)
}