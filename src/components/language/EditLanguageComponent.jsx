import React, { Component } from 'react';
import AuthenticationService from '../common/AuthenticationService.js';
import * as myConst from '../../Labels.js';
import LanguageService from '../../api/LanguageService.js'
import $ from 'jquery';
import '../../Js/validation.js';
import 'jquery-validation';


export default class EditLanguageComponent extends Component {

    constructor(props) {

        super(props);
<<<<<<< HEAD
        this.state = { language: {languageName:''}, message:'' }

        this.updateFieldData = this.updateFieldData.bind(this);
        this.updateForm = this.updateForm.bind(this);
        this.Capitalize=this.Capitalize.bind(this);
       
=======
        this.state = { language: '' }

        this.updateFieldData = this.updateFieldData.bind(this);
        this.updateForm = this.updateForm.bind(this);
>>>>>>> 4b02a829c246df966f6e24b1cf2ce67285c00d70
    }
    componentDidMount() {
       AuthenticationService.setupAxiosInterceptors();
        this.setState({
            language: this.props.location.state.language
        });
        console.log(this.state);
        $("#updateLanguageForm").validate({
            ignore: [],
            rules: {
                'language.languageName': {
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
    updateFieldData(event) {

        let { language } = this.state

        if (event.target.name === "language.languageName") {
            console.log("inside if")
            language.languageName = event.target.value
        } else if (event.target.name === "language.active") {
            language.active = event.target.id === "language.active2" ? false : true
        }

        this.setState(
            {
                language
            }
        );
    }
<<<<<<< HEAD
    Capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
=======
>>>>>>> 4b02a829c246df966f6e24b1cf2ce67285c00d70

    updateForm() {
        if (navigator.onLine) {
            if ($("#updateLanguageForm").valid()) {

                LanguageService.editLanguage(this.state.language).then(response => {
                    this.props.history.push(`/languageList/${response.data.message}`)
                }
                )
                    .catch(
                        error => {
                            switch (error.message) {
                                case "Network Error":
                                    this.setState({
<<<<<<< HEAD
                                        message: error.response.data
=======
                                        message: error.message
>>>>>>> 4b02a829c246df966f6e24b1cf2ce67285c00d70
                                    })
                                    break
                                default:
                                    this.setState({
<<<<<<< HEAD
                                        message: error.response.data.message
=======
                                        message: error.message
>>>>>>> 4b02a829c246df966f6e24b1cf2ce67285c00d70
                                    })
                                    break
                            }
                        }
                    )

            }
        } else { alert("To perform this action you must be online."); }
    }

    render() {

        return (
            <>
                <h3>{myConst.UPDATE_LANGUAGE}</h3>
                <form name="updatyeLanguageForm" id="updateLanguageForm">
                    <div>
                        <label>{myConst.LANGUAGE_NAME}:-</label>
<<<<<<< HEAD
                        <input type="text" name="language.languageName" value={this.Capitalize(this.state.language.languageName)} onChange={this.updateFieldData} />
=======
                        <input type="text" name="language.languageName" value={this.state.language.languageName} onChange={this.updateFieldData} />
>>>>>>> 4b02a829c246df966f6e24b1cf2ce67285c00d70
                    </div>
                    <br /><br />
                    <div>
                        <div>
                            {myConst.ACTIVE}:
                    <input type="radio" id="language.active1" name="language.active" value={true} checked={this.state.language.active === true} onChange={this.updateFieldData} /> Active
                    <input type="radio" id="language.active2" name="language.active" value={false} checked={this.state.language.active === false} onChange={this.updateFieldData} /> Disabled
        </div>
                        <button type="button" onClick={this.updateForm}>{myConst.UPDATE_BUTTON}</button>
                    </div>
                </form>
            </>

        );
    }
}