import Header from "./Header";
import Footer from "./Footer";
import React from 'react';
import './css/App.css';
import './css/media.css';
import {getCurrentUser} from "./core";
import Auth from "./Auth";
import Profile from "./Profile";
import Contact from "./Contact";
import UserList from "./UserList";
import AppMessage from "./AppMessage";

class App extends React.Component {

    updateToken = async (token) => {
        let user = await getCurrentUser(token);
        if (user) {
            const client = this.getClient();
            this.setState(({
                client: client,
                isProfile: false,
                isAuth: true,
                isUserList: false,
                message: null,
                token: token,
                user: {
                    id: user.id,
                    username: user.username,
                    phone_number: user.phone_number,
                    roleId: user.roleId,
                }
            }))
            localStorage.setItem("token", token);
        }
    }

    getClient = () => {
        let client = new WebSocket('wss://contactfury.herokuapp.com');
        client.onmessage = (event) => {
            let json = JSON.parse(event.data);
            let ban = json.ban || null;
            const {user} = this.state;
            if (ban && Number(ban.userId) === user.id) {
                this.setState({message: 'You have been banned', isAuth: false});
                localStorage.removeItem("token");
                client.close();
            }
        }
        return client;
    }

    componentDidMount = async () => {
        let token = localStorage.getItem("token");
        if (token) {
            let user = await getCurrentUser(token);
            if (user) {
                const client = this.getClient();
                this.setState(({
                    client: client,
                    isProfile: false,
                    isAuth: true,
                    isUserList: false,
                    token: token,
                    message: null,
                    user: {
                        id: user.id,
                        username: user.username,
                        phone_number: user.phone_number,
                        roleId: user.roleId,
                    }
                }));
            }
        }
    }

    constructor() {
        super();
        this.state = {
            client: null,
            user: {
                id: null,
                username: null,
                phone_number: null,
                roleId: null,
            },
            token: null,
            isAuth: false,
            isProfile: false,
            isUserList: false,
            message: null,
        }
    }

    render() {
        return (
            <div className="wrapper">
                <Header globalComponent={this}/>
                <section className="main">
                    {this.state.message && (<AppMessage message={this.state.message}/>)}
                    {!this.state.isAuth && (
                        <Auth globalComponent={this}/>
                    )}
                    {this.state.isAuth && this.state.isProfile && !this.state.isUserList && (
                        <Profile globalComponent={this}/>
                    )}
                    {this.state.isAuth && this.state.isUserList && !this.state.isProfile && (
                        <UserList globalComponent={this} token={this.state.token}/>
                    )}
                    {this.state.isAuth && !this.state.isProfile && !this.state.isUserList && (
                        <Contact globalState={this.state} token={this.state.token}/>
                    )}
                </section>
                <Footer/>
            </div>
        );
    }
}

export default App;
