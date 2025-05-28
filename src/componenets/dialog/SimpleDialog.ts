export interface SimpleDialogProps {
    message: string;
    open: boolean;
    onClose: () => void;
}
import {Dialog} from "@mui/material";
export const SimpleDialog = (props: SimpleDialogProps) => {

    const { onClose, message } = props;

    const handleClose = () => {
        onClose();
    }

    return (
        ''
    )
}