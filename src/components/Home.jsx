import React from 'react'
import {Container, Row, Col, Input, Form, FormGroup, Button, Collapse, Label} from 'reactstrap';
import {connect} from "react-redux";
import {injectIntl} from 'react-intl';

import {updateHomeForm} from "../actions/homepage";
import {bindActionCreators} from 'redux';

import Header from './Header'
import MovieItem from './MovieItem'
import omdbApi from '../services/api/omdbApi';

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            advanced: this.props.advanced,
            query: this.props.query,
            year: this.props.year,
            type: this.props.type,
            results: this.props.results
        };
    }

    componentDidMount() {
        document.title = 'OMDB app';
    }

    toggleAdvancedSearch = () => {
        const {advanced, query} = this.state;
        this.setState({'advanced': !advanced}, () => {
            if(query) {
                this.search();
            }
        });
    }

    search = () => {

        this.setState({
            results: []
        });

        const {updateHomeForm} = this.props;
        const {query, advanced, type, year} = this.state;

        let movies = [];
        if (advanced) {
            movies = omdbApi.search(query, type, year);
        } else {
            movies = omdbApi.search(query);
        }

        movies.then(response => {
            this.setState({
                results: response.Search || []
            });

            updateHomeForm({
                'results': this.state.results,
                'advanced': this.state.advanced,
                'query': query,
                'year': this.state.year,
                'type': this.state.type
            })
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
    };

    render() {
        const {intl} = this.props;
        const {advanced, query, year, type, results} = this.state;

        return (
            <div>
                <Container>
                    <Header/>

                    <Row className='pt-5'>
                        <Col className="col col-12 col-md-6 offset-md-3 col-lg-6 offset-lg-3 list-group-item">

                            <Form onSubmit={this.handleSubmit}>
                                <div className="row align-items-center">
                                    <div className="col-9">
                                        <Input type="text" name="email" id="exampleEmail"
                                               className="w-100"
                                               placeholder={intl.formatMessage({id: 'homepage.search.placeholder'})}
                                               value={query}
                                               onChange={(e) => {
                                                   this.setState({query: e.target.value}, this.search);
                                               }}
                                        />
                                    </div>
                                    <div className="col text-center">
                                        <Button className='btn-sm m-0'
                                                onClick={this.toggleAdvancedSearch}>advanced</Button>
                                    </div>
                                </div>
                            </Form>

                            <Collapse isOpen={advanced}>
                                <Row className='pt-3'>
                                    <Col className='col-6'>
                                        <Input type='select' className="form-control" name='searchType' value={type}
                                               onChange={(e) => {
                                                   this.setState({type: e.target.value}, this.search);
                                               }}
                                        >
                                            <option value="">Search type</option>
                                            <option value="movie">Movie</option>
                                            <option value="series">TV Show</option>
                                            <option value="game">Game</option>
                                        </Input>
                                    </Col>
                                    <Col className='col-6'>
                                        <input type="number" className='form-control' value={year} onChange={(e) => {
                                            this.setState({year: e.target.value}, this.search);
                                        }}/>
                                    </Col>
                                </Row>
                            </Collapse>

                        </Col>
                    </Row>
                </Container>

                {results.length > 0 &&
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
        ...state.homepage
    }
};

const mapDispatchToProps = dispatch => {
    return {
        ...bindActionCreators({updateHomeForm}, dispatch)
    }
};

Home = connect(mapStateToProps, mapDispatchToProps)(Home);

export default injectIntl(Home)