
import {getListings} from "@/app/actions/ListingActions";
import ListingTabComponent from "@/components/modules/listing/ListingTabComponent";

const TenantDashboard =  async() => {
    //const [listings, setListings] = useState<IListing[] | []>([])
    "use server"
    const listings = await getListings();

    return (
        <div className={''}>
            <ListingTabComponent key={'listingTab'} listings={listings.data} />
        </div>
    );
};

export default TenantDashboard;