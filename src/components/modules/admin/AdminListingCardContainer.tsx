import { IListing } from "@/types/listing";
import AdminListingCard from "./AdminListingCard";
import { Grid } from "@material-ui/core";

const AdminListingCardContainer = ({listings}:{listings:IListing[]}) => {
    return (
        <Grid container spacing={5}>
            {
                listings?.map((listing:IListing)=>{
                   return <Grid item key={listing._id}><AdminListingCard  listing={listing}></AdminListingCard></Grid>
                })
            }
        </Grid>
    );
};

export default AdminListingCardContainer;