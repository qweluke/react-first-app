import React from 'react'
import PropTypes from 'prop-types'

class RatingStars extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            fullStars: Math.floor(props.score),
            emptyStars: 10 - Math.ceil(props.score),
            partialStars: 10 - (Math.floor(props.score) + (10 - Math.ceil(props.score)))
        };
    }

    renderIcon = (index, value) => {

        if(value === 1) {
            return <i key={index} className={`fa fa-star`}></i>;
        }

        if(value === 2) {
            return <i key={index} className={`fa fa-star-half-o`}></i>;
        }

        return <i key={index} className={`fa fa-star-o`}></i>;
    }

    renderStars = () => {
        let stars = [];

        for (let i = 0; i < this.state.fullStars; i++) {
            stars.push(this.renderIcon(`f_${i+1}`, 1))
        }

        for (let i = 0; i < this.state.partialStars; i++) {
            stars.push(this.renderIcon(`p_${i+1}`, 2))
        }
        for (let i = 0; i < this.state.emptyStars; i++) {
            stars.push(this.renderIcon(`e_${i+1}`, 3))
        }

        return stars;
    }

    render() {
        return (
            <React.Fragment>
                {this.renderStars()} {this.props.votes ? `/ ${this.props.votes}` : '' }
            </React.Fragment>
        )
    }
};

RatingStars.propTypes = {
    score: PropTypes.number.isRequired,
    votes: PropTypes.number
};

export default RatingStars;