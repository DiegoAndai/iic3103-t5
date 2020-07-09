import Vue from 'vue';
import VueRouter from 'vue-router';
import EpisodeList from '../views/episode-list.vue';
import Episode from '../views/episode.vue';
import Location from '../views/location.vue';
import Character from '../views/character.vue';
import Search from '../views/search.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'EpisodeList',
    component: EpisodeList,
  },
  {
    path: '/episode/:id',
    name: 'Episode',
    component: Episode,
  },
  {
    path: '/location/:id',
    name: 'Location',
    component: Location,
  },
  {
    path: '/character/:id',
    name: 'Character',
    component: Character,
  },
  {
    path: '/search',
    name: 'Search',
    component: Search,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
