import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import './App.css';
import Login from "./pages/login";
import SignUp from "./pages/sign-up";
import Chat from "./pages/chat";
import Home from "./pages/home";
import PageView from "./components/menu/PageView";
import history from './utils/history'


// function LoginPage() {
//     return <LogoView><Login /></LogoView>
// }

// function SignUpPage() {
//     return <LogoView> <SignUp /> </LogoView>
// }

// function HomePage() {
//     return <PageView><Home></Home> </PageView>;
// }

// function ChatPage() {
//     return <PageView><Chat /></PageView>;
// }

function App() {
    return (

        <Router history={history}>
            <PageView>
                <div>
                    <Route exact path="/" component={Home} />
                    <Route path="/login" component={Login} />
                    <Route path="/sign-up" component={SignUp} />
                    <Route path="/chat" component={Chat} />
                </div>
            </PageView>
        </Router>
    )
}

export default App
