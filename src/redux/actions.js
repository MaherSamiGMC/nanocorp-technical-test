import axios from "axios"
import { FETCHING_DATA_FAIL, FETCHING_DATA_REQUEST, FETCHING_DATA_SUCCESS, FILTERING_DATA_FAIL, FILTERING_DATA_REQUEST, FILTERING_DATA_SUCCESS } from "./constants"


export const getData=()=>async(dispatch)=>{
    try {
        dispatch({type:FETCHING_DATA_REQUEST})
        const {data}=await axios.get("http://localhost:3000/data.json")
        dispatch({type:FETCHING_DATA_SUCCESS,data:data})
    } catch (error) {
        dispatch({type:FETCHING_DATA_FAIL,error})
    }
}

export const filterData=(minCountV,minCountSZ,protocol="")=>async(dispatch)=>{
    try {
        dispatch({type:FILTERING_DATA_REQUEST})
        const {data}=await axios.get("http://localhost:3000/data.json")
        dispatch({type:FILTERING_DATA_SUCCESS,data:data,payload:{minCountV,minCountSZ,protocol}})
    } catch (error) {
        dispatch({type:FILTERING_DATA_FAIL,error})
    }
}
