import * as types from '../types';
import axios from '../../../services/axios';

const initialState = {
    isLogged: false,
    token: '',
    user: { },
    isLoading: false,
};

export default (state = initialState, action) => {
    switch(action.type) {

        case types.LOGIN_SUCCESS: {
            const newState = { ...initialState };
            newState.isLogged = true;
            newState.token = action.payload.token;
            newState.user = action.payload.user;
            newState.isLoading = false;
            return newState;
        }

        case types.LOGIN_FAILURE: {
            delete axios.defaults.headers.Authorization;
            const newState = { ...initialState };
            return newState;
        }

        case types.LOGIN_REQUEST: {
            const newState = { ...initialState };
            newState.isLoading = true;
            return newState;
        }

        case types.REGISTER_SUCCESS: {
            const newState = {...initialState};
            newState.isLoading = false;
            return newState;
        }

        case types.REGISTER_FAILURE: {
            const newState = {...initialState};
            newState.isLoading = false;
            return newState;
        }

        case types.REGISTER_REQUEST: {
            const newState = {...initialState};
            newState.isLoading = true;
            return newState;
        }

        default: {
            return state;
        }
    }
}