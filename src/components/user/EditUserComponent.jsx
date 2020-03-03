import React, { Component } from 'react';
import $ from 'jquery';
import '../../Js/validation.js';
import 'jquery-validation';
import UserService from "../../api/UserService";
<<<<<<< HEAD
import * as labels from '../../Labels.js'
=======
import { EMAIL_ID, PHONE_NO, REALM, ROLE, PREFERRED_LANGUAGE, ACTIVE, BTN_UPDATE, BTN_CANCEL, TITLE_EDIT_USER, USERNAME } from '../../Labels.js'
>>>>>>> 4b02a829c246df966f6e24b1cf2ce67285c00d70
import AuthenticationService from '../common/AuthenticationService.js';


export default class EditUserComponent extends Component {
<<<<<<< HEAD
=======
    _isMounted = false;
>>>>>>> 4b02a829c246df966f6e24b1cf2ce67285c00d70

    constructor(props) {
        super(props);
        this.state = {
            languageId: AuthenticationService.getLanguageId(),
            realms: [],
            languages: [],
            roles: [],
<<<<<<< HEAD
            user: this.props.location.state.user,
=======
            user: '',
>>>>>>> 4b02a829c246df966f6e24b1cf2ce67285c00d70
            'user.active': true
        }
        this.updateClicked = this.updateClicked.bind(this);
        this.cancelClicked = this.cancelClicked.bind(this);
        this.dataChange = this.dataChange.bind(this);
<<<<<<< HEAD
=======

>>>>>>> 4b02a829c246df966f6e24b1cf2ce67285c00d70
    }

