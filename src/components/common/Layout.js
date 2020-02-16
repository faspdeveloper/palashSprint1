import React from 'react'
import { Switch, Route } from 'react-router-dom'
import IdleTimer from 'react-idle-timer';
import WelcomeComponent from "../home/WelcomeComponent";
import { IdleTimeOutModal } from './IdleModal.js';
import PropTypes from 'prop-types';

import '../../css/bootstrap/bootstrap.min.css';
import '../../App.css'
import AddUserComponent from "../user/AddUserComponent.jsx";
import UserListComponent from "../user/UserListComponent.jsx";
import EditUserComponent from "../user/EditUserComponent.jsx";
import UpdateExpiredPasswordComponent from "../home/UpdateExpiredPasswordComponent.jsx";
import ChangePasswordComponent from "../home/ChangePasswordComponent.jsx";
import ForgotPasswordComponent from "../home/ForgotPasswordComponent.jsx";
import LoginComponent from "../home/LoginComponent.jsx";
import RoleListComponent from "../user/RoleListComponent.jsx";
import AddRoleComponent from "../user/AddRoleComponent.jsx";
import AuthenticationService from '../common/AuthenticationService.js';

import AddLanguageComponent from '../language/AddLanguageComponent'
import LanguageListComponent from "../language/LanguageListComponent.jsx"
import EditLanguageComponent from "../language/EditLanguageComponent.jsx"
import AddDataSourceTypeComponent from "../datasourceType/AddDataSourceTypeComponent.jsx"
import DataSourceTypeListComponent from "../datasourceType/DataSourceTypeListComponent.jsx"
import UpdateDataSourceTypeComponent from "../datasourceType/UpdateDataSourceTypeComponent.jsx"
import AddDataSource from "../dataSource/AddDataSource.jsx"
import DataSourceListComponent from "../dataSource/DataSourceListComponent.jsx"
import UpdateDataSourceComponent from "../dataSource/UpdateDataSourceComponent.jsx"
import AddCurrencyComponent from "../currency/AddCurrencyComponent.jsx"
import CurrencyListComponent from "../currency/CurrencyListComponent.jsx"
import UpdateCurrencyComponent from "../currency/UpdateCurrencyComponent.jsx"
import DownloadProgramDataComponent from '../program/DownloadProgramDataComponent';
import ImportProgramDataComponent from '../program/ImportProgramDataComponent';
import ExportProgramDataComponent from '../program/ExportProgramDataComponent';

