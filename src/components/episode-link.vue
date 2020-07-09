<template>
  <router-link :to="`/episode/${episode.id}`" v-if="episode">
    <span class="text-blue-600 hover:underline">
      {{ episode.name }}
    </span>
  </router-link>
</template>

<script>
export default {
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
