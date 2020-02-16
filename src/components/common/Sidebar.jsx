import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AuthenticatedRoute from "./AuthenticatedRoute.jsx";
import LoginComponent from "../home/LoginComponent.jsx";
import WelcomeComponent from "../home/WelcomeComponent";
import ErrorComponent from "../common/ErrorComponent";
import RegistrationComponent from "../user/RegistrationComponent";
import UserApprovalComponent from "../user/UserApprovalComponent";
import AddUserComponent from "../user/AddUserComponent.jsx";
import UserListComponent from "../user/UserListComponent.jsx";
import EditUserApprovalComponent from "../user/EditUserApprovalComponent";
import EditUserComponent from "../user/EditUserComponent.jsx";
import RoleListComponent from "../user/RoleListComponent.jsx";
import AddLanguageComponent from "../language/AddLanguageComponent.jsx"
import AddRoleComponent from "../user/AddRoleComponent.jsx";
import UpdateExpiredPasswordComponent from "../home/UpdateExpiredPasswordComponent.jsx";
import Layout from './Layout.js'

class Sidebar extends Component {
    render() {
        return (
            <div className="Sidebar">
                <Router basename="/palashSprint1">
                    <>
                        <Switch>
                            <Route path="/" exact component={LoginComponent} />

                            <Route path='/' render={(props) => <Layout {...props} /> } />
                            {/* <Route path="/login/:message" component={LoginComponent} /> */}
                            {/* <Route path="/addUser" component={AddUserComponent} /> */}
                            {/* <Route path="/userList" exact component={UserListComponent} /> */}
                            {/* <Route path="/userList/:message" component={UserListComponent} /> */}
                            {/* <Route path="/editUser" component={EditUserComponent} /> */}
                            {/* <Route path="/addRole" component={AddRoleComponent} /> */}
                            {/* <Route path="/roleList" component={RoleListComponent} /> */}
                            {/* <Route path="/roleList/:message" component={RoleListComponent} /> */}
                            {/* <Route path="/editRole" component={RoleListComponent} /> */}
                            {/* <AuthenticatedRoute path="/updateExpiredPassword" component={UpdateExpiredPasswordComponent} /> */}
                            {/* <AuthenticatedRoute path="/welcome" component={WelcomeComponent} /> */}
                            {/* <AuthenticatedRoute path="/registration" component={RegistrationComponent} /> */}
                            {/* <AuthenticatedRoute path="/listUserApproval/:message" component={UserApprovalComponent} /> */}
                            {/* <AuthenticatedRoute path="/listUserApproval" component={UserApprovalComponent} /> */}
                            {/* <AuthenticatedRoute path="/editUserApproval/:registrationId/:emailId" component={EditUserApprovalComponent} /> */}
                            <Route component={ErrorComponent} />

                        </Switch>
                    </>
                </Router>
            </div>
        );
    }

}

export default Sidebar;