class Layout extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            timeout: AuthenticationService.checkSessionTimeOut(),
            showModal: false,
            userLoggedIn: false,
            isTimedOut: false
        }

        this.idleTimer = null
        this.onAction = this._onAction.bind(this)
        this.onActive = this._onActive.bind(this)
        this.onIdle = this._onIdle.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleLogout = this.handleLogout.bind(this)
    }

    _onAction(e) {
      console.log('user did something', e)
      this.setState({isTimedOut: false})
    }
   
    _onActive(e) {
      console.log('user is active', e)
      this.setState({isTimedOut: false})
    }
   
    _onIdle(e) {
      console.log('user is idle', e)
      const isTimedOut = this.state.isTimedOut
      if (isTimedOut) {
          this.props.history.push('/')
      } else {
        this.setState({showModal: true})
        this.idleTimer.reset();
        this.setState({isTimedOut: true})
      }
      
    }

    handleClose() {
      this.setState({showModal: false})
    }

    handleLogout() {
      this.setState({showModal: false})
      this.props.history.push('/')
    }

    render(){
      const { match } = this.props
      return(
        <>
          <IdleTimer
            ref={ref => { this.idleTimer = ref }}
            element={document}
            onActive={this.onActive}
            onIdle={this.onIdle}
            onAction={this.onAction}
            debounce={250}
            timeout={this.state.timeout} />

            <div className="">
            {/* {AuthenticationService.setupAxiosInterceptors()} */}
                <Switch>

                {/* <Route path="/" exact component={LoginComponent} /> */}
                <Route path="/login/:message" exact component={LoginComponent} />
                    <Route 
                        exact path={`${match.path}welcome`}
                        render={(props) => <WelcomeComponent {...props} /> }/>
                    />
                    <Route 
                        exact path={`${match.path}welcome/:message`}
                        render={(props) => <WelcomeComponent {...props} /> }/>
                    />
                    <Route 
                        exact path={`${match.path}addUser`}
                        render={(props) => <AddUserComponent {...props} /> }/>
                    />
                    <Route 
                        exact path={`${match.path}userList`}
                        render={(props) => <UserListComponent {...props} /> }/>
                    />

                    <Route 
                        exact path={`${match.path}userList/:message`}
                        render={(props) => <UserListComponent {...props} /> }/>
                    />

                    <Route 
                        exact path={`${match.path}editUser`}
                        render={(props) => <EditUserComponent {...props} /> }/>
                    />

                    <Route 
                        exact path={`${match.path}updateExpiredPassword`}
                        render={(props) => <UpdateExpiredPasswordComponent {...props} /> }/>
                    />

                    <Route 
                        exact path={`${match.path}changePassword`}
                        render={(props) => <ChangePasswordComponent {...props} /> }/>
                    />
                    <Route 
                        exact path={`${match.path}forgotPassword`}
                        render={(props) => <ForgotPasswordComponent {...props} /> }/>
                    />
                    
                    <Route 
                        exact path={`${match.path}addRole`}
                        render={(props) => <AddRoleComponent {...props} /> }/>
                    />

                    <Route 
                        exact path={`${match.path}roleList`}
                        render={(props) => <RoleListComponent {...props} /> }/>
                    />

                    <Route 
                        exact path={`${match.path}roleList/:message`}
                        render={(props) => <RoleListComponent {...props} /> }/>
                    />
                    <Route 
                        exact path={`${match.path}addLanguage`}
                        render={(props) => <AddLanguageComponent {...props} /> }/>
                    />
                    <Route 
                        exact path={`${match.path}editLanguage`}
                        render={(props) => <EditLanguageComponent {...props} /> }/>
                    />
                    <Route 
                        exact path={`${match.path}languageList/:message`}
                        render={(props) => <LanguageListComponent {...props} /> }/>
                    />

                    
                    <Route 
                        exact path={`${match.path}addDataSourceType`}
                        render={(props) => <AddDataSourceTypeComponent {...props} /> }/>
                    />
                    <Route 
                        exact path={`${match.path}editDataSourceType`}
                        render={(props) => <UpdateDataSourceTypeComponent {...props} /> }/>
                    />
                    <Route 
                        exact path={`${match.path}dataSourceTypeList/:message`}
                        render={(props) => <DataSourceTypeListComponent {...props} /> }/>
                    />


                    <Route 
                        exact path={`${match.path}addDataSource`}
                        render={(props) => <AddDataSource {...props} /> }/>
                    />
                    <Route 
                        exact path={`${match.path}editDataSource`}
                        render={(props) => <UpdateDataSourceComponent {...props} /> }/>
                    />
                    <Route 
                        exact path={`${match.path}dataSourceList/:message`}
                        render={(props) => <DataSourceListComponent {...props} /> }/>
                    />


                    <Route 
                        exact path={`${match.path}addCurrency`}
                        render={(props) => <AddCurrencyComponent {...props} /> }/>
                    />
                    <Route 
                        exact path={`${match.path}editCurrency`}
                        render={(props) => <UpdateCurrencyComponent {...props} /> }/>
                    />
                    <Route 
                        exact path={`${match.path}currencyList/:message`}
                        render={(props) => <CurrencyListComponent {...props} /> }/>
                    />
                    <Route 
                        exact path={`${match.path}downloadProgramData/`}
                        render={(props) => <DownloadProgramDataComponent {...props} /> }/>
                    />
                    <Route 
                        exact path={`${match.path}importProgramData/`}
                        render={(props) => <ImportProgramDataComponent {...props} /> }/>
                    />
                    <Route 
                        exact path={`${match.path}exportProgramData/`}
                        render={(props) => <ExportProgramDataComponent {...props} /> }/>
                    />

                </Switch>
                
              {/*  <IdleTimeOutModal 
                    showModal={this.state.showModal} 
                    handleClose={this.handleClose}
                    handleLogout={this.handleLogout}
                />*/}
            </div>
        </>
      )
   }

 }

 Layout.propTypes = {
     match: PropTypes.any.isRequired,
     history: PropTypes.func.isRequired
 }

export default Layout