import React, { Component } from 'react';
import $ from 'jquery';
import '../../Js/validation.js';
import 'jquery-validation';
import UserService from "../../api/UserService";
import { EMAIL_ID, PHONE_NO, REALM, ROLE, PREFERRED_LANGUAGE, TITLE_USER_LIST, TITLE_ADD_USER, ACTIVE, LAST_LOGIN_DATE, FAILED_ATTEMPTS, BTN_EDIT, BTN_FAILED_ATTEMPTS, USERNAME } from '../../Labels.js'
import AuthenticationService from '../common/AuthenticationService.js';

const cache = {}
export default class UserListComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userList: []
        }
        this.editUser = this.editUser.bind(this);
        this.unlockAccount = this.unlockAccount.bind(this);
        this.addNewUser = this.addNewUser.bind(this);
    }

    componentDidMount() {
        AuthenticationService.setupAxiosInterceptors();
        UserService.getUserList()
            .then(response => {
                this.setState({
                    userList: response.data
                })
            })
            .catch(
                error => {
                    switch (error.message) {
                        case "Network Error":
                            this.setState({
                                message: error.message
                            })
                            break
                        default:
                            this.setState({
                                message: error.response.data.message
                            })
                            break
                    }
                }
            );
    }
    render() {
        return (
            <div className="userList">
                <p>{this.props.match.params.message}</p>
                <h1>{TITLE_USER_LIST}</h1>
                <div className="container">
                    <button className="btn btn-add"type="button" style={{ marginLeft: '-999px' }} onClick={this.addNewUser}>{TITLE_ADD_USER}</button><br /><br />
                    <div className="row">
                                        <div className="col-md-12 scrollable"></div>
                    <table className="table table-responsive" border="1" align="center">
                        <thead>
                            <tr>
                                <th>{REALM}</th>
                                <th>{USERNAME}</th>
                                <th>{EMAIL_ID}</th>
                                <th>{PHONE_NO}</th>
                                <th>{ROLE}</th>
                                <th>{PREFERRED_LANGUAGE}</th>
                                <th>{LAST_LOGIN_DATE}</th>
                                <th>{FAILED_ATTEMPTS}</th>
                                <th>{ACTIVE}</th>
                                <th>{BTN_EDIT}</th>
                                <th>{BTN_FAILED_ATTEMPTS}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.userList.map(
                                    user =>
                                        // <tr key={user.userId} onClick={() => this.editUser(user.userId)}>
                                        <tr key={user.userId} onClick={() => this.editUser(user)}>
                                            <td>{user.realm.realmCode}</td>
                                            <td>{user.username}</td>
                                            <td>{user.emailId}</td>
                                            <td>{user.phoneNumber}</td>
                                            <td>{user.role.roleName}</td>
                                            <td>{user.language.languageName}</td>
                                            <td>{user.lastLoginDate}</td>
                                            <td>{user.faildAttempts}</td>
                                            <td>{user.active.toString() == "true" ? "Active" : "Disabled"}
                                            </td>
                                            <td><button type="button" onClick={() => this.editUser(user)}>{BTN_EDIT}</button></td>
                                            <td><button type="button" onClick={(e) => { e.stopPropagation(); this.unlockAccount(user) }}>{BTN_FAILED_ATTEMPTS}</button></td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table></div>
                </div>

            </div>
        )
    }
    editUser(user) {
        this.props.history.push({
            pathname: "/editUser",
            state: { user: user }
        });
    }
    unlockAccount(user) {
        if (navigator.onLine) {
            UserService.unlockAccount(user)
                .then(response => {
                    this.props.history.push(`/userList/${response.data.message}`)
                    window.location.reload();
                })
                .catch(
                    error => {
                        switch (error.message) {
                            case "Network Error":
                                this.setState({
                                    message: error.message
                                })
                                break
                            default:
                                this.setState({
                                    message: error.response.data.message
                                })
                                break
                        }
                    }
                );
        } else {
            alert("You must be Online.")
        }
    }
    addNewUser() {
        if (navigator.onLine) {
            this.props.history.push(`/addUser`)
        } else {
            alert("You must be Online.")
        }
    }
}

