import { Grid } from "@material-ui/core";
import { Alert, AlertTitle, Button } from "@mui/material";

const MUIDataAlert = ({ title, button, btnTxt = '', btnHref = '' }: { title: string, button: boolean, btnTxt: string, btnHref: string }) => {
    return (
        <Grid style={{border:2}} item lg={12} >
            <Alert severity="info">
                <AlertTitle>{title}</AlertTitle>{
                    button && <Button href={btnHref} color="error" variant="contained">{btnTxt}</Button>
                }
            </Alert>
        </Grid>
    );
};

export default MUIDataAlert;