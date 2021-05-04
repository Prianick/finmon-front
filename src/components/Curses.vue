<template>
    <div class="container">
        <div>
            Currencies
            <v-select v-model="currency1" :options="currencyList"></v-select>
            <v-select v-model="currency2" :options="currencyList"></v-select>
            Date:
            <datepicker v-model="date" :disabled-dates="disabledDates"></datepicker>
            <br>
            <button class="get-exchange-btn" @click="getExchangeRate">Get Exchange Rate</button>
            <br>
            <h3 v-if="exchangeRate != null">
                Exchange Rate: <br>
                {{ currency1 }}/{{ currency2 }} = {{ exchangeRate }}
            </h3>
        </div>
    </div>
</template>

<script>

import {store} from "@/_store";
import Datepicker from "vuejs-datepicker";
import moment from 'moment';

export default {
    name: 'Curses',
    components: {
        Datepicker,
    },
    store,
    data() {
        return {
            currency1: '',
            currency2: '',
            defaultDate: new Date(),
            date: null,
            disabledDates: {
                from: new Date()
            }
        }
    },
    created() {
        this.date = new Date();
        this.$store.dispatch('getAvailableCurrencies')
    },
    computed: {
        currencyList: {
            get: function () {
                return this.$store.state.currencyStore.list;
            }
        },
        exchangeRate: {
            get: function () {
                return this.$store.state.currencyStore.exchangeRate
            },
        }
    },
    methods: {
        getExchangeRate: function () {
            this.$store.commit('setExchangeRateToNull');
            const payload = {
                currency1: this.currency1,
                currency2: this.currency2,
                date: moment(this.date).format('YYYY-MM-DD'),
            };
            this.$store.dispatch('getExchangeRate', payload);
        }
    }
}
</script>

<style>
h3 {
    margin: 40px 0 0;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #42b983;
}

.vdp-datepicker input {
    appearance: none;
    display: flex;
    background: none;
    border: 1px solid rgba(60, 60, 60, .26);
    border-radius: 4px;
    white-space: normal;
    padding: 10px;
    width: 100%;
    font-family: inherit;
}

.get-exchange-btn {
    border: 1px solid rgba(60, 60, 60, .26);
    border-radius: 4px;
    white-space: normal;
    padding: 10px;
    width: 100%;
    cursor: pointer;
    font-family: inherit;
}

.container {
    width: 300px;
    margin: auto;
}
</style>
