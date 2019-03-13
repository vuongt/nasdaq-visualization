/**
 * Reducer handling nasdaq actions
 */
import {nasdaqConstant} from '../_constants';

const defaultState = {
    loading: false,
    error: null,
    data: null
};

export function nasdaq(state = defaultState, action) {
    switch (action.type) {
        case nasdaqConstant.NASDAQ_REQUEST:
            return {
                ...state,
                loading: true
            };
        case nasdaqConstant.NASDAQ_INTRADAY_SUCCESS:
            return {
                ...state,
                intraday: action.data,
                loading: false
            };
        case nasdaqConstant.NASDAQ_DAILY_SUCCESS:
            return {
                ...state,
                daily: action.data,
                loading: false
            };
        case nasdaqConstant.NASDAQ_FAILURE:
            return {
                ...state,
                error: action.error,
                loading: false
            };
        default:
            return state
    }
}