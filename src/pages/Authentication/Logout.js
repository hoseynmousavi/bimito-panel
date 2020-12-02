import React, {Component} from "react"
import {connect} from "react-redux"
import {withRouter} from "react-router-dom"
import {logoutUser} from "../../store/actions"

class Logout extends Component
{
    componentDidMount = () =>
    {
        const {logoutUser, history} = this.props
        logoutUser({resolve: () => history.replace("/login")})
    }

    render()
    {
        return <React.Fragment/>
    }
}

export default withRouter(connect(null, {logoutUser})(Logout))