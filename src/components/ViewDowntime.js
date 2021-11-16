
import React, { Component } from "react";
import DowntimeService from "../services/DowntimeService";

class ViewDowntime extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            downtime: {
            },
        };
    }

    componentDidMount() {
        DowntimeService.getDowntimeById(this.state.id).then((res) => {
            this.setState({ downtime: res.data });
        });
    }
    cancel() {
        this.props.history.push("/downtimes");
    }
    render() {
        return (
            <div>
                <div className="card col-md-4 offset-md-4" style={{ marginTop: "22px", }}>
                    <h3 className="text-center" style={{ marginTop: "22px", color: " darkblue " }}>View Downtime Detail</h3>
                    <div className="card-body">
                        <div className="container">
                            <div className="detail" style={{ alignItems: "center", justifyContent: "center", border: "1px solid #ccc", display: "flex" }}>
                                <div style={{ margin: "12px" }}><label>Day: </label></div>
                                <div style={{ marginLeft: "5px" }}>{this.state.downtime.day}</div>
                            </div>
                        </div>
                        <hr />

                        <div className="card-body">
                            <div className="row">
                                <label style={{ fontSize: "20px", marginRight: "12px" }}>Date:
                                    <label style={{ fontSize: "25px", marginLeft: "25px" }}>{this.state.downtime.date}</label> </label>

                            </div>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <label style={{ fontSize: "20px", marginRight: "12px" }}>Name:
                                    <label style={{ fontSize: "25px", marginLeft: "25px" }}>{this.state.downtime.name}</label> </label>
                            </div>
                        </div>

                        <div className="card-body">
                            <div className="row">
                                <label style={{ fontSize: "20px", marginRight: "12px" }}>Location:
                                    <label style={{ fontSize: "25px", marginLeft: "25px" }}>{this.state.downtime.location}</label> </label>

                            </div>
                        </div>

                        <div className="card-body">
                            <div className="row">
                                <label style={{ fontSize: "20px", marginRight: "12px" }}>Link:
                                    <label style={{ fontSize: "25px", marginLeft: "25px" }}>{this.state.downtime.link}</label></label>
                            </div>
                        </div>

                        <div className="card-body">
                            <div className="row">
                                <label style={{ fontSize: "20px", marginRight: "12px" }}>Duration:
                                    <label style={{ fontSize: "25px", marginLeft: "25px" }}>{this.state.downtime.duration}</label></label>
                            </div>
                        </div>
                        <div className="text-center">
                            <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{ margin: "22px", alignSelf: "center" }}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ViewDowntime;
