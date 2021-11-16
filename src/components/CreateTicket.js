import React, { Component } from "react";
import { CreateTickets } from "../services/TicketService"
import Topbar from "../components/topbar/Topbar"

class CreateTicket extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: "",
      name: "",
      location: "",
      numberOfServiceDeskTicketsRecieved: "",
      numberOfServiceDeskTicketsResolved: "",
      numberOfUsersOnTheNetwork: "",
      loading: false,

    };

    this.changeDateHandler = this.changeDateHandler.bind(this);
    this.changeNmberOfServiceDeskTicketsRecievedHandler = this.changeNmberOfServiceDeskTicketsRecievedHandler.bind(this);
    this.changeNmberOfServiceDeskTicketsResolvedHandler = this.changeNmberOfServiceDeskTicketsResolvedHandler.bind(this);
    this.changeNumberOfUsersOnTheNetworkHandler = this.changeNumberOfUsersOnTheNetworkHandler.bind(this);

    this.addTicket = this.addTicket.bind(this);
  }

  addTicket = (e) => {
    e.preventDefault();
    this.setState({ loading: true })
    let ticket = {
      userId: JSON.parse(localStorage.getItem('user'))?.id,
      date: this.state.date.toLocaleString().slice(0, 10),
      // date: new Date().toLocaleString().slice(0, 10),
      name: JSON.parse(localStorage.getItem('user'))?.firstname,
      location: JSON.parse(localStorage.getItem('user'))?.states,
      numberOfServiceDeskTicketsRecieved: this.state.numberOfServiceDeskTicketsRecieved,
      numberOfServiceDeskTicketsResolved: this.state.numberOfServiceDeskTicketsResolved,
      numberOfUsersOnTheNetwork: this.state.numberOfUsersOnTheNetwork,
    };

    if (this.state.date) {
      if (this.state.numberOfServiceDeskTicketsRecieved) {
        if (this.state.numberOfServiceDeskTicketsResolved) {
          if (this.state.numberOfUsersOnTheNetwork) {

            CreateTickets(ticket).then((res) => {
              if (res === 'Request failed with status code 500') {
                alert('Network error')
                this.setState({ loading: false })
              } else {
                this.setState({ loading: false })
                this.props.history.push("/tickets");
              }
              console.log({ res });
            });

          } else {
            alert("Please enter Number Of Users On The Network!")
            this.setState({ loading: false })
          }
        } else {
          alert("Please enter number of ServiceDesk tickets resolved!")
          this.setState({ loading: false })
        }

      } else {
        alert("Please enter number of ServiceDesk tickets recieved!")
        this.setState({ loading: false })
      }

    } else {
      alert("Please enter date!")
      this.setState({ loading: false })
    }
  };

  changeNmberOfServiceDeskTicketsRecievedHandler = (event) => {
    this.setState({ numberOfServiceDeskTicketsRecieved: event.target.value });
  };

  changeDateHandler = (event) => {
    this.setState({ date: event.target.value });
  };

  changeNmberOfServiceDeskTicketsResolvedHandler = (event) => {
    this.setState({ numberOfServiceDeskTicketsResolved: event.target.value });
  };

  changeNumberOfUsersOnTheNetworkHandler = (event) => {
    this.setState({ numberOfUsersOnTheNetwork: event.target.value });
  };

  cancel() {
    this.props.history.push("/tickets");
  }

  render() {
    // const userId = JSON.parse(localStorage.getItem('user')).name

    return (
      <React.Fragment>
        <Topbar />
        <div className="col-lg-12" style={{ marginTop: "15px", }}>
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              <h3 className="text-center" style={{ margin: "10px", fontWeight: "bolder" }}> Create Ticket Summary</h3>
              <div className="card-body">
                <form>
                  <div className="container">
                    <div className="form-group">
                      <label>Enter Date:</label>
                      <div className="col-12">
                        <input type="date" name="date" className="form-control" value={this.state.date} onChange={this.changeDateHandler} />
                      </div>

                      <label style={{ marginTop: "10px" }}> Number Of ServiceDesk Tickets Recieved </label>
                      <div className="col-sm-12">
                        <input type="number" name="numberOfServiceDeskTicketsRecieved" className="form-control" value={this.state.numberOfServiceDeskTicketsRecieved} onChange={this.changeNmberOfServiceDeskTicketsRecievedHandler} />
                      </div>
                      <label style={{ marginTop: "10px" }}> Number Of ServiceDesk Tickets Resolved </label>
                      <div className="col-sm-12">
                        <input type="number" name="numberOfServiceDeskTicketsResolved" className="form-control" value={this.state.numberOfServiceDeskTicketsResolved} onChange={this.changeNmberOfServiceDeskTicketsResolvedHandler} />
                      </div>
                      <label style={{ marginTop: "10px" }}> Number Of Users On The Network </label>
                      <div className="col-sm-12">
                        <input type="number" name="numberOfUsersOnTheNetwork" className="form-control" value={this.state.numberOfUsersOnTheNetwork} onChange={this.changeNumberOfUsersOnTheNetworkHandler} />
                      </div>
                    </div>
                    <div className="form-row text-center" style={{ marginTop: "12px" }}>
                      <div className="col-12">
                        <button className="btn btn-success" onClick={this.addTicket}>
                          {this.state.loading && <div class="spinner-border text-light" role="status"></div>}
                          Add Ticket Summary</button>

                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{ margin: "22px" }}>Cancel</button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default CreateTicket