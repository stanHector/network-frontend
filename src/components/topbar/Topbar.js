import React, { Component } from 'react'
import "./topbar.css"
import { LocationCitySharp } from '@material-ui/icons'

class Topbar extends Component {

    cancel() {
        this.props.history.push("/");
    }
    render() {
        const user = JSON.parse(localStorage.getItem('user'));
        const userLocation = user?.result?.states

        return (
            <div className="topbar">
                <div className="topbarWrapper">
                    <div className="topLeft">
                        <span className="logo" style={{ margin: "22px",  color: "blueviolet" }}>Network Performance And Downtime Reporting Tool</span>
                    </div>

                    <div className="topRight" style={{ marginRight: "12px", fontWeight:"bolder" }}>
                        <LocationCitySharp/> {userLocation}
                    </div>
                </div>

            </div>
        )
    }
}
export default Topbar