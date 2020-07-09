<template>
  <div
    id="episode-list"
    class="p-4 m-2 mb-4 bg-white rounded shadow-md"
  >
    <div class="text-center mb-2 text-xl font-normal">
      Episode List
    </div>
    <template v-if="linkedEpisodes.length == 0">
      <loading />
    </template>
    <template v-else>
      <div v-for="episode in linkedEpisodes" :key="episode.id">
        <episode-row
          :episode-id="episode.id"
        />
      </div>
    </template>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import EpisodeRow from '../components/episode-row.vue';
import Loading from '../components/loading.vue';

export default {
  components: {
    EpisodeRow,
    Loading,
  },
  data: function() {
    return {
      linkedEpisodes: [],
      page: 1
    };
  },
  apollo: {
    episodes: {
      query: gql`query getEpisodes ($page: Int!) {
        episodes (page: $page) {
          info {
            next
          }
          results {
            id
          }
        }
      }`,
      variables () {
        return {
            page: this.page,
        }
      }
    },
  },
  watch: {
    episodes: function ({results: newEpisodes, info: { next }}) {
      this.page = next || this.page;
      this.linkedEpisodes = [...this.linkedEpisodes, ...newEpisodes ]
    }
  }
};
</script>

<style>
</style>
