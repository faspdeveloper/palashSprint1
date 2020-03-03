import React, { Component } from 'react';
import AuthenticationService from '../common/AuthenticationService.js';
import DataSourceService from '../../api/DataSourceService';
import DataSourceTypeService from '../../api/DataSourceTypeService';
import * as myConst from '../../Labels.js';
import $ from 'jquery';
import '../../Js/validation.js';
import 'jquery-validation';

export default class AddDataSource extends Component {

    constructor(props) {
        super(props);
        this.state = {
<<<<<<< HEAD
            message:'',
            label: {
                label_en: ''
                // freLabel: '',
                // spaLabel: '',
                // porLabel: ''
=======
            label: {
                engLabel: '',
                freLabel: '',
                spaLabel: '',
                porLabel: ''
>>>>>>> 4b02a829c246df966f6e24b1cf2ce67285c00d70
            },
            dataSourceType: {
                dataSourceTypeId: ''
            },
            dataSourceTypeList: []
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
        DataSourceTypeService.getDataSourceTypeListActive().then(response => {
            //console.log(response.data)
            this.setState({
                dataSourceTypeList: response.data
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
        $("#dataSourceForm").validate({
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
>>>>>>> 4b02a829c246df966f6e24b1cf2ce67285c00d70
                'dataSourceType.dataSourceTypeId': {
                    required: true
                }
            },
            errorPlacement: function (error, element) {
                error.insertAfter(element);
            }
        });

    }

    updateFieldData(event) {
<<<<<<< HEAD
        if (event.target.name === "label.label_en") {
            //console.log("inside if")
            this.state.label.label_en = event.target.value
        }
        // if (event.target.name === "label.freLabel") {
        //     //console.log("inside if")
        //     this.state.label.freLabel = event.target.value
        // } if (event.target.name === "label.spaLabel") {
        //     //console.log("inside if")
        //     this.state.label.spaLabel = event.target.value
        // } if (event.target.name === "label.porLabel") {
        //     //console.log("inside if")
        //     this.state.label.porLabel = event.target.value
        // }
=======
        if (event.target.name === "label.engLabel") {
            //console.log("inside if")
            this.state.label.engLabel = event.target.value
        }
        if (event.target.name === "label.freLabel") {
            //console.log("inside if")
            this.state.label.freLabel = event.target.value
        } if (event.target.name === "label.spaLabel") {
            //console.log("inside if")
            this.state.label.spaLabel = event.target.value
        } if (event.target.name === "label.porLabel") {
            //console.log("inside if")
            this.state.label.porLabel = event.target.value
        }
>>>>>>> 4b02a829c246df966f6e24b1cf2ce67285c00d70
        else if (event.target.name === "dataSourceType.dataSourceTypeId") {
            this.state.dataSourceType.dataSourceTypeId = event.target.value
        }

        let { dataSource } = this.state
        this.setState(
            {
                dataSource
            }
        )


    }
<<<<<<< HEAD
    Capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
=======
>>>>>>> 4b02a829c246df966f6e24b1cf2ce67285c00d70

    submitForm() {

        if (navigator.onLine) {
            if ($("#dataSourceForm").valid()) {
                console.log(this.state);
                //delete this.state["dataSourceTypeList"];
                DataSourceService.addDataSource(this.state).then(response => {
                    this.props.history.push(`/dataSourceList/${response.data.message}`)
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

    }


    render() {
        const { dataSourceTypeList } = this.state;
        let dataSourceTypes = dataSourceTypeList.length > 0
            && dataSourceTypeList.map((item, i) => {
                return (
<<<<<<< HEAD
                    <option key={i} value={item.dataSourceTypeId}>{item.label.label_en}</option>
=======
                    <option key={i} value={item.dataSourceTypeId}>{item.label.engLabel}</option>
>>>>>>> 4b02a829c246df966f6e24b1cf2ce67285c00d70
                )
            }, this);
        return (
            <>
<<<<<<< HEAD
                <div><h5>{this.state.message}</h5></div>
=======

>>>>>>> 4b02a829c246df966f6e24b1cf2ce67285c00d70
                <h3>{myConst.ADD_DATASOURCE}</h3>
                <form name="dataSourceForm" id="dataSourceForm">
                    <div>
                        <label>{myConst.DATASOURCE_NAME_EN}:-</label>
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
                        <label>{myConst.DATASOURCE_NAME_FR}:-</label>
                        <input type="text" name="label.freLabel" onChange={this.updateFieldData} />
                    </div>
                    <br /><br />
                    <div>
                        <label>{myConst.DATASOURCE_NAME_SP}:-</label>
                        <input type="text" name="label.spaLabel" onChange={this.updateFieldData} />
                    </div>
                    <br /><br />
                    <div>
                        <label>{myConst.DATASOURCE_NAME_PO}:-</label>
                        <input type="text" name="label.porLabel" onChange={this.updateFieldData} />
                    </div>
<<<<<<< HEAD
                    <br /><br /> */}
=======
                    <br /><br />
>>>>>>> 4b02a829c246df966f6e24b1cf2ce67285c00d70

                    <div>
                        {myConst.SELECT_DATA_SOURCE_TYPE} : <select id="dataSourceTypeId" name="dataSourceType.dataSourceTypeId" onChange={this.updateFieldData}>
                            <option value="">-Nothing Selected-</option>
                            {dataSourceTypes}
                        </select>
                    </div>
                    <br></br>
                    <div>
                        <button type="button" onClick={this.submitForm}>{myConst.SUBMIT_BUTTON}</button>
                    </div>
                </form>
            </>
        );

    }

}