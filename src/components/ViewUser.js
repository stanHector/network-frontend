import React, { Component } from "react";
import UserService from "../services/UserService";

class ViewUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      user: {

      },
    };
  }

  componentDidMount() {
    UserService.getUserById(this.state.id).then((res) => {
      this.setState({ user: res.data });
    });
  }

  cancel() {
    this.props.history.push("/dashboard");
  }

  render() {
    return (
      <div>
        <div
          className="card col-md-6 offset-md-3" style={{ marginTop: "22px" }}>
          <h3 className="text-center" style={{ marginTop: "22px" }}>View User Details</h3>
          <div className="card-body">
            <div className="row">
              <label>User Firstname: </label>
              <div>{this.state.user.firstname}</div>
            </div>
          </div>

          <div className="card-body">
            <div className="row">
              <label>User Lastname: </label>
              <div>{this.state.user.lastname}</div>
            </div>
          </div>

          <div className="card-body">
            <div className="row">
              <label>User Email: </label>
              <div>{this.state.user.email}</div>
            </div>
          </div>

          <div className="card-body">
            <div className="row">
              <label>User Location: </label>
              <div>{this.state.user.states}</div>
            </div>
          </div>

          <div className="card-body">
            <div className="row">
              <label>User UserType: </label>
              <div>{this.state.user.userType}</div>
            </div>
          </div>
          <div className="col-12 text-center">
            <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{ margin: "22px" }}>Cancel</button>
          </div>
        </div>
      </div>
    );
  }
}

export default ViewUser;
