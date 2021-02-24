import React from 'react'
import {changePassword} from "./core";
import {validatePassword} from "./libs/validators";

class Profile extends React.Component {

    close = async () => {
        this.props.globalComponent.setState(({isProfile: false}))
    }

    constructor() {
        super();
        this.state = {
            password: null,
            newPassword: null,
            repeatPassword: null,
            message: null,
        }
    }

    changePassword = async (e) => {
        this.setState(({password: e.target.value}))
    }

    changeNewPassword = async (e) => {
        this.setState(({newPassword: e.target.value}))
    }

    changeRepeatPassword = async (e) => {
        this.setState(({repeatPassword: e.target.value}))
    }

    changeUserPassword = async () => {
        const {password, newPassword, repeatPassword} = this.state
        if (newPassword === repeatPassword) {
            if (newPassword.length >= 6) {
                try {
                    if (validatePassword(newPassword)) {
                        let response = await changePassword(this.props.globalComponent.state.token, password, newPassword)
                        this.setState({message: response.message})
                    } else
                        this.setState({message: 'Invalid characters in new password'})
                } catch (e) {
                    this.setState({message: e.message})
                }
            } else {
                this.setState({message: 'New password is too short'})
            }
        } else {
            this.setState({message: 'Passwords don\'t match'})
        }
    }


    render() {
        return (
            <div className="profile">
                <div className="container">
                    <div className="profile_card">
                        <h3>{this.props.globalComponent.state.user.username.toUpperCase()}</h3>
                        <h3>{this.props.globalComponent.state.user.phone_number}</h3>
                        <h3>Change password</h3>
                        {this.state.message && (<span className="message">{this.state.message}</span>)}
                        <input type="password" onChange={this.changePassword} placeholder="current password"/>
                        <input type="password" onChange={this.changeNewPassword} placeholder="new password"/>
                        <input type="password" onChange={this.changeRepeatPassword} placeholder="repeat new password"/>
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

export default Profile;