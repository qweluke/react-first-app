import React from 'react'
import PropTypes from 'prop-types'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

class ReviewRow extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.toggle = this.toggle.bind(this);

        this.state = {
            show: false
        };
    }

    toggle() {
        this.setState({
            show: !this.state.show
        });
    }

    render() {
        return (
            <React.Fragment>

                <Modal isOpen={this.state.show} size='lg' toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>{this.props.author}</ModalHeader>
                    <ModalBody>
                        {this.props.content}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.toggle}>Close</Button>
                    </ModalFooter>
                </Modal>

                <div className="media">
                        <div className="media-body">
                            <h5 className="mt-0"><strong>{this.props.author}</strong></h5>
                            <p onClick={this.toggle} style={{'cursor':'pointer'}}>
                                {
                                this.props.content.length > 250 ? this.props.content.substring(0, 250) + '...' : this.props.content
                            }</p>
                        </div>
                </div>
            </React.Fragment>
        )
    }
};

ReviewRow.propTypes = {
    author: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    url: PropTypes.string
};

export default ReviewRow;