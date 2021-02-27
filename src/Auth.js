import React from 'react'
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";
import './css/Auth.css';

class Header extends React.Component {

    constructor() {
        super();
        this.state = {
            isSignIn: true,
            isSignUp: false,
        }
    }

    switchForm = () => {
        this.setState((state) => ({
            isSignIn: !state.isSignIn,
            isSignUp: !state.isSignUp,
        }));
    }

    render() {
        return (
            <div className="auth">
                <div className="container">
                    <div className="auth_row">
                        {this.state.isSignUp && (
                            <SignUpForm globalState={this.props.globalComponent.state}/>)}
                        {!this.state.isSignUp && (
                            <SignInForm updateToken={this.props.globalComponent.updateToken}/>)}
                        <div className="change_auth">
                            You may
                            <button
                                onClick={this.switchForm}>{this.state.isSignUp && ('SignIn')}{this.state.isSignIn && ('SignUp')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Header;