import React, { Component } from "react";

class WelcomeComponent extends Component {

    constructor(props) {
        super(props);
       {/* this.listUserApproval=this.listUserApproval.bind(this);*/}
    }

    render() {
        return (
            <>
                <h1>Welcome!!</h1>
                <p>{this.props.match.params.message}</p>
            </>
        );
    }

   /*{ listUserApproval() {
        this.props.history.push(`/listUserApproval`)
    }*/
}

export default WelcomeComponent