import React from 'react'
import {signIn,} from './core'
import {validateUsername, validatePassword} from './libs/validators'

class SignInForm extends React.Component {

    changeUsername = async (e) => {
        this.setState(({username: e.target.value}))
    }

    changePassword = async (e) => {
        this.setState(({password: e.target.value}))
    }

    constructor() {
        super();
        this.state = {
            username: null,
            password: null,
            message: null
        }
    }

    signIn = async () => {
        const {username, password} = this.state
        try {
            if (validateUsername(username) && validatePassword(password)) {
                let response = await signIn(username, password)
                if (response.message)
                    this.setState(({message: response.message}))
                else
                    await this.props.updateToken(response.accessToken)
            }
        } catch (e) {
            this.setState(({message: e.message}))
        }
    }


    render() {
        return (
            <div className="signin">
                <h1>Sign In Form</h1>
                {this.state.message && (<span className="message">{this.state.message}</span>)}
                <input type="text" placeholder="username" onChange={this.changeUsername}/>
                <input type="password" placeholder="password" onChange={this.changePassword}/>
                <button onClick={this.signIn}>sign in</button>
            </div>
        )
    }
}

export default SignInForm;