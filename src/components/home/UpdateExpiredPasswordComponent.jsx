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
<<<<<<< HEAD
        let username = this.state.username;
=======
        console.log("username expired page---"+this.props.location.state.username)
        console.log("mount called for");
        // AuthenticationService.setupAxiosInterceptors();
>>>>>>> 4b02a829c246df966f6e24b1cf2ce67285c00d70
        $.validator.addMethod('checkPassword', function () {
            if ($('#newPassword').val() === $('#confirmNewPassword').val()) {
                return true;
            } else {
                return false;
            }
        }, 'The New passwords do not match.');
<<<<<<< HEAD

        $.validator.addMethod('checkOldPassword', function () {
            if ($('#newPassword').val() == $('#oldPassword').val()) {
                console.log("same");
                return false;
            } else {
                console.log("different");
                return true;
            }
        }, "The new password can't be same as old password.");

        $.validator.addMethod('strongPassword', function (value) {
            if (username != value) {
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{6,15}$/.test(value);
            } else {
                return false;
            }
        }, 'Password does not match with password policy.');

        $.validator.addMethod('startsWithLetter', function (value) {
            return /^[a-zA-Z]/i.test(value);
        }, 'Password must start with alphabet.');
        $.validator.addMethod('containsUppercaseLetter', function (value) {
            return /^(?=.*[A-Z]).*$/.test(value);
        }, 'Password must contain atleast 1 uppercase alphabet.');
        $.validator.addMethod('containsDigit', function (value) {
            return /^(?=.*\d).*$/.test(value);
        }, 'Password must contain atleast 1 number.');
        $.validator.addMethod('containsSpecialCharacters', function (value) {
            return /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(value);
        }, 'Password must contain atleast 1 special character.');
        $.validator.addMethod('notContainPasswordString', function (value) {
            return /^(?!.*password).*$/.test(value);
        }, 'Password should not contain password string.');
        $.validator.addMethod('notSameAsUsername', function (value) {
            if (username != value) {
                return true;
            }else{
                return false;
            }
        }, 'Password should not be same as username.');

=======
>>>>>>> 4b02a829c246df966f6e24b1cf2ce67285c00d70
        $("#form1").validate({
            ignore: [],
            rules: {
                oldPassword: {
                    required: true
                },
                newPassword: {
<<<<<<< HEAD
                    required: true,
                    checkOldPassword: true,
                    notSameAsUsername:true,
                    startsWithLetter: true,
                    containsUppercaseLetter: true,
                    containsDigit: true,
                    containsSpecialCharacters: true,
                    notContainPasswordString: true,
                    minlength: 6,
                    maxlength: 15
=======
                    required: true
>>>>>>> 4b02a829c246df966f6e24b1cf2ce67285c00d70
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
<<<<<<< HEAD
                UserService.updateExpiredPassword(this.state.username, $('#oldPassword').val(), $('#newPassword').val())
                    .then(response => {
                        var decoded = jwt_decode(response.data.token);
                        localStorage.setItem('token-' + decoded.userId, CryptoJS.AES.encrypt((response.data.token).toString(), `${SECRET_KEY}`));
                        localStorage.setItem('username-' + decoded.userId, CryptoJS.AES.encrypt((decoded.user.username).toString(), `${SECRET_KEY}`));
                        localStorage.setItem('password-' + decoded.userId, CryptoJS.AES.encrypt((decoded.user.password).toString(), `${SECRET_KEY}`));
                        localStorage.setItem('typeOfSession', "Online");
                        localStorage.setItem('curUser', CryptoJS.AES.encrypt((decoded.userId).toString(), `${SECRET_KEY}`));
=======
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
>>>>>>> 4b02a829c246df966f6e24b1cf2ce67285c00d70
                        this.props.history.push(`/welcome/Password updated successfully.`)
                    })
                    .catch(
                        error => {
<<<<<<< HEAD
=======
                            console.log(error.message);
                            console.log(error.text);
>>>>>>> 4b02a829c246df966f6e24b1cf2ce67285c00d70
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
<<<<<<< HEAD
                alert("You must be online to update the password.")
=======
                alert("You must be Online to update the password.")
>>>>>>> 4b02a829c246df966f6e24b1cf2ce67285c00d70
            }
        }
    }

    logoutClicked() {
        this.props.history.push(`/login/You are logged out.`)
    }
}

