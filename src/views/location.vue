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
        <div v-for="character in location.residents" :key="`location-${character}`">
          <character-link
            :character-url="character"
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
import { formResourceUrl } from '../api';
import CharacterLink from '../components/character-link';
import Loading from '../components/loading';

export default {
  components: {
    CharacterLink,
    Loading,
  },
  data() {
    return {
      location: this.$store.state.locations.locations[this.resourceUrl],
    };
  },
  computed: {
    resourceUrl() { return formResourceUrl('location', this.$route.params.id); },
  },
  methods: {
    fetchLocation() {
      this.$store.dispatch('getLocation', this.resourceUrl)
        .then(() => {
          this.location = this.$store.state.locations.locations[this.resourceUrl];
        });
    },
  },
  mounted() {
    this.location = this.$store.state.locations.locations[this.resourceUrl];
    if (this.location === undefined) {
      this.fetchLocation();
    }
  },
};
</script>

<style>
</style>
