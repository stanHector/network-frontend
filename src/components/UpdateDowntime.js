import React, { Component } from "react";
import DowntimeService from "../services/DowntimeService";

class UpdateDowntime extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            day: "",
            date: "",
            name: "",
            location: "",
            link: "",
            duration: "",

        };

        this.changeDurationHandler = this.changeDurationHandler.bind(this);
        this.handleSelectLink = this.handleSelectLink.bind(this);

        this.updateDowntime = this.updateDowntime.bind(this);
    }

    componentDidMount() {
        DowntimeService.getDowntimeById(this.state.id).then((res) => {
            let downtime = res.data;
            this.setState({
                day: downtime.day,
                date: downtime.date,
                name: downtime.name,
                location: downtime.location,
                link: downtime.link,
                duration: downtime.duration,
            });

        })

    }


    updateDowntime = (e) => {
        e.preventDefault();
        let downtime = {
            day: this.state.day,
            date: this.state.date,
            name: this.state.name,
            location: this.state.location,
            link: this.state.link,
            duration: this.state.duration,

        };

        DowntimeService.updateDowntime(downtime, this.state.id).then((res) => {
            this.props.history.push("/downtimes");
        });
    };

    changeDurationHandler = (event) => {
        this.setState({ duration: event.target.value });
    };

    handleSelectLink = (event) => {
        this.setState({ link: event.target.value });
    };

    cancel() {
        this.props.history.push("/downtimes");
    }

    render() {

        return (
            <>
                <div className="container" style={{ marginTop: "15px", padding: "50px" }}>
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            <h3 className="text-center" style={{ margin: "15px" }}>Update Downtime</h3>
                            <div className="card-body">
                                <form>
                                    <div className="container">
                                        <div className="form-group">

                                            <div className="col-12" style={{ marginTop: "15px" }} >
                                                <label className="visible">Link</label>
                                                <select className="form-select" onChange={this.handleSelectLink}>
                                                    <option defaultValue> Select Link</option>
                                                    <option link="1">Cool Link</option>
                                                    <option link="2">InfoPaQ</option>
                                                    <option link="3">PCM</option>
                                                </select>
                                            </div>
                                            <label style={{ marginTop: "10px" }}> Duration </label>
                                            <div className="col-sm-12">
                                                <input type="number" name="duration" className="form-control" value={this.state.duration} onChange={this.changeDurationHandler} />
                                            </div>
                                        </div>

                                        <div className="form-row text-center" style={{ marginTop: "12px" }} >
                                            <div className="col-12">
                                                <button className="btn btn-success" onClick={this.updateDowntime} >Update Downtime </button>

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

export default UpdateDowntime;