import React, { useState, useCallback } from 'react'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";


import { Auth } from "./components/Auth"
import CreateUser from "./components/CreateUser";
import UserList from "./components/UserList";
import UpdateUser from "./components/UpdateUser";
import ViewUser from "./components/ViewUser";
import CreateTicket from "./components/CreateTicket";
import TicketList from "./components/TicketList";
import Dashboard from './components/Dashboard';
import { history } from '../src/history'
import UpdateTicket from "./components/UpdateTicket";
import ViewTicket from "./components/ViewTicket";
import PerformanceList from "./components/PerformanceList";
import UsersList from "./components/UsersList"
import ULogin from "./components/ULogin"
import UserProfile from './components/userProfile/UserProfile'
import CreateDowntime from './components/CreateDowntime'
import DowntimeList from './components/DowntimeList';
import UpdateDowntime from './components/UpdateDowntime';
import ViewDowntime from './components/ViewDowntime'
import CreatePerformance from './components/CreatePerformance';
import UpdatePerformance from './components/UpdatePerformance';


function App() {
  const [user, setUser] = useState()
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  let route;
  if (isLoggedIn) {
    route = (
      <Switch>
        <Route exact path="/" component={() => (<ULogin user={user} updateUser={updateUser} />)}></Route>
        <Route path="/all-users" component={UsersList}></Route>
        {/* <Route path="/all-tickets" component={AssetsList}></Route> */}
        <Route path="/dashboard" component={Dashboard}></Route>
        <Route path="/users" component={UserList}></Route>
        <Route path="/create-user" component={CreateUser}></Route>
        <Route path="/update-user/:id" component={UpdateUser}></Route>
        <Route path='/view-user/:id' component={ViewUser}></Route>
        <Route path="/tickets" component={TicketList}></Route>
        <Route path="/create-ticket" component={CreateTicket}></Route>
        <Route path="/update-ticket/:id" component={UpdateTicket}></Route>
        <Route path='/view-ticket/:id' component={ViewTicket}></Route>
        <Route path="/update-downtime/:id" component={UpdateDowntime}></Route>
        <Route path="/update-performance/:id" component={UpdatePerformance}></Route>
        <Route path='/view-downtime/:id' component={ViewDowntime}></Route>
        <Route path="/create-downtime" component={CreateDowntime}></Route>
        <Route path="/downtimes" component={DowntimeList}></Route>
        <Route path='/my-profile/:id' component={UserProfile}></Route>
        <Route path='/create-performance' component={CreatePerformance}></Route>
        <Route path='/performance' component={PerformanceList}></Route>


        <Redirect to="/" />
      </Switch>
    )
  } else {
    route = (
      <Switch>
        <Route exact path="/" component={() => (<ULogin user={user} updateUser={updateUser} />)}></Route>
        <Redirect to="/" />
      </Switch>
    )
  }

  const updateUser = useCallback((newUser) => {
    setUser(newUser);
    if (newUser) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }, [])


  const logout = useCallback(
    () => {
      localStorage.removeItem("user")
      setIsLoggedIn(false)
    }, [])



  return (

    <Auth.Provider value={{ isLoggedIn: isLoggedIn, logout: logout, updateUser: updateUser }}>

      <div>
        {/* <Topbar /> */}
        <BrowserRouter history={history}>
          {/* <Route exact path="/" component={<ULogin user={user} updateUser={updateUser}/>}></Route> */}
          <div style={{ marginLeft: "12px" }}>
            {route}
          </div>
        </BrowserRouter>
      </div>
    </Auth.Provider>
  );
}

export default App;
