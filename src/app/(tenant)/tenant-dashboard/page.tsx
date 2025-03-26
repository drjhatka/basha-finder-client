"use client"
import TenantTabsContainer from "@/components/modules/tanant/TanantTabsContainer";
import { Grid } from "@material-ui/core";
import { useSearchParams } from "next/navigation";

const TenantDashboard =  () => {
    const params = useSearchParams()
    const tabIndex= params.get('tab')
    return (
        <Grid container>
            <TenantTabsContainer tab={tabIndex as string} />
        </Grid>
    );
};

export default TenantDashboard;