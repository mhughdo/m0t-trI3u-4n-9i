import React, { Component } from 'react'
import { Card, Button } from 'antd'
import Swipeable from "react-swipy"

import UserCard from '../components/user-card/UserCard'
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
            matchData: ["First", "Second", "Third"]
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
                                <UserCard>{matchData[0]}</UserCard>
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
export default Home
