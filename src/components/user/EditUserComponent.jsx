import React, { Component } from 'react';
import $ from 'jquery';
import '../../Js/validation.js';
import 'jquery-validation';
import SignUpService from "../../api/SignUpService";
import UserService from "../../api/UserService";
import { EMAIL_ID, PHONE_NO, REALM, ROLE, PREFERRED_LANGUAGE, ACTIVE, BTN_UPDATE, BTN_CANCEL, TITLE_EDIT_USER, USERNAME } from '../../Labels.js'
import AuthenticationService from '../common/AuthenticationService.js';


export default class EditUserComponent extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            realms: [],
            languages: [],
            roles: [],
            user: '',
            'user.active': true
        }
        this.updateClicked = this.updateClicked.bind(this);
        this.cancelClicked = this.cancelClicked.bind(this);
        this.dataChange = this.dataChange.bind(this);

    }
    dataChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    componentDidMount() {
        AuthenticationService.setupAxiosInterceptors();
        this.setState({
            user: this.props.location.state.user
        });
        UserService.getRealmList()
            .then(response => {
                this.setState({
                    realms: response.data
                })
            }).catch(
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
        UserService.getLanguageList()
            .then(response => {
                this.setState({
                    languages: response.data
                })
            }).catch(
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
        UserService.getRoleList()
            .then(response => {
                this.setState({
                    roles: response.data
                })
            }).catch(
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

        $("#userForm").validate({
            ignore: [],
            rules: {
                'user.emailId': {
                    required: true,
                    email: true
                },
                'user.phoneNumber': {
                    required: true,
                    number: true
                },
                'username': {
                    required: true
                },
                'user.language.languageId': {
                    required: true
                },
                'user.role.roleId': {
                    required: true
                }
            },
            errorPlacement: function (error, element) {
                error.insertAfter(element);
            }
        });

    }
    dataChange(event) {
        let { user } = this.state
        [event.target.name] = event.target.value
        if (event.target.name === "user.realm.realmId") {
            user.realm.realmId = event.target.value
        }
        else if (event.target.name === "user.realm.realmId") {
            user.realm.realmId = event.target.value
        }
        else if (event.target.name === "user.role.roleId") {
            user.role.roleId = event.target.value
        }
        else if (event.target.name === "user.language.languageId") {
            user.language.languageId = event.target.value
        }
        else if (event.target.name === "user.emailId") {
            user.emailId = event.target.value
        }
        else if (event.target.name === "user.username") {
            user.username = event.target.value
        }
        else if (event.target.name === "user.phoneNumber") {
            user.phoneNumber = event.target.value
        }
        else if (event.target.name === "user.active") {
            user.active = event.target.id === "user.active2" ? false : true
        }

        this.setState({
            user
        }, (
        ) => {
            // console.log("state after update---",this.state.user)
        })
    }

    render() {
        const { realms } = this.state;
        const { languages } = this.state;
        const { roles } = this.state;
        const { user } = this.state;

        let realmList = realms.length > 0
            && realms.map((item, i) => {
                return (
                    <option key={i} value={item.realmId}>{item.realmCode}</option>
                )
            }, this);
        let languagesList = languages.length > 0
            && languages.map((item, i) => {
                return (
                    <option key={i} value={item.languageId}>{item.languageName}</option>
                )
            }, this);
        let roleList = roles.length > 0
            && roles.map((item, i) => {
                return (
                    <option key={i} value={item.roleId}>{item.roleName}</option>
                )
            }, this);
        return (
            <div className="addUser">
                <form name="userForm" id="userForm">
                    <h3>{TITLE_EDIT_USER}{this.state.user.userId}</h3>
                    {REALM} : <select id="user.realm.realmId" name="user.realm.realmId" value={this.state.user.realm ? this.state.user.realm.realmId : ''} onChange={this.dataChange}>
                        <option value="">-Nothing Selected-</option>
                        {realmList}
                    </select><br></br><br></br>
                    {USERNAME} : <input type="text" id="user.username" name="user.username" value={this.state.user.username} onChange={this.dataChange} /><br></br><br></br>
                    {EMAIL_ID} : <input type="text" id="user.emailId" name="user.emailId" value={this.state.user.emailId} onChange={this.dataChange} /><br></br><br></br>
                    {PHONE_NO} : <input type="text" id="user.phoneNumber" name="user.phoneNumber" value={this.state.user.phoneNumber} onChange={this.dataChange} maxLength="15" minLength="4" /><br></br><br></br>
                    {ROLE} : <select id="user.role.roleId" name="user.role.roleId" value={this.state.user.role ? this.state.user.role.roleId : ''} onChange={this.dataChange}>
                        <option value="">-Nothing Selected-</option>
                        {roleList}
                    </select><br></br><br></br>
                    {PREFERRED_LANGUAGE} : <select id="user.language.languageId" name="user.language.languageId" value={this.state.user.language ? this.state.user.language.languageId : ''} onChange={this.dataChange}>
                        <option value="">-Nothing Selected-</option>
                        {languagesList}
                    </select><br></br><br></br>
                    {ACTIVE}:
                    <input type="radio" id="user.active1" name="user.active" value={true} checked={this.state.user.active === true} onChange={this.dataChange} /> Active
                    <input type="radio" id="user.active2" name="user.active" value={false} checked={this.state.user.active === false} onChange={this.dataChange} /> Disabled
                    <br></br><br></br>

                    <button type="button" onClick={this.updateClicked}>{BTN_UPDATE}</button>
                    <button type="button" onClick={this.cancelClicked}>{BTN_CANCEL}</button><br></br><br></br>
                    <div><h5>{this.state.message}</h5></div>
                </form>
            </div>
        )
    }
    updateClicked() {
        if (navigator.onLine) {
            var json = this.state.user;
            if ($("#userForm").valid()) {
                UserService.editUser(json)
                    .then(response => {
                        this.props.history.push(`/userList/${response.data.message}`)
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
        } else {
            alert("You must be Online.")
        }
    }
    cancelClicked() {
        this.props.history.push(`/userList/` + "Action Canceled")
    }

}

