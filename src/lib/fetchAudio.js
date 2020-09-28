export default async function fetchAudio() {
  if (localStorage.getItem('audio-vis-audio')) return JSON.parse(localStorage.getItem('audio-vis-audio'));

  const corsProxy = 'https://cors-anywhere.herokuapp.com/';
  const url = 'https://api.deezer.com/track/526604162';
  return await fetch(corsProxy + url)
    .then(res => res.json())
    .then(track => track)
    .catch(err => console.error(err));
}
