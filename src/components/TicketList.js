import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Visibility, Delete, Edit, Add } from '@material-ui/icons'
import '../App.css'
import TicketService from "../services/TicketService";
import { CSVLink } from "react-csv";

const headers = [
  { label: "Date", key: "date" },
  { label: "Name", key: "name" },
  { label: "location", key: "location" },
  { label: "Tickets Recieved", key: "numberOfServiceDeskTicketsRecieved" },
  { label: "Tickets Resolved", key: "numberOfServiceDeskTicketsResolved" },
  { label: "Number of Users on the Network", key: "numberOfUsersOnTheNetwork" },
];

class TicketList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: JSON.parse(localStorage.getItem('user'))?.state,
      tickets: [],

    };
    this.csvLinkEl = React.createRef();

    this.createTicket = this.createTicket.bind(this);
    this.editTicket = this.editTicket.bind(this);
    this.deleteTicket = this.deleteTicket.bind(this);
    this.viewTicket = this.viewTicket.bind(this);
  }

  componentDidMount() {
    console.log("properties: " + this.props);
    TicketService.getTickets().then((res) => {
      this.setState({ tickets: res.data });
    });
  }

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
    const user = JSON.parse(localStorage.getItem('user'));
    const users = JSON.parse(localStorage.getItem('user'))?.userType;
    const userType = user?.userType;
    const userLocation = user?.result?.states
    const userTickets = this.state.tickets.map((x) => x).filter((x) => x.location === userLocation)
    const data = userType !== 'User' ? this.state.tickets : userTickets

    const downloadReport = async () => {
      this.setState({ data: data }, () => {
        setTimeout(() => {
          this.csvLinkEl.current.link.click();
        });
      });
    }
    return (
      <div className="asset-list">
        {/* <Topbar /> */}
        <div className="row">
          <div className="top">
            <div className="topLeft">
              <span className="log" style={{ margin: "22px", }}>Tickets</span>
            </div>

            <div className="topRight">
              <Link to={"/create-ticket"} style={{ margin: "10px" }} className="btn btn-primary float-lg-end">
                <Add />
                Add Ticket Summary
              </Link>
            </div>
          </div>

          <table className="table table-striped table-bordered">
            <thead style={{ textAlign: "center", fontSize: "14px" }}>
              <tr>
                <th>Id</th>
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
              {data?.map((ticket) => (
                <tr key={ticket.id}>
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
        </div>

        <CSVLink
          headers={headers}
          filename="tickets_summary.xls"
          data={data}
          ref={this.csvLinkEl} />

        <div className="bottom">
          {
            users !== 'User' &&
            <div className="bottomLeft">
              <button id="foot"><button className="button-os" onClick={downloadReport}>Generate Report</button></button>
            </div>
          }

          <div className="bottomRight">
            <button id="foot"><button className="button-os" onClick={this.cancel.bind(this)}>Cancel</button></button>
          </div>
        </div>
      </div>)
  }
}

export default TicketList;