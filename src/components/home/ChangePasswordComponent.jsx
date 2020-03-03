import React, { Component } from 'react';
<<<<<<< HEAD

=======
>>>>>>> 4b02a829c246df966f6e24b1cf2ce67285c00d70
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
<<<<<<< HEAD
        let username = AuthenticationService.getLoggedInUsername();
=======
>>>>>>> 4b02a829c246df966f6e24b1cf2ce67285c00d70
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
<<<<<<< HEAD
            if ($('#newPassword').val() == $('#oldPassword').val()) {
=======
            if ($('#newPassword').val() === $('#oldPassword').val()) {
>>>>>>> 4b02a829c246df966f6e24b1cf2ce67285c00d70
                console.log("same");
                return false;
            } else {
                console.log("different");
                return true;
            }
        }, "The new password can't be same as old password.");
<<<<<<< HEAD
        $.validator.addMethod('strongPassword', function (value) {
            return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{6,15}$/.test(value);
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
>>>>>>> 4b02a829c246df966f6e24b1cf2ce67285c00d70
        $("#form1").validate({
            ignore: [],
            rules: {
                oldPassword: {
                    required: true
                },
                newPassword: {
                    required: true,
<<<<<<< HEAD
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
                    checkOldPassword:true
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
<<<<<<< HEAD


            <div className="page-content-wrap">

                <div className="row">
                    <div className=""><ul class="breadcrumb">

                    </ul></div>

                    <div className="col-md-8 col-md-offset-2">
                        <div className="login mt-2">
                            <div className="panel panel-default Box-shadow">
                                <div className="panel-heading">
                                    <h3 className="panel-title">Update Password</h3>
                                </div>
                                <div className="panel-body">
                                    <div className="col-md-8 col-md-offset-2">
                                        <div className="block">

                                            <form className="form-horizontal" name="form1" id="form1">
                                                <div className="form-group">
                                                    <label className="col-md-4 control-label">Old Password :</label>
                                                    <div className="col-md-8">
                                                        <input type="password" id="oldPassword" name="oldPassword" className="form-control" />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-md-4 control-label">New Password :</label>
                                                    <div className="col-md-8">
                                                        <input type="password" id="newPassword" name="newPassword" className="form-control" />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-md-4 control-label">Confirm Password :</label>
                                                    <div className="col-md-8">
                                                        <input type="password" id="confirmNewPassword" name="confirmNewPassword" className="form-control" />
                                                    </div>
                                                </div>


                                                <div><h5>{this.state.message}</h5></div>
                                            </form>
                                        </div>
                                    </div>



                                </div>
                                <div className="panel-footer">

                                    <Online><button type="button" onClick={this.cancelClicked} className="btn btn-primary pull-right ml-1">cancel</button></Online>
                                    <Online>  <button type="button" onClick={this.submitClicked} className="btn btn-success pull-right">Submit</button></Online>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
=======
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
>>>>>>> 4b02a829c246df966f6e24b1cf2ce67285c00d70
            </div>
        )
    }

    submitClicked() {
        if ($("#form1").valid()) {
            if (navigator.onLine) {
<<<<<<< HEAD
                console.log("userid -----------" + AuthenticationService.getLoggedInUserId())
                UserService.changePassword(AuthenticationService.getLoggedInUserId(), $('#oldPassword').val(), $('#newPassword').val())
                    .then(response => {
=======
                UserService.changePassword(AuthenticationService.getLoggedInUsername(),$('#oldPassword').val(),$('#newPassword').val())
                    .then(response => {
                        console.log(response.statusText)
>>>>>>> 4b02a829c246df966f6e24b1cf2ce67285c00d70
                        localStorage.setItem('password', CryptoJS.AES.encrypt((response.data.data).toString(), `${SECRET_KEY}`));
                        this.props.history.push(`/welcome/${response.data.message}`)
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

    cancelClicked() {
        this.props.history.push(`/welcome/Action canceled.`)
    }
}

