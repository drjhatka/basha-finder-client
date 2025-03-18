"use client"
import TenantTabsContainer from "@/components/modules/tanant/TanantTabsContainer";
import { Grid } from "@material-ui/core";

const TenantDashboard =  () => {
    return (
        <Grid container>
            <TenantTabsContainer/>
        </Grid>
    );
};

export default TenantDashboard;