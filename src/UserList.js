import React from 'react'
import {getUsers, banUsers} from "./core";

class UserList extends React.Component {

    componentDidMount = async () => {
        const {token} = this.props;
        let users = await getUsers(token);
        await this.setState({users: users});
        await this.setState((state) => ({page: state.page + 1}));
        if ((await getUsers(token, this.state.page)).length === 0)
            await this.setState({isVisible: false});
    }

    banUser = async (id) => {
        try {
            let response = await banUsers(this.props.token, id);
            await this.dropFilters()
            await this.setState({message: response.message});
        } catch (e) {
            await this.setState({message: e.message});
        }
    }


    constructor() {
        super();
        this.state = {
            users: [],
            message: null,
            isVisible: true,
            username: null,
            page: 0,
        }
    }

    changeUsername = async (e) => {
        if (e.target.value.length > 2) {
            this.setState(({username: e.target.value}));
            await this.reloadComponent(e.target.value);
        }
    }

    reloadComponent = async (username = null) => {
        await this.setState(({
            users: [],
            message: null,
            isVisible: true,
            username: username,
            page: 0,
        }));
        await this.changeUsers(username);
    }

    dropFilters = async () => {
        await this.reloadComponent();
        let usernameField = document.querySelector('#username');
        usernameField.value = '';
    }

    changeUsers = async (username = null) => {
        const {token} = this.props
        let newUsers = await getUsers(token, this.state.page, username);
        await this.setState((state) => ({users: [...state.users, ...newUsers]}))
        await this.setState((state) => ({page: state.page + 1}))
        if ((await getUsers(token, this.state.page, username)).length === 0)
            await this.setState({isVisible: false});
    }

    loadMore = async () => {
        await this.changeUsers(this.state.username)
    }

    render() {
        return (
            <div className="users">
                <div className="container">
                    <div className="users_card">
                        <h3>Users</h3>
                        {this.state.message && (<span className="message">{this.state.message}</span>)}
                        <input type="text" onChange={this.changeUsername} id="username" placeholder="username"/>
                        <button className="drop" onClick={this.dropFilters}>Drop</button>
                        {Boolean(this.state.users.length) && (
                            <div className="user_items">
                                {this.state.users.map(({id, username, phone_number, isBanned}) => {
                                    return (
                                        <div className="user_item" key={id}>
                                            <div>
                                                <div>{username}</div>
                                                <div>+375{phone_number}</div>
                                            </div>
                                            <button value={id} onClick={() => this.banUser(id)}>{isBanned && (
                                                <span>unbun</span>)}{!isBanned && (<span>bun</span>)}</button>
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                        {Boolean(this.state.users.length) && this.state.isVisible && (
                            <button className="load_more" onClick={this.loadMore}>Load More</button>)}
                    </div>
                </div>
            </div>
        )
    }
}

export default UserList;