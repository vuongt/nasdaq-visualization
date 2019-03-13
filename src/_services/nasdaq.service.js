/**
 * Functions that handle api call
 */
import config from "../config"

export const nasdaqService = {
    getNasdaqData
};

function getNasdaqData(dataType) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    let url = `${config.apiEndPoint}/query?symbol=MSFT&datatype=json&apikey=${config.apiKey}&function=${dataType}&interval=5min&outputsize=full`;
    return fetch(url, requestOptions)
        .then(response => response.text()
            .then(text => {
                const data = text && JSON.parse(text);
                if (!response.ok) {
                    const errors = (data && data.errors) || response.status;
                    return Promise.reject(errors);
                }
                console.log(data);
                return data
            }));
}
