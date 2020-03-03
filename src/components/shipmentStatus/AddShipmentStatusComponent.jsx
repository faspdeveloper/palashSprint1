import React, { Component } from 'react';
import * as myConst from '../../Labels.js';
import AuthenticationService from '../common/AuthenticationService.js';
import ShipmentStatusService from '../../api/ShipmentStatusService.js';
import $ from 'jquery';
import '../../Js/validation.js';
import 'jquery-validation';

export default class AddShipmentStatusComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            shipmentStatus: {
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
                nextShipmentStatusAllowed: []
            },
            shipmentStatusList: []
        }

        this.updateFieldData = this.updateFieldData.bind(this);
        this.submitForm = this.submitForm.bind(this);
<<<<<<< HEAD
        this.Capitalize=this.Capitalize.bind(this);
=======
>>>>>>> 4b02a829c246df966f6e24b1cf2ce67285c00d70
    }


    componentDidMount() {
        AuthenticationService.setupAxiosInterceptors();
        ShipmentStatusService.getShipmentStatusListActive().then(response => {
            //console.log(response.data)
            this.setState({
                shipmentStatusList: response.data
            })
        })
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
            );
        $("#shipmentStatusForm").validate({
            ignore: [],
            rules: {
<<<<<<< HEAD
                'shipmentStatus.label.label_en': {
                    required: true,
                    lettersonlywhitespace: true,
                    maxlength: 255
                }
                // 'shipmentStatus.label.freLabel': {

                //     lettersonly: true,
                //     maxlength: 255
                // },
                // 'shipmentStatus.label.spaLabel': {

                //     lettersonly: true,
                //     maxlength: 255
                // },
                // 'shipmentStatus.label.porLabel': {

                //     lettersonly: true,
                //     maxlength: 255
                // }
=======
                'shipmentStatus.label.engLabel': {
                    required: true,
                    lettersonly: true,
                    maxlength: 255
                },
                'shipmentStatus.label.freLabel': {

                    lettersonly: true,
                    maxlength: 255
                },
                'shipmentStatus.label.spaLabel': {

                    lettersonly: true,
                    maxlength: 255
                },
                'shipmentStatus.label.porLabel': {

                    lettersonly: true,
                    maxlength: 255
                }
>>>>>>> 4b02a829c246df966f6e24b1cf2ce67285c00d70
            },
            errorPlacement: function (error, element) {
                error.insertAfter(element);
            }
        });
    }
    updateFieldData(event) {
<<<<<<< HEAD
        if (event.target.name === "shipmentStatus.label.label_en") {
            //console.log("inside if")
            this.state.shipmentStatus.label.label_en = event.target.value
        }
        // if (event.target.name === "shipmentStatus.label.freLabel") {
        //     //console.log("inside if")
        //     this.state.shipmentStatus.label.freLabel = event.target.value
        // } if (event.target.name === "shipmentStatus.label.spaLabel") {
        //     //console.log("inside if")
        //     this.state.shipmentStatus.label.spaLabel = event.target.value
        // }if (event.target.name === "shipmentStatus.label.porLabel") {
        //     //console.log("inside if")
        //     this.state.shipmentStatus.label.porLabel = event.target.value
        // }
        else if (event.target.name === "shipmentStatus.nextShipmentStatusAllowed") {
=======
        if (event.target.name === "shipmentStatus.label.engLabel") {
            //console.log("inside if")
            this.state.shipmentStatus.label.engLabel = event.target.value
        }
        if (event.target.name === "shipmentStatus.label.freLabel") {
            //console.log("inside if")
            this.state.shipmentStatus.label.freLabel = event.target.value
        } if (event.target.name === "shipmentStatus.label.spaLabel") {
            //console.log("inside if")
            this.state.shipmentStatus.label.spaLabel = event.target.value
        }if (event.target.name === "shipmentStatus.label.porLabel") {
            //console.log("inside if")
            this.state.shipmentStatus.label.porLabel = event.target.value
        }else if (event.target.name === "shipmentStatus.nextShipmentStatusAllowed") {
>>>>>>> 4b02a829c246df966f6e24b1cf2ce67285c00d70
            this.state.shipmentStatus.nextShipmentStatusAllowed = Array.from(event.target.selectedOptions, (item) => item.value)
        }


        let { shipmentStatus } = this.state
        this.setState(
            {
                shipmentStatus
            }
        )
    }

    submitForm() {
        if (navigator.onLine) {
            if ($("#shipmentStatusForm").valid()) {
                console.log(this.state);
                ShipmentStatusService.addShipmentStatus(this.state.shipmentStatus).then(response => {
                    this.props.history.push(`/shipmentStatusListAll/${response.data.message}`)
                    //console.log("success");
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

        } else {
            alert("To perform this action you must be online.");
        }

<<<<<<< HEAD
    } 
    Capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
=======
    }

>>>>>>> 4b02a829c246df966f6e24b1cf2ce67285c00d70
    render() {

        const { shipmentStatusList } = this.state;
        let shipmentStatusItems = shipmentStatusList.length > 0
            && shipmentStatusList.map((item, i) => {
                return (
<<<<<<< HEAD
                    <option key={i} value={item.shipmentStatusId}>{item.label.label_en}</option>
=======
                    <option key={i} value={item.shipmentStatusId}>{item.label.engLabel}</option>
>>>>>>> 4b02a829c246df966f6e24b1cf2ce67285c00d70
                )
            }, this);
        return (
            <>
                <h3>{myConst.ADD_SHIPMENT_STATUS}</h3>
                <form name="shipmentStatusForm" id="shipmentStatusForm">
                    <div>
                        <label>{myConst.SHIPMENTSTATUS_NAME_EN}:-</label>
<<<<<<< HEAD
                        <input type="text" name="shipmentStatus.label.label_en" value={this.Capitalize(this.state.shipmentStatus.label.label_en)} onChange={this.updateFieldData} />
                    </div>
                    <br /><br />
                    {/* <div>
=======
                        <input type="text" name="shipmentStatus.label.engLabel" onChange={this.updateFieldData} />
                    </div>
                    <br /><br />
                    <div>
>>>>>>> 4b02a829c246df966f6e24b1cf2ce67285c00d70
                        <label>{myConst.SHIPMENTSTATUS_NAME_FR}:-</label>
                        <input type="text" name="shipmentStatus.label.freLabel" onChange={this.updateFieldData} />
                    </div>
                    <br /><br />
                    <div>
                        <label>{myConst.SHIPMENTSTATUS_NAME_SP}:-</label>
                        <input type="text" name="shipmentStatus.label.spaLabel" onChange={this.updateFieldData} />
                    </div>
                    <br /><br />
                    <div>
                        <label>{myConst.SHIPMENTSTATUS_NAME_PO}:-</label>
                        <input type="text" name="shipmentStatus.label.porLabel" onChange={this.updateFieldData} />
                    </div>
<<<<<<< HEAD
                    <br /><br /> */}
=======
                    <br /><br />
>>>>>>> 4b02a829c246df966f6e24b1cf2ce67285c00d70
                 
                    <div>
                       
                        <label>  {myConst.SELECT_NEXT_SHIPMENT_STATUS} :- </label><select id="shipmentStatusId" name="shipmentStatus.nextShipmentStatusAllowed" multiple="true" onChange={this.updateFieldData}>
                            <option value="">-Nothing Selected-</option>
                            {shipmentStatusItems}
                        </select>
                        
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