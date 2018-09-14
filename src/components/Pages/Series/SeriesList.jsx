import React from 'react'
import {UncontrolledCollapse, Container, Row, Col} from 'reactstrap';
import {FormattedMessage} from 'react-intl';

import Loader from "../../Loader";
import omdbApi from "../../../services/api/omdbApi";

class SeriesList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            result: []
        }
    }

    componentDidMount = () => {
        const {imdbId, totalSeasons} = this.props;

        this.setState({
            result: []
        });

        for (let i = 1; i <= totalSeasons; i++) {
            omdbApi.getSerieEpisodes(imdbId, i)
                .then((response) => {

                    this.setState(prevState => ({
                        result: this.sortSeasons([...prevState.result, response])
                    }))
                });
        }
    }

    sortSeasons = (seasons) => {
        return seasons.sort((a, b) => {
            return (a.Season > b.Season) ? 1 : ((b.Season > a.Season) ? -1 : 0);
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
                            <Col className='col-12'>
                                <Row>
                                    <Col className='col-12' id={`seasonToggler-${season.Season}`}>
                                        <h5><FormattedMessage id="seriesInfo.season" />: {season.Season}</h5>
                                    </Col>
                                </Row>
                                {season.Episodes.map((episode, index) => (
                                    <UncontrolledCollapse
                                        className='row' key={index}
                                        toggler={`seasonToggler-${season.Season}`}>
                                        <Col className='col-1'>
                                            #{episode.Episode}
                                        </Col>
                                        <Col className='col-8'>
                                            {episode.Title}
                                        </Col>

                                        <Col className='col-3'>
                                            {episode.Released}
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
