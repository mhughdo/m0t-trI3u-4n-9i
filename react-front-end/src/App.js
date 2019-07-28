import React, {Suspense} from 'react'
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom'
import './App.css'
import {connect} from 'react-redux'
import Login from './pages/login'
import SignUp from './pages/sign-up'
import Chat from './pages/chat'
import Home from './pages/home'
import PageView from './components/menu/PageView'
import history from './utils/history'
import {auth, createUserProfileDocument} from './firebase/firebaseUtils'
import {setCurrentUser} from './redux/user/userActions'
import PrivateRoute from './components/private-route/PrivateRoute'

class App extends React.Component {
    unsubscribeFromAuth = null

    componentDidMount() {
        const {setCurrentUser} = this.props
        this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
            if (userAuth) {
                const userRef = await createUserProfileDocument(userAuth)
                userRef.onSnapshot(snapShot => {
                    console.log(snapShot)
                    setCurrentUser({
                        currentUser: {
                            id: snapShot.id,
                            index: snapShot.index,
                            ...snapShot.data(),
                        },
                    })
                })
            }
            setCurrentUser(userAuth)
        })
    }

    componentWillUnmount() {
        this.unsubscribeFromAuth()
    }

    render() {
        return (
            <Router history={history}>
                <PageView>
                    <div>
                        {/* <PrivateRoute path='/' /> */}
                        <Route exact path='/' component={Home} />
                        <Route
                            exact
                            path='/login'
                            render={() => (this.props.currentUser ? <Redirect to='/' /> : <Login />)}
                        />
                        <Route path='/sign-up' component={SignUp} />
                        <Route path='/chat' component={Chat} />
                    </div>
                </PageView>
            </Router>
        )
    }
}

const mapStateToProps = state => ({
    currentUser: state.user.currentUser,
    loading: state.user.loading,
})

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
