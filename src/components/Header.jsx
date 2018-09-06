import React, {Component} from 'react';
import {Nav, NavItem, NavLink} from 'reactstrap';
import {Link} from 'react-router-dom'

export default class Header extends Component {

    render() {
        return (
            <div>
                <Nav>
                    <Link to="/" className="nav-link active">Home</Link>
                    <Link to="/tt0117731" className="nav-link">Star Trek</Link>
                    <Link to="/tt0118480" className="nav-link">StarGate</Link>
                </Nav>
            </div>
        );
    }
}