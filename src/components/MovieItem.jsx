import React from 'react'
import { withRouter } from 'react-router-dom';
import { Card, CardImg, CardBody, CardTitle, Row, Col } from 'reactstrap';
import Config from '../config'
import RatingStars from "./RatingStars";

class MovieItem extends React.Component {

    redirectClick = (id, mediaType) => {
        this.props.history.push(`${mediaType}/${id}`);
    };

    render() {
        return(
            <Card onClick={() => this.redirectClick(this.props.id, this.props.media_type)} style={{'cursor':'pointer'}}>
                <CardImg top width="100%" src={`${Config.TMDB_POSTER_PATH}/w300_and_h450_bestv2${this.props.poster_path}`} alt="Card image cap" />
                <CardBody className='pb-0'>
                    <CardTitle>{this.props.original_title || this.props.original_name}</CardTitle>

                    <div className="row">
                        <div className="col-12">
                            <small className="text-muted">{this.props.release_date || this.props.first_air_date}</small>
                        </div>
                    </div>
                </CardBody>

                <CardBody className='h-100 py-2'>
                    <Row>
                        <Col>
                            <RatingStars score={this.props.vote_average} />
                        </Col>
                    </Row>
                </CardBody>

            </Card>
        )
    }
}

export default withRouter(MovieItem)
