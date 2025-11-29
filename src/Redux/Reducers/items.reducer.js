
const initalState = {
    items: [],
    loading: false,
    error: null
}

const itemsReducer = (state = initalState, action) => {

    switch (action.type) {
        case "API_REQUEST" :
        return { ...state, loading : true}

        case "GET_ITEMS":
            return { ...state, items: action.payload  , loading : false , error:null}
        case "ERROR":
            return {...state , loading : false , error : action.payload}

        default:
            return state
    }

}

export default itemsReducer;