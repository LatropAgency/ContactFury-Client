import React from 'react'
import './css/Footer.css';

class Footer extends React.Component {
    render() {
        return (
            <footer className="footer">
                <div className="container">
                    <div className="footer_line">
                        <p>Copyright © {new Date().getFullYear()}, All rights reserved</p>
                    </div>
                </div>
            </footer>
        )
    }
}

export default Footer;