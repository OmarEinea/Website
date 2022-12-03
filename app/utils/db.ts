import 'fetch';

const getCache = <T>(key: string) => {
  const cache = sessionStorage.getItem(key);
  return cache ? <T>JSON.parse(cache) : undefined;
};
const setCache = <T>(key: string, data: T) => {
  sessionStorage.setItem(key, JSON.stringify(data));
};

export const age = new Date(Date.now() - 801954000000).getFullYear() - 1970;
export const colors = ['#C4086E', '#Cf1D61', '#DB3255', '#E64749', '#F25C3D', '#FE7131', '#FF8533'];
export const url = (image: string) => `/images/${image.replace(' ', '%20')}`;
export const skill = (name: string) => url(`skills/${name}.png`);
export const profile = (name: string) => url(`profiles/${name}/logo.png`);
export const get = async <T>(page: string) => {
  const cache = getCache<T>(page);
  if (cache) return cache;
  const response = await fetch(`/text/${page}.json`);
  const data: T = await response.json();
  setCache(page, data);
  return data;
};
