<template>
  <div>
    <template v-if="episode">
      <episode-link :episode-url="episode.url" />
      ({{ episode.episode }}), aired on {{ episode.air_date }}
    </template>
  </div>
</template>

<script>
import EpisodeLink from '../components/episode-link';

export default {
  components: {
    EpisodeLink,
  },
  props: {
    episodeUrl: {
      required: true,
      type: String,
    },
  },
  data() {
    return {
      episode: null,
    };
  },
  methods: {
    fetchEpisode() {
      this.$store.dispatch('getEpisode', this.episodeUrl)
        .then(() => {
          this.episode = this.$store.state.episodes.episodes[this.episodeUrl];
        });
    },
  },
  mounted() {
    this.episode = this.$store.state.episodes.episodes[this.episodeUrl];
    if (this.episode === undefined) {
      this.fetchEpisode();
    }
  },
};
</script>

<style>
</style>
