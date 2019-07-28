import React, { Component } from 'react'
import { Card, Button } from 'antd'
import Swipeable from "react-swipy"
import { connect } from 'react-redux'

import UserCard from '../components/user-card/UserCard'
import { getRandomImg } from '../utils/getRandomImage'
import { getMatchedUser } from '../utils/getMatchedUser';

const wrapperStyles = { position: "relative", width: 375, height: 567 };
const actionsStyles = {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 12,
};

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            matchData: [
                {
                    name: '',
                    image: '',
                    job: ''
                }
            ]
        }
    }

    componentDidMount() {
        // console.log('Home', this.props)
        // getRandomImg().then(res => {
        //     console.log('More', res)
        //     const results = res.results[0]
        //     this.setState({
        //         matchData: [
        //             {
        //                 name: results.name.first + ' ' + results.name.last,
        //                 image: results.picture.large,
        //                 job: 'student'
        //             }
        //         ]
        //     })
        // })
    }

    componentDidUpdate() {
        console.log("props", this.props)
        if (this.props.currentUser) {
            getMatchedUser(900).then(res => {
                if (res.success) {
                    const { data } = res;
                    this.setState({
                        matchData: data
                    })
                }

            })
        }
    }

    remove = () =>
        this.setState(({ matchData }) => ({
            matchData: matchData.slice(1, matchData.length),
        }));

    render() {
        const { matchData } = this.state;
        return (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={wrapperStyles}>
                    {matchData.length > 0 ? (
                        <div style={wrapperStyles}>
                            <Swipeable
                                buttons={({ left, right }) => (
                                    <div style={actionsStyles}>
                                        <Button onClick={left}>Reject</Button>
                                        <Button onClick={right}>Accept</Button>
                                    </div>
                                )}
                                onAfterSwipe={this.remove}
                            >
                                <UserCard {...matchData[0]}></UserCard>
                            </Swipeable>
                        </div>
                    ) : (
                            <Card zIndex={-2}>No more cards</Card>
                        )}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    currentUser: state.user.currentUser,
})


export default connect(
    mapStateToProps,
)(Home)
