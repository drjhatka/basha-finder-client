'use client'
import React, {useState} from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import { Tabs, useMediaQuery, useTheme } from '@mui/material'
import {
    List,
    Menu
} from '@mui/material'

import {ApartmentTwoTone, Home, Info, Message} from '@mui/icons-material'
import CssBaseline from '@mui/material/CssBaseline'
import logo from '../../../public/logo.webp'
import Image from 'next/image'
import HideOnScroll from './HideOnScroll'
import NavbarDropDownMenu from './NavbarDropDownMenu'
import { useSelector } from 'react-redux'
import { RootState } from '@/lib/store'
import { createNavbarTab, generateListItemButton } from './navbar/navUtils'
import { usePathname } from 'next/navigation'
import { Grid } from '@material-ui/core'
import { IAuthState } from '@/lib/actions/authSlice'
import { User } from 'lucide-react'

const NavbarUI = () => {
    const pathname = usePathname(); // Get the current route

    const getTabValue = () => {
        switch (pathname) {
            case "/": return "1";
            case "/rentals": return "2";
            case "/about": return "3";
            case "/contact": return "4";
            default: return "1"; // Default to Home
        }
    };

    // @ts-expect-error event could be of any type
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget)
    }
    const [anchorElNav, setAnchorElNav] =useState(null)
    const authUser:IAuthState|null = useSelector((state:RootState) => state.rootReducers.auth) as IAuthState|null;
    
    const handleCloseNavMenu = () => {
        setAnchorElNav(null)
    }

    const theme = useTheme()
    const isMatch = useMediaQuery(theme.breakpoints.down('md'))
 
    return (
        <Grid style={{marginBottom:20}} >
            <CssBaseline />
             <HideOnScroll>
                <AppBar
                    className='navbar1'
                    style={{
                        borderRadius: '2px',
                        //background:'linear-gradient( 90deg, rgba(110, 55, 228, 0.65) 0%, rgba(80, 108, 177, 0.7) 100% )'
                    }}
                >
                    <Container >
                        <Toolbar disableGutters>
                            <Typography
                                variant='h6'
                                noWrap
                                component='a'
                                href='/'
                                sx={{
                                    mr: 2,
                                    display: { xs: 'none', md: 'flex' },
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    letterSpacing: '.3rem',
                                    color: 'inherit',
                                    textDecoration: 'none'
                                }}
                                className='cursorp'
                            >
                                <Avatar
                                    
                                    sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
                                    className='cursorp Tab8 animate__animated animate__backInLeft'
                                >
                                    <Image
                                        src={logo}
                                        style={{ width: '100%', height: 'auto' }}
                                        alt='logo'
                                        width={100}
                                        height={100}
                                        loading='lazy'
                                    />
                                </Avatar>
                            </Typography>

                            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                                <IconButton
                                    size='large'
                                    aria-label='account of current user'
                                    aria-controls='menu-appbar'
                                    aria-haspopup='true'
                                    onClick={handleOpenNavMenu}
                                    color='inherit'
                                >
                                    <MenuIcon />
                                </IconButton>
                            </Box>

                            <Typography
                                variant='h5'
                                noWrap
                                component='a'
                                href=''
                                sx={{
                                    mr: 2,
                                    display: { xs: 'flex', md: 'none' },
                                    flexGrow: 1,
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    letterSpacing: '.3rem',
                                    color: 'inherit',
                                    textDecoration: 'none'
                                }}
                            >
                                <Avatar
                                    // alt="logo"
                                    // src="https://res.cloudinary.com/dtvtphhsc/image/upload/fl_immutable_cache.preserve_transparency.progressive.sprite/v1693672396/logo_1_lk0neo.webp"
                                    sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}
                                >
                                    <Image
                                        src={logo}
                                        style={{ width: '100%', height: 'auto' }}
                                        alt='logo'
                                        width={100}
                                        height={100}
                                        loading='lazy'
                                    />
                                </Avatar>
                            </Typography>
                            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                                {
                                isMatch ? (
                                    <IconButton
                                        size='large'
                                        aria-label='account of current user'
                                        aria-controls='menu-appbar'
                                        aria-haspopup='true'
                                        onClick={handleOpenNavMenu}
                                        color='inherit'
                                    >
                                        <MenuIcon />
                                    </IconButton>
                                ) : (
                                    <>
                                        {/* LG ICONS */}
                                        <Tabs value={getTabValue()} centered sx= {{ 
                                            margin: 'auto', 
                                            "& .MuiTabs-indicator": {
                                            backgroundColor: "white", // Change the underline color to white
                                        } }}>
                                            { !authUser && createNavbarTab({value:'1',href:'/',title:'Home',icon:<Home/>})}
                                            { authUser && authUser.role=='tenant' && createNavbarTab({value:'1',href:'/tenant-dashboard',title:'Tenant Dashboard',icon:<Home/>})}
                                            { authUser && authUser.role=='landlord' && createNavbarTab({value:'1',href:'/landlord-dashboard',title:'Landlord Dashboard',icon:<Home/>})}
                                            {!authUser && createNavbarTab({value:'2',href:'/rentals',title:'Rental Listings',icon:<ApartmentTwoTone/>})}
                                            {!authUser && createNavbarTab({value:'3',href:'/about',title:'About Us',icon:<Info/>})}
                                            {!authUser && createNavbarTab({value:'4',href:'/contact',title:'Contact Us',icon:<Message/>})}
                                        </Tabs>
                                    </>
                                )}
                            </Box>

                            <Box sx={{ flexGrow: 0 }}>
                                
                                <NavbarDropDownMenu />

                                {/* Responsive DropDown Left Menus */}
                                <Menu
                                    id='menu-appbar-avatar'
                                    anchorEl={anchorElNav}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'right'
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top', // Adjust to match the new position
                                        horizontal: 'right'
                                    }}
                                    open={Boolean(anchorElNav)}
                                    onClose={handleCloseNavMenu}
                                    sx={{
                                        display: { xs: 'block', md: 'none' }
                                    }}
                                >

                                    {/* Responsive Menus List */}
                                    <List className='DrawerList w-64 '>
                                        {authUser?.role=='tenant' && generateListItemButton({href:'/tenant-dashboard',          icon:<Home/>,               text:'Tenant Dashboard',            handleCloseNavMenu:handleCloseNavMenu})}
                                        {authUser?.role=='landlord' && generateListItemButton({href:'/tenant-dashboard',          icon:<Home/>,               text:'Landlord Dashboard',            handleCloseNavMenu:handleCloseNavMenu})}
                                        {authUser?.role=='admin' && generateListItemButton({href:'/admin-dashboard',          icon:<Home/>,               text:'Landlord Dashboard',            handleCloseNavMenu:handleCloseNavMenu})}
                                        {!authUser && generateListItemButton({href:'/',          icon:<Home/>,               text:'Home',            handleCloseNavMenu:handleCloseNavMenu})}
                                        {!authUser && generateListItemButton({href:'/rentals',   icon:<ApartmentTwoTone/>,   text:'Rental Listings', handleCloseNavMenu:handleCloseNavMenu})}
                                        {!authUser && generateListItemButton({href:'/about',     icon:<Info/>,               text:'About Us',        handleCloseNavMenu:handleCloseNavMenu})}
                                        {!authUser && generateListItemButton({href:'/contact',   icon:<Message/>,            text:'Contact Us',      handleCloseNavMenu:handleCloseNavMenu})}
                                    </List>
                                </Menu>
                            </Box>
                        </Toolbar>
                    </Container>
                </AppBar>
            </HideOnScroll>
        </Grid>
    )
}

export default NavbarUI
