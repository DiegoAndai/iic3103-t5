<template>
  <div
    @key="`character-${this.$route.params.id}`"
    class="p-4 m-2 mb-4 bg-white rounded shadow-md"
  >
    <div v-if="character" class="flex flex-col ">
      <div class="text-center mb-2">
        <span class="text-xl font-normal">
          {{ character.name }}
        </span>
        (character)
      </div>
      <img class="self-center rounded w-64 h-64 mb-2 bg-gray-200" :src="character.image" />
      <div>
        Status: {{ character.status }}
      </div>
      <div>
        Species: {{ character.species }}
      </div>
      <div>
        Type: {{ character.type }}
      </div>
      <div>
        Gender: {{ character.gender }}
      </div>
      <div>
        Location: <location-link :location-id="character.location.id"/>
      </div>
      <div>
        Origin: <location-link :location-id="character.origin.id"/>
      </div>
      <div class="my-2 py-2 border-t border-b">
        Featured in:
        <div v-for="episode in character.episode" :key="`episode-${episode.id}`">
          <episode-link
            :episode-id="episode.id"
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
import EpisodeLink from '../components/episode-link';
import LocationLink from '../components/location-link';
import Loading from '../components/loading';

export default {
  components: {
    EpisodeLink,
    LocationLink,
    Loading,
  },
  apollo: {
    character: {
      query: gql`query getCharacter ($id: ID) {
        character (id: $id) {
          name
          image
          status
          species
          type
          gender
          location {
            id
          }
          origin {
            id
          }
          episode {
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
