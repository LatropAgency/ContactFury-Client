import React from 'react'
import './css/Header.css';

class Header extends React.Component {

    logout = () => {
        this.props.globalComponent.setState(({isAuth: false}))
        localStorage.removeItem("token")
    }

    changeProfile = () => {
        this.props.globalComponent.setState(({isProfile: true, isUserList: false}))
    }

    changeUserList = () => {
        this.props.globalComponent.setState(({isUserList: true, isProfile: false}))
    }

    render() {
        return (
            <header className="header">
                <div className="container">
                    <div className="header__topline">
                        <div className="logo">ContactFury</div>
                        {this.props.globalComponent.state.isAuth && (
                            <div>
                                <button className="user_list" onClick={this.changeUserList}>users</button>
                                <button className="profile"
                                        onClick={this.changeProfile}>{this.props.globalComponent.state.user.username}</button>
                                <button className="logout" onClick={this.logout}>logout</button>
                            </div>
                        )}
                    </div>
                </div>
            </header>
        )
    }
}

export default Header;