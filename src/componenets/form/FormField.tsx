import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { TextField } from '@mui/material';
import React from 'react';

interface FormFieldProps {
    name: string;
    label: string;
    type?: string;
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormField: React.FC<FormFieldProps> = ({ name, label, type = 'text', placeholder = '', value, onChange }) => (
    <FormControl>
        <FormLabel htmlFor={name}>{label}</FormLabel>
        <TextField
            required
            fullWidth
            id={name}
            name={name}
            type={type}
            variant="outlined"
            placeholder={placeholder}
            autoComplete={type === 'password' ? 'new-password' : 'email'}
            value={value}
            onChange={onChange}
        />
    </FormControl>
);

export default FormField;