    componentDidMount() {
        if (!AuthenticationService.checkTypeOfSession()) {
            alert("You can't change your session from online to offline or vice versa.");
            this.props.history.push(`/`)
        }
        AuthenticationService.setupAxiosInterceptors();
<<<<<<< HEAD
        // this.setState({
        //     user: this.props.location.state.user
        // });
=======
        this.setState({
            user: this.props.location.state.user
        });
>>>>>>> 4b02a829c246df966f6e24b1cf2ce67285c00d70
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
                'user.emailId': {
                    required: true,
                    email: true
                },
                'user.phoneNumber': {
                    required: true,
                    number: true
                },
<<<<<<< HEAD
                'user.username': {
                    required: true,
                    strongUsername: true
=======
                'username': {
                    required: true
>>>>>>> 4b02a829c246df966f6e24b1cf2ce67285c00d70
                },
                'user.language.languageId': {
                    required: true
                },
<<<<<<< HEAD
                'user.roleList': {
=======
                'user.role.roleId': {
>>>>>>> 4b02a829c246df966f6e24b1cf2ce67285c00d70
                    required: true
                }
            },
            errorPlacement: function (error, element) {
<<<<<<< HEAD
                if (element.hasClass('select')) {
                    error.insertAfter(element.next(".bootstrap-select"));
                    element.next("div").addClass("error");
                } else {
                    error.insertAfter(element);
                }
=======
                error.insertAfter(element);
>>>>>>> 4b02a829c246df966f6e24b1cf2ce67285c00d70
            }
        });

    }
    dataChange(event) {
        let { user } = this.state
<<<<<<< HEAD
        console.log("on change event---");
=======
>>>>>>> 4b02a829c246df966f6e24b1cf2ce67285c00d70
        if (event.target.name === "user.realm.realmId") {
            user.realm.realmId = event.target.value
        }
        else if (event.target.name === "user.realm.realmId") {
            user.realm.realmId = event.target.value
        }
<<<<<<< HEAD
        else if (event.target.name === "user.roleList") {
            console.log("array---", Array.from(event.target.selectedOptions, (item) => item.value));
            user.roleList = Array.from(event.target.selectedOptions, (item) => item.value)
=======
        else if (event.target.name === "user.role.roleId") {
            user.role.roleId = event.target.value
>>>>>>> 4b02a829c246df966f6e24b1cf2ce67285c00d70
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
<<<<<<< HEAD
            <>
                <div className="page-content-wrap">

                    <div className="row">
                        <div className="">
                            <ul className="breadcrumb text-left" ><li><a href="#">Home</a></li><li><a href="#">Admin</a></li><li><a href="#">User</a></li><li><a href="#">Update User</a></li></ul>
                        </div>
                        <div><h5>{this.state.message}</h5></div>
                        <div className="col-md-8 col-md-offset-2">
                            <div className="login mt-2 block">
                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <h3 className="panel-title">{labels.TITLE_EDIT_USER}</h3>
                                    </div>
                                    <div className="panel-body">
                                        <div className="col-md-8 col-md-offset-2">
                                            <div className="block">

                                                <form className="form-horizontal" name="userForm" id="userForm">

                                                    <div className="form-group">
                                                        <label className="req col-md-4  control-label"> {labels.REALM}</label>
                                                        <div className="col-md-8">
                                                            <select id="user.realm.realmId" name="user.realm.realmId" value={this.state.user.realm ? this.state.user.realm.realmId : ''} onChange={this.dataChange} className="form-control select">
                                                                <option value="">-Nothing Selected-</option>
                                                                {realmList}
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="col-md-4 control-label">{labels.USERNAME} :</label>
                                                        <div className="col-md-8">
                                                            <input type="text" id="user.username" name="user.username" value={this.state.user.username} onChange={this.dataChange} className="form-control" />
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="col-md-4 control-label">{labels.EMAIL_ID} </label>
                                                        <div className="col-md-8">
                                                            <input type="text" id="user.emailId" name="user.emailId" value={this.state.user.emailId} onChange={this.dataChange} className="form-control" />
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="col-md-4 control-label">{labels.PHONE_NO}</label>
                                                        <div className="col-md-8">
                                                            <input type="text" id="user.phoneNumber" name="user.phoneNumber" value={this.state.user.phoneNumber} onChange={this.dataChange} maxLength="15" minLength="4" className="form-control" />
                                                        </div>
                                                    </div>

                                                    <div className="form-group">
                                                        <label className="col-md-4 control-label"> {labels.ROLE}</label>
                                                        <div className="col-md-8">
                                                            <select id="user.roleList" name="user.roleList" value={this.state.user.roleList} onChange={this.dataChange} className="form-control" multiple={true}>
                                                                <option value="" disabled={true}>-Nothing Selected-</option>
                                                                {roleList}
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <div className="form-group">
                                                        <label className="col-md-4 control-label">{labels.PREFERRED_LANGUAGE}</label>
                                                        <div className="col-md-8">
                                                            <select id="user.language.languageId" name="user.language.languageId" value={this.state.user.language ? this.state.user.language.languageId : ''} onChange={this.dataChange} className="form-control">
                                                                <option value="">-Nothing Selected-</option>
                                                                {languagesList}
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="col-md-4 control-label">{labels.ACTIVE}</label>
                                                        <div className="col-md-4">
                                                            <input type="radio" id="user.active1" name="user.active" value={true} checked={this.state.user.active === true} onChange={this.dataChange} /> Active
                                                             <input type="radio" id="user.active2" name="user.active" value={false} checked={this.state.user.active === false} onChange={this.dataChange} /> Disabled
                                                        </div>
                                                    </div>

                                                </form>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="panel-footer">

                                        <button className="btn btn-primary pull-right ml-1" type="button" onClick={this.cancelClicked}>{labels.BTN_CANCEL}</button>
                                        <button className="btn btn-success pull-right" type="button" onClick={this.updateClicked}>{labels.BTN_UPDATE}</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </>
=======
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
>>>>>>> 4b02a829c246df966f6e24b1cf2ce67285c00d70
        )
    }
    updateClicked() {
        if (navigator.onLine) {
            if (AuthenticationService.checkTypeOfSession()) {
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
                alert("You can't change your session from online to offline or vice versa.");
            }
        } else {
            alert("You must be Online.")
        }
    }
    cancelClicked() {
        this.props.history.push(`/userList/` + "Action Canceled")
    }
<<<<<<< HEAD
=======

>>>>>>> 4b02a829c246df966f6e24b1cf2ce67285c00d70
}

