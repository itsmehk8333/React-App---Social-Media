function getItems() {

    return async (dispatch) => {
        try {

            dispatch({ type: "API_REQUEST", payload: null })

            const data = await fetch("https://jsonplaceholder.typicode.com/posts")
            const jsonData = await data.json();
            // console.log(jsonData , "jsonData");

            dispatch({type: "GET_ITEMS" , payload : jsonData})

        } catch (error) {
            dispatch({type:"ERROR" , payload: error.message})
        }

    }
}

export default getItems