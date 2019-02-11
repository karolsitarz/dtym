import '@babel/polyfill';
import { URLtoURI } from './ImageToURI';

export default async () => {
  let p = await window.fetch('https://randomuser.me/api/');
  p = await p.json();
  p = {
    name: p.results[0].name.first + ' ' + p.results[0].name.last,
    avatar: 'https://cors-anywhere.herokuapp.com/' + p.results[0].picture.large
  };
  p.avatar = await URLtoURI(p.avatar);
  return p;
};
