import React, { Component } from 'react';
import $ from 'jquery';
import '../../Js/validation.js';
import 'jquery-validation';
import UserService from "../../api/UserService";
import { COUNTRY, EMAIL_ID, PHONE_NO, REALM, ROLE, PREFERRED_LANGUAGE, ADDRESS, BTN_SUBMIT, BTN_CANCEL, TITLE_ADD_USER, USERNAME } from '../../Labels.js'
import AuthenticationService from '../common/AuthenticationService.js';


export default class AddUserComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            realms: [],
            languages: [],
            roles: []
        }
        this.submitClicked = this.submitClicked.bind(this);
        this.cancelClicked = this.cancelClicked.bind(this);
    }

    componentDidMount() {
        if(AuthenticationService.checkTypeOfSession()){
            alert("You are offline.Please login again to continue in offline mode.");
            this.props.history.push(`/`)
        }
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
                emailId: {
                    required: true,
                    email: true
                },
                phoneNumber: {
                    required: true,
                    number: true
                },
                languageId: {
                    required: true
                },
                roleId: {
                    required: true
                },
                username: {
                    required: true
                }
            },
            errorPlacement: function (error, element) {
                error.insertAfter(element);
            }
        });

    }

    render() {
        const { realms } = this.state;
        const { languages } = this.state;
        const { roles } = this.state;

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
                <div className="page-navigation-toggled page-container-wide">
                    <div className="page-content">
                        <div className="page-content-wrap">

                            <div className="row">
                                <div className="col-md-offset-3 col-md-6" style={{ margin: '40px', border: '5px solid black' }} >
                                    <form name="userForm" id="userForm">
                                        <div className="panel panel-default" style={{ background: '#ffffffad' }}>
                                            <div className="panel-heading"> <h3>{TITLE_ADD_USER}</h3> </div>
                                            <div className="col-md-offset-1 panel-body">
                                                <div className="form-group">
                                                    <label className="req col-md-3 col-xs-12 control-label"> {REALM}</label>
                                                    <div className="col-md-6 col-xs-12">
                                                        <select className="form-control select" id="realmId" name="realmId">
                                                            <option value="">-Nothing Selected-</option>
                                                            {realmList}
                                                        </select>
                                                    </div>
                                                </div><br />
                                                <div className="form-group">
                                                    <label className="req col-md-3 col-xs-12 control-label">{USERNAME} </label>
                                                    <div className="col-md-6 col-xs-12"> <input className="form-control" type="text" id="username" name="username" />
                                                    </div>
                                                </div><br />
                                                <div className="form-group">
                                                <label className="req col-md-3 col-xs-12 control-label">{EMAIL_ID} </label>
                                                <div className="col-md-6 col-xs-12">
                                                  <input className="form-control" type="text" id="emailId" name="emailId" />
                                                  </div>
                                                </div><br />
                                                <div className="form-group">
                                                <label className="req col-md-3 col-xs-12 control-label">{PHONE_NO}</label> 
                                                <div className="col-md-6 col-xs-12"> 
                                                <input className="form-control" type="text" id="phoneNumber" name="phoneNumber" maxLength="15" minLength="4" />
                                                </div>
                                                </div><br />
                                                <div className="form-group">
                                                <label className="req col-md-3 col-xs-12 control-label">{ROLE} </label><div className="col-md-6 col-xs-12"> <select className="form-control select" id="roleId" name="roleId">
                                                    <option value="">-Nothing Selected-</option>
                                                    {roleList}
                                                </select></div>
                                                </div><br />
                                                <div className="form-group">
                                                <label className="req col-md-3 col-xs-12 control-label">{COUNTRY} </label><div className="col-md-6 col-xs-12"> <select className=" form-control mdb-select colorful-select dropdown-primary md-form" id="countryIds" name="countryIds">
                                                    <option value="">-Nothing Selected-</option>
                                                    {roleList}
                                                </select></div>
                                                </div><br />
                                                <div className="form-group">
                                                <label className="req col-md-3 col-xs-12 control-label">{PREFERRED_LANGUAGE} </label> <div className="col-md-6 col-xs-12"><select className="form-control select" id="languageId" name="languageId">
                                                    <option value="">-Nothing Selected-</option>
                                                    {languagesList}
                                                </select></div>
                                                </div><br/>
                                                <div className="form-group">
                                                <div className="col-md-6 col-xs-12"><button className="btn btn-success" type="button" onClick={this.submitClicked}>{BTN_SUBMIT}</button>
                                                   <button className="btn btn-primary" type="button" onClick={this.cancelClicked}>{BTN_CANCEL}</button></div>

                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div></div></div></div></div></div>
        )
    }
    submitClicked() {
        console.log($("#countryIds").val())
        if (navigator.onLine) {
            if(AuthenticationService.checkIfTokenExpired()){
            var json = {
                username: $("#username").val(),
                emailId: $("#emailId").val(),
                phoneNumber: $("#phoneNumber").val(),
                realm: {
                    realmId: $("#realmId").val()
                },
                role: {
                    roleId: $("#roleId").val()
                },
                language: {
                    languageId: $("#languageId").val()
                },
                countryIds: $("#countryIds").val()
            }
            if ($("#userForm").valid()) {
                UserService.addNewUser(json)
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
        }else{
            alert("Your session has been expired.Please login again to continue.");
        }
        } else {
            alert("You must be Online.")
        }
    }
    cancelClicked() {
        this.props.history.push(`/userList/` + "Action Canceled")
    }

}

