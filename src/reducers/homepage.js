const initialState = {
    advanced: false,
    search: {
        year: null,
        query: null
    },
    results: []
};

const homepage = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_HOME_FORM':
            console.log(action.newVal);
            return {
                ...action.newVal
            };
        default:
            return state
    }
};

export default homepage