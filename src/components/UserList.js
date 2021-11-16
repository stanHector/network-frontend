import React, { Component } from "react";
import UserService from "../services/UserService";
import { Link } from 'react-router-dom';
import { Visibility, Delete, Edit, Add } from '@material-ui/icons'
import '../App.css'

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      currentPage: 1,
      usersPerPage: 10
    };

    this.createUser = this.createUser.bind(this);
    this.editUser = this.editUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.viewUser = this.viewUser.bind(this);
  }

  componentDidMount() {
    console.log("properties: " + this.props);
    UserService.getUsers().then((res) => {
      this.setState({ users: res.data });
    });

  }

  deleteUser(id) {
    UserService.deleteUser(id).then((res) => {
      this.setState({
        users: this.state.users.filter((user) => user.id !== id),
      });
    });
  }
  changePage = (event) => {
    this.setState({
      [event.target.name]: parseInt(event.target.value),
    });
  };

  // firstPage = () => {
  //   if (this.state.currentPage > 1) {
  //     this.setState({
  //       currentPage: 1,
  //     });
  //   }
  // };

  // prevPage = () => {
  //   if (this.state.currentPage > 1) {
  //     this.setState({
  //       currentPage: this.state.currentPage - 1,
  //     });
  //   }
  // };

  // lastPage = () => {
  //   let usersLength = this.props.userData.users.length;
  //   if (
  //     this.state.currentPage < Math.ceil(usersLength / this.state.usersPerPage)
  //   ) {
  //     this.setState({
  //       currentPage: Math.ceil(usersLength / this.state.usersPerPage),
  //     });
  //   }
  // };

  // nextPage = () => {
  //   if (
  //     this.state.currentPage <
  //     Math.ceil(this.props.userData.users.length / this.state.usersPerPage)
  //   ) {
  //     this.setState({
  //       currentPage: this.state.currentPage + 1,
  //     });
  //   }
  // };

  editUser(id) {
    this.props.history.push(`/update-user/${id}`);
  }

  viewUser(id) {
    this.props.history.push(`/view-user/${id}`);
  }

  createUser() {
    this.props.history.push("/create-user");

  }

  cancel() {
    this.props.history.push("/dashboard");
  }

  render() {

    // const { users, currentPage, usersPerPage } = this.state;
    // const lastIndex = currentPage * usersPerPage;
    // const firstIndex = lastIndex - usersPerPage;
    // const currentUsers = users && users.slice(firstIndex, lastIndex);
    // const totalPages = users && users.length / usersPerPage;
    // const totalPage = Math.round(totalPages);

    return (
      <>
        <div className="list">
          <div className="row">
            {/* <div className="row"> */}
            <div className="top">
              <div className="topLeft">
                {/* <img src={imgs} alt="img-logo" className="topAvatar" /> */}
                <span className="log" style={{ margin: "22px", }}>Users</span>
              </div>

              <div className="topRight">
                <Link to={"/create-user"} style={{ margin: "10px" }} className="btn btn-primary float-lg-end">
                  <Add />
                  Create User
                </Link>
              </div>

            </div>
            <table className="table table-striped table-bordered">
              <thead style={{ textAlign: "center" }}>
                <tr >
                  {/* <th>Id</th> */}
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Location</th>
                  <th>Role</th>
                  <th colSpan="3">Action</th>
                </tr>
              </thead>
              <tbody style={{ textAlign: "center" }}>

                {
                  // users.length === 0 ?
                  //   <tr align="center">
                  //     <td colSpan="6">No Users Available</td>
                  //   </tr> :
                    this.state.users.map((user) => (
                      // <tr key={user.id}>
                      <tr key={user.id}>
                        {/* <td>{user.id}</td> */}
                        <td>{user.firstname}</td>
                        <td>{user.lastname}</td>
                        <td>{user.email}</td>
                        <td>{user.states}</td>
                        <td>{user.userType}</td>
                        <td className="text-center"><Link to={`/update-user/${user.id}`} className="fas fa-edit"><Edit /></Link></td>
                        <td className="text-center"><i onClick={() => this.deleteUser(user.id)} className="fa fa-trash" style={{ color: "red" }} ><Delete /> </i></td>
                        <td className="text-center"><Link to={`/view-user/${user.id}`} className="view" style={{ alignItem: "center", color: "green" }}> <Visibility /></Link> </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>

          <div className="bottomRight">
            <button id="foot"><button className="button-os" onClick={this.cancel.bind(this)}>Cancel</button></button>
          </div>
        </div>
      </>
    );
  }
}

export default UserList;
