<template>
  <div
    @key="`episode-${this.$route.params.id}`"
    class="p-4 m-2 mb-4 bg-white rounded shadow-md"
  >
    <div v-if="episode">
      <div class="text-center mb-2">
        <span class="text-xl font-normal">
          {{ episode.name }}
        </span>
        (episode)
      </div>
      <div>
        Code: {{ episode.episode }}
      </div>
      <div>
        Aired on {{ episode.air_date }}
      </div>
      <div class="my-2 py-2 border-t border-b">
        Featured characters:
        <div v-for="character in episode.characters" :key="`character-${character.id}`">
          <character-link
            :character-id="character.id"
          />
        </div>
      </div>
    </div>
    <div v-else>
      <loading />
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import CharacterLink from '../components/character-link';
import Loading from '../components/loading';

export default {
  components: {
    CharacterLink,
    Loading,
  },
  apollo: {
    episode: {
      query: gql`query getEpisode ($id: ID) {
        episode (id: $id) {
          name
          air_date
          episode
          characters {
            id
          }
        }
      }`,
      variables () {
        return {
            id: this.$route.params.id,
        }
      }
    },
  },
};
</script>

<style>
</style>
