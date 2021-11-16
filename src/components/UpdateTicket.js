import React, { Component } from "react";
import TicketService from "../services/TicketService";

class UpdateTicket extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            day: "",
            date: "",
            name: "",
            location: "",
            numberOfServiceDeskTicketsRecieved: "",
            numberOfServiceDeskTicketsResolved: "",
            numberOfUsersOnTheNetwork: "",
        
        };

        this.changeNumberOfServiceDeskTicketsRecievedHandler = this.changeNumberOfServiceDeskTicketsRecievedHandler.bind(this);
        this.changeNumberOfServiceDeskTicketsResolvedHandler = this.changeNumberOfServiceDeskTicketsResolvedHandler.bind(this);
        this.changeNumberOfUsersOnTheNetworkHandler = this.changeNumberOfUsersOnTheNetworkHandler.bind(this);

        this.updateTicket = this.updateTicket.bind(this);
    }

   componentDidMount() {
        TicketService.getTicketById(this.state.id).then((res) => {
            let ticket = res.data;
            this.setState({
                day: ticket.day,
                date: ticket.date,
                name: ticket.name,
                location: ticket.location,
                numberOfServiceDeskTicketsRecieved: ticket.numberOfServiceDeskTicketsRecieved,
                numberOfServiceDeskTicketsResolved: ticket.numberOfServiceDeskTicketsResolved,
                numberOfUsersOnTheNetwork: ticket.numberOfUsersOnTheNetwork,
            });

        })

    }


    updateTicket = (e) => {
        e.preventDefault();
        let ticket = {
            day: this.state.day,
            date: this.state.date,
            name: this.state.name,
            location: this.state.location,
            numberOfServiceDeskTicketsRecieved: this.state.numberOfServiceDeskTicketsRecieved,
            numberOfServiceDeskTicketsResolved: this.state.numberOfServiceDeskTicketsResolved,
            numberOfUsersOnTheNetwork: this.state.numberOfUsersOnTheNetwork,

        };

        TicketService.updateTicket(ticket, this.state.id).then((res) => {
            this.props.history.push("/tickets");
        });
    };

  changeNumberOfServiceDeskTicketsRecievedHandler = (event) => {
        this.setState({ numberOfServiceDeskTicketsRecieved: event.target.value });
    };

    changeNumberOfServiceDeskTicketsResolvedHandler = (event) => {
        this.setState({ numberOfServiceDeskTicketsResolved: event.target.value });
    };

    changeNumberOfUsersOnTheNetworkHandler = (event) => {
        this.setState({ numberOfUsersOnTheNetwork: event.target.value });
    };

    cancel() {
        this.props.history.push("/tickets");
    }

    render() {

        return (
            <>
                <div className="container" style={{ marginTop: "15px", padding: "50px" }}>
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            <h3 className="text-center" style={{ margin: "15px" }}>Update Ticket</h3>
                            <div className="card-body">
                                <form>
                                    <div className="container">
                                        <div className="form-group">
                                         
                                <div className="col-12" style={{ marginTop: "15px" }} >
                                        <label className="visible">Select Day</label>
                                        <select className="form-select" onChange={this.handleSelectDay}>
                                        <option defaultValue> Pick a Day</option>
                                        <option day="1">Monday</option>
                                        <option day="2">Tuesday</option>
                                        <option day="3">Wednesday</option>
                                        <option day="4">Thursday</option>
                                        <option day="5">Friday</option>
                                        <option day="6">Saturday</option>
                                        <option day="7">Sunday</option>
                                        </select>
                                    </div>
                                            <label style={{ marginTop: "10px" }}>  Number Of ServiceDesk Tickets Recieved </label>
                                            <div className="col-sm-12">
                                                <input name="numberOfServiceDeskTicketsReceived" className="form-control" value={this.state.numberOfServiceDeskTicketsRecieved} onChange={this.changeNumberOfServiceDeskTicketsRecievedHandler} />
                                            </div>
                                            <label style={{ marginTop: "10px" }}> Number Of ServiceDesk Tickets Resolved </label>
                                            <div className="col-sm-12">
                                                <input name="numberOfServiceDeskTicketsResolved" className="form-control" value={this.state.numberOfServiceDeskTicketsResolved} onChange={this.changeNumberOfServiceDeskTicketsResolvedHandler} />
                                            </div>


                                            <label style={{ marginTop: "10px" }}> Number Of Users On The Network </label>
                                            <div className="col-sm-12">
                                                <input name="numberOfUsersOnTheNetwork" className="form-control" value={this.state.numberOfUsersOnTheNetwork} onChange={this.changeNumberOfUsersOnTheNetworkHandler} />
                                            </div>
                                        </div>

                                        <div className="form-row text-center" style={{ marginTop: "12px" }} >
                                            <div className="col-12">
                                                <button className="btn btn-success" onClick={this.updateTicket} >Update Ticket </button>

                                                <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{ margin: "22px" }}>Cancel</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default UpdateTicket;
