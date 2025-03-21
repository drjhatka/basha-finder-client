import { useBlockUserMutation } from '@/lib/api/userApi';
import { TUser } from '@/types';
import { Block } from '@mui/icons-material';
import { Avatar, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react';
import { toast } from 'sonner';

const AdminUserCardContainer = ({users}:{users:TUser[]|undefined}) => {
    const [blockUser] = useBlockUserMutation()
    const handleUserBlock =async(userId:string)=>{
        await blockUser(userId)
        toast.success('User Blocked!')
    }
    return (<TableContainer component={Paper}>
        <Table  aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className='mx-auto'></TableCell>
              <TableCell className='mx-auto'>User Name</TableCell>
              <TableCell className='text-center'>User Email</TableCell>
              <TableCell align="right">User Role</TableCell>
              {/* <TableCell align="right">User Address</TableCell> */}
              <TableCell colSpan={3} align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className='w-full border-2'>
            {users?.map((user:TUser) => (
              <TableRow
                key={user._id}
                //sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell color='info'><Avatar variant='square' /></TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell align="right">{user.email}</TableCell>
                <TableCell align="right">{user.role}</TableCell>
                <TableCell align="right">
                    <Button disabled={!user.isActive} onClick={()=>handleUserBlock(user._id as string)} startIcon={<Block></Block>} variant='outlined' color='error'>{!user.isActive?"Unblock":"Blocked"}</Button>
                </TableCell>
                <TableCell align="right">
                    <Button startIcon={<Block></Block>} variant='outlined' color='secondary'>Change Role</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
};

export default AdminUserCardContainer;