import React,{Compoent, Component} from 'react';
import DataSourceService from '../../api/DataSourceService';
import AuthenticationService from '../common/AuthenticationService.js';
import * as myConst from '../../Labels.js';


export default class DataSourceListComponent extends Component{

constructor(props){
super(props);
this.state={
dataSourceList:[]

}
this.editDataSource=this.editDataSource.bind(this);
this.addNewDataSource=this.addNewDataSource.bind(this);
}

componentDidMount() {
    AuthenticationService.setupAxiosInterceptors();
    DataSourceService.getDataSourceList().then(response => {        
        this.setState({
            dataSourceList: response.data
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
}

editDataSource(dataSource) {
    this.props.history.push({
        pathname: "/editDataSource",
        state: { dataSource: dataSource }
    });

}

addNewDataSource(){

    if (navigator.onLine) {
        this.props.history.push(`/addDataSource`)
    } else {
        alert("You must be Online.")
    }

}

render() {
    return (
        <>

            <p>{this.props.match.params.message}</p>
            <div>
                <button type="button" style={{ marginLeft: '-999px' }} onClick={this.addNewDataSource}>{myConst.ADD_NEW_DATA_SOURCE}</button><br /><br />
            </div>

            <div className="dataSourceList">

                <h1>{myConst.DATA_SOURCE_LIST}</h1>
                <table border="1" align="center">
                    <thead>
                        <tr>
                            <th>{myConst.DATASOURCE_NAME_EN}</th>
                            <th>{myConst.DATASOURCE_NAME_FR}</th>
                            <th>{myConst.DATASOURCE_NAME_SP}</th>
                            <th>{myConst.DATASOURCE_NAME_PO}</th>
<<<<<<< HEAD
                            <th>{myConst.DATASOURCE_TYPE_NAME_EN}</th>
                            <th>{myConst.DATASOURCE_ACTIVE}</th>
                            
=======
                            <th>{myConst.DATASOURCE_ACTIVE}</th>
>>>>>>> 4b02a829c246df966f6e24b1cf2ce67285c00d70

                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.dataSourceList.map(dataSource =>

                                <tr key={dataSource.dataSourceId} onClick={() => this.editDataSource(dataSource)}>
<<<<<<< HEAD
                                    <td>{dataSource.label.label_en}</td>
                                    <td>{dataSource.label.label_fr}</td>
                                    <td>{dataSource.label.label_sp}</td>
                                    <td>{dataSource.label.label_pr}</td>
                                    <td>{dataSource.dataSourceType.label.label_en}</td>
=======
                                    <td>{dataSource.label.engLabel}</td>
                                    <td>{dataSource.label.freLabel}</td>
                                    <td>{dataSource.label.spaLabel}</td>
                                    <td>{dataSource.label.porLabel}</td>
>>>>>>> 4b02a829c246df966f6e24b1cf2ce67285c00d70
                                    <td>{dataSource.active.toString() == "true" ? "Active" : "Disabled"}</td>
                                </tr>
                            )

                        }
                    </tbody>
                </table>
            </div>

        </>
    );
}

}