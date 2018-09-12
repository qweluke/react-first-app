const initialState = {
    search: '',
    results: []
};

const homepage = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_HOME_FORM':
            return {
                search: action.newVal.search,
                results: action.newVal.results
            };
        default:
            return state
    }
};

export default homepage