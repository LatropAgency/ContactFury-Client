import React from 'react'
import {signUp, validatePhoneNumber, validateUsername, validatePassword} from './core'

class SignUpForm extends React.Component {

    changeUsername = async (e) => {
        this.setState(({username: e.target.value}))
    }

    changePassword = async (e) => {
        this.setState(({password: e.target.value}))
    }

    changePhoneNumber = async (e) => {
        this.setState(({phone_number: e.target.value}))
    }

    constructor() {
        super();
        this.state = {
            username: null,
            password: null,
            message: null,
            phone_number: null,
        }
    }

    signUp = async () => {
        const {username, password, phone_number} = this.state
        if (!validateUsername(username)) {
            this.setState({message: "Invalid username"})
        } else if (!validatePhoneNumber(phone_number)) {
            this.setState({message: "Invalid phone number"})
        } else if (!validatePassword(password)) {
            this.setState({message: "Invalid password"})
        } else {
            let response = await signUp(username, password, phone_number)
            this.setState(({message: response.message}))
        }
    }

    render() {
        return (
            <div className="signup">
                <h1>Sign Up Form</h1>
                {this.state.message && (<span className="message">{this.state.message}</span>)}
                <input type="text" placeholder="username" onChange={this.changeUsername}
                       required/>
                <div className="phone_number">
                    <input type="text" placeholder="phone number" onChange={this.changePhoneNumber}
                           required/>
                </div>
                <input type="password" placeholder="password" onChange={this.changePassword}
                       required/>
                <button onClick={this.signUp}>sign up</button>
            </div>
        )
    }
}

export default SignUpForm;