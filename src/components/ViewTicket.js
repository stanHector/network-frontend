
import React, { Component } from "react";
import TicketService from "../services/TicketService";
import Topbar from "../components/topbar/Topbar"

class ViewTicket extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            ticket: {
            },
        };
    }

    componentDidMount() {
        TicketService.getTicketById(this.state.id).then((res) => {
            this.setState({ ticket: res.data });
        });
    }
    cancel() {
        this.props.history.push("/tickets");
    }
    render() {
        return (
            <div>
                <Topbar/>
                <div className="card col-md-4 offset-md-4" style={{ marginTop: "22px",  }}>
                    <h3 className="text-center" style={{ marginTop: "22px", color:" darkblue " }}>View Ticket Detail</h3>
                    <div className="card-body">
                        <div className="container">
                            <div className="detail" style={{alignItems:"center", justifyContent: "center", border: "1px solid #ccc", display: "flex"}}>
                                <div style={{margin:"12px"}}><label>Day: </label></div>
                                <div style={{marginLeft:"5px"}}>{this.state.ticket.day}</div>
                            </div>
                        </div>
                        <hr/>
                        
                         <div className="card-body">
                            <div className="row">
                                <label style={{fontSize:"20px",  marginRight:"12px"}}>Date: 
                                <label style={{fontSize:"25px",marginLeft:"25px"}}>{this.state.ticket.date}</label> </label>
                            
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <label style={{fontSize:"20px", marginRight:"12px"}}>Name: 
                                <label style={{fontSize:"25px", marginLeft:"25px"}}>{this.state.ticket.name}</label> </label>
                            </div>
                        </div>

                        <div className="card-body">
                            <div className="row">
                                <label style={{fontSize:"20px",  marginRight:"12px"}}>Location: 
                                <label style={{fontSize:"25px", marginLeft:"25px"}}>{this.state.ticket.location}</label> </label>
                                
                            </div>
                        </div>

                        <div className="card-body">
                            <div className="row">
                                <label style={{fontSize:"20px",  marginRight:"12px"}}>Number of ServiceDesk Tickets Received: 
                                <label style={{fontSize:"25px", marginLeft:"25px"}}>{this.state.ticket.numberOfServiceDeskTicketsRecieved}</label></label>
                            </div>
                        </div>

                        <div className="card-body">
                            <div className="row">
                                <label style={{fontSize:"20px",  marginRight:"12px"}}>Number of ServiceDesk Tickets Resolved: 
                                <label style={{fontSize:"25px", marginLeft:"25px"}}>{this.state.ticket.numberOfServiceDeskTicketsResolved}</label></label>
                            </div>
                        </div>

                        <div className="card-body">
                            <div className="row">
                                <label style={{fontSize:"20px",  marginRight:"12px"}}>Number of Users on the Network: 
                                <label style={{fontSize:"25px", marginLeft:"25px"}}>{this.state.ticket.numberOfUsersOnTheNetwork}</label> </label>
                            </div>
                        </div>
                        <div className="text-center">
                            <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{ margin: "22px", alignSelf:"center" }}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ViewTicket;
