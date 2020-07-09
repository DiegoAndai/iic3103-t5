import { getResource, getAllResourcePages, toUrlIndexedForm } from '../api';

const initialState = {
  loadingEpisodes: false,
  fetchedEpisodes: false,
  episodes: {},
  searchingEpisodes: false,
  searchUrls: [],
};

export const mutations = {
  setEpisodes(state, payload) {
    state.episodes = payload;
  },
  addSearchResultEpisodes(state, payload) {
    state.searchUrls = [ ...state.searchUrls, payload];
  },
  setEpisode(state, payload) {
    state.episodes[payload.url] = payload;
  },
  reset(state) {
    Object.assign(state, { ...initialState });
  },
  resetSearch(state) {
    state.searchUrls = [];
  },
  toggleLoading(state, payload) {
    state.loadingEpisodes = payload;
  },
  toggleFetched(state, payload) {
    state.fetchedEpisodes = payload;
  },
  toggleSearching(state, payload) {
    state.searchingEpisodes = payload;
  },
};

export const actions = {
  getEpisodes({ commit }) {
    commit('toggleLoading', true);

    return getAllResourcePages('episode')
      .then((res) => {
        commit('setEpisodes', toUrlIndexedForm(res));
      })
      .finally(() => {
        commit('toggleLoading', false);
        commit('toggleFetched', true);
      });
  },
  searchEpisodes({ commit }, payload) {
    commit('toggleSearching', true);
    commit('resetSearch');

    return getAllResourcePages(`episode/?name=${payload}`)
      .then((res) => {
        res.forEach((result) => {
          commit('setEpisode', result)
          commit('addSearchResultEpisodes', result.url);
        })
      })
      .finally(() => {
        commit('toggleSearching', false);
      });
  },
  getEpisode({ commit }, payload) {
    commit('toggleLoading', true);

    return getResource(payload)
      .then((res) => {
        commit('setEpisode', res.data);
      })
      .finally(() => {
        commit('toggleLoading', false);
      });
  },
};

export default {
  state: { ...initialState },
  mutations,
  actions,
};
