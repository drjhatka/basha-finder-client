import { Grid } from "@material-ui/core";
import { Alert, AlertTitle, Button } from "@mui/material";

const MUIDataAlert = ({ title, button, btnTxt = '', btnHref = '' }: { title: string, button: boolean, btnTxt: string, btnHref: string }) => {
    return (
            <Alert className="w-full  border-2" severity="info">
                <AlertTitle>{title}</AlertTitle>{
                    button && <Button href={btnHref} color="error" variant="contained">{btnTxt}</Button>
                }
            </Alert>
        
    );
};

export default MUIDataAlert;