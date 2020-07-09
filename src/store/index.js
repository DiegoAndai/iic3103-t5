import Vue from 'vue';
import Vuex from 'vuex';

import episodes from './episodes';
import characters from './characters';
import locations from './locations';

const initialState = {
  episodes: episodes.state,
  characters: characters.state,
  locations: locations.state,
};

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    episodes,
    characters,
    locations,
  },
  mutations: {
    resetState(state) {
      Object.keys(state).forEach((key) => {
        Object.assign(state[key], initialState[key]);
      });
    },
  },
});
