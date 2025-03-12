import { Slide, useScrollTrigger } from '@mui/material'
import React, { ReactElement } from 'react'

const HideOnScroll = ({ children }: { children: ReactElement }) => {
    const trigger = useScrollTrigger()
    return (
        <Slide appear={false} direction='down' in={!trigger}>
            {children}
        </Slide>
    )
}

export default HideOnScroll
