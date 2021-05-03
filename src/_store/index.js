import Vue from 'vue'
import Vuex from 'vuex'

import {currencyStore} from "@/_store/currencies";

Vue.use(Vuex)

export const store = new Vuex.Store(
    {
        modules: {
            currencyStore
        }
    }
);