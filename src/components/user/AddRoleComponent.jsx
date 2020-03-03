import React, { Component } from 'react';
import $ from 'jquery';
import '../../Js/validation.js';
import 'jquery-validation';
import UserService from "../../api/UserService";
import * as labels from '../../Labels.js'
import AuthenticationService from '../common/AuthenticationService.js';
import '../../css/bootstrap/bootstrap.min.css';
import '../../App.css'


export default class AddRoleComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            businessFunctions: [],
            roles: [],
            message: '',
            languageId: AuthenticationService.getLanguageId(),
        }
        this.submitClicked = this.submitClicked.bind(this);
        this.cancelClicked = this.cancelClicked.bind(this);
        // this.dataChange = this.dataChange.bind(this);
        // this.handleChange = this.handleChange.bind(this);
    }

    // dataChange(event) {
    //     let { role } = this.state
    //     // console.log("business function---", event.target.value);
    //     console.log("name---------------" + event.target.name);
    //     switch (event.target.name) {
<<<<<<< HEAD
    //         case "role.label.label_en": role.label.label_en = event.target.value;
    //         case "role.label.label_pr": role.label.label_pr = event.target.value;
    //         case "role.label.label_fr": role.label.label_fr = event.target.value;
    //         case "role.label.label_sp": role.label.label_sp = event.target.value;
=======
    //         case "role.label.engLabel": role.label.engLabel = event.target.value;
    //         case "role.label.porLabel": role.label.porLabel = event.target.value;
    //         case "role.label.freLabel": role.label.freLabel = event.target.value;
    //         case "role.label.spaLabel": role.label.spaLabel = event.target.value;
>>>>>>> 4b02a829c246df966f6e24b1cf2ce67285c00d70
    //         case "role.businessFunctions": role.businessFunctions = Array.from(event.target.selectedOptions, (item) => item.value);
    //         case "role.canCreateRole": role.canCreateRole = event.target.value;
    //         default: [event.target.name] = event.target.value;
    //     }

    //     this.setState({
    //         role
    //     }, (
    //     ) => {
    //         console.log("state after update---", this.state.role)
    //     })
    // }

    // handleChange(event) {
    //     this.setState({
    //         role: {
    //             label: {
<<<<<<< HEAD
    //                 label_en: ''
=======
    //                 engLabel: ''
