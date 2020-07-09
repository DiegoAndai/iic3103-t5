<template>
  <router-link :to="`/location/${locationId}`" v-if="location">
    <span class="text-blue-600 hover:underline">
      {{ location.name }}
    </span>
  </router-link>
</template>

<script>
import gql from 'graphql-tag'

export default {
  props: {
    locationId: {
      required: true,
      type: String,
    },
  },
  apollo: {
    location: {
      query: gql`query getLocation ($id: ID) {
        location (id: $id) {
          id
          name
        }
      }`,
      variables () {
        return {
            id: this.locationId,
        }
      }
    },
  },
};
</script>

<style>
</style>
