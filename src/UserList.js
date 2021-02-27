import React from 'react'
import {getCategories, getContacts, getUsers} from "./core";

class UserList extends React.Component {

    componentDidMount = async () => {
        const {token} = this.props;
        let users = await getUsers(token);
        this.setState({users: users});
        if ((await getUsers(token, this.state.page)).length === 0)
            this.state.isVisible = false;
    }

    constructor() {
        super();
        this.state = {
            users: [],
            message: null,
            username: null,
            phone_number: null,
            isVisible: true,
            page: 0,
        }
    }

    close = async () => {
        this.props.globalComponent.setState(({isUserList: false}))
    }

    changeUsername = (e) => {
        if (e.target.value.length > 2) {
            this.setState({username: e.target.value})
        }
    }

    changePhoneNumber = (e) => {
        if (e.target.value.length > 2) {
            this.setState({phone_number: e.target.value})
        }
    }

    changeUsers = async (username = null, phone_number = null) => {
        const {token} = this.props
        let newUsers = await getUsers(token, this.state.page, username, phone_number)
        this.setState((state) => ({contacts: [...state.users, ...newUsers]}))
        await this.setState((state) => ({page: state.page + 1}))
        if ((await getUsers(token, this.state.page, username, phone_number)).length === 0)
            this.state.isVisible = false
    }

    loadMore = async () => {
        await this.changeUsers()
    }

    render() {
        return (
            <div className="users">
                <div className="container">
                    <div className="users_card">
                        <h3>Users</h3>
                        {this.state.message && (<span className="message">{this.state.message}</span>)}
                        <input type="text" onChange={this.changeUsername} placeholder="username"/>
                        <div className="phone_number">
                            <input type="text" id="phone_number" onChange={this.changePhoneNumber} placeholder="phone number"/>
                        </div>
                        {Boolean(this.state.users.length) && (
                            <div className="contact_items">
                                {this.state.users.map((user) => {
                                    return (
                                        <div className="contact_item" key={user.id}>
                                            <div>{user.username}</div>
                                            <div>+375{user.phone_number}</div>
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                        {Boolean(this.state.users.length) && this.state.isVisible && (
                            <button onClick={this.loadMore}>Load More</button>)}
                    </div>
                </div>
            </div>
        )
    }
}

export default UserList;