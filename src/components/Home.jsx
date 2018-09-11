import React from 'react'
import { Container, Row, Col, Input, Form, FormGroup } from 'reactstrap';

import Header from './Header'
import MovieItem from './MovieItem'
import omdbApi from '../services/api/omdbApi';

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchForm: {
                query: '',
                year: null
            },
            results: []
        };
    }

    componentDidMount() {
        document.title = 'OMDB app';
    }

    search = (event) => {
        this.setState({
            searchForm: {
                query: event.target.value,
                year: null
            }
        });

        let movies = omdbApi.search(event.target.value);

        movies.then(response => {
            this.setState({
                results: response.Search || []
            })
        });
    };

    handleSubmit = (event) =>  {
        // alert('A name was submitted: ' + this.state.searchForm.query);
        event.preventDefault();
    };

    render() {
        return(
            <div>
                <Container>
                    <Header/>

                    <Row>
                        <Col>
                            <Form onSubmit={this.handleSubmit}>
                                <FormGroup>
                                    <Input type="text" name="email" id="exampleEmail" className="w-100" placeholder="with a placeholder"
                                           value={this.state.searchForm.query}
                                           onChange={this.search}
                                    />
                                </FormGroup>
                            </Form>
                        </Col>
                    </Row>
                </Container>

                { this.state.results.length > 0 &&
                    <Container fluid>
                        <Row className="mt-5 mx-3">
                            {
                                this.state.results.map((movie, index) => (
                                    <Col sm="6" md="4" lg="3" className="mb-4" key={index}>
                                        <MovieItem {...movie}/>
                                    </Col>
                                ))
                            }
                        </Row>
                    </Container>
                }
            </div>
        )
    }
}

export default Home
