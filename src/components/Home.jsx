import React from 'react'
import { Container, Row, Col, Input, Form, FormGroup } from 'reactstrap';
import { connect } from "react-redux";
import { injectIntl } from 'react-intl';

import { updateHomeForm } from "../actions/homepage";
import { bindActionCreators } from 'redux';

import Header from './Header'
import MovieItem from './MovieItem'
import omdbApi from '../services/api/omdbApi';

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchForm: {
                query: this.props.query,
                year: null
            },
            results: this.props.results
        };
    }

    componentDidMount() {
        document.title = 'OMDB app';
    }

    search = (event) => {

        const { updateHomeForm } = this.props;
        const query = event.target.value;
        this.setState({
            searchForm: {
                query: query,
                year: null
            }
        });

        let movies = omdbApi.search(query);

        movies.then(response => {
            this.setState({
                results: response.Search || []
            });

            updateHomeForm({
                'search': query,
                'results': response.Search || []
            })
        });
    };

    handleSubmit = (event) =>  {
        event.preventDefault();
    };

    render() {
        const { intl } = this.props;
        const { searchForm, results } = this.state;

        return(
            <div>
                <Container>
                    <Header/>

                    <Row>
                        <Col>
                            <Form onSubmit={this.handleSubmit}>
                                <FormGroup>
                                    <Input type="text" name="email" id="exampleEmail"
                                           className="w-100" placeholder={intl.formatMessage({id: 'homepage.search.placeholder'})}
                                           value={searchForm.query}
                                           onChange={this.search}
                                    />
                                </FormGroup>
                            </Form>
                        </Col>
                    </Row>
                </Container>

                { results.length > 0 &&
                    <Container fluid>
                        <Row className="mt-5 mx-3">
                            {
                                results.map((movie, index) => (
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

const mapStateToProps = state => {
    return {
        query: state.homepage.search,
        results: state.homepage.results
    }
};

const mapDispatchToProps = dispatch => {
    return {
        ...bindActionCreators({ updateHomeForm }, dispatch)
    }
};

Home = connect(mapStateToProps, mapDispatchToProps)(Home);

export default injectIntl(Home)