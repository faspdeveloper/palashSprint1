import React, { Component } from 'react';
import $ from 'jquery';
import '../../Js/validation.js';
import 'jquery-validation';
import LoginService from '../../api/LoginService'
import CryptoJS from 'crypto-js'
import AuthenticationService from '../common/AuthenticationService.js';
import { Online } from "react-detect-offline";
import bcrypt from 'bcryptjs';
import jwt_decode from 'jwt-decode'
import { SECRET_KEY } from '../../Constants.js'
<<<<<<< HEAD
import '../../Customui.css';
=======
>>>>>>> 4b02a829c246df966f6e24b1cf2ce67285c00d70


export default class LoginComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            message: ""
        }
        this.loginClicked = this.loginClicked.bind(this);
        this.forgotPassword = this.forgotPassword.bind(this);
    }

    componentDidMount() {
        $("#form1").validate({
            ignore: [],
            rules: {
                emailId: {
                    required: true
                },
                password: {
                    required: true
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



            <div className="login-section">
                <div className="container-fluid">
                    <div className="row">
                        <div className="login-main">

                            <div className="row">
                                <div className="col-md-6 col-md-offset-2">
                                    <div className="inp-Section">

                                        <form name="form1" id="form1">


                                            <div className="form-group">

                                                <div className="col-md-8 text-center">

                                                    <p>{this.props.match.params.message}</p>

                                                </div>
                                            </div>
                                            <div className="form-group">

                                                <div className="col-md-8">

                                                    <div className="input-group">
                                                        <span className="input-group-addon Inp-icon"><span className="fa fa-envelope"></span></span>
                                                        <input type="text" id="emailId" name="emailId" className="form-control Inp-login"></input>
                                                    </div>
                                                    <span className="help-block"></span>

                                                </div>
                                            </div>

                                            <div className="form-group">

                                                <div className="col-md-8">

                                                    <div className="input-group Inp-pass">
                                                        <span className="input-group-addon Inp-icon"><span className="fa fa-lock"></span></span>
                                                        <input type="password" id="password" name="password" className="form-control Inp-login"></input>
                                                    </div>
                                                    <span className="help-block"></span>
                                                </div>
                                            </div>

                                            {/* <div className="form-group">

                                                <div className="col-md-8">
                                                    <div className="Login-remember text-left">
                                                        <label className="check">
                                                            <input type="checkbox" className="icheckbox" checked="checked" />Remember Me</label>
                                                        <span className="help-block"></span></div>
                                                </div>
                                            </div> */}

                                            <div className="form-group">

                                                <div className="col-md-8">
                                                    <div className="Login-forgot text-left">
                                                        <Online><a href="" onClick={this.forgotPassword}>Forgot Password?</a></Online>
                                                        <div><h5>{this.state.message}</h5></div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="form-group">

                                                <div className="col-md-8">
                                                    <div className="text-center Login-btnDiv">
                                                        <button type="button" className=" Login-btn" onClick={this.loginClicked}><span>Login</span></button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

=======
            <div className="login">
                <form name="form1" id="form1">
                    <h3>Login</h3>
                    <p>{this.props.match.params.message}</p>
                    Username : <input type="text" id="emailId" name="emailId" /><br></br><br></br>
                    Password : <input type="password" id="password" name="password" /><br></br><br></br>
                    <button className="btn btn-success" type="button" onClick={this.loginClicked}>Login</button><br></br><br></br>
                    <Online><button className="btn btn-danger" type="button" onClick={this.forgotPassword}>Forgot Password</button><br></br><br></br></Online>
                    <div><h5>{this.state.message}</h5></div>
                </form>
            </div>
>>>>>>> 4b02a829c246df966f6e24b1cf2ce67285c00d70
        )
    }

    loginClicked() {
        var username = $("#emailId").val();
        var password = $("#password").val();
        if ($("#form1").valid()) {
<<<<<<< HEAD
            if (navigator.onLine) {
                LoginService.authenticate(username, password)
                    .then(response => {
                        var decoded = jwt_decode(response.data.token);
                        console.log("user id---" + decoded.userId);
                        localStorage.removeItem("token-" + decoded.userId);
                        localStorage.removeItem('username-' + decoded.userId);
                        localStorage.removeItem('password-' + decoded.userId);
                        localStorage.removeItem('curUser');

                        localStorage.setItem('token-' + decoded.userId, CryptoJS.AES.encrypt((response.data.token).toString(), `${SECRET_KEY}`));
                        localStorage.setItem('username-' + decoded.userId, CryptoJS.AES.encrypt((decoded.user.username).toString(), `${SECRET_KEY}`));
                        localStorage.setItem('password-' + decoded.userId, CryptoJS.AES.encrypt((decoded.user.password).toString(), `${SECRET_KEY}`));
                        localStorage.setItem('typeOfSession', "Online");
                        localStorage.setItem('curUser', CryptoJS.AES.encrypt((decoded.userId).toString(), `${SECRET_KEY}`));
                        console.log("local storage length---" + localStorage.length);
                        console.log("user cur ---" + localStorage.getItem("curUser"));
                        AuthenticationService.setupAxiosInterceptors();
                        this.props.history.push(`/welcome`)
                    })
                    .catch(
                        error => {
=======
            console.log("Going to perform login----" + AuthenticationService.isUserLoggedIn());

            if (navigator.onLine) {
                // console.log("Inside Authentication not found");
                LoginService.authenticate(username, password)
                    .then(response => {
                        console.log("my response");
                        var decoded = jwt_decode(response.data.token);
                        console.log("status code--" + response.data.status);

                        // console.log(new Date(decoded.iat*1000));
                        // console.log(new Date(decoded.exp*1000));
                        console.log("username---", decoded);
                        if (!AuthenticationService.checkIfDifferentUserIsLoggedIn(decoded.sub)) {
                            localStorage.setItem('token', response.data.token);
                            localStorage.setItem('typeOfSession', "Online");
                            localStorage.setItem('userId', CryptoJS.AES.encrypt((decoded.userId).toString(), `${SECRET_KEY}`));
                            localStorage.setItem('username', CryptoJS.AES.encrypt((decoded.sub).toString(), `${SECRET_KEY}`));
                            localStorage.setItem('password', CryptoJS.AES.encrypt((decoded.user.password).toString(), `${SECRET_KEY}`));
                            localStorage.setItem('languageId', CryptoJS.AES.encrypt((decoded.user.language.languageId).toString(), `${SECRET_KEY}`));

                            // response.data.password = CryptoJS.AES.encrypt(JSON.stringify(password), 'my-secret-key@123').toString();

                            AuthenticationService.setupAxiosInterceptors();

                            this.props.history.push(`/welcome`)
                        }else{
                            localStorage.setItem('token', response.data.token);
                            localStorage.setItem('typeOfSession', "Online");
                            localStorage.setItem('userId', CryptoJS.AES.encrypt((decoded.userId).toString(), `${SECRET_KEY}`));
                            localStorage.setItem('username', CryptoJS.AES.encrypt((decoded.sub).toString(), `${SECRET_KEY}`));
                            localStorage.setItem('password', CryptoJS.AES.encrypt((decoded.user.password).toString(), `${SECRET_KEY}`));
                            localStorage.setItem('languageId', CryptoJS.AES.encrypt((decoded.user.language.languageId).toString(), `${SECRET_KEY}`));

                            // response.data.password = CryptoJS.AES.encrypt(JSON.stringify(password), 'my-secret-key@123').toString();

                            AuthenticationService.setupAxiosInterceptors();

                            this.props.history.push(`/welcome`)  
                        }
                    })
                    .catch(
                        error => {
                            // console.log("response in catch---"+error.response);
>>>>>>> 4b02a829c246df966f6e24b1cf2ce67285c00d70
                            if (error.response != null && error.response.status === 401) {
                                switch (error.response.data) {
                                    case "Password expired":
                                        this.setState({
                                            message: error.response.data
                                        })
                                        this.props.history.push({
                                            pathname: "/updateExpiredPassword",
<<<<<<< HEAD
                                            state: {
                                                username: username
                                            }
=======
                                            state: { username: username }
>>>>>>> 4b02a829c246df966f6e24b1cf2ce67285c00d70
                                        });
                                        break
                                    default:
                                        this.setState({
                                            message: error.response.data
                                        })
                                        break
                                }
                            } else {
                                switch (error.message) {
                                    case "Network Error":
                                        this.setState({
                                            message: error.message
                                        })
                                        break
                                    default:
                                        this.setState({
                                            message: error.message
                                        })
                                        break
                                }
                            }
                        }
                    );
            }
            else {
<<<<<<< HEAD
                var decryptedPassword = AuthenticationService.isUserLoggedIn(username, password);
                if (decryptedPassword != "") {
                    bcrypt.compare(password, decryptedPassword, function (err, res) {
                        if (err) {
                            this.setState({ message: 'Error occured' });
                        }
                        if (res) {
                            localStorage.setItem('typeOfSession', "Offline");
                            localStorage.setItem('curUser', CryptoJS.AES.encrypt(localStorage.getItem("tempUser").toString(), `${SECRET_KEY}`));
                            localStorage.removeItem("tempUser");
                            this.props.history.push(`/welcome`)
                        } else {
                            this.setState({ message: 'Bad credentials.' });
                        }
                    }.bind(this));
                }
                else {
                    this.setState({ message: 'User not found.' });
=======
                if (AuthenticationService.isUserLoggedIn()) {
                    var usernameBytes = CryptoJS.AES.decrypt(localStorage.getItem('username').toString(), `${SECRET_KEY}`);
                    var decryptedUsername = usernameBytes.toString(CryptoJS.enc.Utf8);

                    var passWordBytes = CryptoJS.AES.decrypt(localStorage.getItem('password').toString(), `${SECRET_KEY}`);
                    var decryptedPassword = passWordBytes.toString(CryptoJS.enc.Utf8);

                    if (username === decryptedUsername) {
                        bcrypt.compare(password, decryptedPassword, function (err, res) {
                            if (err) {
                                console.log("error---" + err);
                            }
                            if (res) {
                                localStorage.setItem('typeOfSession', "Offline");
                                console.log("Offline authentication");
                                this.props.history.push(`/welcome`)
                            } else {
                                this.setState({ message: 'Bad credentials' });
                                console.log("Password do not match");
                            }
                        }.bind(this));
                    } else {
                        this.setState({ message: 'Username does not match' });
                        console.log("Username do not match");
                    }
                    // bcrypt.compare(password, userOff.password, function (err, res) {
                    //     if (err) {
                    //         console.log("error---" + err);
                    //     }
                    //     if (res && username == userOff.username) {
                    //         userOff.sessionExpiresOn = moment(new Date(new Date().getTime() + 30 * 60000)).format('YYYY-MM-DD HH:mm');
                    //         localStorage.setItem('user', JSON.stringify(userOff));
                    //         this.props.history.push(`/welcome`)
                    //     } else {
                    //         this.setState({ message: 'Password do not match' });
                    //         console.log("Password do not match");
                    //     }
                    // }.bind(this));
                } else {
                    alert("You must be Online for a first time login.")
>>>>>>> 4b02a829c246df966f6e24b1cf2ce67285c00d70
                }
            }
        }
    }

    forgotPassword() {
        this.props.history.push(`/forgotPassword`)
    }
}

