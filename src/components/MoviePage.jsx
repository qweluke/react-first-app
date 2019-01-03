import React from 'react'
import { Container, Row, Col } from 'reactstrap';
import {FormattedMessage } from 'react-intl';

import tmdb from '../services/api/tmdb';
import Header from './Header'
import Loader from './Loader'
import Config from '../config'
import RatingStars from "./RatingStars";
import ActorRow from "./ActorRow";
import ReviewRow from "./ReviewRow";

class MoviePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            showAllCast: false,
            result: {},
            credits: {},
            reviews: {}
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            id: nextProps.match.params.id,
            result: {}
        }, this.getMovieInfo);
    }

    componentDidMount() {
        this.getMovieInfo();
    }

    toggleCastList = () => {
        this.setState({
            showAllCast: !this.state.showAllCast
        });
    }

    getMovieInfo() {
        document.title = 'loading';
        tmdb.getById(this.state.id, 'movie')
            .then((response) => {
                this.setState({
                    result: response
                });
                document.title = this.state.result.original_title;
            });

        tmdb.getCredits(this.state.id, 'movie')
            .then((response) => {
                this.setState({
                    credits: response
                });
            });

        tmdb.getReviews(this.state.id, 'movie')
            .then((response) => {
                this.setState({
                    reviews: response
                });
            });
    }

    render() {
        return(
            <section>
                <Container>
                    <Header/>
                </Container>

                <Container fluid>


                    { Object.keys(this.state.result).length === 0 &&
                        <Row className='text-center'>
                            <Col>
                                <Loader/>
                            </Col>
                        </Row>
                    }

                    { Object.keys(this.state.result).length > 0 &&
                        <Row>
                            <Col>

                                <Row className='bg-dark' style={{
                                    'backgroundImage': `url(${Config.TMDB_POSTER_PATH}/w1400_and_h450_face/${this.state.result.backdrop_path})`,
                                    'backgroundSize': 'cover',
                                    'backgroundRepeat': 'no-repeat'
                                }} >
                                    <Col className='col-sm-10 offset-sm-1 col-md-8 offset-md-2'>
                                        <Row className="py-5">
                                            <Col className="col-4 pr-0">
                                                <img className="img-thumbnail" src={`${Config.TMDB_POSTER_PATH}/w1280/${this.state.result.poster_path}`} alt="poster"/>
                                            </Col>
                                            <Col className="col-8 py-2" style={{ 'backgroundColor': '#ffffff9c' }}>
                                                <Row>
                                                    <Col>
                                                        <h2>{this.state.result.title}</h2>
                                                        <p>{this.state.result.release_date}</p>
                                                        <p>{this.state.result.runtime}</p>
                                                        <p>{this.state.result.overview}</p>
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
                                                            <dt className="col-sm-9">{this.state.result.genres
                                                                .map(e => e.name)
                                                                .reduce((prev, curr) => [prev, ', ', curr])
                                                            }</dt>
                                                            <dt className="col-sm-3">
                                                                <FormattedMessage id="movieInfo.production" />
                                                            </dt>
                                                            <dt className="col-sm-9">{this.state.result.production_companies
                                                                .map(e => e.name)
                                                                .reduce((prev, curr) => [prev, ', ', curr])
                                                            }</dt>

                                                            <dt className="col-sm-3">
                                                                <FormattedMessage id="movieInfo.released" />
                                                            </dt>
                                                            <dt className="col-sm-9">{this.state.result.release_date}</dt>

                                                        </dl>
                                                    </Col>
                                                </Row>

                                                <Row style={{
                                                    'bottom': '20px',
                                                    'position': 'absolute',
                                                    'right': '20px'
                                                }}>
                                                    <Col>
                                                        <RatingStars key={1}
                                                            score={this.state.result.vote_average}
                                                            votes={this.state.result.vote_count}
                                                        />
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>

                            </Col>
                        </Row>
                    }

                </Container>

                <Container className='pt-3'>
                    <Row className="px-4">
                        <Col className={'col-12'}>
                            {Object.keys(this.state.credits).length > 0 &&
                            <Row>
                                <Col className='col-12'>
                                    <h4>
                                        <FormattedMessage id="movieInfo.actors" />
                                    </h4>

                                    <Row>
                                        {
                                            this.state.credits.cast
                                                .slice(0,12)
                                                .map(actor => (
                                                    <Col className='col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12' key={actor.id}>
                                                        <ActorRow actor={actor}/>
                                                    </Col>
                                                ))
                                        }
                                    </Row>
                                    <Row className='pb-3'>
                                        <Col>
                                            <a className='text-info' onClick={this.toggleCastList}>show all cast</a>
                                        </Col>
                                    </Row>
                                </Col>
                                {this.state.showAllCast &&
                                    <Col className='col-12'>
                                        <Row>
                                            {
                                                this.state.credits.cast
                                                    .slice(12)
                                                    .map(actor => (
                                                        <Col className='col-sm-6 col-4'>
                                                            <ActorRow key={actor.id} actor={actor}/>
                                                        </Col>
                                                    ))
                                            }
                                        </Row>
                                    </Col>}
                            </Row>
                            }

                            {Object.keys(this.state.reviews).length > 0 &&
                            <Row>
                                <Col>
                                    <h4>
                                        <FormattedMessage id="reviews" />
                                    </h4>
                                        {
                                            this.state.reviews.results
                                                .map(review => (
                                                    <ReviewRow key={review.id} author={review.author} content={review.content} id={review.id}  url={review.url} />
                                                ))
                                        }
                                </Col>
                            </Row>
                            }

                        </Col>
                    </Row>
                </Container>


            </section>
        )
    }
}

export default MoviePage
