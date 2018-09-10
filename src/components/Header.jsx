import React, {Component} from 'react';
import {Nav, Dropdown, DropdownItem, DropdownToggle, DropdownMenu} from 'reactstrap';
import {Link} from 'react-router-dom'
import {FormattedMessage} from 'react-intl';

class Header extends Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false
        };
    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    render() {
        return (
            <div>
                <Nav>
                    <Link to="/" className="nav-link active"><FormattedMessage id="header.home"/></Link>
                    <Link to="/tt0117731" className="nav-link"><FormattedMessage id="header.movie1"/></Link>
                    <Link to="/tt0118480" className="nav-link"><FormattedMessage id="header.movie2"/></Link>

                    <Dropdown nav isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                        <DropdownToggle nav caret>
                            <FormattedMessage id="header.language"/>
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem>en</DropdownItem>
                            <DropdownItem>pl</DropdownItem>
                            <DropdownItem divider/>
                            <DropdownItem>auto detect</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </Nav>
            </div>
        );
    }
}

export default Header;