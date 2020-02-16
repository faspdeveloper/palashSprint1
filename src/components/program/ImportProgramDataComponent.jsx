import React, { Component } from 'react';
import { IMPORT_TITLE, BTN_IMPORT, DATA_IMPORT_SUCCESS, IMPORT_PROGRAM, BTN_SUBMIT } from '../../Labels.js';
import { SECRET_KEY } from '../../Constants.js';
import JSZip from 'jszip';
import CryptoJS from 'crypto-js';
import $ from 'jquery';

export default class ImportProgramDataComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            programData: {},
            message: "",
            programList: []
        }
        this.importClicked = this.importClicked.bind(this);
        this.programSubmitClicked = this.programSubmitClicked.bind(this);
    }

    componentDidMount() {
        $("#programDiv").hide();
        $("#importDiv").show();
    }

    render() {
        const { programList } = this.state;
        let programItems = programList.length > 0
            && programList.map((item, i) => {
                return (
                    <option key={i} value={item.id}>{item.name}</option>
                )
            }, this);
        return (
            <div>
                <h4>{this.state.message}</h4>
                <h4>{IMPORT_TITLE}</h4><br></br>
                <div id="importDiv">
                    <input type="file" /><br></br><br></br>
                    <button type="button" onClick={this.importClicked}>{BTN_IMPORT}</button>
                </div>
                <div id="programDiv">
                    {IMPORT_PROGRAM} : <select id="programId" name="programId" multiple={true}>
                        {programItems}
                    </select><br></br><br></br>
                    <button type="button" onClick={this.programSubmitClicked}>{BTN_SUBMIT}</button>
                </div>
            </div>
        )
    }

    importClicked() {
        var importObjectDataFromFile = {};
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            if (document.querySelector('input[type=file]').files[0] == undefined) {
                alert("Please select a file");
            } else {
                var file = document.querySelector('input[type=file]').files[0];
                JSZip.loadAsync(file).then(function (zip) {
                    var i = 0;
                    var fileName = []
                    var size = 0;
                    Object.keys(zip.files).forEach(function (filename) {
                        size++;
                    })
                    Object.keys(zip.files).forEach(function (filename) {
                        zip.files[filename].async('string').then(function (fileData) {
                            i++;
                            var programDataJson = JSON.parse(fileData);
                            var bytes = CryptoJS.AES.decrypt(programDataJson.programData, SECRET_KEY);
                            var plaintext = bytes.toString(CryptoJS.enc.Utf8);
                            var programDataJsonDecrypted = JSON.parse(plaintext);
                            fileName[i] = {
                                id: filename,
                                name: programDataJsonDecrypted.label.labelEn
                            }
                            if (i === size) {
                                this.setState({
                                    programList: fileName
                                })

                                $("#programDiv").show();
                                $("#importDiv").hide();
                            }
                        }.bind(this))

                    }.bind(this))

                }.bind(this))
            }

        }

    }

    programSubmitClicked() {
        var importObjectDataFromFile = {};
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            if (document.querySelector('input[type=file]').files[0] == undefined) {
                alert("Please select a file");
            } else {
                var file = document.querySelector('input[type=file]').files[0];
                var db1;
                var storeOS;
                var openRequest = indexedDB.open('fasp', 1);
                var selectedPrgArr = $("#programId").val();
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
                    var getRequest = program.clear();
                    getRequest.onerror = function (event) {
                        // Handle errors!
                    };
                    getRequest.onsuccess = function (event) {
                        JSZip.loadAsync(file).then(function (zip) {
                            Object.keys(zip.files).forEach(function (filename) {

                                zip.files[filename].async('string').then(function (fileData) {
                                    for (var j = 0; j < selectedPrgArr.length; j++) {
                                        if (selectedPrgArr[j] == filename) {
                                            db1 = e.target.result;
                                            var transaction2 = db1.transaction(['programData'], 'readwrite');
                                            var program2 = transaction2.objectStore('programData');
                                            var addProgramDataRequest = program2.add(JSON.parse(fileData));
                                            addProgramDataRequest.onerror = function (event) {
                                            };
                                            addProgramDataRequest.onsuccess = function (event) {
                                            };
                                        }

                                    }
                                })
                            })
                        })
                        this.setState({
                            message: `${DATA_IMPORT_SUCCESS}`
                        })
                        $("#programDiv").hide();
                        $("#importDiv").show();
                    }.bind(this)
                }.bind(this)
            }

        }
    }
}
