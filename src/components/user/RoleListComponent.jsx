import React, { Component } from 'react';
import UserService from "../../api/UserService.js";


export default class RoleListComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            roles: [],
            message: "Initial message"
        }
    }

    componentDidMount() {
        console.log("Going to call axios setup");
        
        UserService.getRoleList()
            .then(response => {
                this.setState({
                    roles: response.data
                })
            }).catch(
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

    render() {
        return (
            <>
                <div>Hi this is the Role list page</div>
                <table border="1" align="center">
                    <thead>
                        <tr>
                            <th>Role Id</th>
                            <th>Role name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.roles.map(role =>
                                <tr key={role.roleId}>
                                    <td>{role.roleId}</td>
                                    <td>{role.roleName}</td>
                                </tr>)
                        }
                    </tbody>
                </table>
                <br />
                <h3>{this.state.message}</h3>
            </>
        );
    }

}