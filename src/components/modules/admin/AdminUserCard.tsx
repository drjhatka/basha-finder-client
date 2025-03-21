import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Divider
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import BlockIcon from "@mui/icons-material/Block";
import UpdateIcon from "@mui/icons-material/Update";
import {  TUser } from "@/types";

const UserManagementCard = ({ user }:{user:TUser}) => {
  return (
    <Card sx={{ width: "30vw", minWidth: "22vw", borderRadius: 3, boxShadow: 3, p: 2 }}> 
      <CardContent>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          {user.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          📧 {user.email}
        </Typography>
        <Typography variant="body2" color="text.secondary" mt={1}>
          📞 {user.phone}
        </Typography>
        <Typography variant="body2" color="text.secondary" mt={1}>
          📍 {user.address}
        </Typography>
        <Typography variant="body2" color="primary" fontWeight="bold" mt={1}>
          Role: {user.role}
        </Typography>
        <Divider sx={{ my: 2 }} />
      </CardContent>
      <CardActions sx={{ justifyContent: "space-between" }}>
        <Box>
          <Button
            size="small"
            color="warning"
            variant="contained"
            sx={{ boxShadow: 2, mr: 1 }}
            startIcon={<BlockIcon />}
            onClick={()=>{}}
          >
            Block
          </Button>
          <Button
            size="small"
            color="primary"
            variant="contained"
            sx={{ boxShadow: 2 }}
            startIcon={<UpdateIcon />}
            onClick={()=>{}}
          >
            Update Status
          </Button>
        </Box>
        <Button
          size="small"
          color="error"
          variant="contained"
          sx={{ boxShadow: 2 }}
          startIcon={<DeleteIcon />}
          onClick={()=>{}}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default UserManagementCard;
