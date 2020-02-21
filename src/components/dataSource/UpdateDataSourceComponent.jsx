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
                active: '',
                dataSourceId: '',
                label: {
                    engLabel: '',
                    spaLabel: '',
                    freLabel: '',
                    porLabel: '',
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
        }


        this.setState(
            {
                dataSource
            }
        )


    }
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
                    <option key={i} value={item.dataSourceTypeId}>{item.label.engLabel}</option>
                )
            }, this);
        return (

            <>

                <h3>{myConst.UPDATE_DATASOURCE}</h3>
                <form name="updatyeDataSourceForm" id="updatyeDataSourceForm">
                    <div>
                        <label>{myConst.DATASOURCE_TYPE_NAME_EN}:-</label>
                        <input type="text" name="dataSource.label.engLabel" value={this.state.dataSource.label.engLabel} onChange={this.updateFieldData} />
                    </div>
                    <br /><br />
                    <div>
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
                    <br /><br />
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
                    </div>
                </form>
            </>

        );


    }

}