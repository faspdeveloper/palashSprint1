import React, { Component } from 'react';
import $ from 'jquery';
import '../../Js/validation.js';
import 'jquery-validation';
import UserService from "../../api/UserService";
import { ROLE_NAME,ROLE_ID,BUSINESS_FUNCTION,CAN_CREATE_ROLE,TITLE_ADD_ROLE,BTN_SUBMIT, BTN_CANCEL} from '../../Labels.js'
import AuthenticationService from '../common/AuthenticationService.js';


export default class AddRoleComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            businessFunctions: [],
            roles: []
        }
        this.submitClicked = this.submitClicked.bind(this);
        this.cancelClicked = this.cancelClicked.bind(this);
    }

    componentDidMount() {
        AuthenticationService.setupAxiosInterceptors();
        UserService.getBusinessFunctionList()
            .then(response => {
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
                languageId: {
                    required: true
                },
                roleId: {
                    required: true
                },
                username:{
                    required:true
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
                    <option key={i} value={item.businessFunctionId}>{item.businessFunctionDesc}</option>
                )
            }, this);
            let roleList = roles.length > 0
            && roles.map((item, i) => {
                return (
                    <option key={i} value={item.roleId}>{item.roleName}</option>
                )
            }, this);
        return (
            <div className="addRole">
                <form name="roleForm" id="roleForm">
                    <h3>{TITLE_ADD_ROLE}</h3>
                    {ROLE_NAME} : <input type="text" id="username" name="username" /><br></br><br></br>
                    {ROLE_ID} : <input type="text" id="emailId" name="emailId" /><br></br><br></br>
                    {BUSINESS_FUNCTION} : <select id="businessFunctionIds" name="businessFunctionIds" multiple={true}>
                        <option value="">-Nothing Selected-</option>
                        {businessFunctionsList}
                    </select><br></br><br></br>
                    {CAN_CREATE_ROLE} : <select id="canCreateRoleIds" name="canCreateRoleIds" multiple={true}>
                        <option value="">-Nothing Selected-</option>
                        {roleList}
                    </select><br></br><br></br>

                    <button type="button" onClick={this.submitClicked}>{BTN_SUBMIT}</button>
                    <button type="button" onClick={this.cancelClicked}>{BTN_CANCEL}</button><br></br><br></br>
                    <div><h5>{this.state.message}</h5></div>
                </form>
            </div>
        )
    }
    submitClicked() {
        // console.log($("#countryIds").val())
        if (navigator.onLine) {
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
                countryIds:$("#countryIds").val()
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
        } else {
            alert("You must be Online.")
        }
    }
    cancelClicked() {
        this.props.history.push(`/userList/` + "Action Canceled")
    }

}

