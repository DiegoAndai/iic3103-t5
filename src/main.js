import Vue from 'vue';
import Vuex from 'vuex';
import App from './app.vue';
import router from './router';
import store from './store';
import { createApolloClient } from 'vue-cli-plugin-apollo/graphql-client'
import VueApollo from 'vue-apollo'


import './assets/styles/index.css';
import { createProvider } from './vue-apollo'

Vue.config.productionTip = false;

const { apolloClient } = createApolloClient({
  httpEndpoint: 'https://integracion-rick-morty-api.herokuapp.com/graphql'
})

Vue.use(Vuex);
Vue.use(VueApollo);

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})

new Vue({
  router,
  store,
  apolloProvider: createProvider(),
  render: (h) => h(App)
}).$mount('#app');
