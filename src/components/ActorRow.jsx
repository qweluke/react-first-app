import React from 'react'

import Config from "../config";

class ActorRow extends React.Component {

    render() {
        const {actor} = this.props;
        return (
            <div className="media mb-2">
                <img width='40' className="align-self-center mr-3"
                     src={`${Config.TMDB_POSTER_PATH}/w500${actor.profile_path}`} alt={`${actor.name}`}/>
                <div className="media-body">
                    <h5 className="mt-0">{actor.name}</h5>
                    <p className="mb-0">{actor.character}</p>
                </div>
            </div>
        )
    }

};

export default ActorRow;