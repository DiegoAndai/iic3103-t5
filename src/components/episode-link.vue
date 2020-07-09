<template>
  <router-link :to="`/episode/${episodeId}`">
    <span class="text-blue-600 hover:underline">
      {{ episode.name }}
    </span>
  </router-link>
</template>

<script>
import gql from 'graphql-tag'

export default {
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
