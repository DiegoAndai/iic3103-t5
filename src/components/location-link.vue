<template>
  <router-link :to="`/location/${location.id}`" v-if="location">
    <span class="text-blue-600 hover:underline">
      {{ location.name }}
    </span>
  </router-link>
</template>

<script>
export default {
  props: {
    locationUrl: {
      required: true,
      type: String,
    },
  },
  data() {
    return {
      location: null,
    };
  },
  methods: {
    fetchLocation() {
      this.$store.dispatch('getLocation', this.locationUrl)
        .then(() => {
          this.location = this.$store.state.locations.locations[this.locationUrl];
        });
    },
  },
  mounted() {
    this.location = this.$store.state.locations.locations[this.locationUrl];
    if (this.location === undefined) {
      this.fetchLocation();
    }
  },
};
</script>

<style>
</style>
