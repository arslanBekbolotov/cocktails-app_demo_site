import * as React from 'react';
import {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useAppDispatch, useAppSelector} from "../app/hooks.ts";
import {fetchOneCocktail} from "../features/cocktails/cocktailsThunk.ts";
import {useNavigate} from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
import {LoadingButton} from "@mui/lab";
import {selectFetchOneLoading} from "../features/cocktails/cocktailsSlice.ts";

interface Props {
    text: string;
    setOpen: (value: boolean) => void;
    isOpen: boolean;
}

const FormDialog: React.FC<Props> = ({text, setOpen, isOpen}) => {
    const [article, setArticle] = useState("");
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const fetchOneLoading = useAppSelector(selectFetchOneLoading);

    const handleClose = () => {
        setOpen(false);
        navigate('/');
    }

    const searchCocktail = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await dispatch(fetchOneCocktail(article)).unwrap();
            setOpen(false);
        } catch {
            //nothing
        }
    }

    return (
        <Dialog open={isOpen} onClose={handleClose} fullWidth>
            <form onSubmit={searchCocktail}>
                <DialogTitle>Search Cocktail</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {text}
                    </DialogContentText>
                    <TextField
                        required
                        autoFocus
                        fullWidth
                        margin="dense"
                        label="Article"
                        variant="standard"
                        onChange={(e) => setArticle(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <LoadingButton
                        loading={fetchOneLoading}
                        type="submit"
                        endIcon={<SendIcon/>}
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2, maxWidth: '25%'}}
                    >
                        Search
                    </LoadingButton>
                </DialogActions>
            </form>
        </Dialog>
    );
}

export default FormDialog;