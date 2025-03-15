import { Typography } from "@material-ui/core";
import { Grid2, ListItemButton, ListItemIcon, ListItemText, Tab } from "@mui/material"
import Link from "next/link";
import { ReactNode } from "react";

interface ITabAttributes {
    value:string;
    href:string;
    title:string;
    icon?:ReactNode;
}

interface IListItemAtrributes {
    href:string;
    text:string;
    icon?:ReactNode;
    handleCloseNavMenu: () => void;
}

export const createNavbarTab =({value,href, title, icon=null}:ITabAttributes)=>{
    return <Tab
                href={href}
                value={value}
                component={Link} // Ensure Tab behaves like a link
                label={ 
                        <p style={{color:"white", textDecoration:"none" }}>{icon}{title}</p>
                     }
                className='Tab2 animate__animated animate__zoomIn border-t-2' 
            />
}

export const generateListItemButton =({href, icon, text, handleCloseNavMenu}:IListItemAtrributes)=>{
    return <ListItemButton className='bg-slate-300 '>
        <ListItemIcon>
            {icon}
        </ListItemIcon>
        <Link href={href} style={{ textDecoration: 'none', color: 'red' }}>
            <ListItemText
                onClick={handleCloseNavMenu}
                primary={text}
            />
        </Link>
    </ListItemButton>
}