"use client"
import AdminTabsContainer from "@/components/modules/admin/AdminTabsContainer";
import TenantTabsContainer from "@/components/modules/tanant/TanantTabsContainer";
import { Grid } from "@material-ui/core";

const LandlordDashboard =  () => {
    return (
        <Grid container>
            <AdminTabsContainer/>
        </Grid>
    );
};

export default LandlordDashboard;