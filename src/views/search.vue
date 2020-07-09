<template>
  <div
    id="search"
    class="p-4 m-2 mb-4 bg-white rounded shadow-md"
  >
    <div class="text-center mb-2">
      <span class="text-xl font-normal">
        "{{ this.$route.query.term }}"
      </span>
      search results
    </div>
    <div v-if="searchingCharacters || searchingEpisodes || searchingLocations">
      <loading />
    </div>
    <div v-else class="flex">
      <div class="mx-2">
        Found {{episodeSearchUrls.length}} episodes:
        <div v-for="url in episodeSearchUrls" :key="url">
          <episode-link
            :episode-url="url"
          />
        </div>
      </div>
      <div class="mx-10">
        Found {{characterSearchUrls.length}} characters:
        <div v-for="url in characterSearchUrls" :key="url">
          <character-link
            :character-url="url"
          />
        </div>
      </div>
      <div class="mx-2">
        Found {{locationSearchUrls.length}} locations:
        <div v-for="url in locationSearchUrls" :key="url">
          <location-link
            :location-url="url"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import EpisodeLink from '../components/episode-link.vue';
import CharacterLink from '../components/character-link.vue';
import LocationLink from '../components/location-link.vue';
import Loading from '../components/loading.vue';

export default {
  components: {
    EpisodeLink,
    CharacterLink,
    LocationLink,
    Loading,
  },
  computed: {
    ...mapState({
      episodeSearchUrls: (state) => state.episodes.searchUrls,
      searchingEpisodes: (state) => state.episodes.searchingEpisodes,
      characterSearchUrls: (state) => state.characters.searchUrls,
      searchingCharacters: (state) => state.characters.searchingCharacters,
      locationSearchUrls: (state) => state.locations.searchUrls,
      searchingLocations: (state) => state.locations.searchingLocations,
    }),
  },
  methods: {
    search() {
      this.$store.dispatch('searchEpisodes', this.$route.query.term);
      this.$store.dispatch('searchCharacters', this.$route.query.term);
      this.$store.dispatch('searchLocations', this.$route.query.term);
    }
  },
  mounted() {
    this.search();
  },
  watch: {
    $route() {
      this.search();
    }
  }
};
</script>

<style>
</style>