<template>
  <div>
    <template v-if="episode">
      <episode-link :episode-id="episodeId" />
      ({{ episode.episode }}), aired on {{ episode.air_date }}
    </template>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import EpisodeLink from '../components/episode-link';

export default {
  components: {
    EpisodeLink,
  },
  props: {
    episodeId: {
      required: true,
      type: String,
    },
  },
  apollo: {
    episode: {
      query: gql`query getEpisode ($id: ID) {
        episode (id: $id) {
          name
          air_date
          episode
        }
      }`,
      variables () {
        return {
            id: this.episodeId,
        }
      }
    },
  },
};
</script>

<style>
</style>
