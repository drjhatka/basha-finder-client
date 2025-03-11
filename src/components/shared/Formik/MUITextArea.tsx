import Grid from "@mui/material/Grid2";
import {TextareaAutosize} from "@mui/base";
import {InputLabel} from "@mui/material";

const MuiTextArea = ({id,name,placeholder}:{id:string,name:string,placeholder:string}) => {
    return (
        <Grid>
            <InputLabel sx={{marginBottom:2}} color={'warning'} >Enter a Brief Description</InputLabel>
            <TextareaAutosize
                placeholder={placeholder}
                minRows={5}
                id={id}
                name={name}
                title={id}

                style={{
                    width: "100%",
                    color:"red",
                    padding: "8px",
                    border: "2px solid green",
                    fontSize: "1rem",
                    boxShadow: '2px 2px 5px #000',
                    borderRadius: "4px",
                    transition: "border-color 0.15s ease-in-out",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#86b7fe")}
                onBlur={(e) => (e.target.style.borderColor = "#ccc")}
                /*sx={{
                    '--Textarea-focusedInset': 'var(--any, )',
                    '--Textarea-focusedThickness': '0.25rem',
                    '--Textarea-focusedHighlight': 'rgba(13,110,253,.25)',
                    '&::before': {
                        transition: 'box-shadow .15s ease-in-out',
                    },
                    '&:focus-within': {
                        borderColor: '#86b7fe',
                    },
                }}*/
            />
        </Grid>
    );
};

export default MuiTextArea;