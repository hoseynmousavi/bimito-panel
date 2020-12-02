import React from "react"
import {Route, Redirect} from "react-router-dom"
import {connect} from "react-redux"

const AppRoute = ({
                      login,
                      component: Component,
                      layout: Layout,
                      isAuthProtected,
                      ...rest
                  }) => (
    <Route{...rest}
          render={props =>
          {
              if (isAuthProtected && (!login.token || !login.firstName)) return <Redirect to={{pathname: "/login", state: {from: props.location}}}/>
              else return <Layout><Component {...props} /></Layout>
          }}
    />
)

const mapStateToProps = state => ({
    login: state.Login,
})

export default connect(mapStateToProps)(AppRoute)