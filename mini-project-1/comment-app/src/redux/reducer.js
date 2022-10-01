import * as types from  "./actionType"

const initState = {
    userData : [],
    isloading : false,
    iserror : false
}

const reducer = (oldState = initState, action) => {

    const {type, payload} = action;

    switch(type) {

        case types.GET_DATA_REQUEST :
            return {
                ...oldState,
                isloading : true,
                iserror : false
            }
        case types.GET_DATA_SUCCESS :
                return {
                    ...oldState,
                    userData : [...payload],
                    isloading : false,
                    iserror : false
                }
        case types.GET_DATA_FAILURE :
                return {
                    ...oldState,
                    isloading : false,
                    iserror : true
                }
        default :
           return oldState;
    }

}

export {reducer};