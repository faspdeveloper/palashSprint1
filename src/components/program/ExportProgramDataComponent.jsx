import React, { Component } from 'react';
import { BTN_EXPORT, EXPORT_TITLE, PROGRAM, DATA_EXPORT_SUCCESS } from '../../Labels.js';
import { SECRET_KEY } from '../../Constants.js';
import JSZip from 'jszip';
import FileSaver from 'file-saver';
import CryptoJS from 'crypto-js';
import $ from 'jquery';

export default class ExportProgramDataComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            programData: {},
            programList: [],
            message: ""
        }
        this.exportClicked = this.exportClicked.bind(this);
    }

    componentDidMount() {
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
            var getRequest = program.getAll();
            var proList = []
            getRequest.onerror = function (event) {
                // Handle errors!
            };
            getRequest.onsuccess = function (event) {
                var myResult = [];
                myResult = getRequest.result;
                for (var i = 0; i < myResult.length; i++) {
                    var bytes = CryptoJS.AES.decrypt(myResult[i].programData, SECRET_KEY);
                    var plaintext = bytes.toString(CryptoJS.enc.Utf8);
                    var json = JSON.parse(plaintext);
                    var programJson = {
                        name: json.label.labelEn,
                        id: json.programId
                    }
                    proList[i] = programJson
                }
                this.setState({
                    programList: proList
                })
            }.bind(this);
        }.bind(this)
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
                <h4>{EXPORT_TITLE}</h4><br></br>
                {PROGRAM} : <select id="programId" name="programId" multiple={true}>
                    {programItems}
                </select><br></br><br></br>
                <button type="button" onClick={this.exportClicked}>{BTN_EXPORT}</button>
            </div>
        )
    }

    exportClicked() {
        var zip = new JSZip();
        var selectedPrgArr = $("#programId").val();
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
            var getRequest = program.getAll();
            getRequest.onerror = function (event) {
                // Handle errors!
            };
            getRequest.onsuccess = function (event) {
                var myResult = [];
                myResult = getRequest.result;
                for (var i = 0; i < myResult.length; i++) {
                    for (var j = 0; j < selectedPrgArr.length; j++) {
                        if (myResult[i].id == selectedPrgArr[j]) {
                            var txt = JSON.stringify(myResult[i]);
                            zip.file("file" + parseInt(i + 1) + ".txt", txt);

                        }
                    }
                    if (i == myResult.length - 1) {
                        zip.generateAsync({
                            type: "blob"
                        }).then(function (content) {
                            FileSaver.saveAs(content, "download.zip");
                        });
                        this.setState({
                            message: `${DATA_EXPORT_SUCCESS}`
                        })
                    }
                }


            }.bind(this);
        }.bind(this)



    }

}

