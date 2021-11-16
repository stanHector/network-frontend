import './featuredInfo.css'
// import { PeopleOutline } from '@material-ui/icons'

export default function FeatureInfo({ isLoading, assets }) {
    // const user = JSON.parse(localStorage.getItem('user'));
    // const userType = user?.userType;
    // const userLocation = user?.result?.states
    // const checkout = assets?.map((x) => x.checkedAsset)?.filter((x) => x === 'Checked Out')
    // const userAssets = assets.map((x) => x.location).filter((x) => x === userLocation)
    // const userCheckedOutAsset = assets.filter(x => x.location === userLocation && x.checkedAsset === 'Checked Out')

    return (
        <>
            {/* {
                userType !== 'User' && */}
            <div className='featured'>

                {/* <div className="featuredItem" style={{ backgroundColor: "rgb(13, 96, 216)", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "right"}}>
                        <span className="featuredTitle"> Users</span>
                        <div className="text-right" style={{ textAlign: "right", marginTop: "45px" }}>
                            <span className="featuredMoney">000</span>
                        </div>
                    </div> */}


                <div className={isLoading ? "featuredLoading featuredItem" : "featuredItem"} style={{ backgroundColor: "rgb(176, 168, 158)", backgroundRepeat: "no-repeat", backgroundPosition: "right" }}>
                    {/* {
                        isLoading ? (<div class="spinner-border text-primary dashboard-spinner" role="status"></div>)
                            : (<>
                                <span className="featuredTitle"> Total Assets</span>
                                <div className="text-right" style={{ textAlign: "right", marginTop: "45px" }}>
                                    <span className="featuredMoney" style={{ color: "#ffffff" }}> {userType !== 'User' ? assets?.length : userAssets?.length}</span>
                                </div>
                                <div style={{ color: "#ffffff", fontSize: "18px", marginTop: "12px" }}>
                                    {userType === 'User' && <span>In {userLocation}</span>}
                                </div>
                            </>)
                    } */}
                </div>
                <div className={isLoading ? "featuredLoading featuredItem" : "featuredItem"} style={{ backgroundColor: "rgb(231, 180, 122)", backgroundRepeat: "no-repeat", backgroundPosition: "right" }}>
                    {/* {
                        isLoading ? (<div class="spinner-border text-primary dashboard-spinner" role="status"></div>)
                            : (<>
                                <span className="featuredTitle"> Total Checked-Out Assets</span>
                                <div className="text-right" style={{ textAlign: "right", marginTop: "45px" }}>
                                    <span className="featuredMoney" style={{ color: "#ffffff" }}>{userType !== 'User' ? checkout?.length : userCheckedOutAsset?.length}</span>
                                </div>
                                <div style={{ color: "#ffffff", fontSize: "18px", marginTop: "12px" }}>
                                    {userType === 'User' && <span>In {userLocation}</span>}
                                </div>
                            </>)
                    } */}

                </div>
            </div>
            {/* } */}
        </>
    )
}
