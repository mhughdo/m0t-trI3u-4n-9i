import React, {Component} from 'react'
import {Card, Button} from 'antd'
import Swipeable from 'react-swipy'
import {connect} from 'react-redux'

import UserCard from '../components/user-card/UserCard'
import {getRandomImg} from '../utils/getRandomImage'
import {getMatchedUser} from '../utils/getMatchedUser'

const wrapperStyles = {position: 'relative', width: 375, height: 567}
const actionsStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 12,
}

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            matchData: [],
        }
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     if (!this.props.currentUser){
    //         return true
    //     }
    //     if (_.isEqual(this.props, nextProps)) {
    //         return false
    //     }
    //     return true
    // }

    componentDidMount() {
        console.log('Did mount')
        const index = (this.props.currentUser && this.props.currentUser.index) || 900
        if (this.props.currentUser && this.state.matchData.length < 5) {
            getMatchedUser(index).then(res => {
                if (res.success) {
                    console.log('Set data')
                    const {data} = res
                    this.setState({
                        matchData: data,
                    })
                }
            })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('CPN did update')
        console.log('current User', this.props.currentUser)
        if (this.props.currentUser && this.props.currentUser.hasOwnProperty('index')) {
            const index = this.props.currentUser.index || 900
            if (!index || this.state.matchData.length > 5) return
            console.log('indexxxxxxxxxxxxx111', index)
            this._getMatchedUser(index)
        }
    }

    _getMatchedUser = async index => {
        console.log('indexxxxxxxxxxxxx', index)
        const {success, message, data} = await getMatchedUser(index)
        if (success) {
            console.log('Set data')
            this.setState({
                matchData: data,
            })
        }
    }

    remove = () => {
        this.setState(({matchData}) => ({
            matchData: matchData.slice(1, matchData.length),
        }))
    }

    handleReject = left => () => {
        left()
        this.reject()
    }

    handleAccept = right => () => {
        right()
        this.accept()
    }

    handleSwipe = direction => {
        console.log(direction)
        if (direction === 'right') {
            this.accept()
        } else {
            this.reject()
        }
    }

    accept = () => {
        // Todo logic to accept, the current user is this.state.matchData[0]
    }

    reject = () => {
        // Todo logic to reject, the current user is this.state.matchData[0]
    }

    render() {
        const {matchData} = this.state

        return (
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <div style={wrapperStyles}>
                    {matchData.length > 0 ? (
                        <div style={wrapperStyles}>
                            <Swipeable
                                buttons={({left, right}) => (
                                    <div style={actionsStyles}>
                                        <Button onClick={this.handleReject(left)}>Reject</Button>
                                        <Button onClick={this.handleAccept(right)}>Accept</Button>
                                    </div>
                                )}
                                onSwipe={this.handleSwipe}
                                onAfterSwipe={this.remove}>
                                <UserCard userData={matchData[0]} />
                            </Swipeable>
                        </div>
                    ) : (
                        <Card>Loading...</Card>
                    )}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    currentUser: state.user.currentUser,
})

export default connect(mapStateToProps)(Home)
