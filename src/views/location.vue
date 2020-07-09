<template>
  <div
    @key="`location-${this.$route.params.id}`"
    class="p-4 m-2 mb-4 bg-white rounded shadow-md"
  >
    <div v-if="location">
      <div class="text-center mb-2">
        <span class="text-xl font-normal">
          {{ location.name }}
        </span>
        (location)
      </div>
      <div>
        Type: {{ location.type }}
      </div>
      <div>
        Dimension: {{ location.dimension }}
      </div>
      <div class="my-2 py-2 border-t border-b">
        Residents:
        <div v-for="character in location.residents" :key="`location-${character.id}`">
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
    location: {
      query: gql`query getLocation ($id: ID) {
        location (id: $id) {
          id
          name
          type
          dimension
          residents {
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
