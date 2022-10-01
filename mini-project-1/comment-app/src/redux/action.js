import * as types from "./actionType"


const getDataRequest = () => {
    return {type : types.GET_DATA_REQUEST}
}
const getDataSuccess = (payload) => {
    return {type : types.GET_DATA_SUCCESS, payload}
}
const getDataFailure = () => {
    return {type : types.GET_DATA_FAILURE}
}

const getSortedComments = (data) => {
    return {type : types.GET_DATA_SUCCESS, payload: data}
}

const getSortedByCreatedAt = (data) => {
    return {type : types.GET_DATA_SUCCESS, payload: data}
}

export {
   getDataRequest,
   getDataSuccess,
   getDataFailure,
   getSortedComments,
   getSortedByCreatedAt
}