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
        Origin: <location-link :location-url="character.location.url"/>
      </div>
      <div class="my-2 py-2 border-t border-b">
        Featured in:
        <div v-for="episodeUrl in character.episode" :key="`episode-${episodeUrl}`">
          <episode-link
            :episode-url="episodeUrl"
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
import EpisodeLink from '../components/episode-link';
import LocationLink from '../components/location-link';
import Loading from '../components/loading';

export default {
  components: {
    EpisodeLink,
    LocationLink,
    Loading,
  },
  data() {
    return {
      character: null,
    };
  },
  computed: {
    resourceUrl() { return formResourceUrl('character', this.$route.params.id); },
  },
  methods: {
    fetchCharacter() {
      this.$store.dispatch('getCharacter', this.resourceUrl)
        .then(() => {
          this.character = this.$store.state.characters.characters[this.resourceUrl];
        });
    },
  },
  mounted() {
    this.character = this.$store.state.characters.characters[this.resourceUrl];
    if (this.character === undefined) {
      this.fetchCharacter();
    }
  },
};
</script>

<style>
</style>
