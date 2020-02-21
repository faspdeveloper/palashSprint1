import React, { Component } from 'react';
import { BTN_DOWNLOAD, DOWNLOAD_TITLE, DATA_DOWNLOAD_SUCCESS, PROGRAM } from '../../Labels.js';
import ProgramService from '../../api/ProgramService.js';
import CryptoJS from 'crypto-js';
import { SECRET_KEY } from '../../Constants.js'
import AuthenticationService from '../common/AuthenticationService.js';
import $ from 'jquery';
import 'jquery-validation';

export default class DownloadProgramDataComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            programData: {},
            programList: [],
            message: ""
        }
        this.downloadClicked = this.downloadClicked.bind(this);
    }

    componentDidMount() {
        AuthenticationService.setupAxiosInterceptors();
        ProgramService.getProgramList().then(response => {
            console.log(response.data)
            this.setState({
                programList: response.data
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

        $("#downloadForm").validate({
            ignore: [],
            rules: {
                'programId': {
                    required: true
                },
            }
        })
    }

    render() {
        const { programList } = this.state;
        let programItems = programList.length > 0
            && programList.map((item, i) => {
                return (
                    <option key={i} value={item.programId}>{item.label.engLabel}</option>
                )
            }, this);
        return (
            <div>
                <h4>{this.state.message}</h4>
                <h4>{DOWNLOAD_TITLE}</h4><br></br>
                <form name="downloadForm" id="downloadForm">
                    {PROGRAM} : <select id="programId" name="programId" multiple={true}>
                        {programItems}
                    </select><br></br><br></br>
                    <button type="button" onClick={this.downloadClicked}>{BTN_DOWNLOAD}</button>
                </form>
            </div>
        )
    }

    downloadClicked() {
        if (navigator.onLine) {
            if ($("#downloadForm").valid()) {
                var programArr = $("#programId").val();
                for (var j = 0; j < programArr.length; j++) {
                    AuthenticationService.setupAxiosInterceptors();
                    ProgramService.getProgramData(programArr[j])
                        .then(response => {
                            var json = response.data;
                            var db1;
                            var storeOS;
                            var openRequest = indexedDB.open('fasp', 1);
                            openRequest.onupgradeneeded = function (e) {
                                var db1 = e.target.result;
                                if (!db1.objectStoreNames.contains('programData')) {
                                    storeOS = db1.createObjectStore('programData', { keyPath: 'id', autoIncrement: true });
                                }
                            };
                            openRequest.onsuccess = function (e) {
                                db1 = e.target.result;
                                var transaction = db1.transaction(['programData'], 'readwrite');
                                var program = transaction.objectStore('programData');
                                for (var i = 0; i < json.length; i++) {
                                    var encryptedText = CryptoJS.AES.encrypt(JSON.stringify(json[i]), SECRET_KEY);
                                    var item = {
                                        id: json[i].programId,
                                        programData: encryptedText.toString()
                                    };

                                    var getRequest = program.put(item);

                                    getRequest.onerror = function (event) {
                                        // Handle errors!
                                    };
                                    getRequest.onsuccess = function (event) {
                                        this.setState({
                                            message: `${DATA_DOWNLOAD_SUCCESS}`
                                        })
                                    }.bind(this);
                                }
                            }.bind(this)
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
                                            message: error.response.data.message
                                        })
                                        break
                                }
                            }
                        );
                }
            }
        } else {
            alert("To perform this action you must be online.");
        }
    }

}

