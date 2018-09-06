import React from 'react'
import { Container, Row, Col, Input, Form, FormGroup, Button } from 'reactstrap';
import '../assets/css/loaderSpinner.css'

class Home extends React.Component {

    render() {
        return(
            <svg className="spinner" width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
                <circle className="path" fill="none" strokeWidth="6" strokeLinecap="round" cx="33" cy="33"
                        r="30"></circle>
            </svg>
        )
    }
}

export default Home
