import {convertToUrlParams} from "@/_helpers/request-functions";
import {responseHandler} from "@/_helpers/responseHandler";

export const currencyService = {
    async getAvailableCurrencies() {
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}
        };
        const url = 'http://0.0.0.0/api/currency-list';
        return fetch(url, requestOptions).then((response) => {
            return responseHandler.parseResponse(response)
        });
    },
    getExchangeRate(params) {
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}
        };
        const url = 'http://0.0.0.0/api/exchange-rate?' + convertToUrlParams(params);
        return fetch(url, requestOptions).then((response) => {
            return responseHandler.parseResponse(response)
        });
    }
}