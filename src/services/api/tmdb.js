import request from '../request'
import env from '../../env'

function search(term, type = 'multi', year = null) {

    // if IMDB movie id
    if(/^tt\d+$/.test(term)) {
        return this.getById(term);
    }

    return request({
        url: `/search/${type}?api_key=${env.TMDB_API_KEY}&query=${term}`,
        method: 'GET'
    });
}

function getById(id, mediaType='movie') {
    return request({
        url: `/${mediaType}/${id}?api_key=${env.TMDB_API_KEY}&language=en-US`,
        method: 'GET'
    });
}

function getCredits(id, mediaType='movie') {
    return request({
        url: `/${mediaType}/${id}/credits?api_key=${env.TMDB_API_KEY}&language=en-US`,
        method: 'GET'
    });
}

function getReviews(id, mediaType='movie') {
    return request({
        url: `/${mediaType}/${id}/reviews?api_key=${env.TMDB_API_KEY}&language=en-US`,
        method: 'GET'
    });
}

function getSerieEpisodes(id, season) {
    return request({
        url: `/tv/${id}/season/${season}?api_key=${env.TMDB_API_KEY}&language=en-US`,
        method: 'GET'
    });
}



const tmdb = {
    search, getById, getSerieEpisodes, getCredits, getReviews
};

export default tmdb;