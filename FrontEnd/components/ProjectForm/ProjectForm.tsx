import { Button, Checkbox, FormControlLabel, Grid, TextField } from '@material-ui/core';
import axios, { AxiosError } from 'axios';
import { defaultProject, IProject } from 'interfaces/IProject';
import * as React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, setLogger } from 'react-query';
import { toast, ToastContainer } from 'react-nextjs-toast'
import { getErrorMessage, IApiResponse } from 'services/ErrorService';

setLogger({
    log: x => { },
    warn: x => { },
    error: x => { },
})

function addTheProject(project: IProject) {
    return axios.post('/api/project', project)
        .catch((err: AxiosError) => {
            if (err.response) {
                // client received an error response (5xx, 4xx)
                console.log("######### axios err.response=", JSON.stringify(err.response))
                if (err.response.status === 400) {
                    return Promise.reject(err.response.data)
                }
            }
            else if (err.request) {
                // client never received a response, or request never left
                console.log("######### axios err.request=", JSON.stringify(err.request))
            } else {
                // anything else
                console.log("######### axios err=", JSON.stringify(err))
            }
            return Promise.reject(err)
        })
}

export function ProjectForm() {
    const { register, handleSubmit, control, reset, watch,
        formState: { isSubmitting, isDirty, isValid } } = useForm<IProject>({ mode: 'onChange', defaultValues: defaultProject })

    const { status: addProjectStatus, mutateAsync: addProject } = useMutation(
        addTheProject,
        {
            onError: (error: Error | AxiosError | IApiResponse, variables, context) => {
                // An error happened!
                console.log("######### error data=", error)
                console.log("######### variables data=", JSON.stringify(variables))
                console.log("######### context data=", JSON.stringify(context))
                if (axios.isAxiosError(error)) {
                    toast.notify(getErrorMessage(error.response.data as IApiResponse) + ' Project not saved!')
                } else {
                    // IApiResponse
                    toast.notify(getErrorMessage(error as IApiResponse) + ' Project not saved!')
                }
            },
            onSuccess: (data, variables, context) => {
                toast.notify('Project added')
                console.log("######### OnSuccess data=", data)
                reset(defaultProject)
            },
        })

    const onSubmit: SubmitHandler<IProject> = async (data, event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        await addProject(data)
    }

    return (<React.Fragment>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <ToastContainer />
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Controller
                        control={control}
                        name="name"
                        defaultValue=""
                        rules={{ required: 'Please enter the project name.' }}
                        render={({ field, fieldState: { error } }) => (
                            <TextField {...field}
                                error={!!error}
                                helperText={error ? error.message : null}
                                required
                                label='Project name'
                                fullWidth
                                autoComplete='on'
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Controller
                        control={control}
                        name="description"
                        defaultValue=""
                        render={({ field, fieldState: { error } }) => (
                            <TextField {...field}
                                multiline
                                rowsMax={10}
                                variant="outlined"
                                error={!!error}
                                helperText={error ? error.message : null}
                                label='Description'
                                fullWidth
                                autoComplete='on'
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Controller
                        control={control}
                        name="amountRequired"
                        rules={{
                            min: { value: 50000, message: 'Value should at least 50000!' },
                            required: 'Please enter total investment needed',
                            pattern: { value: /^[1-9][0-9]+$/, message: 'Please enter a number' }
                        }}
                        render={({ field, fieldState: { error } }) => (
                            <TextField {...field}
                                error={!!error}
                                helperText={error ? error.message : null}
                                required
                                label='Investment needed'
                                fullWidth
                                autoComplete='on'
                                type='number'
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Controller
                        control={control}
                        name="amountReceived"
                        rules={{
                            required: 'Please enter minimum investment unit',
                            min: { value: 1000, message: 'Value should not be less than 1000!' },
                        }}
                        render={({ field, fieldState: { error } }) => (
                            <TextField {...field}
                                error={!!error}
                                helperText={error ? error.message : null}
                                required
                                label='Minimum Investment unit'
                                fullWidth
                                autoComplete='on'
                                type='number'
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Controller
                        control={control}
                        name="isActive"
                        defaultValue={false}
                        render={({ field: { value, onChange } }) => (
                            <FormControlLabel
                                control={<Checkbox color="secondary" checked={value} onChange={onChange} />}
                                label="Active project"
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Controller
                        control={control}
                        name="isCompleted"
                        defaultValue={false}
                        render={({ field: { value, onChange } }) => (
                            <FormControlLabel
                                control={<Checkbox color="secondary" checked={value} onChange={onChange} />}
                                label="Completed project"
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Controller
                        control={control}
                        name="isDeleted"
                        defaultValue={true}
                        render={({ field: { value, onChange } }) => (
                            <FormControlLabel
                                control={<Checkbox color="secondary" checked={value} onChange={onChange} />}
                                disabled label="Deleted project"
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={3} sm={2}>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        disabled={!isDirty || !isValid}
                    >Add project</Button>
                </Grid>
            </Grid>
        </form>
    </React.Fragment>)

}