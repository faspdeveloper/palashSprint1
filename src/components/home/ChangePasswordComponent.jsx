import React, { Component } from 'react';
import $ from 'jquery';
import '../../Js/validation.js';
import 'jquery-validation';
import UserService from '../../api/UserService'
import CryptoJS from 'crypto-js'
import AuthenticationService from '../common/AuthenticationService.js';
import { Online } from "react-detect-offline";
import { SECRET_KEY } from '../../Constants.js'


export default class ChangePasswordComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            message: ""
        }
        this.submitClicked = this.submitClicked.bind(this);
        this.cancelClicked = this.cancelClicked.bind(this);
    }

    componentDidMount() {
        if (!AuthenticationService.checkTypeOfSession()) {
            alert("You can't change your session from online to offline or vice versa.");
            this.props.history.push(`/`)
        }
        AuthenticationService.setupAxiosInterceptors();
        $.validator.addMethod('checkPassword', function () {
            if ($('#newPassword').val() === $('#confirmNewPassword').val()) {
                return true;
            } else {
                return false;
            }
        }, 'The new password does not match.');

        $.validator.addMethod('checkOldPassword', function () {
            if ($('#newPassword').val() === $('#oldPassword').val()) {
                console.log("same");
                return false;
            } else {
                console.log("different");
                return true;
            }
        }, "The new password can't be same as old password.");

        // $.validator.addMethod('checkOldPassword', function () {
        //     let userOff = JSON.parse(localStorage.getItem('user'));
        //     let val;
        //     console.log("password---"+$('#oldPassword').val())
        //     bcrypt.compare($('#oldPassword').val(), userOff.password, function (err, res) {
        //         console.log("res---"+res);
        //             val = res; 
        //     });
        //     if (val === true) {
        //         return true;
        //     } 
        //     if(val === false) {
        //         return false;
        //     }
        //     // return val;
        // }, 'Old password is incorrect.');
        $("#form1").validate({
            ignore: [],
            rules: {
                oldPassword: {
                    required: true
                },
                newPassword: {
                    required: true,
                    checkOldPassword:true
                },
                confirmNewPassword: {
                    required: true,
                    checkPassword: true
                }
            },
            errorPlacement: function (error, element) {
                error.insertAfter(element);
            }
        });

    }

    render() {
        return (
            <div className="login">
                <form name="form1" id="form1">
                    <h3>Update Password</h3>
                    Old password : <input type="password" id="oldPassword" name="oldPassword" /><br></br><br></br>
                    New password : <input type="password" id="newPassword" name="newPassword" /><br></br><br></br>
                    Confirm new password : <input type="password" id="confirmNewPassword" name="confirmNewPassword" /><br></br><br></br>
                    <Online><button type="button" onClick={this.submitClicked}>Submit</button></Online>
                    <Online><button type="button" onClick={this.cancelClicked}>Cancel</button><br></br><br></br></Online>
                    <div><h5>{this.state.message}</h5></div>
                </form>
            </div>
        )
    }

    submitClicked() {
        if ($("#form1").valid()) {
            if (navigator.onLine) {
                UserService.changePassword(AuthenticationService.getLoggedInUsername(),$('#oldPassword').val(),$('#newPassword').val())
                    .then(response => {
                        console.log(response.statusText)
                        localStorage.setItem('password', CryptoJS.AES.encrypt((response.data.data).toString(), `${SECRET_KEY}`));
                        this.props.history.push(`/welcome/${response.data.message}`)
                    })
                    .catch(
                        error => {
                            console.log(error.message);
                            console.log(error.text);
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
                alert("You must be Online to update the password.")
            }
        }
    }

    cancelClicked() {
        this.props.history.push(`/welcome/Action canceled.`)
    }
}

