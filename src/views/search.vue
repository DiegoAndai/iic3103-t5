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
    <div v-if="
      linkedEpisodes.length == 0 &&
      linkedCharacters.length == 0 &&
      linkedLocations.length == 0">
      <loading />
    </div>
    <div v-else class="flex">
      <div class="mx-2">
        Found {{linkedEpisodes.length}} episodes:
        <div v-for="episode in linkedEpisodes" :key="episode.id">
          <episode-link
            :episode-id="episode.id"
          />
        </div>
      </div>
      <div class="mx-10">
        Found {{linkedCharacters.length}} characters:
        <div v-for="character in linkedCharacters" :key="character.id">
          <character-link
            :character-id="character.id"
          />
        </div>
      </div>
      <div class="mx-2">
        Found {{linkedLocations.length}} locations:
        <div v-for="location in linkedCharacters" :key="location.id">
          <location-link
            :location-id="location.id"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'
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
  data: function() {
    return {
      linkedEpisodes: [],
      episodesPage: 1,
      linkedCharacters: [],
      charactersPage: 1,
      linkedLocations: [],
      locationsPage: 1
    };
  },
  apollo: {
    episodes: {
      query() {
        const query = `query getEpisodes ($page: Int!) {
          episodes (
            page: $page,
            filter: { name: "${this.$route.query.term}" }
          ) {
            info {
              next
            }
            results {
              id
            }
          }
        }`
        return gql(query)
      },
      variables () {
        return {
            page: this.episodesPage,
        }
      }
    },
    characters: {
      query() {
        const query = `query getCharacters ($page: Int!) {
          characters (
            page: $page,
            filter: { name: "${this.$route.query.term}" }
          ) {
            info {
              next
            }
            results {
              id
            }
          }
        }`
        return gql(query)
      },
      variables () {
        return {
            page: this.charactersPage,
        }
      }
    },
    locations: {
      query() {
        const query = `query getLocations ($page: Int!) {
          locations (
            page: $page,
            filter: { name: "${this.$route.query.term}" }
          ) {
            info {
              next
            }
            results {
              id
            }
          }
        }`
        return gql(query)
      },
      variables () {
        return {
            page: this.locationsPage,
        }
      }
    },
  },
  watch: {
    episodes: function ({results: newEpisodes, info: { next }}) {
      this.episodesPage = next || this.episodesPage;
      this.linkedEpisodes = [...this.linkedEpisodes, ...newEpisodes ]
    },
    characters: function ({results: newCharacters, info: { next }}) {
      this.charactersPage = next || this.charactersPage;
      this.linkedCharacters = [...this.linkedCharacters, ...newCharacters ]
    },
    locations: function ({results: newLocations, info: { next }}) {
      this.locationsPage = next || this.locationsPage;
      this.linkedLocations = [...this.linkedLocations, ...newLocations ]
    }
  }
};
</script>

<style>
</style>