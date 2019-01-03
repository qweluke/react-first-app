import React from 'react'
import {UncontrolledCollapse, Container, Row, Col} from 'reactstrap';
import {FormattedMessage} from 'react-intl';

import Loader from "../../Loader";
import tmbd from "../../../services/api/tmdb";

class SeriesList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            result: []
        }
    }

    componentDidMount = () => {
        const {id, totalSeasons} = this.props;

        this.setState({
            result: []
        });

        for (let i = 1; i <= totalSeasons; i++) {
            tmbd.getSerieEpisodes(id, i)
                .then((response) => {
                    this.setState(prevState => ({
                        result: this.sortSeasons([...prevState.result, response])
                    }))
                });
        }
    }

    sortSeasons = (seasons) => {
        return seasons.sort((a, b) => {
            return (a.season_number > b.season_number) ? 1 : ((b.season_number > a.season_number) ? -1 : 0);
        })
    }

    render() {

        if (Object.keys(this.state.result).length === 0) {
            return (
                <Col className='text-center'>
                    <Loader/>
                </Col>
            )
        }

        return (
            <aside>
                <Row>
                    <Col className='col-12'>
                        <h4><FormattedMessage id="seriesInfo.seasons" />:</h4>
                    </Col>

                    {
                        this.state.result.map((season) => (
                            <Col className='col-12' key={season.season_number} >
                                <Row>
                                    <Col className='col-12' id={`seasonToggler-${season.season_number}`}>
                                        <h5><FormattedMessage id="seriesInfo.season" />: {season.season_number}</h5>
                                    </Col>
                                </Row>
                                {season.episodes.map((episode, index) => (
                                    <UncontrolledCollapse
                                        key={episode.episode_number}
                                        className='row'
                                        toggler={`seasonToggler-${season.season_number}`}>
                                        <Col className='col-1'>
                                            #{episode.episode_number}
                                        </Col>
                                        <Col className='col-8'>
                                            {episode.name}
                                        </Col>

                                        <Col className='col-3'>
                                            {episode.air_date}
                                        </Col>
                                    </UncontrolledCollapse>
                                ))}
                            </Col>
                        ))
                    }
                </Row>

            </aside>
        )
    }
}

export default SeriesList
