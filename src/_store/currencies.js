import {currencyService} from "@/_services/currencyService";
import {errorHandler} from "@/_helpers/errorHandler";

export const currencyStore = {
    state: {
        list: [],
        loading: false,
        exchangeRate: null,
        date: null,
    },
    actions: {
        getAvailableCurrencies(context) {
            context.state.loading = true;
            currencyService.getAvailableCurrencies().then(
                (response) => {
                    if (response.isSuccess) {
                        context.commit('fillList', response.json)
                    }
                },
                (error) => errorHandler.fireError(context.state, error),
            )
        },
        getExchangeRate(context, params) {
            context.state.loading = true;
            currencyService.getExchangeRate(params).then(
                (response) => {
                    if (response.isSuccess) {
                        context.commit('setExchangeRate', response.json)
                    }
                },
                (error) => errorHandler.fireError(context.state, error),
            )
        }
    },
    mutations: {
        fillList(state, response) {
            state.list = response;
            state.loading = false;
        },
        setExchangeRate(state, response) {
            state.exchangeRate = response.exchangeRate;
            state.date = response.date;
            state.loading = false;
            console.log(state.exchangeRate)
        }
    }
}