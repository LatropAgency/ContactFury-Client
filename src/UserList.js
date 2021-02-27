import React from 'react'
import {getUsers} from "./core";

class UserList extends React.Component {

    componentDidMount = async () => {
        let users = await getUsers()
        this.setState({users: users})
    }

    constructor() {
        super();
        this.state = {
            users: [],
            message: null,
            username: null,
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

    render() {
        return (
            <div className="users">
                <div className="container">
                    <div className="users_card">
                        <h3>Users</h3>
                        {this.state.message && (<span className="message">{this.state.message}</span>)}
                        <input type="text" onChange={this.changeUsername} placeholder="username"/>
                        {Boolean(this.state.users.length) && (
                            <div className="contact_items">
                                {this.state.users.map((contact, index) => {
                                    return (<div className="contact_item"
                                                 key={index}>
                                        <span>{contact.name}</span>
                                    </div>)
                                })}
                            </div>)}
                        {Boolean(!this.state.users.length) && (
                            <h3 className="contact_empty">Empty</h3>
                        )}
                        <div className="btn_row">
                            <button onClick={this.changeUserPassword}>change</button>
                            <button onClick={this.close}>close</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserList;