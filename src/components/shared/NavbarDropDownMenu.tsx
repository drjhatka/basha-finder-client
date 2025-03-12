"use client"
import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Link from 'next/link';
import {useDispatch, useSelector} from "react-redux";
import {removeUser} from "@/lib/actions/authSlice";
import {Divider, Grid2, Menu} from "@mui/material";
import {Logout} from "@mui/icons-material";import { Wrench } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function NavbarDropDownMenu() {
    const router = useRouter()
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    // @ts-ignore
    const authUser = useSelector(state => state.rootReducers.auth);
    console.log('aiuth', authUser)
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogOut =async () => {
        //remove user from redux state and clear cookies...
        dispatch(removeUser())
        router.push('/login')
    }

    return       <>
        <React.Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title="Account settings">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >

                        <Avatar sx={{ width: 32, background:'red', height: 32 }}>{ authUser?.email?.slice(0,1).toUpperCase()}</Avatar>
                    </IconButton>
                </Tooltip>

            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                slotProps={{
                    paper: {
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&::before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                { authUser ?
                    <Grid2><MenuItem onClick={handleClose}>
                    <Avatar /> Profile
                </MenuItem>
                <Divider />

                <MenuItem onClick={handleClose}>
                    <Settings /> Account
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogOut}>
                    <Logout /> Logout
                </MenuItem>
                
                </Grid2>:<Grid2>
            <MenuItem onClick={handleLogOut}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    LogIn
                </MenuItem>
                </Grid2>
            }
            </Menu>
        </React.Fragment>
        </>


}


