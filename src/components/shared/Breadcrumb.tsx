import { Grid } from '@material-ui/core';
import { Home } from '@mui/icons-material';
import { Breadcrumbs } from '@mui/material';
import Link from 'next/link';
import React from 'react';

const Breadcrumb = ({ links }: { links: string[] }) => {
    return (
        <Grid className=' py-3'>
        <Breadcrumbs  aria-label="breadcrumb">
            {
                links.map((link: string, index:number) => 
                  <Link
                        
                        style={{ display: 'flex', alignItems: 'center' }}
                        color="inherit"
                        href={link}
                    >
                       {index==0 && <Home sx={{ mr: 0.5 }} fontSize="inherit" />}
                        {link.toUpperCase()}
                    </Link>
                )
            }
{/* 
            <Typography
                sx={{ color: 'text.primary', display: 'flex', alignItems: 'center' }}
            >
                <GrainIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                Breadcrumb
            </Typography> */}
        </Breadcrumbs>
        </Grid>
    );
};

export default Breadcrumb;