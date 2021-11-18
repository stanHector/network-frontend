import React, { Component } from "react";
import { CreateDowntimes } from "../services/DowntimeService"
import Topbar from "../components/topbar/Topbar"

class CreateDowntime extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: "",
      name: "",
      location: "",
      link: "",
      duration: "",
      // imgUrl: "",
      loading: false,

    }
    this.handleSelectLink = this.handleSelectLink.bind(this);
    this.changeDurationHandler = this.changeDurationHandler.bind(this);
    this.changeDateHandler = this.changeDateHandler.bind(this);
    // this.changeFileHandler = this.changeFileHandler.bind(this);

    this.addPeformance = this.addPeformance.bind(this);
  }

  addPeformance = (e) => {
    e.preventDefault();
    this.setState({ loading: true })
    let downtime = {
      userId: JSON.parse(localStorage.getItem('user'))?.id,
      date: this.state.date,
      name: JSON.parse(localStorage.getItem('user'))?.firstname,
      location: JSON.parse(localStorage.getItem('user'))?.states,
      link: this.state.link,
      duration: this.state.duration,
    };

    console.log("downtimes => " + JSON.stringify(downtime));

    // if (this.state.imgUrl) {
      if (this.state.date) {
        if (this.state.link) {
          if (this.state.duration) {
            CreateDowntimes(downtime).then((res) => {
              if (res === 'Request failed with status code 500') {
                alert('Network error')
                this.setState({ loading: false })
              } else {
                this.setState({ loading: false })
                this.props.history.push("/downtimes");
              }
              console.log({ res });
            });

          } else {
            alert("Please enter duration")
            this.setState({ loading: false })
          }

        } else {
          alert("Please select ISP")
          this.setState({ loading: false })
        }

      } else {
        alert("Please enter date!")
        this.setState({ loading: false })
      }
    // } else {
    //   alert("Upload an image")
    //   this.setState({ loading: false })
    // }
  };

  handleSelectLink = (event) => {
    this.setState({ link: event.target.value });
  };

  changeDateHandler = (event) => {
    this.setState({ date: event.target.value });
  };

  changeDurationHandler = (event) => {
    this.setState({ duration: event.target.value });
  };


  changeFileHandler = (event) => {
    this.setState({ imgUrl: event.target.value });
  };

  cancel() {
    this.props.history.push("/downtimes");
  }

  render() {

    return (
      <React.Fragment>
        <Topbar />
        <div className="col-lg-12" style={{ marginTop: "15px", }}>
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              <h3 className="text-center" style={{ margin: "10px", fontWeight: "bolder" }}> Create Downtime</h3>
              <div className="card-body">
                <form>
                  <div className="container">
                    <div className="form-group">
                      <label>Enter Date:</label>
                      <div className="col-12">
                        <input type="date" name="date" className="form-control" value={this.state.date} onChange={this.changeDateHandler} />
                      </div>

                      <div className="col-12" style={{ marginTop: "15px" }} >
                        <label className="visible">Link</label>
                        <select className="form-select" onChange={this.handleSelectLink}>
                          <option defaultValue> Select ISP</option>
                          <option link="1">Cool Link</option>
                          <option link="2">InfoPaQ</option>
                          <option link="3">BCN</option>
                        </select>
                      </div>
                      <label style={{ marginTop: "10px" }}> Duration in minutes</label>
                      <div className="col-sm-12">
                        <input type="number" name="duration" className="form-control" value={this.state.duration} onChange={this.changeDurationHandler} />
                      </div>

                      {/* <label style={{ marginTop: "10px" }}> Add Image</label>
                      <div className="col-sm-12">
                        <input type="file" name="image" className="form-control" value={this.state.imgUrl} onChange={this.changeFileHandler} />
                      </div> */}

                    </div>
                    <div className="form-row text-center" style={{ marginTop: "12px" }}>
                      <div className="col-12">
                        <button className="btn btn-success" onClick={this.addPeformance}>
                          {this.state.loading && <div class="spinner-border text-light" role="status"></div>}
                          Add CreateDowntime</button>
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

export default CreateDowntime