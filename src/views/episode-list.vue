<template>
  <div
    id="episode-list"
    class="p-4 m-2 mb-4 bg-white rounded shadow-md"
  >
    <div class="text-center mb-2 text-xl font-normal">
      Episode List
    </div>
    <template v-if="loadingEpisodes">
      <loading />
    </template>
    <template v-else>
      <div v-for="episode in episodes" :key="episode.id">
        <episode-row
          :episode-url="episode.url"
        />
      </div>
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import EpisodeRow from '../components/episode-row.vue';
import Loading from '../components/loading.vue';

export default {
  components: {
    EpisodeRow,
    Loading,
  },
  computed: {
    ...mapState({
      episodes: (state) => state.episodes.episodes,
      loadingEpisodes: (state) => state.episodes.loadingEpisodes,
      fetchedEpisodes: (state) => state.episodes.fetchedEpisodes,
    }),
  },
  methods: {
    fetchEpisodes() {
      this.$store.dispatch('getEpisodes');
    },
  },
  mounted() {
    if (!this.fetchedEpisodes) {
      this.fetchEpisodes();
    }
  },
};
</script>

<style>
</style>
