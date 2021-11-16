import React, { Component } from "react";
import UserService from "../../services/UserService";
import './userProfile.css';
import avatar from '../../assets/useravatar.png'
import Topbar from "../topbar/Topbar";

class UserProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: JSON.parse(localStorage.getItem('user'))?.id,
            firstname: JSON.parse(localStorage.getItem('user'))?.firstname,
            lastname: JSON.parse(localStorage.getItem('user'))?.lastname,
            email: JSON.parse(localStorage.getItem('user'))?.email,
            // password: JSON.parse(localStorage.getItem('user'))?.password,
            states: JSON.parse(localStorage.getItem('user'))?.state,
            userType: JSON.parse(localStorage.getItem('user'))?.userType,
            loading: false,
        };

        this.changePasswordlHandler = this.changePasswordlHandler.bind(this);
        this.updateUser = this.updateUser.bind(this);
    }

    componentDidMount() {
        UserService.getUserById(this.state.id).then((res) => {
            this.setState({ user: res.data });
        });
    }

    updateUser = (e) => {
        e.preventDefault();
        this.setState({ loading: true })

        let user = {
            password: this.state.password,
        };
        if (this.state.password) {
            console.log("user ID profile:: " + this.state.id)
            console.log("user firstame profile:: " + this.state.firstname)
            console.log("user lastname profile:: " + this.state.lastname)
            console.log("user email profile:: " + this.state.email)
            // console.log("user => " + JSON.stringify(user.id));

            UserService.updateUsers(user, this.state.id).then((res) => {
                this.setState({ loading: false })
                this.props.history.push("/dashboard");

            });
        } else {
            alert("Password field must not be empty!")
            this.setState({ loading: false })
        }

    };

    changePasswordlHandler = (event) => {
        this.setState({ password: event.target.value });
    };

    cancel() {
        this.props.history.push("/dashboard");
    }

    render() {

        return (
            <React.Fragment>
                <Topbar />
                <div className="container" style={{ marginTop: "52px" }}>
                    <div className="row gutters">
                        <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                            <div className="card h-100">
                                <div className="card-body">
                                    <div className="account-settings">
                                        <div className="user-profile">
                                            <div className="user-avatar">
                                                <img src={avatar} alt="logo" />
                                            </div>
                                            <h5 className="user-name">{this.state.firstname}</h5>
                                            <h6 className="user-email" style={{ color: "#60C437" }}>{this.state.email}</h6>
                                        </div>
                                        <div className="about">
                                            <h5>Role</h5>
                                            <p style={{ color: "#60C437", fontSize: "20px" }}>{this.state.userType}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
                            <div className="card h-100">
                                <div className="card-body">
                                    <div className="row gutters">
                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                            <h6 className="mb-2 text-primary">Personal Details</h6>
                                        </div>
                                        {/* <div className="container"> */}
                                        <div className="form-group">
                                            <label style={{ marginTop: "10px" }}> First Name </label>
                                            <div className="col-sm-12">
                                                <div style={{ color: "#60C437" }}>{this.state.firstname}</div>
                                            </div>

                                            <label style={{ marginTop: "10px" }}> Last Name </label>
                                            <div className="col-sm-12">
                                                <div style={{ color: "#60C437" }}>{this.state.lastname}</div>
                                            </div>

                                            <label style={{ marginTop: "10px" }}> Email </label>
                                            <div className="col-sm-12">
                                                <div style={{ color: "#60C437" }}>{this.state.email}</div>
                                            </div>

                                            <label style={{ marginTop: "10px" }}> Password </label>
                                            <div className="col-sm-12">
                                                <input type="password" name="password" className="form-control" value={this.state.password} onChange={this.changePasswordlHandler} />
                                            </div>
                                        </div>
                                        <div className="form-row text-center" style={{ marginTop: "12px" }}>
                                            <div className="col-12">
                                                <button className="btn btn-success" onClick={this.updateUser} disabled={this.state.loading}>
                                                    {this.state.loading && <div className="spinner-border text-light" role="status"></div>}
                                                    Update Password
                                                </button>

                                                <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{ margin: "22px" }}>Cancel</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
export default UserProfile