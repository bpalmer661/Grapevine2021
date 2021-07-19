import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
  

const token = localStorage.FBToken


const AuthRoute = ({component: Component, authenticated, ...rest}) => (


<Route
{...rest}
render={(props) => token ? <Redirect to='/'/> : <Component {...props}/>}
/>
)

// at the moment we are sending user to login page when there is no token but , authenticated is not set to false fast enough so when we get to login page
// we are sent to home and back to login etc 

const mapStateToProps = (state) => ({ authenticated: state.user.authenticated })



AuthRoute.propTypes = {
    user: PropTypes.object
}
  

export default connect(mapStateToProps)(AuthRoute);
