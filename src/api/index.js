import axios from 'axios';

const API_BASE_URL = 'https://integracion-rick-morty-api.herokuapp.com/api'

export function toUrlIndexedForm(results) {
  return results.reduce((urlIndexed, resource) => (
    { ...urlIndexed, [resource.url]: resource }
  ), {});
}

export function formResourceUrl(type, id = '') {
  return `${API_BASE_URL}/${type}/${id}`;
}

export function getResource(url) {
  return axios.get(url);
}

async function recursiveGet(url, responses = []) {
  const { data: { info: { next }, results } } = await getResource(url);
  const mergedResults = [...responses, ...results];
  if (next === '') {
    return mergedResults;
  }
  return recursiveGet(next, mergedResults);
}

export async function getAllResourcePages(type) {
  const results = await recursiveGet(`${API_BASE_URL}/${type}`);
  return results;
}
