import React, { Component } from 'react';
import * as myConst from '../../Labels.js';
import AuthenticationService from '../common/AuthenticationService.js';
import CurrencyService from '../../api/CurrencyService.js';
import $ from 'jquery';
import '../../Js/validation.js';
import 'jquery-validation';
export default class AddCurrencyComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currencyCode: '',
            currencySymbol: '',
            label: {
<<<<<<< HEAD
                label_en: ''
                // freLabel: '',
                // spaLabel: '',
                // porLabel: ''
=======
                engLabel: '',
                freLabel: '',
                spaLabel: '',
                porLabel: ''
>>>>>>> 4b02a829c246df966f6e24b1cf2ce67285c00d70
            },
            conversionRateToUsd: ''
        }
        this.updateFieldData = this.updateFieldData.bind(this);
        this.submitForm = this.submitForm.bind(this);
<<<<<<< HEAD
        // this.UpperCase=this.UpperCase.bind(this);
        this.Capitalize=this.Capitalize.bind(this);
=======
>>>>>>> 4b02a829c246df966f6e24b1cf2ce67285c00d70
    }

    componentDidMount() {
        AuthenticationService.setupAxiosInterceptors();
        $("#currencyForm").validate({
            ignore: [],
            rules: {
<<<<<<< HEAD
                'label.label_en': {
                    required: true,
                    lettersonlywhitespace: true,
                    maxlength: 255
                },
                // 'label.freLabel': {
                //     lettersonly: true,
                //     maxlength: 255
                // },
                // 'label.spaLabel': {
                //     lettersonly: true,
                //     maxlength: 255
                // },
                // 'label.porLabel': {
                //     lettersonly: true,
                //     maxlength: 255
                // },
                'currencyCode': {
                    lettersonly: true,
                    required: true,
                    maxlength: 3
                },
                'currencySymbol': {
                    lettersonlyspecialchar:true,
=======
                'label.engLabel': {
                    required: true,
                    lettersonly: true,
                    maxlength: 255
                },
                'label.freLabel': {
                    lettersonly: true,
                    maxlength: 255
                },
                'label.spaLabel': {
                    lettersonly: true,
                    maxlength: 255
                },
                'label.porLabel': {
                    lettersonly: true,
                    maxlength: 255
                },
                'currencyCode': {
                    required: true,
                    maxlength: 4
                },
                'currencySymbol': {
>>>>>>> 4b02a829c246df966f6e24b1cf2ce67285c00d70
                    required: true,
                    maxlength: 3
                },
                'conversionRateToUsd': {
<<<<<<< HEAD
                    positiveintegerdecimal:true,
                    required: true
                    //integer:true
=======
                    required: true,
                    integer:true
>>>>>>> 4b02a829c246df966f6e24b1cf2ce67285c00d70
                }
            },
            errorPlacement: function (error, element) {
                error.insertAfter(element);
            }
        });

    }
<<<<<<< HEAD
    // UpperCase(str) {
    //     return str.toUpperCase();
    // }
    Capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
=======
>>>>>>> 4b02a829c246df966f6e24b1cf2ce67285c00d70

    updateFieldData(event) {
        // switch (event.target.name) {
        //     case "currencyCode": this.state.currencyCode = event.target.value;
        //     case "currencySymbol": this.state.currencySymbol = event.target.value;
        //     case "label.engLabel": this.state.label.engLabel = event.target.value;
        //     case "label.freLabel": this.state.label.freLabel = event.target.value;
        //     case "label.spaLabel": this.state.label.spaLabel = event.target.value;
        //     case "label.porLabel": this.state.label.porLabel = event.target.value;
        //     case "conversionRateToUsd": this.state.conversionRateToUsd = event.target.value;
        //     default: break;
        // }
        if(event.target.name === "currencyCode"){
<<<<<<< HEAD
            this.state.currencyCode = event.target.value.toUpperCase();
        }if(event.target.name === "currencySymbol"){
            this.state.currencySymbol = event.target.value;
        }if(event.target.name === "label.label_en"){
            this.state.label.label_en = event.target.value;
         }
        // if(event.target.name === "label.freLabel"){
        //     this.state.label.freLabel = event.target.value;
        // }if(event.target.name === "label.spaLabel"){
        //     this.state.label.spaLabel = event.target.value;
        // }if(event.target.name === "label.porLabel"){
        //     this.state.label.porLabel = event.target.value;
        // }
        else if(event.target.name === "conversionRateToUsd"){
=======
            this.state.currencyCode = event.target.value;
        }if(event.target.name === "currencySymbol"){
            this.state.currencySymbol = event.target.value;
        }if(event.target.name === "label.engLabel"){
            this.state.label.engLabel = event.target.value;
        }if(event.target.name === "label.freLabel"){
            this.state.label.freLabel = event.target.value;
        }if(event.target.name === "label.spaLabel"){
            this.state.label.spaLabel = event.target.value;
        }if(event.target.name === "label.porLabel"){
            this.state.label.porLabel = event.target.value;
        }else if(event.target.name === "conversionRateToUsd"){
>>>>>>> 4b02a829c246df966f6e24b1cf2ce67285c00d70
            this.state.conversionRateToUsd = event.target.value;
        }
        let { currency } = this.state
        this.setState(
            {
                currency
            }
        )

    }
<<<<<<< HEAD

  
=======
>>>>>>> 4b02a829c246df966f6e24b1cf2ce67285c00d70
    submitForm() {

        if (navigator.onLine) {

            if ($("#currencyForm").valid()) {
<<<<<<< HEAD
                console.log(this.state);
=======
>>>>>>> 4b02a829c246df966f6e24b1cf2ce67285c00d70
                CurrencyService.addCurrency(this.state).then(response => {
                    this.props.history.push(`/currencyList/${response.data.message}`)
                    console.log("success");
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
<<<<<<< HEAD
                                        message: error.response.data.message                                    })
=======
                                        message: error.message
                                    })
>>>>>>> 4b02a829c246df966f6e24b1cf2ce67285c00d70
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
                <h3>{myConst.ADD_CURRENCY}</h3>
<<<<<<< HEAD
                <div><h5>{this.state.message}</h5></div>
                <form name="currencyForm" id="currencyForm">
                    <div>
                        <label>{myConst.CURRENCY_CODE}:-</label>
                        <input type="text" name="currencyCode" value={this.state.currencyCode} onChange={this.updateFieldData} />
=======
                <form name="currencyForm" id="currencyForm">
                    <div>
                        <label>{myConst.CURRENCY_CODE}:-</label>
                        <input type="text" name="currencyCode" onChange={this.updateFieldData} />
>>>>>>> 4b02a829c246df966f6e24b1cf2ce67285c00d70
                    </div>
                    <br /><br />
                    <div>
                        <label>{myConst.CURRENCY_SYMBOL}:-</label>
                        <input type="text" name="currencySymbol" onChange={this.updateFieldData} />
                    </div>
                    <br /><br />
                    <div>
                        <label>{myConst.CURRENCY_NAME_EN}:-</label>
<<<<<<< HEAD
                        <input type="text" name="label.label_en" value={this.Capitalize(this.state.label.label_en)} onChange={this.updateFieldData} />
                    </div>
                    <br /><br />
                    {/* <div>
=======
                        <input type="text" name="label.engLabel" onChange={this.updateFieldData} />
                    </div>
                    <br /><br />
                    <div>
>>>>>>> 4b02a829c246df966f6e24b1cf2ce67285c00d70
                        <label>{myConst.CURRENCY_NAME_FR}:-</label>
                        <input type="text" name="label.freLabel" onChange={this.updateFieldData} />
                    </div>
                    <br /><br />
                    <div>
                        <label>{myConst.CURRENCY_NAME_SP}:-</label>
                        <input type="text" name="label.spaLabel" onChange={this.updateFieldData} />
                    </div>
                    <br /><br />
                    <div>
                        <label>{myConst.CURRENCY_NAME_PO}:-</label>
                        <input type="text" name="label.porLabel" onChange={this.updateFieldData} />
                    </div>
<<<<<<< HEAD
                    <br /><br /> */}
=======
                    <br /><br />
>>>>>>> 4b02a829c246df966f6e24b1cf2ce67285c00d70
                    <div>
                        <label>{myConst.CONVERSIONRATE_TO_USD}:-</label>
                        <input type="text" name="conversionRateToUsd" onChange={this.updateFieldData} />
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