>>>>>>> 4b02a829c246df966f6e24b1cf2ce67285c00d70
    //             },
    //             businessFunctions: Array.from(event.target.selectedOptions, (item) => item.value)
    //         }
    //     }, (
    //     ) => {
    //         console.log("state after update---", this.state.role)
    //     });
    // }

    componentDidMount() {
        if (!AuthenticationService.checkTypeOfSession()) {
            alert("You can't change your session from online to offline or vice versa.");
            this.props.history.push(`/`)
        }
        AuthenticationService.setupAxiosInterceptors();
        UserService.getBusinessFunctionList()
            .then(response => {
                console.log("business functions---", response.data);
                this.setState({
                    businessFunctions: response.data
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
                console.log("role list---", response.data);
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



        $("#roleForm").validate({
            ignore: [],
            rules: {
<<<<<<< HEAD
                'role.label.label_en': {
=======
                'role.label.engLabel': {
>>>>>>> 4b02a829c246df966f6e24b1cf2ce67285c00d70
                    required: true,
                    // lettersonly: true,
                    maxlength: 255

                },
<<<<<<< HEAD
                'role.label.label_pr': {
                    // lettersonly: true,
                    maxlength: 255
                },
                'role.label.label_fr': {
                    // lettersonly: true,
                    maxlength: 255
                },
                'role.label.label_sp': {
=======
                'role.label.porLabel': {
                    // lettersonly: true,
                    maxlength: 255
                },
                'role.label.freLabel': {
                    // lettersonly: true,
                    maxlength: 255
                },
                'role.label.spaLabel': {
>>>>>>> 4b02a829c246df966f6e24b1cf2ce67285c00d70
                    // lettersonly: true,
                    maxlength: 255
                },
                'role.businessFunctions': {
                    required: true
                },
                'role.canCreateRole': {
                    required: true
                }
            },
            errorPlacement: function (error, element) {
                error.insertAfter(element);
            }
        });

    }

    render() {
        const { businessFunctions } = this.state;
        const { roles } = this.state;

        let businessFunctionsList = businessFunctions.length > 0
            && businessFunctions.map((item, i) => {
                return (
                    <>
                        <option key={i} value={item.businessFunctionId}>
                            {(() => {
                                switch (this.state.languageId) {
<<<<<<< HEAD
                                    case 2: return (item.label.label_pr != null && item.label.label_pr != "" ? item.label.label_pr : item.label.label_en);
                                    case 3: return (item.label.label_fr != null && item.label.label_fr != "" ? item.label.label_fr : item.label.label_en);
                                    case 4: return (item.label.label_sp != null && item.label.label_sp != "" ? item.label.label_sp : item.label.label_en);
                                    default: return item.label.label_en;
=======
                                    case 2: return (item.label.porLabel != null && item.label.porLabel != "" ? item.label.porLabel : item.label.engLabel);
                                    case 3: return (item.label.freLabel != null && item.label.freLabel != "" ? item.label.freLabel : item.label.engLabel);
                                    case 4: return (item.label.spaLabel != null && item.label.spaLabel != "" ? item.label.spaLabel : item.label.engLabel);
                                    default: return item.label.engLabel;
>>>>>>> 4b02a829c246df966f6e24b1cf2ce67285c00d70
                                }
                            })()}
                        </option>
                    </>
                )
            }, this);
        let roleList = roles.length > 0
            && roles.map((item, i) => {
                return (
                    <option key={i} value={item.roleId}>
                        {(() => {
                            switch (this.state.languageId) {
<<<<<<< HEAD
                                case 2: return (item.label.label_pr != null && item.label.label_pr != "" ? item.label.label_pr : item.label.label_en);
                                case 3: return (item.label.label_fr != null && item.label.label_fr != "" ? item.label.label_fr : item.label.label_en);
                                case 4: return (item.label.label_sp != null && item.label.label_sp != "" ? item.label.label_sp : item.label.label_en);
                                default: return item.label.label_en;
=======
                                case 2: return (item.label.porLabel != null && item.label.porLabel != "" ? item.label.porLabel : item.label.engLabel);
                                case 3: return (item.label.freLabel != null && item.label.freLabel != "" ? item.label.freLabel : item.label.engLabel);
                                case 4: return (item.label.spaLabel != null && item.label.spaLabel != "" ? item.label.spaLabel : item.label.engLabel);
                                default: return item.label.engLabel;
>>>>>>> 4b02a829c246df966f6e24b1cf2ce67285c00d70
                            }
                        })()}
                    </option>
                )
            }, this);
        return (
            <div class="page-container page-navigation-toggled page-container-wide">
                <div class="page-content">
                    <ul class="breadcrumb">
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Admin</a></li>
                        <li><a href="#">Role</a></li>
                        <li><a href="#">Add Role</a></li>
                    </ul>
                    <div class="page-content-wrap">
                        <div><h5>{this.state.message}</h5></div>
                        <div class="row">
                            <div class="col-md-12">

                                <form name="roleForm" id="roleForm" class="form-horizontal">
                                    <div class="panel panel-default">
                                        <div class="panel-heading">
                                            <h3 class="panel-title">{labels.TITLE_ADD_ROLE}</h3>
                                        </div>
                                        <div class="panel-body">
                                            <div class="form-group">
                                                <label class="req col-md-2 col-xs-12 control-label">{labels.ROLE_NAME_ENG}</label>
                                                <div class="col-md-6 col-xs-12">
<<<<<<< HEAD
                                                    <input type="text" id="role.label.label_en" class="form-control" name="role.label.label_en" />

=======
                                                    <input type="text" id="role.label.engLabel" class="form-control" name="role.label.engLabel" />
                                                    
>>>>>>> 4b02a829c246df966f6e24b1cf2ce67285c00d70
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="req col-md-2 col-xs-12 control-label">{labels.ROLE_NAME_POR}</label>
                                                <div class="col-md-6 col-xs-12">
<<<<<<< HEAD
                                                    <input type="text" id="role.label.label_pr" name="role.label.label_pr" class="form-control" />

=======
                                                    <input type="text" id="role.label.porLabel" name="role.label.porLabel" class="form-control" />
                                                    
>>>>>>> 4b02a829c246df966f6e24b1cf2ce67285c00d70
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="req col-md-2 col-xs-12 control-label">{labels.ROLE_NAME_FRE}</label>
                                                <div class="col-md-6 col-xs-12">
<<<<<<< HEAD
                                                    <input type="text" id="role.label.label_fr" name="role.label.label_fr" class="form-control" />

=======
                                                    <input type="text" id="role.label.freLabel" name="role.label.freLabel" class="form-control" />
                                                    
>>>>>>> 4b02a829c246df966f6e24b1cf2ce67285c00d70
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="req col-md-2 col-xs-12 control-label">{labels.ROLE_NAME_SPA}</label>
                                                <div class="col-md-6 col-xs-12">
<<<<<<< HEAD
                                                    <input type="text" id="role.label.label_sp" name="role.label.label_sp" class="form-control" />

=======
                                                    <input type="text" id="role.label.spaLabel" name="role.label.spaLabel" class="form-control" />
                                                    
>>>>>>> 4b02a829c246df966f6e24b1cf2ce67285c00d70
                                                </div>
                                            </div>

                                            <div class="form-group">
                                                <label class="req col-md-2 col-xs-12 control-label">{labels.BUSINESS_FUNCTION}</label>
                                                <div class="col-md-6 col-xs-12">
<<<<<<< HEAD
                                                    <select id="role.businessFunctions" class="form-control" data-live-search="true" data-actions-box="true" name="role.businessFunctions" multiple={true}>
                                                        <option value="">-Nothing Selected-</option>
                                                        {businessFunctionsList}
                                                    </select>

=======
                                                    <select id="role.businessFunctions" class="form-control select" data-live-search="true" data-actions-box="true" name="role.businessFunctions" multiple={true}>
                                                        <option value="">-Nothing Selected-</option>
                                                        {businessFunctionsList}
                                                    </select>
                                                    
>>>>>>> 4b02a829c246df966f6e24b1cf2ce67285c00d70
                                                </div>
                                            </div>

                                            <div class="form-group">
                                                <label class="req col-md-2 col-xs-12 control-label">{labels.CAN_CREATE_ROLE}</label>
                                                <div class="col-md-6 col-xs-12">
<<<<<<< HEAD
                                                    <select id="role.canCreateRole" className="form-control" data-live-search="true" data-actions-box="true" name="role.canCreateRole" multiple={true} onChange={this.dataChange}>
                                                        <option value="">-Nothing Selected-</option>
                                                        {roleList}
                                                    </select>

=======
                                                    <select id="role.canCreateRole" className="form-control select" data-live-search="true" data-actions-box="true" name="role.canCreateRole" multiple={true} onChange={this.dataChange}>
                                                        <option value="">-Nothing Selected-</option>
                                                        {roleList}
                                                    </select>
                                                    
>>>>>>> 4b02a829c246df966f6e24b1cf2ce67285c00d70
                                                </div>
                                            </div>
                                            <button type="button" className="btn btn-success" onClick={this.submitClicked}>{labels.BTN_SUBMIT}</button>
                                            <button type="button" className="btn btn-danger" onClick={this.cancelClicked}>{labels.BTN_CANCEL}</button><br></br><br></br>

                                        </div>
                                        <div class="panel-footer">
                                            <div class="pull-right">

                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    submitClicked() {
        console.log($("#role\\.businessFunctions").val())
        if (navigator.onLine) {
            if (AuthenticationService.checkTypeOfSession()) {
                if ($("#roleForm").valid()) {
                    var json = {
                        label: {
<<<<<<< HEAD
                            label_en: $("#role\\.label\\.label_en").val(),
                            label_pr: $("#role\\.label\\.label_pr").val(),
                            label_fr: $("#role\\.label\\.label_fr").val(),
                            label_sp: $("#role\\.label\\.label_sp").val()
=======
                            engLabel: $("#role\\.label\\.engLabel").val(),
                            porLabel: $("#role\\.label\\.porLabel").val(),
                            freLabel: $("#role\\.label\\.freLabel").val(),
                            spaLabel: $("#role\\.label\\.spaLabel").val()
>>>>>>> 4b02a829c246df966f6e24b1cf2ce67285c00d70
                        },
                        businessFunctions: $("#role\\.businessFunctions").val(),
                        canCreateRole: $("#role\\.canCreateRole").val()
                    }
                    UserService.addNewRole(json)
                        .then(response => {
                            this.props.history.push(`/roleList/${response.data.message}`)
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
        this.props.history.push(`/roleList/` + "Action Canceled")
    }

}

