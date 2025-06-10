import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { TextField } from '@mui/material';
import React from "react";

interface FormFieldProps {
    name: string;
    label: string;
    type?: string;
}

const FormField: React.FC<FormFieldProps> = ({ name, label, type = "text" }) => (
    <FormControl>
        <FormLabel htmlFor={name}>{label}</FormLabel>
        <TextField
            required
            fullWidth
            id={name}
            name={name}
            type={type}
            variant="outlined"
            autoComplete={type === 'password' ? 'new-password' : 'email'}
        />
    </FormControl>
);

export default FormField;


