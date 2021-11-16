import React, { Component } from 'react'
// import { DataGrid } from '@material-ui/data-grid';
import '../App.css'
import MaterialTable from 'material-table'
import TicketService from '../services/TicketService';

const columns = [
    { title: "Id", field: "id" },
    { title: "Date", field: "date" },
    { title: "Name", field: 'name' },
    { title: "Location", field: 'location' },
    { title: "SDesk Tickets Recieved", field: 'numberOfServiceDeskTicketsRecieved' },
    { title: "SDesk Tickets Resolved", field: "numberOfServiceDeskTicketsResolved" },
    { title: "Users On The Network", field: 'numberOfUsersOnTheNetwork' },
]

const TicketTitle = "All Tickets Summary";

class TicketsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tickets: [],
            isLoading: false
        }
    }

    componentDidMount() {
        console.log("properties: " + this.props);
        TicketService.getTickets().then((res) => {
            this.setState({ tickets: res.data });
        });
    }

    render() {
        const user = JSON.parse(localStorage.getItem('user'));
        // const users = JSON.parse(localStorage.getItem('user'))?.userType;
        const userType = user?.userType;
        const userLocation = user?.result?.states
        const userTickets = this.state.tickets.map((x) => x).filter((x) => x.location === userLocation);
        const data = userType !== 'User' ? this.state.tickets : userTickets
        return (
            <>
                <div style={{ fontSize: "10px" }}>
                    {this.state.isLoading ? (<div class="spinner-border text-primary dashboard-spinner" role="status"></div>)
                        : (
                            <MaterialTable title={TicketTitle} data={data} columns={columns} />
                        )}
                </div>
            </>
        );
    }
}
export default TicketsList