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

class App extends React.Component {

    updateToken = async (token) => {
        let user = await getCurrentUser(token);
        if (user) {
            this.setState(({
                isProfile: false,
                isAuth: true,
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

    componentDidMount = async () => {
        let token = localStorage.getItem("token");
        if (token) {
            let user = await getCurrentUser(token);
            if (user) {
                this.setState(({
                    isProfile: false,
                    isAuth: true,
                    token: token,
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
        }
    }

    render() {
        return (
            <div className="wrapper">
                <Header globalComponent={this}/>
                <section className="main">
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
