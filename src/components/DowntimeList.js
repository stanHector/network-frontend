
import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Visibility, Delete, Edit, Add } from '@material-ui/icons'
import '../App.css'
import DowntimeService from "../services/DowntimeService";
import { CSVLink } from "react-csv";

const headers = [
  { label: "Date", key: "date" },
  { label: "Name", key: "name" },
  { label: "location", key: "location" },
  { label: "ISP", key: "link" },
  { label: "Duration in Minutes", key: "duration" },
];

class DowntimeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: JSON.parse(localStorage.getItem('user'))?.state,
      downtimes: [],
    };
    this.csvLinkEl = React.createRef();

    this.createDowntime = this.createDowntime.bind(this);
    this.editDowntime = this.editDowntime.bind(this);
    this.deleteDowntime = this.deleteDowntime.bind(this);
    this.viewDowntime = this.viewDowntime.bind(this);
  }

  componentDidMount() {
    console.log("properties: " + this.props);
    DowntimeService.getDowntimes().then((res) => {
      this.setState({ downtimes: res.data });
    });
  }

  createDowntime() {
    this.props.history.push("/create-downtime");
  }

  deleteDowntime(id) {
    DowntimeService.deleteDowntime(id).then((res) => {
      this.setState({
        downtimes: this.state.downtimes.filter((downtime) => downtime.id !== id),
      });
    });
  }

  editDowntime(id) {
    this.props.history.push(`/update-downtime/${id}`);
  }

  viewDowntime(id) {
    this.props.history.push(`/view-downtime/${id}`);
  }

  cancel() {
    this.props.history.push("/dashboard");
  }

  render() {
    const user = JSON.parse(localStorage.getItem('user'));
    const users = JSON.parse(localStorage.getItem('user'))?.userType;
    const userType = user?.userType;
    const userLocation = user?.result?.states;
    const userDowntimes = this.state.downtimes.map((x) => x).filter((x) => x.location === userLocation);
    const data = userType !== 'User' ? this.state.downtimes : userDowntimes;
    const total = (this.state.downtimes.reduce((total, currentItem) => total = total + currentItem.duration, 0));
    console.log("total: " + total)

    const totalHours = (total * 1) / 60;
    console.log(totalHours)

    const footer = [
      { label: "Total Duration in hours ", key: { totalHours } }
    ]
    // const headers = [
    //   { label: "Date", key: "date" },
    //   { label: "Name", key: "name" },
    //   { label: "location", key: "location" },
    //   { label: "ISP", key: "link" },
    //   { label: "Duration in Minutes", key: "duration" },
    // ];


    const downloadReport = async () => {
      this.setState({ data: data }, () => {
        setTimeout(() => {
          this.csvLinkEl.current.link.click();
        });
      });
    }

    return (
      <>
        {/* <Topbar/> */}
        <div className="asset-list">
          <div className="row">
            <div className="top">
              <div className="topLeft">
                <span className="log" style={{ margin: "22px", }}>Downtimes</span>
              </div>
              <div className="topRight" style={{ color: "#2c3e50", fontWeight: "bold" }}>
                Total Duration: {totalHours} hours
              </div>
              <div className="topRight">
                <Link to={"/create-downtime"} style={{ margin: "10px" }} className="btn btn-primary float-lg-end">
                  <Add />
                  Create Downtime
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
                  <th>ISP</th>
                  <th>Duration in Minutes</th>
                  <th colSpan="3">Actions</th>
                </tr>
              </thead>
              <tbody style={{ textAlign: "center", fontSize: "12px" }}>
                {data?.map((downtime) => (
                  <tr key={downtime.id}>
                    <td>{downtime.id}</td>
                    <td>{downtime.date}</td>
                    <td>{downtime.name}</td>
                    <td>{downtime.location}</td>
                    <td>{downtime.link}</td>
                    <td>{downtime.duration}</td>
                    <td className="text-center"><Link to={`/update-downtime/${downtime.id}`} className="edit"><Edit /></Link></td>
                    <td className="text-center"><i onClick={() => this.deleteDowntime(downtime.id)} className="fa fa-trash" style={{ color: "red" }} ><Delete /> </i></td>
                    <td className="text-center"><Link to={`/view-downtime/${downtime.id}`} className="view" style={{ alignItem: "center", color: "green" }}> <Visibility /></Link> </td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
          <CSVLink
            headers={headers}
            footer={footer}
            filename="downtime_summary.xls"
            data={data}

            ref={this.csvLinkEl}
          />

          <div className="bottom">
            {
              users !== 'User' &&
              <div className="bottomLeft">
                <button className="button-40" role="button"
                  onClick={downloadReport}>Generate Report</button>
              </div>
            }

            <div className="bottomRight">
              <button className="button-40" role="button" onClick={this.cancel.bind(this)}>Cancel</button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default DowntimeList;