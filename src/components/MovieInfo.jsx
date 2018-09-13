import React from 'react'
import { Container, Row, Col } from 'reactstrap';
import {FormattedMessage } from 'react-intl';

import omdbApi from '../services/api/omdbApi';
import Header from './Header'
import Loader from './Loader'

class MovieInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            imdbId: this.props.match.params.imdb,
            result: {}
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            imdbId: nextProps.match.params.imdb,
            result: {}
        }, this.getMovieInfo);
    }

    componentDidMount() {
        this.getMovieInfo();
    }

    getMovieInfo() {
        document.title = 'loading';
        omdbApi.getById(this.state.imdbId)
            .then((response) => {
                this.setState({
                    result: response
                });
                document.title = response.Title;
            })
    }

    render() {

        return(
            <section>
                <div className='movie-info__bg-image' style={{background : `url(${this.state.result.Poster})`}}>
                </div>
                <Container>
                    <Header/>

                    { Object.keys(this.state.result).length === 0 &&
                        <Row className='text-center'>
                            <Col>
                                <Loader/>
                            </Col>
                        </Row>
                    }

                    { Object.keys(this.state.result).length > 0 &&
                        <div>
                            <Row className="pb-5">
                                <Col className="col-4">
                                    <img className="img-thumbnail" src={this.state.result.Poster} alt="poster"/>
                                </Col>
                                <Col className="col-8">
                                    <Row>
                                        <Col>
                                            <h2>{this.state.result.Title}</h2>
                                            <p>{this.state.result.Year}</p>
                                            <p>{this.state.result.Runtime}</p>
                                            <p>{this.state.result.Plot}</p>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col>
                                            <dl className="row">
                                                <dt className="col-sm-3">
                                                    <FormattedMessage id="movieInfo.director" />
                                                </dt>
                                                <dt className="col-sm-9">{this.state.result.Director}</dt>

                                                <dt className="col-sm-3">
                                                    <FormattedMessage id="movieInfo.writer" />
                                                </dt>
                                                <dt className="col-sm-9">{this.state.result.Writer}</dt>

                                                <dt className="col-sm-3">
                                                    <FormattedMessage id="movieInfo.genere" />
                                                </dt>
                                                <dt className="col-sm-9">{this.state.result.Genere}</dt>

                                                <dt className="col-sm-3">
                                                    <FormattedMessage id="movieInfo.production" />
                                                </dt>
                                                <dt className="col-sm-9">{this.state.result.Production}</dt>

                                                <dt className="col-sm-3">
                                                    <FormattedMessage id="movieInfo.released" />
                                                </dt>
                                                <dt className="col-sm-9">{this.state.result.Released}</dt>

                                                <dt className="col-sm-3 pt-5">
                                                    <FormattedMessage id="movieInfo.ratings" />
                                                </dt>
                                                <dt className="col-sm-9 pt-5">
                                                    <dl className="row mb-0">
                                                        {this.state.result.Ratings.map((rate, index) => (
                                                            <div key={index}>
                                                                <dt className="col-sm-8">{rate.Source}</dt>
                                                                <dt className="col-sm-4">{rate.Value}</dt>
                                                            </div>
                                                        ))}
                                                    </dl>
                                                </dt>
                                            </dl>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>

                            <Row className="px-4">
                                <Col>
                                    <h4>
                                        <FormattedMessage id="movieInfo.actors" />
                                    </h4>
                                    <p>{this.state.result.Actors}</p>
                                </Col>
                            </Row>

                            <Row className="px-4">
                                <Col>
                                    <h4>
                                        <FormattedMessage id="movieInfo.awards" />
                                    </h4>
                                    <p>{this.state.result.Awards}</p>
                                </Col>
                            </Row>

                            {this.state.result.BoxOffice &&
                            <Row className="px-4">
                                <Col>
                                    <h4>Box Office</h4>
                                    <p>{this.state.result.BoxOffice}</p>
                                </Col>
                            </Row>
                            }

                        </div>
                    }

                </Container>


            </section>
        )
    }
}

export default MovieInfo
