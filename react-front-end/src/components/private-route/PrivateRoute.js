import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

const PrivateRoute = ({component: Component, loading, currentUser, path, ...rest}) =>
    !loading && (
        <Route
            {...rest}
            render={props =>
                currentUser ? (
                    // <Component {...props} />
                    <Redirect
                        to={{
                            pathname: `${path}`,
                            state: {from: props.location},
                        }}
                    />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: {from: props.location},
                        }}
                    />
                )
            }
        />
    )

const mapStateToProps = state => ({
    currentUser: state.user.currentUser,
    loading: state.user.loading,
})
export default connect(mapStateToProps)(PrivateRoute)
