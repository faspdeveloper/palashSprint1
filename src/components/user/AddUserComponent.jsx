import React, { Component } from 'react';
import $ from 'jquery';
import '../../Js/validation.js';
import 'jquery-validation';
import UserService from "../../api/UserService";
<<<<<<< HEAD
import * as labels from '../../Labels.js'
=======
import { EMAIL_ID, PHONE_NO, REALM, ROLE, PREFERRED_LANGUAGE,BTN_SUBMIT, BTN_CANCEL, TITLE_ADD_USER, USERNAME } from '../../Labels.js'
>>>>>>> 4b02a829c246df966f6e24b1cf2ce67285c00d70
import AuthenticationService from '../common/AuthenticationService.js';


export default class AddUserComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            languageId: AuthenticationService.getLanguageId(),
            realms: [],
            languages: [],
            roles: []
        }
        this.submitClicked = this.submitClicked.bind(this);
        this.cancelClicked = this.cancelClicked.bind(this);
    }

    componentDidMount() {
<<<<<<< HEAD
=======
        console.log("check---"+AuthenticationService.checkTypeOfSession());
>>>>>>> 4b02a829c246df966f6e24b1cf2ce67285c00d70
        if (!AuthenticationService.checkTypeOfSession()) {
            alert("You can't change your session from online to offline or vice versa.");
            this.props.history.push(`/`)
        }
        AuthenticationService.setupAxiosInterceptors();
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

<<<<<<< HEAD
        $.validator.addMethod('strongUsername', function (value) {
            return /^(?=.*[a-zA-Z])[a-zA-Z.-_@]{6,30}$/.test(value);
        }, 'Username does not match with username policy.');
=======
>>>>>>> 4b02a829c246df966f6e24b1cf2ce67285c00d70
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
<<<<<<< HEAD
                roles: {
                    required: true
                },
                username: {
                    required: true,
                    strongUsername: true
                }
            },
            errorPlacement: function (error, element) {
                if (element.hasClass('select')) {
                    error.insertAfter(element.next(".bootstrap-select"));
                    element.next("div").addClass("error");
                } else {
                    error.insertAfter(element);
                }
=======
                roleId: {
                    required: true
                },
                username: {
                    required: true
                }
            },
            errorPlacement: function (error, element) {
                error.insertAfter(element);
>>>>>>> 4b02a829c246df966f6e24b1cf2ce67285c00d70
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
                    <option key={i} value={item.realmId}>
                        {(() => {
                            switch (this.state.languageId) {
<<<<<<< HEAD
                                case 2: return (item.label.label_pr !== null && item.label.label_pr !== "" ? item.label.label_pr : item.label.label_en);
                                case 3: return (item.label.label_fr !== null && item.label.label_fr !== "" ? item.label.label_fr : item.label.label_en);
                                case 4: return (item.label.label_sp !== null && item.label.label_sp !== "" ? item.label.label_sp : item.label.label_en);
                                default: return item.label.label_en;
=======
                                case 2: return (item.label.porLabel !== null && item.label.porLabel !== "" ? item.label.porLabel : item.label.engLabel);
                                case 3: return (item.label.freLabel !== null && item.label.freLabel !== "" ? item.label.freLabel : item.label.engLabel);
                                case 4: return (item.label.spaLabel !== null && item.label.spaLabel !== "" ? item.label.spaLabel : item.label.engLabel);
                                default: return item.label.engLabel;
>>>>>>> 4b02a829c246df966f6e24b1cf2ce67285c00d70
                            }
                        })()}
                    </option>
                )
            }, this);
        let languagesList = languages.length > 0
            && languages.map((item, i) => {
                return (
                    <option key={i} value={item.languageId}>
                        {item.languageName}
                    </option>
                )
            }, this);
        let roleList = roles.length > 0
            && roles.map((item, i) => {
                return (
                    <option key={i} value={item.roleId}>
                        {(() => {
                            switch (this.state.languageId) {
<<<<<<< HEAD
                                case 2: return (item.label.label_pr !== null && item.label.label_pr !== "" ? item.label.label_pr : item.label.label_en);
                                case 3: return (item.label.label_fr !== null && item.label.label_fr !== "" ? item.label.label_fr : item.label.label_en);
                                case 4: return (item.label.label_sp !== null && item.label.label_sp !== "" ? item.label.label_sp : item.label.label_en);
                                default: return item.label.label_en;
=======
                                case 2: return (item.label.porLabel !== null && item.label.porLabel !== "" ? item.label.porLabel : item.label.engLabel);
                                case 3: return (item.label.freLabel !== null && item.label.freLabel !== "" ? item.label.freLabel : item.label.engLabel);
                                case 4: return (item.label.spaLabel !== null && item.label.spaLabel !== "" ? item.label.spaLabel : item.label.engLabel);
                                default: return item.label.engLabel;
>>>>>>> 4b02a829c246df966f6e24b1cf2ce67285c00d70
                            }
                        })()}
                    </option>
                )
            }, this);
        return (
            <div className="addUser">
<<<<<<< HEAD
                <div className="page-content-wrap">
                    <div className="row">
                        <div className="">
                            <ul className="breadcrumb text-left" ><li><a href="#">Home</a></li><li><a href="#">Admin</a></li><li><a href="#">User</a></li><li><a href="#">Add User</a></li></ul>
                        </div>
                        <div><h5>{this.state.message}</h5></div>
                        <div className="col-md-8 col-md-offset-2">
                            <div className="login mt-2 block">
                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <h3 className="panel-title">Create new user</h3>
                                    </div>
                                    <div className="panel-body">
                                        <div className="col-md-8 col-md-offset-2">
                                            <div className="block">

                                                <form className="form-horizontal" name="userForm" id="userForm">

                                                    <div className="form-group">
                                                        <label className="req col-md-4  control-label"> {labels.REALM}</label>
                                                        <div className="col-md-8">
                                                            <select className="form-control" id="realmId" name="realmId">
                                                                <option value="">-Nothing Selected-</option>
                                                                {realmList}
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="req col-md-4 control-label">{labels.USERNAME}</label>
                                                        <div className="col-md-8">
                                                            <input type="text" id="username" name="username" className="form-control"></input>
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="col-md-4 control-label">{labels.EMAIL_ID} </label>
                                                        <div className="col-md-8">
                                                            <input type="text" id="emailId" name="emailId" className="form-control"></input>
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="col-md-4 control-label">{labels.PHONE_NO}</label>
                                                        <div className="col-md-8">
                                                            <input type="text" id="phoneNumber" name="phoneNumber" maxLength="15" minLength="4" className="form-control"></input>
                                                        </div>
                                                    </div>

                                                    <div className="form-group">
                                                        <label className="col-md-4 control-label"> {labels.ROLE}</label>
                                                        <div className="col-md-8">
                                                            <select className="form-control" id="roles" name="roles" multiple={true}>
                                                                <option value="" disabled={true}>-Nothing Selected-</option>
                                                                {roleList}
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <div className="form-group">
                                                        <label className="col-md-4 control-label">{labels.PREFERRED_LANGUAGE}</label>
                                                        <div className="col-md-8">
                                                            <select className="form-control" id="languageId" name="languageId">
                                                                <option value="">-Nothing Selected-</option>
                                                                {languagesList}
                                                            </select>
                                                        </div>
                                                    </div>

                                                </form>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="panel-footer">

                                        <button className="btn btn-primary pull-right ml-1" type="button" onClick={this.cancelClicked}>{labels.BTN_CANCEL}</button>
                                        <button className="btn btn-success pull-right" type="button" onClick={this.submitClicked}>{labels.BTN_SUBMIT}</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div></div>
        )
    }
    submitClicked() {
        if (navigator.onLine) {
            if (AuthenticationService.checkTypeOfSession()) {
                if ($("#userForm").valid()) {
                    var json = {
                        username: $("#username").val(),
                        emailId: $("#emailId").val(),
                        phoneNumber: $("#phoneNumber").val(),
                        realm: {
                            realmId: $("#realmId").val()
                        },
                        roleList: $("#roles").val(),
                        language: {
                            languageId: $("#languageId").val()
                        },
                        countryIds: $("#countryIds").val()
                    }
=======
                        <div className="page-content-wrap">
                        
                            <div className="row">
                                <div className="col-md-offset-3 col-md-6" style={{ margin: '40px', border: '5px solid black' }} >
                                <div><h5>{this.state.message}</h5></div>
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
                                                {/* <div className="form-group">
                                                <label className="req col-md-3 col-xs-12 control-label">{COUNTRY} </label><div className="col-md-6 col-xs-12"> <select className=" form-control mdb-select colorful-select dropdown-primary md-form" id="countryIds" name="countryIds">
                                                    <option value="">-Nothing Selected-</option>
                                                    {roleList}
                                                </select></div>
                                                </div><br /> */}
                                                <div className="form-group">
                                                    <label className="req col-md-3 col-xs-12 control-label">{PREFERRED_LANGUAGE} </label> <div className="col-md-6 col-xs-12"><select className="form-control select" id="languageId" name="languageId">
                                                        <option value="">-Nothing Selected-</option>
                                                        {languagesList}
                                                    </select></div>
                                                </div><br />
                                                <div className="form-group">
                                                    <div className="col-md-6 col-xs-12"><button className="btn btn-success" type="button" onClick={this.submitClicked}>{BTN_SUBMIT}</button>
                                                        <button className="btn btn-primary" type="button" onClick={this.cancelClicked}>{BTN_CANCEL}</button></div>

                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div></div></div></div>
        )
    }
    submitClicked() {
        console.log($("#countryIds").val())
        if (navigator.onLine) {
            console.log("check---"+AuthenticationService.checkTypeOfSession());
            if (AuthenticationService.checkTypeOfSession()) {
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
>>>>>>> 4b02a829c246df966f6e24b1cf2ce67285c00d70
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
            } else {
                alert("You can't change your session from online to offline or vice versa.");
            }
        } else {
            alert("You must be Online.")
        }
    }
    cancelClicked() {
<<<<<<< HEAD
        this.props.history.push(`/userList/Action Canceled`)
=======
        this.props.history.push(`/userList/` + "Action Canceled")
>>>>>>> 4b02a829c246df966f6e24b1cf2ce67285c00d70
    }

}

