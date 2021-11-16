import React, { Component } from "react";
import { CreatePerformances } from "../services/NetworkService"
import Topbar from "../components/topbar/Topbar"

class CreatePerformance extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: "",
      name: "",
      ratePerformance: "",
      location: "",
      ticketId: "",
      // image: "",
      loading: false,

    }
    this.changeTicketIdHandler = this.changeTicketIdHandler.bind(this);
    this.changeDateHandler = this.changeDateHandler.bind(this);
    // this.changeFileHandler = this.changeFileHandler.bind(this);
    this.changeRatePerformanceHandler = this.changeRatePerformanceHandler.bind(this)

    this.addPerformance = this.addPerformance.bind(this);
  }

  addPerformance = (e) => {
    e.preventDefault();
    this.setState({ loading: true })
    let performance = {
      userId: JSON.parse(localStorage.getItem('user'))?.id,
      date: this.state.date,
      name: JSON.parse(localStorage.getItem('user'))?.firstname,
      location: JSON.parse(localStorage.getItem('user'))?.states,
      ticketId: this.state.ticketId,
      ratePerformance: this.state.ratePerformance,
      // image: this.state.image,
    };


    console.log("performance => " + JSON.stringify(performance));

    if (this.state.ratePerformance) {
      if (this.state.date) {
        // if (this.state.ticketId) {
          CreatePerformances(performance).then((res) => {
            if (res === 'Request failed with status code 500') {
              alert('Network error')
              this.setState({ loading: false })
            } else {
              this.setState({ loading: false })
              this.props.history.push("/performance");
            }
            console.log({ res });
          });

        // } else {
        //   alert("Please enter ticketId")
        //   this.setState({ loading: false })
        // }

      } else {
        alert("Enter Date")
        this.setState({ loading: false })
      }
    } else {
      alert("Please rate performance!")
      this.setState({ loading: false })
    }
  };


  changeDateHandler = (event) => {
    this.setState({ date: event.target.value });
  };

  changeTicketIdHandler = (event) => {
    this.setState({ ticketId: event.target.value });
  };

  changeRatePerformanceHandler = (event) => {
    this.setState({ ratePerformance: event.target.value });
  }

  // changeFileHandler = (event) => {
  //   this.setState({
  //     image: event.target.value
  //   });
  // };

  cancel() {
    this.props.history.push("/performance");
  }

  render() {

    return (
      <React.Fragment>
        <Topbar />
        <div className="col-lg-12" style={{ marginTop: "15px", }}>
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              <h3 className="text-center" style={{ margin: "10px", fontWeight: "bolder" }}> Create Network Performance</h3>
              <div className="card-body">
                <form >
                  <div className="container">
                    <div className="form-group">
                      <label>Enter Date:</label>
                      <div className="col-12">
                        <input type="date" name="date" className="form-control" value={this.state.date} onChange={this.changeDateHandler} />
                      </div>
                      <label style={{ marginTop: "10px" }}>Rate Network Performance(%)</label>
                      <div className="col-sm-12">
                        <input type="text" name="duration" className="form-control" value={this.state.ratePerformance} onChange={this.changeRatePerformanceHandler} />
                      </div>

                      <label style={{ marginTop: "10px" }}>Backup Ticket ID</label>
                      <div className="col-sm-12">
                        <input type="text" name="duration" className="form-control" value={this.state.ticketId} onChange={this.changeTicketIdHandler} />
                      </div>

                      <label style={{ marginTop: "10px" }}>Backup Image (Meraki Screenshot)</label>
                      {/* <div className="col-sm-12">
                        <input type="file" name="image" className="form-control" accept="image/png, image/jpeg" onChange={this.changeFileHandler} />
                      </div> */}
                    </div>
                    <div className="form-row text-center" style={{ marginTop: "12px" }}>
                      <div className="col-12">
                        <button className="btn btn-success" onClick={this.addPerformance} enctype="multipart/form-data">
                          {this.state.loading && <div class="spinner-border text-light" role="status"></div>}
                          Add Network Performance</button>
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

export default CreatePerformance