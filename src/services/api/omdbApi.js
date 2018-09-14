import request from '../request'

function search(term, type = null, year = null) {

    let query = '';

    // if IMDB movie id
    if(/^tt\d+$/.test(term)) {
        return this.getById(term);
    }

    query += `&s=${term}`;

    if(type) {
        query += `&type=${type}`;
    }

    if(year) {
        query += `&y=${year}`;
    }

    return request({
        url: query,
        method: 'GET'
    });
}

function getById(imdb) {
    return request({
        url: `&i=${imdb}`,
        method: 'GET'
    });
}

function getSerieEpisodes(imdb, season) {
    return request({
        url: `&i=${imdb}&Season=${season}`,
        method: 'GET'
    });
}


const omdbApi = {
    search, getById, getSerieEpisodes
};

export default omdbApi;