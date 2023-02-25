const API_KEY = 'AIzaSyCE52aCtguSA2SzSS6SrofzCNsGL-ok7ng';
const channelId = 'UCsC2_t20jWLVpTHZIiGfH-Q';

// https://www.googleapis.com/youtube/v3/search?key=AIzaSyCE52aCtguSA2SzSS6SrofzCNsGL-ok7ng&channelId=UCUzsP2NMaAvy9nSvb3IjVkA&part=snippet,id&order=date&maxResults=20


// https://www.googleapis.com/youtube/v3/subscriptions?key=AIzaSyCE52aCtguSA2SzSS6SrofzCNsGL-ok7ng&mine=true


// https://www.googleapis.com/youtube/v3/videos?key=AIzaSyCE52aCtguSA2SzSS6SrofzCNsGL-ok7ng&chart=mostPopular


// https://www.googleapis.com/youtube/v3/videos?key=AIzaSyCE52aCtguSA2SzSS6SrofzCNsGL-ok7ng&chart=mostPopular

var globalVideos = [];

const videosArea = document.getElementById('videos-area');

const getVideos = async () => {
  const resposne = await fetch(`https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&chart=mostPopular`);
  const { items: videos } = await resposne.json();
  //   <iframe width="420" height="345" src="https://www.youtube.com/embed/jZGpkLElSu8"">
  // </iframe>
  videos.forEach(({ id }) => {
    const frameElement = document.createElement('iframe');
    // frameElement.classList.add('rounded');
    // frameElement.classList.add('m-1');
    frameElement.setAttribute('height', '200');
    frameElement.setAttribute('width', '250');
    frameElement.setAttribute('src', `https://www.youtube.com/embed/${id}`);
    videosArea.appendChild(frameElement);
  })
}

getVideos();