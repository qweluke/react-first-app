import React from 'react'
import { Container, Row, Col } from 'reactstrap';
import {FormattedMessage } from 'react-intl';

import tmdb from '../services/api/tmdb';
import Header from './Header'
import Config from "../config";
import Loader from './Loader'
import RatingStars from "./RatingStars";

class TvSeasonEpisodesPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            seasonNum: this.props.match.params.seasonNum,
            result: {},
            episodes: {},
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            id: nextProps.match.params.id,
            result: {}
        }, this.getTvInfo);
    }

    componentDidMount() {
        this.getTvInfo();
    }

    getTvInfo() {
        document.title = 'loading';
        tmdb.getById(this.state.id, 'tv')
            .then((response) => {
                this.setState({
                    result: response
                });
                document.title = this.state.result.original_name;
            });

        tmdb.getSerieEpisodes(this.state.id, this.state.seasonNum)
            .then((response) => {
                this.setState({
                    episodes: response
                });
            })
            .catch((response) => {
                if(404 === response.status) {
                    window.location.href = `/tv/${this.state.id}`;
                }
            })
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
                                            <img className="img-thumbnail" src={`${Config.TMDB_POSTER_PATH}/w1280/${this.state.episodes.poster_path}`} alt="poster"/>
                                        </Col>
                                        <Col className="col-8 py-2" style={{ 'backgroundColor': '#ffffff9c' }}>
                                            <Row>
                                                <Col>
                                                    <h2>{this.state.result.original_name}</h2>
                                                    <p>{this.state.result.first_air_date.substring(0, 4)} - {this.state.result.last_air_date.substring(0, 4)}</p>
                                                    <p>{this.state.result.runtime}</p>
                                                    <p>{this.state.result.overview}</p>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col>
                                                    <nav aria-label="...">
                                                        <ul className="pagination pagination-sm">
                                                            <li className="page-item pr-1">
                                                                <FormattedMessage id="seriesInfo.seasons" />
                                                            </li>
                                                            {
                                                                this.state.result.seasons.map(season => (
                                                                    <li className="page-item" title={season.name} key={season.season_number}>
                                                                        <a className="page-link" href={`/tv/${this.state.id}/season/${season.season_number}/episodes`}>{season.season_number}</a>
                                                                    </li>
                                                                ))
                                                            }

                                                        </ul>
                                                    </nav>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col>
                                                    <dl className="row">
                                                        <dt className="col-sm-3">
                                                            <FormattedMessage id="seriesInfo.createdBy" />
                                                        </dt>
                                                        <dt className="col-sm-9">{this.state.result.created_by
                                                            .map(e => e.name)
                                                            .reduce((prev, curr) => [prev, ', ', curr])
                                                        }</dt>

                                                        <dt className="col-sm-3">
                                                            <FormattedMessage id="movieInfo.genere" />
                                                        </dt>
                                                        {this.state.result.genres.length > 0 &&
                                                        <dt className="col-sm-9">{this.state.result.genres
                                                            .map(e => e.name)
                                                            .reduce((prev, curr) => [prev, ', ', curr])
                                                        }</dt>
                                                        }
                                                        <dt className="col-sm-3">
                                                            <FormattedMessage id="movieInfo.production" />
                                                        </dt>
                                                        {this.state.result.production_companies.length > 0 &&
                                                        <dt className="col-sm-9">{this.state.result.production_companies
                                                            .map(e => e.name)
                                                            .reduce((prev, curr) => [prev, ', ', curr])
                                                        }</dt>
                                                        }

                                                        <dt className="col-sm-3">
                                                            <FormattedMessage id="seriesInfo.firstEpisode" />
                                                        </dt>
                                                        <dt className="col-sm-9">{this.state.result.first_air_date}</dt>

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

                <Container className='my-5'>
                    { Object.keys(this.state.episodes).length === 0 &&
                    <Row className='text-center mt-3'>
                        <Col>
                            <Loader/>
                        </Col>
                    </Row>
                    }

                    { Object.keys(this.state.episodes).length > 0 &&
                    <table className='table'>
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col" style={{'min-width':'110px'}} >Air date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.episodes.episodes
                                .map(episode =>
                                    <tr>
                                        <th scope="row">#{episode.episode_number}</th>
                                        <td>
                                            <h5>{episode.name}</h5>
                                            <p>{episode.overview}</p>
                                        </td>
                                        <td>{episode.air_date}</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                    }
                </Container>
            </section>
        )
    }
}

export default TvSeasonEpisodesPage
