import * as actionTypes from '../actions/actionTypes'

const initialState = {
    fetching: false,
    error: null,
    content: [],
    totalPages: 0,
    totalElements: 0,
    sort: {},
    pageable: {}
}

const accountManagement = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ACCOUNT_LIST_API_CALL_REQUEST:
            return { ...state, ...action.data, fetching: true, content: [], error: null }
        case actionTypes.ACCOUNT_LIST_API_CALL_SUCCESS:
            return { ...state, ...action.data, fetching: false }
        case actionTypes.ACCOUNT_LIST_API_CALL_FAILURE:
            return { ...state, ...action.data, fetching: false, content: [], error: action.error }
        default:
            return state
    }
}

export default accountManagement