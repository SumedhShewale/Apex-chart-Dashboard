import { Alert, Snackbar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

function Notification() {
    const state: any = useSelector(state => state)
    let dispatch = useDispatch()

    const handleClose = (): void => {
        dispatch({ type: "Notify", payload: false })
    }

    return (
        <Snackbar open={state.notify} anchorOrigin={{ vertical: "top", horizontal: "center" }} autoHideDuration={5000} onClose={() => handleClose()}>
            <Alert onClose={() => handleClose()} severity="success" sx={{ width: '100%' }}>
                Campaign Added!
            </Alert>
        </Snackbar>
    );
}

export default Notification;