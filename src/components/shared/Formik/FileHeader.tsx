import { Grid } from '@material-ui/core';
import React from 'react';
import {Button} from "@mui/material";

export interface FileHeaderProps {
    file: File;
    onDelete: (file: File) => void;
}

export function FileHeader({ file, onDelete }: FileHeaderProps) {
    return (
        <Grid container justify="space-between" alignItems="center">
            <Grid item>{file.name}</Grid>
            <Grid component={'div'} item style={{marginTop:5}}>
                <Button variant={'contained'} color={'error'} size="small" onClick={() => onDelete(file)}>
                    Delete
                </Button>
            </Grid>
        </Grid>
    );
}