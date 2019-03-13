import {nasdaqService} from '../_services'
import {nasdaqConstant} from "../_constants";

export const nasdaqAction = {
    getNasdaqData
};

function getNasdaqData(dataType) {
    /**
     * Redux action to get NASDAQ data
     * @param dataType: either "TIME_SERIES_DAILY" to get daily time series
     * or "TIME_SERIES_INTRADAY" to get data every 5 minutes
     */
    return dispatch => {
        dispatch(request());

        nasdaqService.getNasdaqData(dataType)
            .then(
                data => {
                    dispatch(success(data, dataType));
                },
                error => dispatch(failure(error))
            );
    };

    function request() {
        return {type: nasdaqConstant.NASDAQ_REQUEST}
    }

    function success(data, dataType) {
        switch (dataType) {
            case "TIME_SERIES_DAILY":
                return {type: nasdaqConstant.NASDAQ_DAILY_SUCCESS, data: data};
            case "TIME_SERIES_INTRADAY":
                return {type: nasdaqConstant.NASDAQ_INTRADAY_SUCCESS, data: data};
            default:
                return {type: nasdaqConstant.NASDAQ_FAILURE, error: "Unidentified data type"};
        }

    }

    function failure(error) {
        return {type: nasdaqConstant.NASDAQ_FAILURE, error: error}
    }
}