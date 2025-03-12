'use client'

import React, {useState} from 'react'
import Link from 'next/link' // Import the Link component from Next.js
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import { Tabs, Tab, useMediaQuery, useTheme } from '@mui/material'
import InfoIcon from '@mui/icons-material/Info'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import TimelineIcon from '@mui/icons-material/Timeline'
import AddReactionIcon from '@mui/icons-material/AddReaction'
import ContactMailIcon from '@mui/icons-material/ContactMail'
import {
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Menu
} from '@mui/material'

import {ApartmentTwoTone, Dashboard, Home} from '@mui/icons-material'
import CssBaseline from '@mui/material/CssBaseline'
import logo from '../../../public/logo.svg'
import Image from 'next/image'
import HideOnScroll from './HideOnScroll'
import NavbarDropDownMenu from './NavbarDropDownMenu'

const NavbarUI = () => {

    // @ts-expect-error event could be of any type
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget)
    }
    const [anchorElNav, setAnchorElNav] =useState(null)

    const handleCloseNavMenu = () => {
        setAnchorElNav(null)
    }

    const theme = useTheme()
    const isMatch = useMediaQuery(theme.breakpoints.down('md'))
 
    return (
        <>
            <CssBaseline />
                <AppBar
                    className='navbar1'
                    style={{
                        width: '93.5%',
                        right: '3.2%',
                        borderRadius: '2px',
                        background:
                            'linear-gradient( 90deg, rgba(110, 55, 228, 0.65) 0%, rgba(80, 108, 177, 0.7) 100% )'
                    }}
                >
                    <Container maxWidth='xl' >
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
                                {' '}
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
                                {isMatch ? (
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
                                        <Tabs value={'1'} centered sx={{ margin: 'auto' }}>
                                            <Link href={'/'}  >
                                            <Tab
                                                value='1'
                                                label={
                                                    <p>
                                                        <Home /> Home
                                                    </p>
                                                }
                                            
                                                style={{
                                                    textDecoration: 'none',
                                                    color: 'white'
                                                }}
                                                className='Tab1 animate__animated animate__zoomIn'
                                            />
                                        </Link>




                                            <Tab
                                                value='4'
                                                label={
                                                    <p>
                                                        <Link
                                                            href='/home/rentals'
                                                            style={{
                                                                textDecoration: 'none',
                                                                color: 'white'
                                                            }}
                                                        >
                                                            <ApartmentTwoTone /> Rental Listings
                                                        </Link>
                                                    </p>
                                                }
                                                className='Tab3 animate__animated animate__zoomIn'
                                            />

                                            <Tab
                                                value='5'
                                                label={
                                                    <p>
                                                        <Link
                                                            href='/blogs'
                                                            style={{
                                                                textDecoration: 'none',
                                                                color: 'white'
                                                            }}
                                                        >
                                                            {' '}
                                                            <Dashboard /> Dashboard
                                                        </Link>
                                                    </p>
                                                }
                                                className='Tab5 animate__animated animate__zoomIn'
                                            />
                                            <Tab
                                                value='2'
                                                label={
                                                    <Link
                                                        href='/'
                                                        style={{
                                                            textDecoration: 'none',
                                                            color: 'white',
                                                            opacity: '1'
                                                        }}
                                                    >
                                                        <p>
                                                            {' '}
                                                            <InfoIcon  /> About Us
                                                        </p>
                                                    </Link>
                                                }
                                                className='Tab2 animate__animated animate__zoomIn'
                                            ></Tab>
                                            <Tab
                                                value='6'
                                                label={
                                                    <p>
                                                        <Link
                                                            href='/contact'
                                                            style={{
                                                                textDecoration: 'none',
                                                                color: 'white'
                                                            }}
                                                        >
                                                            <ContactMailIcon /> Contact
                                                        </Link>
                                                    </p>
                                                }
                                                className='Tab6 animate__animated animate__zoomIn'
                                            />
                                        </Tabs>
                                    </>
                                )}
                            </Box>

                            <Box sx={{ flexGrow: 0 }}>
                                <NavbarDropDownMenu />

                                {/* Responsive DropDown Menus */}
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
                                    <List className='DrawerList w-56 '>
                                        <ListItemButton>
                                            <ListItemIcon>
                                                <Home />
                                            </ListItemIcon>
                                            <ListItemText
                                                style={{ textDecoration: 'none', color: 'red' }}
                                                primary={'Home'}
                                                onClick={() => {
                                                    window.location.href = '/'
                                                }}
                                            />
                                        </ListItemButton>

                                        <ListItemButton className='bg-slate-300 '>
                                            <ListItemIcon>
                                                <InfoIcon />
                                            </ListItemIcon>
                                            <Link
                                                href='/'
                                                style={{ textDecoration: 'none', color: 'red' }}
                                            >
                                                <ListItemText
                                                    onClick={handleCloseNavMenu}
                                                    primary={'About'}
                                                />{' '}
                                            </Link>
                                        </ListItemButton>

                                        <ListItemButton>
                                            <ListItemIcon>
                                                <ManageAccountsIcon />
                                            </ListItemIcon>
                                            <Link
                                                href='/skills'
                                                style={{ textDecoration: 'none', color: 'red' }}
                                            >
                                                <ListItemText
                                                    onClick={handleCloseNavMenu}
                                                    primary={'Skills'}
                                                />
                                            </Link>
                                        </ListItemButton>
                                        <ListItemButton>
                                            <ListItemIcon>
                                                <TimelineIcon />
                                            </ListItemIcon>
                                            <Link
                                                href='dashboard/projects/create'
                                                style={{ textDecoration: 'none', color: 'red' }}
                                            >
                                                <ListItemText
                                                    onClick={handleCloseNavMenu}
                                                    primary={'Projects'}
                                                />
                                            </Link>
                                        </ListItemButton>
                                        <ListItemButton>
                                            <ListItemIcon>
                                                <AddReactionIcon />
                                            </ListItemIcon>
                                            <Link
                                                href='/blogs'
                                                style={{ textDecoration: 'none', color: 'red' }}
                                            >
                                                <ListItemText
                                                    onClick={handleCloseNavMenu}
                                                    primary={'Blogs'}
                                                />
                                            </Link>
                                        </ListItemButton>
                                        <ListItemButton>
                                            <ListItemIcon>
                                                <ContactMailIcon />
                                            </ListItemIcon>
                                            <Link
                                                href='/contact'
                                                style={{ textDecoration: 'none', color: 'red' }}
                                            >
                                                <ListItemText
                                                    onClick={handleCloseNavMenu}
                                                    primary={'Contact'}
                                                />
                                            </Link>
                                        </ListItemButton>
                                    </List>
                                </Menu>
                            </Box>
                        </Toolbar>
                    </Container>
                </AppBar>
        </>
    )
}

export default NavbarUI
