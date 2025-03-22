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
import { useDispatch, useSelector } from "react-redux";
import { IAuthState, removeUser } from "@/lib/actions/authSlice";
import { Chip, Divider, Grid2, Menu } from "@mui/material";
import { ArrowDownward, Logout } from "@mui/icons-material";
import { useRouter } from 'next/navigation';
import { RootState } from '@/lib/store';

export default function NavbarDropDownMenu() {
    const router = useRouter()
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const authUser: IAuthState | null = useSelector((state: RootState) => state.rootReducers.auth) as IAuthState|null;

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogOut = async () => {
        //remove user from redux state and clear cookies...
        dispatch(removeUser())
        router.push('/login')
    }

    return <>
        <React.Fragment>
            {
                authUser ? <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                    <Tooltip title="Account settings">
                        <IconButton
                            onClick={handleClick}
                            size="small"
                            sx={{ ml: 2 }}
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                        >

                            <Chip
                                label={authUser?.name}
                                className='text-white bg-white'
                                style={{color:'red', background:'whitesmoke'}}
                                variant="outlined"
                                icon={<ArrowDownward/>}
                                
                            />
                            {/* <Avatar sx={{ width: 32, background: 'red', height: 32 }}>{authUser?.email?.slice(0, 10).toUpperCase()}</Avatar> */}
                        </IconButton>
                    </Tooltip>

                </Box> :
                    <Link href={'/login'} className='flex items-center'>
                        <ListItemIcon>
                            <Logout style={{ color: 'white' }} fontSize="large" />
                        </ListItemIcon>
                        LogIn
                    </Link>
            }

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
                {authUser ?
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

                    </Grid2> :
                    <Grid2>
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


