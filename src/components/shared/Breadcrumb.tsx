import { Grid } from '@material-ui/core';
import { Home } from '@mui/icons-material';
import { Breadcrumbs } from '@mui/material';
import Link from 'next/link';
import React, { ReactNode } from 'react';

const Breadcrumb = ({ links }: { links: {href:string,title:string, icon:ReactNode}[] }) => {
    return (
        <Grid className=' py-3'>
        <Breadcrumbs  aria-label="breadcrumb">
            {
                links.map( (link:{href:string,title:string, icon:ReactNode}) => 
                  <Link
                       key={link.title} 
                        style={{ display: 'flex', alignItems: 'center' }}
                        color="inherit"
                        href={link.href}
                    >
                       {link.icon}
                        {link.title}
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