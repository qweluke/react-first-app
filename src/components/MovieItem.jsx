import React from 'react'
import { Card, CardImg, CardBody, CardTitle } from 'reactstrap';
import {Link} from 'react-router-dom'

class MovieItem extends React.Component {


    render() {
        return(
            <Card className="entry-info">
                <CardImg top width="100%" src={this.props.Poster} alt="Card image cap" />
                <CardBody >
                    <CardTitle className="col-12">{this.props.Title}</CardTitle>

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
                </CardBody>
            </Card>
        )
    }
}

export default MovieItem
