import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Control, Controller, useForm } from 'react-hook-form';
import { Button } from '@material-ui/core';
import { saveAddress } from 'services/UserService';
import { IAddressForm } from './IAddressForm';

type FieldNames<T> = keyof T;
interface IRhfInput {
    name: FieldNames<IAddressForm>,
    label?: string,
    defaultValue?: string,
    isRequired?: boolean,
    fullWidth?: boolean,
    control: Control<IAddressForm>,
    autoComplete?: string
}

function RhfInput(props: IRhfInput) {

    let { name,
        label = "",
        defaultValue = "",
        isRequired = true,
        control,
        fullWidth = false,
        autoComplete = "off" } = props;

    console.log("name=", name,
        "label=", label,
        "defaultValue=", defaultValue,
        "isRequired=", isRequired,
        "control=", control,
        "fullWidth=", fullWidth,
        "autoComplete=", autoComplete)
    return (
        <Controller
            render={({ field, fieldState: {error} }) => (
                <TextField {...field}
                    error={!!error}
                    helperText={error ? error.message : null}
                    required={isRequired}
                    label={label}
                    fullWidth={fullWidth}
                    autoComplete={autoComplete}
                />
            )}
            name={name}
            control={control}
            rules={{ required: "Field is required" }}
            defaultValue={defaultValue}
        />);
}

export function AddressForm() {
    const { register, handleSubmit, control, watch } = useForm<IAddressForm>()
    const onSubmit = (data: IAddressForm) => {
        saveAddress(data)
    }

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Shipping address
            </Typography>
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        {RhfInput({
                            name: "firstName",
                            control: control,
                            label: "First name",
                            fullWidth: true,
                            autoComplete: "given-name"
                        })}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        {RhfInput({
                            name: "lastName",
                            control: control,
                            label: "Last name",
                            fullWidth: true,
                            autoComplete: "family-name"
                        })}
                    </Grid>
                    <Grid item xs={12}>
                        {RhfInput({
                            name: "address1",
                            label: "Address line 1",
                            control: control,
                            fullWidth: true,
                            autoComplete: "user address-line1"
                        })}
                    </Grid>
                    <Grid item xs={12}>
                        {RhfInput({
                            name: "address2",
                            label: "Address line 2",
                            control: control,
                            fullWidth: true,
                            autoComplete: "user address-line2"
                        })}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        {RhfInput({
                            name: "city",
                            label: "City",
                            control: control,
                            fullWidth: true,
                            autoComplete: "user address-level2"
                        })}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        {RhfInput({
                            name: "state",
                            label: "State/Province/Region",
                            control: control,
                            fullWidth: true,
                            autoComplete: "user address-level1"
                        })}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        {RhfInput({
                            name: "zip",
                            label: "Zip / Postal code",
                            control: control,
                            fullWidth: true,
                            autoComplete: "user postal-code"
                        })}

                    </Grid>
                    <Grid item xs={12} sm={6}>
                        {RhfInput({
                            name: "country",
                            label: "Country",
                            control: control,
                            fullWidth: true,
                            autoComplete: "user country"
                        })}
                    </Grid>
                    <Grid item xs={12}>
                        <Controller
                            control={control}
                            name="saveAddress"
                            defaultValue='no'
                            render={({ field: { value, onChange } }) => (
                                // Checkbox accepts its value as `checked`
                                // so we need to connect the props here
                                <FormControlLabel
                                    control={<Checkbox color="secondary" checked={value} onChange={onChange} />}
                                    label="Use this address for payment details"
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >Submit</Button>
                    </Grid>
                </Grid>
            </form>
        </React.Fragment>
    );
}
