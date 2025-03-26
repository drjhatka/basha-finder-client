"use client"
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { IRequest } from '@/types/request';
import { format } from 'date-fns';
import { DataContext } from '@/context/DataContext';
import { IListing } from '@/types/listing';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Slide, Snackbar, Stack } from '@mui/material';
import { Apartment, ApartmentTwoTone, CalendarMonth, Cancel, Close, Delete, Edit, LocationOn, LocationOnSharp, Message, SignalCellular0BarOutlined } from '@mui/icons-material';
import { useCancelRequestMutation } from '@/lib/api/requestApi';
import { toast } from 'sonner';
import { Typography } from '@material-ui/core';
import { TransitionProps } from '@mui/material/transitions';
import { ShieldCloseIcon } from 'lucide-react';


export default function StickyHeadTable({ requestData, refetch }: { requestData: IRequest[], refetch: () => void }) {
    const dataContext = React.useContext(DataContext)
    const [open, setOpen] = React.useState(false)
    const [snackOpen, setSnackOpen] =React.useState(false)
    const [requestId, setRequestId] = React.useState<string|null>(null)
    const handleClose = () => {
        setOpen(false)
    }
    const getListing = (listingId: string) => {
        return dataContext?.listingData?.find((listing: IListing) => listing._id == listingId)
    }
   
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const [cancelRequest] = useCancelRequestMutation()

    
    const handleCancelRequest = async (requestId: string) => {
        //open confirmation dialog before cancelling
        setOpen(true)
        await cancelRequest(requestId)
        setOpen(false)
        setSnackOpen(true)
        //toast.error('Request Cancelled')
        refetch()
    }
    const action = (
        <React.Fragment>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={()=>setSnackOpen(false)}
          >
            <Close fontSize="small" />
          </IconButton>
        </React.Fragment>
      );
    return (
        <>
            <Snackbar
                open={snackOpen}
                anchorOrigin={{vertical:'top', horizontal:'right'}}
                autoHideDuration={2000}
                onClose={handleClose}
                message="Request Cancelled"
                action={action}
            />
            {/* Dialog with Slide Transition */}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
            >
                <Slide direction="up" in={open} mountOnEnter unmountOnExit>
                    <div>
                        <DialogTitle id="alert-dialog-title">Cancel Request</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Are you sure you want to cancel this request?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => handleCancelRequest(requestId as string)} color="error">
                                Yes, Cancel It!
                            </Button>
                            <Button onClick={handleClose} autoFocus>
                                Close
                            </Button>
                        </DialogActions>
                    </div>
                </Slide>
            </Dialog>
            <Box mb={3} borderBottom={2} textAlign={'center'} color={'white'} bgcolor={'steelblue'} py={2}>
                <Typography variant='h5' >List of Pending Requests</Typography>
            </Box>
            <Paper sx={{ width: '100%', overflow: 'auto' }} >
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow sx={{}}>
                                <TableCell sx={{ color: 'blueviolet' }}><ApartmentTwoTone /> Request Property Name</TableCell>
                                <TableCell sx={{ color: 'blueviolet' }}><LocationOnSharp />Location</TableCell>
                                <TableCell sx={{ color: 'blueviolet' }}><Message /> Message</TableCell>
                                <TableCell sx={{ color: 'blueviolet' }}> <CalendarMonth /> Move In Date</TableCell>
                                <TableCell sx={{ color: 'blueviolet' }}><SignalCellular0BarOutlined /> Status</TableCell>
                                <TableCell sx={{ textAlign: 'center', color: 'blueviolet' }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                !dataContext?.isLoading && requestData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((req, index) => {
                                        return (

                                            <TableRow hover role="checkbox" tabIndex={-1} key={req._id}
                                                sx={{
                                                    backgroundColor: index % 2 === 0 ? "azure" : "white",
                                                }}
                                            >
                                                <TableCell>
                                                    {/* @ts-ignore */}
                                                    {getListing(req?.listingId._id)?.title}
                                                </TableCell>
                                                <TableCell>
                                                    {/* @ts-ignore */}
                                                    {getListing(req?.listingId._id)?.location}

                                                </TableCell>
                                                <TableCell>
                                                    {req.message}
                                                </TableCell>

                                                <TableCell>
                                                    {format(new Date(req.moveInDate as Date), 'dd-MM-yyyy')}
                                                </TableCell>
                                                <TableCell>
                                                    {req.status}
                                                </TableCell>
                                                <TableCell >
                                                    <Stack spacing={2}>
                                                        <Button startIcon={<Edit></Edit>} variant='outlined' color='success' href={'/tenant-dashboard/updateRequest/' + req._id}>Edit</Button>
                                                        <Button onClick={() => { setOpen(true); setRequestId(req._id as string) }} startIcon={<Delete></Delete>} variant='outlined' color='error' >Cancel</Button>

                                                    </Stack>
                                                </TableCell>
                                            </TableRow>

                                        );
                                    })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={requestData?.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </>
    );
}
