<template>
    <div>
        <h3>Currency</h3>
        <div>
            <v-select v-model="currency1" :options="currencyList"></v-select>
            <v-select v-model="currency2" :options="currencyList"></v-select>
            Select date:
            <datepicker v-model="date"></datepicker>
            <br>
            <button @click="getExchangeRate">Get Exchange Rate</button>
            <br>
            <h3 v-if="exchangeRate != null">
                Exchange Rate: {{ currency1 }}/{{ currency2 }} = {{ exchangeRate }}
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
            this.exchangeRate = null;
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

<style scoped>
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
</style>
