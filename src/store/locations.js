import { getResource, getAllResourcePages } from '../api';

const initialState = {
  locations: {},
  searchingLocations: false,
  searchUrls: [],
};

export const mutations = {
  setLocation(state, payload) {
    state.locations[payload.url] = payload;
  },
  addSearchResultLocations(state, payload) {
    state.searchUrls = [ ...state.searchUrls, payload];
  },
  reset(state) {
    Object.assign(state, { ...initialState });
  },
  resetSearch(state) {
    state.searchUrls = [];
  },
  toggleSearching(state, payload) {
    state.searchingLocations = payload;
  },
};

export const actions = {
  getLocation({ commit }, payload) {
    return getResource(payload)
      .then((res) => {
        commit('setLocation', res.data);
      });
  },
  searchLocations({ commit }, payload) {
    commit('toggleSearching', true);
    commit('resetSearch');

    return getAllResourcePages(`location/?name=${payload}`)
      .then((res) => {
        res.forEach((result) => {
          commit('setLocation', result)
          commit('addSearchResultLocations', result.url);
        })
      })
      .finally(() => {
        commit('toggleSearching', false);
      });
  },
};

export default {
  state: { ...initialState },
  mutations,
  actions,
};
