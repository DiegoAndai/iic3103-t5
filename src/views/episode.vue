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
        <div v-for="characterUrl in episode.characters" :key="`character-${characterUrl}`">
          <character-link
            :character-url="characterUrl"
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
      episode: null,
    };
  },
  computed: {
    resourceUrl() { return formResourceUrl('episode', this.$route.params.id); },
  },
  methods: {
    fetchEpisode() {
      this.$store.dispatch('getEpisode', this.resourceUrl)
        .then(() => {
          this.episode = this.$store.state.episodes.episodes[this.resourceUrl];
        });
    },
  },
  mounted() {
    this.episode = this.$store.state.episodes.episodes[this.resourceUrl];
    if (this.episode === undefined) {
      this.fetchEpisode();
    }
  },
};
</script>

<style>
</style>
