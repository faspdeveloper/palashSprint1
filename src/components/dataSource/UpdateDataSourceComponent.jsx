import React, { Component } from 'react';
import DataSourceTypeService from '../../api/DataSourceTypeService';
import DataSourceService from '../../api/DataSourceService';
import AuthenticationService from '../common/AuthenticationService.js';
import * as myConst from '../../Labels.js';
import $ from 'jquery';
import '../../Js/validation.js';
import 'jquery-validation';

export default class UpdateDataSourceComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {

            dataSource: {
<<<<<<< HEAD
                message:'',
                active: '',
                dataSourceId: '',
                label: {
                    label_en: '',
                    // spaLabel: '',
                    // freLabel: '',
                    // porLabel: '',
=======
                active: '',
                dataSourceId: '',
                label: {
                    engLabel: '',
                    spaLabel: '',
                    freLabel: '',
                    porLabel: '',
>>>>>>> 4b02a829c246df966f6e24b1cf2ce67285c00d70
                    labelId: '',
                },
                dataSourceType: {
                    dataSourceTypeId: ''
                }
            },
            dataSourceTypeList: []
        }
        this.updateFieldData = this.updateFieldData.bind(this);
        this.updateForm = this.updateForm.bind(this);
<<<<<<< HEAD
        this.Capitalize=this.Capitalize.bind(this);
        this.cancelClicked=this.cancelClicked.bind(this);
=======
>>>>>>> 4b02a829c246df966f6e24b1cf2ce67285c00d70
    }


    componentDidMount() {
        AuthenticationService.setupAxiosInterceptors();
        this.setState({
            dataSource: this.props.location.state.dataSource
        });

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

        $("#updatyeDataSourceForm").validate({
            ignore: [],
            rules: {
<<<<<<< HEAD
                'dataSource.label.label_en': {
                    required: true,
                    lettersonlywhitespace: true,
                    maxlength: 255
                },
                // 'dataSource.label.freLabel': {

                //     lettersonly: true,
                //     maxlength: 255
                // },
                // 'dataSource.label.spaLabel': {

                //     lettersonly: true,
                //     maxlength: 255
                // },
                // 'dataSource.label.porLabel': {

                //     lettersonly: true,
                //     maxlength: 255
                // },
=======
                'dataSource.label.engLabel': {
                    required: true,
                    lettersonly: true,
                    maxlength: 255
                },
                'dataSource.label.freLabel': {

                    lettersonly: true,
                    maxlength: 255
                },
                'dataSource.label.spaLabel': {

                    lettersonly: true,
                    maxlength: 255
                },
                'dataSource.label.porLabel': {

                    lettersonly: true,
                    maxlength: 255
                },
>>>>>>> 4b02a829c246df966f6e24b1cf2ce67285c00d70
                'dataSource.dataSourceType.dataSourceTypeId': {
                    required: true
                }
            },
            errorPlacement: function (error, element) {
                error.insertAfter(element);
            }
        });
    }

    updateFieldData(event) {

        let { dataSource } = this.state

<<<<<<< HEAD
        if (event.target.name === "dataSource.label.label_en") {
            // console.log("inside if")
            dataSource.label.label_en = event.target.value
        } 
        // if (event.target.name === "dataSource.label.freLabel") {
        //     //onsole.log("inside if")
        //     dataSource.label.freLabel = event.target.value
        // } if (event.target.name === "dataSource.label.spaLabel") {
        //     //console.log("inside if")
        //     dataSource.label.spaLabel = event.target.value
        // } if (event.target.name === "dataSource.label.porLabel") {
        //     //console.log("inside if")
        //     dataSource.label.porLabel = event.target.value
        // } 
        if (event.target.name === "dataSource.dataSourceType.dataSourceTypeId") {
            this.state.dataSource.dataSourceType.dataSourceTypeId = event.target.value
        } else if (event.target.name === "dataSource.active") {
            //console.log("hi----");
            dataSource.active = event.target.id === "dataSource.active2" ? false : true
=======
        if (event.target.name === "dataSource.label.engLabel") {
            // console.log("inside if")
            dataSource.label.engLabel = event.target.value
        } if (event.target.name === "dataSource.label.freLabel") {
            //onsole.log("inside if")
            dataSource.label.freLabel = event.target.value
        } if (event.target.name === "dataSource.label.spaLabel") {
            //console.log("inside if")
            dataSource.label.spaLabel = event.target.value
        } if (event.target.name === "dataSource.label.porLabel") {
            //console.log("inside if")
            dataSource.label.porLabel = event.target.value
        } if (event.target.name === "dataSource.dataSourceType.dataSourceTypeId") {
            this.state.dataSource.dataSourceType.dataSourceTypeId = event.target.value
        } else if (event.target.name === "dataSource.active") {
            dataSource.active = event.target.id = "dataSource.active2" ? false : true
>>>>>>> 4b02a829c246df966f6e24b1cf2ce67285c00d70
        }


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
    cancelClicked() {
        this.props.history.push(`/dataSourceList/` + "Action Canceled") 
    }
=======
>>>>>>> 4b02a829c246df966f6e24b1cf2ce67285c00d70
    updateForm() {

        if (navigator.onLine) {
            if ($("#updatyeDataSourceForm").valid()) {
                //console.log(this.state);
                DataSourceService.editDataSource(this.state.dataSource).then(response => {
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
                <h3>{myConst.UPDATE_DATASOURCE}</h3>
                <form name="updatyeDataSourceForm" id="updatyeDataSourceForm">
                    <div>
                        <label>{myConst.DATASOURCE_TYPE_NAME_EN}:-</label>
<<<<<<< HEAD
                        <input type="text" name="dataSource.label.label_en" value={this.Capitalize(this.state.dataSource.label.label_en)} onChange={this.updateFieldData} />
                    </div>
                    <br /><br />
                    {/* <div>
=======
                        <input type="text" name="dataSource.label.engLabel" value={this.state.dataSource.label.engLabel} onChange={this.updateFieldData} />
                    </div>
                    <br /><br />
                    <div>
>>>>>>> 4b02a829c246df966f6e24b1cf2ce67285c00d70
                        <label>{myConst.DATASOURCE_TYPE_NAME_FR}:-</label>
                        <input type="text" name="dataSource.label.freLabel" value={this.state.dataSource.label.freLabel} onChange={this.updateFieldData} />
                    </div>
                    <br /><br />
                    <div>
                        <label>{myConst.DATASOURCE_TYPE_NAME_SP}:-</label>
                        <input type="text" name="dataSource.label.spaLabel" value={this.state.dataSource.label.spaLabel} onChange={this.updateFieldData} />
                    </div>
                    <br /><br />
                    <div>
                        <label>{myConst.DATASOURCE_TYPE_NAME_PO}:-</label>
                        <input type="text" name="dataSource.label.porLabel" value={this.state.dataSource.label.porLabel} onChange={this.updateFieldData} />
                    </div>
<<<<<<< HEAD
                    <br /><br /> */}
=======
                    <br /><br />
>>>>>>> 4b02a829c246df966f6e24b1cf2ce67285c00d70
                    <div>
                        {myConst.ACTIVE}:
                    <input type="radio" id="dataSource.active1" name="dataSource.active" value={true} checked={this.state.dataSource.active === true} onChange={this.updateFieldData} /> Active
                    <input type="radio" id="dataSource.active2" name="dataSource.active" value={false} checked={this.state.dataSource.active === false} onChange={this.updateFieldData} /> Disabled
                     </div>
                    <br /><br />
                    <div>
                        {myConst.SELECT_DATA_SOURCE_TYPE} : <select id="dataSourceTypeId" name="dataSource.dataSourceType.dataSourceTypeId" value={this.state.dataSource.dataSourceType ? this.state.dataSource.dataSourceType.dataSourceTypeId : ''} onChange={this.updateFieldData}>
                            <option value="">-Nothing Selected-</option>
                            {dataSourceTypes}
                        </select>
                    </div>
                    <br /><br />
                    <input type="hidden" name="dataSource.dataSourceId" value={this.state.dataSource.dataSourceId} />
                    <input type="hidden" name="dataSource.label.labelId" value={this.state.dataSource.label.labelId} />
                    <div>
                        <button type="button" onClick={this.updateForm}>{myConst.UPDATE_BUTTON}</button>
<<<<<<< HEAD
                        <button type="button" onClick={this.cancelClicked}>{myConst.BTN_CANCEL}</button><br></br><br></br>
=======
>>>>>>> 4b02a829c246df966f6e24b1cf2ce67285c00d70
                    </div>
                </form>
            </>

        );


    }

}