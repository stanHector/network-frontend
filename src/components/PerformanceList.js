
import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Delete, Add , Edit} from '@material-ui/icons';
// import { CloudUploadIcon } from '@material-ui/icons/CloudUpload';
import '../App.css'
import { CSVLink } from "react-csv";
import NetworkService from "../services/NetworkService";

const headers = [
    { label: "Id", key: "id" },
    { label: "Date", key: "date" },
    { label: "Name", key: "name" },
    { label: "Ticket Id", key: "ticketId" },
    { label: "Image", key: "imgUrl" },
    { label: "Performance Rate", key: "ratePerformance" },
];

class PerformanceList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: JSON.parse(localStorage.getItem('user'))?.state,
            performance: [],
        };
        this.csvLinkEl = React.createRef();

        this.createPerformance = this.createPerformance.bind(this);
        this.deletePerformance = this.deletePerformance.bind(this);
    }

    componentDidMount() {
        console.log("properties: " + this.props);
        NetworkService.getNetworkPerformance().then((res) => {
            this.setState({ performance: res.data });
        });
    }

    createPerformance() {
        this.props.history.push("/create-performance");
    }

    deletePerformance(id) {
        NetworkService.deletePerformance(id).then((res) => {
            this.setState({
                performance: this.state.performance.filter((performance) => performance.id !== id),
            });
        });
    }

    cancel() {
        this.props.history.push("/dashboard");
    }

    render() {
        const user = JSON.parse(localStorage.getItem('user'));
        const users = JSON.parse(localStorage.getItem('user'))?.userType;

        const userType = user?.userType;
        const userLocation = user?.result?.states;
        const userNetworks = this.state.performance.map((x) => x).filter((x) => x.location === userLocation);
        const data = userType !== 'User' ? this.state.performance : userNetworks;
        const downloadReport = async () => {
            this.setState({ data: data }, () => {
                setTimeout(() => {
                    this.csvLinkEl.current.link.click();
                });
            });
        }

        return (
            <>
                <div className="asset-list">
                    <div className="row">
                        <div className="top">
                            <div className="topLeft">
                                <span className="log" style={{ margin: "22px", }}>Network Performance</span>
                            </div>
                            <div className="topRight">
                                <Link to={"/create-performance"} style={{ margin: "10px" }} className="btn btn-primary float-lg-end">
                                    <Add />
                                    Create Network performance
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
                                    <th>Ticket Id</th>
                                    <th>Image</th>
                                    <th>Performance Rate (%)</th>
                                    <th colSpan="3">Actions</th>
                                </tr>
                            </thead>
                            <tbody style={{ textAlign: "center", fontSize: "12px" }}>
                                {data?.map((performance) => (
                                    <tr key={performance.id}>
                                        <td>{performance.id}</td>
                                        <td>{performance.date}</td>
                                        <td>{performance.name}</td>
                                        <td>{performance.location}</td>
                                        <td>{performance.ticketId}</td>
                                        <td>{performance.imgUrl}</td>
                                        <td>{performance.ratePerformance}</td>
                                        <td className="text-center"><Link to={`/update-performance/${performance.id}`} className="edit"><Edit /></Link></td>
                                        <td className="text-center"><i onClick={() => this.deletePerformance(performance.id)} className="fa fa-trash" style={{ color: "red" }} ><Delete /> </i></td>
                                        {/* <td className="text-center"><Link to={`/view-performance/${performance.id}`} className="view" style={{ alignItem: "center", color: "green" }}> <Visibility /></Link> </td> */}
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </div>
                    <CSVLink
                        headers={headers}
                        filename="performance_summary.xls"
                        data={data}
                        ref={this.csvLinkEl} />

                    <div className="bottom">
                        {
                            users !== 'User' &&
                            <div className="bottomLeft">
                                <button className="button-40" role="button"
                                    onClick={downloadReport}>Generate Report</button>
                            </div>
                        }
                        <div className="bottomRight">
                            <button className="button-40" role="button"
                               onClick={this.cancel.bind(this)}>Cancel</button>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default PerformanceList;