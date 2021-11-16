import React, { Component } from 'react'

import '../App.css'
import MaterialTable from 'material-table'
import UserService from '../services/UserService'

const columns = [
    { title: "ID", field: "id" },
    { title: "First Name", field: "firstname" },
    { title: "Last Name", field: "lastname" },
    { title: "Email", field: 'email' },
    { title: "Role", field: 'userType' }
]

class UsersLIst extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
        }
    }
    componentDidMount() {
        console.log("properties: " + this.props);
        UserService.getUsers().then((res) => {
            this.setState({ users: res.data });
        });
    }

    render() {
        return (
            <>
                <div className="col-lg-12">
                    {/* <Link to={"/create-user"} className="btn btn-primary float-lg-end">
                        <Add />
                        Create User
                    </Link> */}
                    </div>
                   
                <div>
                    
                    </div>
                    <MaterialTable
                    title="All Users"
                        data={this.state.users}
                        columns={columns}
                        
                    // editable={{
                    // isDeleteHidden: (row) => row.firstname === "Super",
                    // isEditHidden: row => row.firstname === "Super",
                    // isDeletable: (row) => row.id % 2 === 0,
                    // onRowAdd: (newRow) =>  new Promise((resolve, reject)=>{
                    //     const updateRows= [...rowData, newRow]
                    //     setTimeout(()=>{
                    //         setRowData(updateRows)
                    //         resolve();
                    //     }, 2000)


                    // }),
                    // onRowDelete: () => (newdata) => {{this.deleteUser(this.state.users.id)}},
                    // onRowUpdate: () => (newdata) => {},
                    // }} 
                    />
                {/* </div > */}
            </>
        );
    }
}
export default UsersLIst