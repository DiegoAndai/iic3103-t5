<template>
  <router-link :to="`/character/${character.id}`" v-if="character">
    <span class="text-blue-600 hover:underline">
      {{ character.name }}
    </span>
  </router-link>
</template>

<script>
import gql from 'graphql-tag'

export default {
  props: {
    characterId: {
      required: true,
      type: String,
    },
  },
  apollo: {
    character: {
      query: gql`query getCharacter ($id: ID) {
        character (id: $id) {
          id
          name
        }
      }`,
      variables () {
        return {
            id: this.characterId,
        }
      }
    },
  },
};
</script>

<style>
</style>
