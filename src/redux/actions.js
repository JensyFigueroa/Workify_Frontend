import { GET_SERVICES } from "./types"
import axios from "axios";

export const getServices = () => {
    return async(dispatch) => {
        try {
            const response = await axios("https://jsonplaceholder.typicode.com/users");
            const data = response.data;
            return dispatch({
                type: GET_SERVICES,
                payload: data
            })
        } catch (error) {
            throw new Error(error.message);
        }
    }
}