import React, { Component } from "react";
import UserService from "../services/UserService";
// import Topbar from "./topbar/Topbar";

class UpdateUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      firstname: "",
      lastname: "",
      email: "",
      userType: "",
    };

    this.changeFirstnameHandler = this.changeFirstnameHandler.bind(this);
    this.changeLastnameHandler = this.changeLastnameHandler.bind(this);
    this.changeEmailHandler = this.changeEmailHandler.bind(this);
    this.handleSelectUserType = this.handleSelectUserType.bind(this);

    this.updateUser = this.updateUser.bind(this);
  }

  componentDidMount() {
    UserService.getUserById(this.state.id).then((res) => {
      let user = res.data;
      this.setState({
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        userType: user.userType,
        //   states: user.states
      });
    })
  }

  updateUser = (e) => {
    e.preventDefault();
    let user = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      //   password: this.state.password,
      userType: this.state.userType,
      //   states: this.state.states,
    };
    console.log("user => " + JSON.stringify(user));

    UserService.updateUser(user, this.state.id).then((res) => {
      this.props.history.push("/dashboard");
    });
  };

  changeFirstnameHandler = (event) => {
    this.setState({ firstname: event.target.value });
  };

  changeLastnameHandler = (event) => {
    this.setState({ lastname: event.target.value });
  };

  changeEmailHandler = (event) => {
    this.setState({ email: event.target.value });
  };

  handleSelectUserType = (event) => {
    this.setState({ userType: event.target.value });
    console.log("usertype");
  };

  cancel() {
    this.props.history.push("/dashboard");
  }

  render() {
    return (
      <React.Fragment>
        {/* <Topbar/> */}
        <div className="container" style={{ marginTop: "15px", padding: "50px" }}>
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              <h3 className="text-center" style={{ margin: "15px" }}>Update User</h3>
              <div className="card-body">
                <form>
                  <div className="container">
                    <div className="form-group">
                      <label style={{ marginTop: "10px" }}> First Name </label>
                      <div className="col-sm-12">
                        <input placeholder=" " name="firstname" className="form-control" value={this.state.firstname} onChange={this.changeFirstnameHandler} />
                      </div>

                      <label style={{ marginTop: "10px" }}> Last Name </label>
                      <div className="col-sm-12">
                        <input placeholder=" " name="lastname" className="form-control" value={this.state.lastname} onChange={this.changeLastnameHandler} />
                      </div>

                      <label style={{ marginTop: "10px" }}> Email </label>
                      <div className="col-sm-12">
                        <input type="email" name="email" className="form-control" value={this.state.email} onChange={this.changeEmailHandler} />
                      </div>

                      {/* <label style={{ marginTop: "10px" }}> Password </label>
                      <div className="col-sm-12">
                        <input
                          type="password"
                          name="password"
                          className="form-control"
                          value={this.state.password}
                          onChange={this.changePasswordlHandler}
                        />
                      </div> */}

                      <div className="col-12" style={{ marginTop: "15px" }}>
                        <label className="visually-hidden">UserType</label>

                        <select className="form-select" onChange={this.handleSelectUserType}>
                          <option defaultValue> Select UserType</option>
                          <option userType="1">Admin</option>
                          <option userType="2">User</option>
                        </select>
                      </div>

                      {/* <div
                        className="col-12"
                        style={{ marginTop: "45px", marginBottom: "45px" }}
                      >
                        <label
                          className="visually-hidden"
                        >
                          State
                        </label>
                        <select
                          className="form-select"
                          onChange={this.handleSelectUserStates}
                        >
                          <option defaultValue> Select State</option>
                          <option states="1">Country Office</option>
                          <option states="2">Anambra</option>
                          <option states="3">Akwa Ibom</option>
                          <option states="4">Bayelsa</option>
                          <option states="5">Borno</option>
                          <option states="6">Cross-River</option>
                          <option states="7">Edo</option>
                          <option states="8">Lagos</option>
                        </select>
                      </div> */}
                    </div>

                    <div className="form-row text-center" style={{ marginTop: "12px" }} >
                      <div className="col-12">
                        <button className="btn btn-success" onClick={this.updateUser} >Update User </button>

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
export default UpdateUser;
