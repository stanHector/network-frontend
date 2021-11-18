import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Visibility, Delete, Edit, Add } from '@material-ui/icons'
import '../App.css'
import TicketService from "../services/TicketService";
import axios from 'axios'

const headers = [
    { label: "Date", key: "date" },
    { label: "Name", key: "name" },
    { label: "location", key: "location" },
    { label: "Tickets Recieved", key: "numberOfServiceDeskTicketsRecieved" },
    { label: "Tickets Resolved", key: "numberOfServiceDeskTicketsResolved" },
    { label: "Number of Users on the Network", key: "numberOfUsersOnTheNetwork" },
];

class TicketsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: JSON.parse(localStorage.getItem('user'))?.state,
            tickets: [],
            currentPage: 1,
            recordPerPage: 5,

        };

        this.csvLinkEl = React.createRef();

        this.createTicket = this.createTicket.bind(this);
        this.editTicket = this.editTicket.bind(this);
        this.deleteTicket = this.deleteTicket.bind(this);
        this.viewTicket = this.viewTicket.bind(this);
    }

    // componentDidMount() {
    //   console.log("properties: " + this.props);
    //   TicketService.getTickets().then((res) => {
    //     this.setState({ tickets: res.data.tickets });
    //   });
    // }
    componentDidMount() {
        this.getTicketsByPagination(this.state.currentPage);
    }
    getTicketsByPagination(currentPage) {
        currentPage = currentPage - 1;
        axios.get("https://network-performance.netlify.app/tickets?page=" + currentPage + "&size=" + this.state.recordPerPage)
            .then(response => response.data).then((data) => {
                this.setState({
                    tickets: data.content,
                    totalPages: data.totalPages,
                    totalElements: data.totalElements,
                    currentPage: data.number + 1
                });
            });
    }
    //Writing All the pagination functions
    //Show Next page
    showNextPage = () => {
        if (this.state.currentPage < Math.ceil(this.state.totalElements / this.state.recordPerPage)) {
            this.getTicketsByPagination(this.state.currentPage + 1);
        }
    };
    //Show Last Page
    showLastPage = () => {
        if (this.state.currentPage < Math.ceil(this.state.totalElements / this.state.recordPerPage)) {
            this.getTicketsByPagination(Math.ceil(this.state.totalElements / this.state.recordPerPage));
        }
    };
    //Show First page
    showFirstPage = () => {
        let firstPage = 1;
        if (this.state.currentPage > firstPage) {
            this.getTicketsByPagination(firstPage);
        }
    };
    //Show previous page
    showPrevPage = () => {
        let prevPage = 1
        if (this.state.currentPage > prevPage) {
            this.getTicketsByPagination(this.state.currentPage - prevPage);
        }
    };

    deleteTicket(id) {
        TicketService.deleteTicket(id).then((res) => {
            this.setState({
                tickets: this.state.tickets.filter((ticket) => ticket.id !== id),
            });
        });
    }

    editTicket(id) {
        this.props.history.push(`/update-ticket/${id}`);
    }

    viewTicket(id) {
        this.props.history.push(`/view-ticket/${id}`);
    }

    createTicket() {
        this.props.history.push("/create-ticket");

    }

    cancel() {
        this.props.history.push("/dashboard");
    }

    render() {
        const { tickets, currentPage, totalPages, recordPerPage } = this.state;
        const user = JSON.parse(localStorage.getItem('user'));
        const users = JSON.parse(localStorage.getItem('user'))?.userType;
        const userType = user?.userType;
        const userLocation = user?.result?.states
        const userTickets = this.state.tickets.map((x) => x).filter((x) => x.location === userLocation)
        const data = userType !== 'User' ? this.state.tickets : userTickets

        
        return (
            <div className="asset-list">
                {/* <Topbar /> */}
                <div className="row">
                    <div className="top">
                        <div >
                            <span className="logs"> All Tickets</span>
                        </div>
                    </div>

                    <table className="table table-striped table-bordered">
                        <thead style={{ textAlign: "center", fontSize: "13px" }}>
                            <tr>
                                <th>ID</th>
                                <th>Date</th>
                                <th>Name</th>
                                <th>Location</th>
                                <th>Tickets Recieved</th>
                                <th>Tickets Resolved</th>
                                <th>Network Users</th>
                                <th colSpan="3">Actions</th>
                            </tr>
                        </thead>
                        <tbody style={{ textAlign: "center", fontSize: "12px" }}>
                            {tickets.length === 0 ?
                                <tr align="center"><td colSpan="8">No Record Found</td></tr> :
                                data?.map((ticket, index) => (
                                    <tr key={ticket.id}>
                                        <td>{(recordPerPage * (currentPage - 1)) + index + 1}</td>
                                        <td>{ticket.id}</td>
                                        <td>{ticket.date}</td>
                                        <td>{ticket.name}</td>
                                        <td>{ticket.location}</td>
                                        <td>{ticket.numberOfServiceDeskTicketsRecieved}</td>
                                        <td>{ticket.numberOfServiceDeskTicketsResolved}</td>
                                        <td>{ticket.numberOfUsersOnTheNetwork}</td>
                                        <td className="text-center"><Link to={`/update-ticket/${ticket.id}`} className="edit"><Edit /></Link></td>
                                        <td className="text-center"><i onClick={() => this.deleteTicket(ticket.id)} className="fa fa-trash" style={{ color: "red" }} ><Delete /> </i></td>
                                        <td className="text-center"><Link to={`/view-ticket/${ticket.id}`} className="view" style={{ alignItem: "center", color: "green" }}> <Visibility /></Link> </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                    <table className="table">
                        <div style={{ float: 'left', fontFamily: 'monospace', color: '#0275d8' }}>
                            Page {currentPage} of {totalPages}
                        </div>
                        <div style={{ float: 'right' }}>
                            <div class="clearfix"></div>
                            <nav aria-label="Page navigation example">
                                <ul class="pagination">
                                    <li class="page-item"><a type="button" class="page-link" disabled={currentPage === 1 ? true : false} onClick={this.showPrevPage}>Previous</a></li>
                                    <li class="page-item"><a type="button" class="page-link" disabled={currentPage === 1 ? true : false} onClick={this.showFirstPage}>First</a></li>
                                    <li class="page-item"><a type="button" class="page-link" disabled={currentPage === totalPages ? true : false} onClick={this.showNextPage}>Next</a></li>
                                    <li class="page-item"><a type="button" class="page-link" disabled={currentPage === totalPages ? true : false} onClick={this.showLastPage}>Last</a></li>
                                </ul>
                            </nav>
                        </div>
                    </table>
                </div>
            </div>)}
}

export default TicketsList;