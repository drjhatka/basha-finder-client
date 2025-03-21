import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Stack,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { IListing } from "@/types/listing";

const AdminListingCard = ({ listing }:{listing:IListing}) => {
  return (
    <Card sx={{ width: "25vw", minWidth: "20vw", borderRadius: 3, boxShadow: 3, p: 2 }}> 
      <CardContent>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          {listing.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          📍 {listing.location}
        </Typography>
        <Typography variant="h6" color="primary" fontWeight="bold" mt={1}>
          Rent: ${listing.rent}
        </Typography>
        <Typography variant="body2" color="text.secondary" mt={1}>
          Landlord: {listing.landlordId}
        </Typography>
        <Stack direction="row" spacing={1} mt={2} flexWrap="wrap">
          {listing?.amenities?.map((amenity, index) => (
            <Chip key={index} label={amenity} variant="outlined" size="small" />
          ))}
        </Stack>
      </CardContent>
      <CardActions sx={{ justifyContent: "space-between" }}>
        <Box>
          <Button
            size="small"
            color="primary"
            variant="contained"
            sx={{ boxShadow: 2 }}
            startIcon={<VisibilityIcon />}
            onClick={()=>{}}
          >
            View
          </Button>
          <Button
            size="small"
            color="secondary"
            variant="contained"
            sx={{ boxShadow: 2 }}
            startIcon={<EditIcon />}
            onClick={()=>{}}
          >
            Edit
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

export default AdminListingCard;