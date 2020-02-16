import React, { Component } from 'react';
import $ from 'jquery';
import '../../Js/validation.js';
import 'jquery-validation';
import * as myConst from '../../Labels.js';
import LanguageService from '../../api/LanguageService.js'
import AuthenticationService from '../common/AuthenticationService.js';


class AddLanguageComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            languageName: ''
        }
        this.updateFieldData = this.updateFieldData.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }
    updateFieldData(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        )
    }

    componentDidMount() {
        AuthenticationService.setupAxiosInterceptors();
        $("#languageForm").validate({
            ignore: [],
            rules: {
                languageName: {
                    required: true,
                    lettersonly: true,
                    maxlength: 100
                }
            },
            errorPlacement: function (error, element) {
                error.insertAfter(element);
            }
        });

    }

    submitForm(event) {
        if (navigator.onLine) {
            console.log("user in online-----");
            if ($("#languageForm").valid()) {
                LanguageService.addLanguage(this.state).then(response => {
                    this.props.history.push(`/languageList/${response.data.message}`)
                }
                )
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
                    )
            }
        } else {
            alert("To perform this action you must be online.");
        }
    }

    render() {
        return (
            <>
                <h3>{myConst.ADD_LANGUAGE}</h3>
                <form name="languageForm" id="languageForm">
                    <div>
                        <label>{myConst.LANGUAGE_NAME}:-</label>
                        <input type="text" name="languageName" value={this.state.languageName} onChange={this.updateFieldData} />
                    </div>
                    <br /><br />
                    <div>
                        <button type="button" onClick={this.submitForm}>{myConst.SUBMIT_BUTTON}</button>
                    </div>
                </form>
            </>
        );
    }
}
export default AddLanguageComponent;