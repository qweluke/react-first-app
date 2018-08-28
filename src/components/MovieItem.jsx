import React from 'react'
import { Card, CardImg, CardBody, CardText, CardTitle } from 'reactstrap';
import {Link} from 'react-router-dom'

class MovieItem extends React.Component {


    render() {
        return(
            <Card>
                <CardImg top width="100%" src={this.props.Poster} alt="Card image cap" />
                <CardBody >
                    <CardTitle className="col-12">{this.props.Title}</CardTitle>

                    <CardText>
                        <div className="row">
                            <div className="col-4">
                                <small className="text-muted">{this.props.Year}</small>
                            </div>
                            <div className="col-8">
                                <Link to={`/${this.props.imdbID}`} className="btn btn-info btn-sm float-right">
                                    {this.props.Type} info
                                </Link>
                            </div>
                        </div>
                    </CardText>
                </CardBody>
            </Card>
        )
    }
}

export default MovieItem
