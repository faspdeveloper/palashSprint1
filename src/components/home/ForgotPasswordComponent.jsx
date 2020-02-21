import React, { Component } from 'react';
import $ from 'jquery';
import '../../Js/validation.js';
import 'jquery-validation';
import UserService from '../../api/UserService'
import { Online } from "react-detect-offline";

export default class ForgotPasswordComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            message: ""
        }
        this.submitClicked = this.submitClicked.bind(this);
        this.cancelClicked = this.cancelClicked.bind(this);
    }

    componentDidMount() {
        $("#form1").validate({
            ignore: [],
            rules: {
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
        return (
            <div className="login">
                <form name="form1" id="form1">
                    <h3>Forgot Password</h3>
                    Username : <input type="text" id="username" name="username" /><br></br><br></br>
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
                UserService.forgotPassword($('#username').val())
                    .then(response => {
                        // console.log(response.statusText)
                        this.props.history.push(`/login/${response.data.message}`)
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
        this.props.history.push(`/login/Action Canceled.`)
    }
}

