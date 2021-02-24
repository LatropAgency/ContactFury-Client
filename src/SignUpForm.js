import React from 'react'
import {signUp} from './core'
import {validateUsername, validatePhoneNumber, validatePassword} from "./libs/validators";

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
        try {
            if (validateUsername(username) && validatePhoneNumber(phone_number) && validatePassword(password)) {
                let response = await signUp(username, password, phone_number)
                this.setState(({message: response.message}))
            }
        } catch (e) {
            this.setState({message: e.message})
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