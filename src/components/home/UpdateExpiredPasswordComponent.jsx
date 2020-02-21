import React, { Component } from 'react';
import $ from 'jquery';
import '../../Js/validation.js';
import 'jquery-validation';
import UserService from '../../api/UserService'
import CryptoJS from 'crypto-js'
import AuthenticationService from '../common/AuthenticationService.js';
import { Online } from "react-detect-offline";
import { SECRET_KEY } from '../../Constants.js'
import jwt_decode from 'jwt-decode'


export default class UpdateExpiredPasswordComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            message: "",
            username: this.props.location.state.username
        }
        this.submitClicked = this.submitClicked.bind(this);
        this.logoutClicked = this.logoutClicked.bind(this);
    }


    componentDidMount() {
        console.log("username expired page---"+this.props.location.state.username)
        console.log("mount called for");
        // AuthenticationService.setupAxiosInterceptors();
        $.validator.addMethod('checkPassword', function () {
            if ($('#newPassword').val() === $('#confirmNewPassword').val()) {
                return true;
            } else {
                return false;
            }
        }, 'The New passwords do not match.');
        $("#form1").validate({
            ignore: [],
            rules: {
                oldPassword: {
                    required: true
                },
                newPassword: {
                    required: true
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
                    <Online><button type="button" onClick={this.logoutClicked}>Logout</button><br></br><br></br></Online>
                    <div><h5>{this.state.message}</h5></div>
                </form>
            </div>
        )
    }

    submitClicked() {
        if ($("#form1").valid()) {
            if (navigator.onLine) {
                console.log("state username ---"+this.state.username)
                UserService.updateExpiredPassword(this.state.username, $('#oldPassword').val(), $('#newPassword').val())
                    .then(response => {
                        console.log(response.data.data)
                        var decoded = jwt_decode(response.data.token);
                        localStorage.setItem('token', response.data.token);
                        localStorage.setItem('typeOfSession', "Online");
                        localStorage.setItem('userId', CryptoJS.AES.encrypt((decoded.userId).toString(), `${SECRET_KEY}`));
                        localStorage.setItem('username', CryptoJS.AES.encrypt((decoded.sub).toString(), `${SECRET_KEY}`));
                        localStorage.setItem('password', CryptoJS.AES.encrypt((decoded.user.password).toString(), `${SECRET_KEY}`));
                        localStorage.setItem('languageId', CryptoJS.AES.encrypt((decoded.user.language.languageId).toString(), `${SECRET_KEY}`));
                        this.props.history.push(`/welcome/Password updated successfully.`)
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

    logoutClicked() {
        this.props.history.push(`/login/You are logged out.`)
    }
}

