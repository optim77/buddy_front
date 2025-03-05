// import { TextField, Typography } from '@mui/material';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import axios from 'axios';
// import React, {useEffect, useState} from 'react';
// import {useNavigate, useParams} from 'react-router-dom';
//
// import { StyledCard, StyledTextareaAutosize } from '../../customStyles/Element';
// import { MainContainer } from '../../customStyles/MainContainer';
// import authService from '../../services/authService';
// import { HTTP_CODE } from '../../utils/CODE';
// import AppTheme from '../theme/AppTheme';
// import Plan from "./Plan";
// import {useFetchPlan} from "./hooks/useFetchPlan";
//
// const EditPlan: React.FC = (props: { disableCustomTheme?: boolean }) => {
    //
    //     const id = useParams<{ id: string }>();
    //     const { plan, message, messageType } = useFetchPlan(id.id);
    //     const [isSending, setIsSending] = useState<boolean>(false);
    //
    //     const [name, setName] = useState<string>();
    //     const [description, setDescription] = useState<string>();
    //     const [price, setPrice] = useState<number>();
    //     const navigate = useNavigate();
    //
    //
    //
    //     const send = async () => {
    //         setIsSending(true);
    //
    //         if (validate()) {
    //             const formData = new FormData();
    //             formData.append('name', name as string);
    //             formData.append('description', description as string);
    //             formData.append('price', String(price));
    //             await axios
    //                 .post(
    //                     `${process.env.REACT_APP_API_ADDRESS}/plan/create`,
    //                     formData,
    //                     {
    //                         headers: {
    //                             'Content-Type': 'application/json',
    //                             Authorization: `Bearer ${authService.getToken()}`,
    //                         },
    //                     },
    //                 )
    //                 .then(() => {
    //                     setMessage('Created! You will be redirect to profile page');
    //                     setMessageType('success');
    //                     setTimeout(() => {
    //                         navigate('/profile');
    //                     }, 2000);
    //                 })
    //                 .catch((reason) => {
    //                     if (reason.response?.status === HTTP_CODE.CONFLICT) {
    //                         setMessage('You have too many plans');
    //                     } else {
    //                         setMessage('Something went wrong, try again later');
    //                     }
    //                     setIsSending(false);
    //                 });
    //         }
    //     };
    //
    //     const validate = (): boolean => {
    //         if (!name) {
    //             setMessage('You need to fill name!');
    //             setIsSending(false);
    //             return false;
    //         }
    //         if (description && description.length < 50) {
    //             setMessage('Description is too short!');
    //             setIsSending(false);
    //             return false;
    //         }
    //         if (price === undefined || price < 0 || Number.isNaN(price)) {
    //             setMessage('Insert correct price');
    //             setIsSending(false);
    //             return false;
    //         }
    //         setMessage('');
    //         return true;
    //     };
    //
    //     return (
    //         <AppTheme {...props}>
    //             <CssBaseline enableColorScheme />
    //             <MainContainer>
    //                 <StyledCard variant="outlined">
    //                     <Typography variant="h4" component="h1" gutterBottom>
    //                         Create plan
    //                     </Typography>
    //
    //                     {message && (
    //                         <Typography color={messageType} variant="body2">
    //                             {message}
    //                         </Typography>
    //                     )}
    //                     <Typography variant="h4" component="h1" gutterBottom>
    //                         Name
    //                     </Typography>
    //                     <TextField
    //                         placeholder="Name"
    //                         onChange={(event) => {
    //                             setName(event.target.value);
    //                         }}
    //                     />
    //
    //                     <Typography variant="h4" component="h1" gutterBottom>
    //                         Description
    //                     </Typography>
    //                     <StyledTextareaAutosize
    //                         minRows={4}
    //                         placeholder="Description..."
    //                         onChange={(event) => setDescription(event.target.value)}
    //                     />
    //                     <Typography variant="h4" component="h1" gutterBottom>
    //                         Price
    //                     </Typography>
    //                     <TextField
    //                         placeholder="Price"
    //                         onChange={(event) => {
    //                             setPrice(Number(event.target.value));
    //                         }}
    //                     />
    //                     <Button
    //                         type="submit"
    //                         fullWidth
    //                         variant="contained"
    //                         onClick={send}
    //                         disabled={isSending}
    //                     >
    //                         Create
    //                     </Button>
    //                 </StyledCard>
    //             </MainContainer>
    //         </AppTheme>
    //     );
// };
// export { EditPlan };
export interface EditPlan {}