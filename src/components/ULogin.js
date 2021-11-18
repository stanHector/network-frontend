import React, { useState } from "react";
import axios from "axios";
import { useHistory } from 'react-router-dom';

const App = (props) => {
    const [isloading, setIsLoading] = useState(false)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const user = JSON.parse(localStorage.getItem('user'))?.status;

    console.log('Userprofile ' + user)
    const history = useHistory();

    const handleSubmit = async e => {
        e.preventDefault();
        setIsLoading(true)
        const user = { email, password };

        try {
            const { data } = await axios.post("https://network-performance.herokuapp.com/api/v1/login",
                user)
            if (data.status === 200) {
                props.updateUser(data)
                localStorage.setItem('user', JSON.stringify(data))
                setIsLoading(false)
                history.push({
                    pathname: "/dashboard",
                    state: {
                        id: data.id
                    }
                })

            }
        } catch (error) {
            if (error.message === 'Request failed with status code 404') alert('User does not exist');
            else if (error.message === 'Request failed with status code 500') alert('Password Mismatch')
            else {
                console.log(error.message)
            }
            setIsLoading(false)
        }
    };

    //if there's a user show the message below
    // if (user) return <Dashboard />


    // if there's no user, show the login form
    return (
        <div className="container" style={{ marginTop: "15px", padding: "50px" }}>
            <div className="row">
                <div className="card col-md-6 offset-md-3 offset-md-3">

                    <h3 className="text-center" style={{ margin: "15px" }}> Enter Login Details </h3>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <label style={{ marginTop: "10px" }} htmlFor="email">Enter Email: </label>
                            <div className="col-sm-12">
                                <input className="form-control" type="text" value={email} placeholder=" " onChange={({ target }) => setEmail(target.value)} />
                            </div>
                            <div>
                                <label style={{ marginTop: "10px" }} htmlFor="password">Enter Password: </label>
                                <div className="col-sm-12">
                                    <input className="form-control" type="password" value={password} placeholder=" " onChange={({ target }) => setPassword(target.value)} />
                                </div>
                            </div>
                            <div className="form-row text-center" style={{ marginTop: "12px", }}>
                                <div className="col-sm-12">
                                     <button className="button-40" role="button"
                                          type="submit" disabled={isloading}>
                                            {isloading && <div className="spinner-border text-light" role="status"></div>}
                                            Login
                                        </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default App;
