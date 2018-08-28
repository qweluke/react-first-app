import React, {Component} from 'react';
import {Nav, NavItem, NavLink} from 'reactstrap';
import {Link} from 'react-router-dom'

export default class Header extends Component {

    render() {
        return (
            <div>
                <Nav>
                    <Link to="/" className="nav-link active">Link</Link>
                    <Link to="/schedule" className="nav-link">Link</Link>
                </Nav>
            </div>
        );
    }
}