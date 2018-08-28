import request from '../request'

function search(term, type = null, year = null) {

    let query = '';

    // if IMDB movie id
    if(/^tt\d+$/.test(term)) {
        return request({
            url: `i=${term}`,
            method: 'GET'
        });
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


const omdbApi = {
    search
};

export default omdbApi;