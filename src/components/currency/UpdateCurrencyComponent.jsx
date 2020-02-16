import React,{Component} from 'react';
import AuthenticationService from '../common/AuthenticationService.js';
import * as myConst from '../../Labels.js';
import $ from 'jquery';
import '../../Js/validation.js';
import 'jquery-validation';
import CurrencyService from '../../api/CurrencyService.js';

export default class UpdateCurrencyComponent extends Component{

constructor(props){
    super(props);
    this.state = {
        currency: {
        currencyCode:'',
        currencySymbol:'',
        label: {
            engLabel: '',
            freLabel: '',
            spaLabel: '',
            porLabel: ''
        },
        conversionRateToUsd: ''
    }
    }
    this.updateFieldData=this.updateFieldData.bind(this);
    this.updateForm=this.updateForm.bind(this);
}

componentDidMount() {
    AuthenticationService.setupAxiosInterceptors();
    this.setState({
        currency:this.props.location.state.currency
    });
    $("#updateCurrencyForm").validate({
        ignore: [],
        rules: {
            'currency.label.engLabel': {
                required: true,
                lettersonly: true,
                maxlength: 255
            },
            'currency.label.freLabel': {
                lettersonly: true,
                maxlength: 255
            },
            'currency.label.spaLabel': {
                lettersonly: true,
                maxlength: 255
            },
            'currency.label.porLabel': {
                lettersonly: true,
                maxlength: 255
            },
            'currency.currencyCode': {
                required: true,
                maxlength: 4
            },
            'currency.currencySymbol': {
                required: true,
                maxlength: 3
            },
            'currency.conversionRateToUsd': {
                required: true,
                integer:true
            }
        },
        errorPlacement: function (error, element) {
            error.insertAfter(element);
        }
    });
}

updateFieldData(event) {
    let { currency } = this.state

    if (event.target.name === "currency.currencyCode") {
        this.state.currency.currencyCode = event.target.value
    }
    if (event.target.name === "currency.currencySymbol") {
        this.state.currency.currencySymbol = event.target.value;
    }
    if (event.target.name === "currency.label.engLabel") {
        this.state.currency.label.engLabel = event.target.value
    }
    if (event.target.name === "currency.label.freLabel") {
        this.state.currency.label.freLabel = event.target.value
    }
    if (event.target.name === "currency.label.spaLabel") {
        this.state.currency.label.spaLabel = event.target.value
    }
    if (event.target.name === "currency.label.porLabel") {
        this.state.currency.label.porLabel = event.target.value
    }
    else if (event.target.name === "currency.conversionRateToUsd") {
        this.state.currency.conversionRateToUsd = event.target.value
    }
    // switch (event.target.name) {
    //     case "currency.currencyCode": this.state.currency.currencyCode = event.target.value;
    //     case "currency.currencySymbol": this.state.currency.currencySymbol = event.target.value;
    //     case "currency.label.engLabel": this.state.currency.label.engLabel = event.target.value;
    //     case "currency.label.freLabel": this.state.currency.label.freLabel = event.target.value;
    //     case "currency.label.spaLabel": this.state.currency.label.spaLabel = event.target.value;
    //     case "currency.label.porLabel": this.state.currency.label.porLabel = event.target.value;
    //     case "currency.conversionRateToUsd": this.state.currency.conversionRateToUsd = event.target.value;
    //     default: break;
    // }
    this.setState(
        {
            currency
        }
    )

}

updateForm(){

    if(navigator.onLine){

        if ($("#updateCurrencyForm").valid()) {

            CurrencyService.editCurrency(this.state.currency).then(response => {
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
                                    message: error.message
                                })
                                break
                        }
                    }
                )
        }


        }

    else{
        alert("To perform this action you must be online.");     
    }

}
   
render(){

return( 
    <>
     <h3>{myConst.UPDATE_CURRENCY}</h3>
                <form name="updateCurrencyForm" id="updateCurrencyForm">
                <div>
                        <label>{myConst.CURRENCY_CODE}:-</label>
                        <input type="text" name="currency.currencyCode" value={this.state.currency.currencyCode} onChange={this.updateFieldData} />
                    </div>
                    <br /><br />
                    <div>
                        <label>{myConst.CURRENCY_SYMBOL}:-</label>
                        <input type="text" name="currency.currencySymbol" value={this.state.currency.currencySymbol} onChange={this.updateFieldData} />
                    </div>
                    <br /><br />
                    <div>
                        <label>{myConst.CURRENCY_NAME_EN}:-</label>
                        <input type="text" name="currency.label.engLabel" value={this.state.currency.label.engLabel} onChange={this.updateFieldData} />
                    </div>
                    <br /><br />
                    <div>
                        <label>{myConst.CURRENCY_NAME_FR}:-</label>
                        <input type="text" name="currency.label.freLabel" value={this.state.currency.label.freLabel} onChange={this.updateFieldData} />
                    </div>
                    <br /><br />
                    <div>
                        <label>{myConst.CURRENCY_NAME_SP}:-</label>
                        <input type="text" name="currency.label.spaLabel" value={this.state.currency.label.spaLabel} onChange={this.updateFieldData} />
                    </div>
                    <br /><br />
                    <div>
                        <label>{myConst.CURRENCY_NAME_PO}:-</label>
                        <input type="text" name="currency.label.porLabel" value={this.state.currency.label.porLabel} onChange={this.updateFieldData} />
                    </div>
                    <br /><br />
                    <div>
                        <label>{myConst.CONVERSIONRATE_TO_USD}:-</label>
                        <input type="text" name="currency.conversionRateToUsd" value={this.state.currency.conversionRateToUsd} onChange={this.updateFieldData} />
                    </div>
                    <br /><br />
                    <div>
                        <button type="button" onClick={this.updateForm}>{myConst.UPDATE_BUTTON}</button>
                    </div>
                </form>
    </>
);

}


}