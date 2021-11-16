import React, { useContext } from 'react'
import './sidebar.css'
import { People, VerifiedUser, ExitToApp, RecentActors, StarRateOutlined, GradientOutlined } from '@material-ui/icons'
import { Link, useHistory } from 'react-router-dom';
import { Auth } from '../Auth'


const Sidebar = ({ id }) => {
    const user = JSON.parse(localStorage.getItem('user'))?.userType;
    // const admin = JSON.parse(localStorage.getItem('Admin'))?.userType;
    const auth = useContext(Auth);
    const history = useHistory();

    const logOut = () => {
        auth.logout()
        history.push("/")
    }

    return (
        <div className="sidebar">
            <div className="sidbarWrapper">
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle" style={{fontWeight:"bolder", textAlign:"center", fontSize:"30px"}}>Dashboard</h3>
                    <ul className="sidebarList">
                        {/* <Link to={"/dashboard"} className="sidebarListItem">
                            <LineStyle className="sidebarIcon" />
                            Home
                        </Link> */}
                        {/* {
                            user !== 'User' &&
                            <li className="sidebarListItem">
                                <Timeline className="sidebarIcon" />
                                Analytics
                            </li>
                        } */}

                        <Link to={"/downtimes"} className="sidebarListItem">
                            <GradientOutlined className="sidebarIcon" />
                            Downtime
                        </Link>

                    
                        <Link to={"/tickets"} className="sidebarListItem" id={id}>
                            <VerifiedUser className="sidebarIcon" />
                            Ticket Summary
                        </Link>
                        
                        <Link to={"/performance"} className="sidebarListItem" id={id}>
                            <StarRateOutlined className="sidebarIcon" />
                            Network Performance
                        </Link>

                        {
                            user !== 'Admin' &&
                            <Link to={`/my-profile/${id}`} className="sidebarListItem">
                                <RecentActors className="sidebarIcon" />
                                Profile
                            </Link>
                        }
                         {
                            user !== 'User' &&
                            <Link to={"/users"} className="sidebarListItem">
                                <People className="sidebarIcon" />
                                Users
                            </Link>

                        }
                        {/* <li className="sidebarListItem">
                            <Report className="sidebarIcon" />
                            Report
                        </li> */}
                    </ul>

                    <Link to={"#"} onClick={logOut} style={{ margin: "10px" }} className="btn btn-primary float-lg-start">
                        <ExitToApp />
                        Logout
                    </Link>
                </div>
            </div>
        </div>
    )
    // }
}

export default Sidebar