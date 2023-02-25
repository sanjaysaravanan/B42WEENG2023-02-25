// const options = {
//   method: 'GET',
//   headers: {
//     'X-RapidAPI-Key': '1fc8aa8b7amsha357479ddcb4d85p191b42jsn94d6f4e0fc39',
//     'X-RapidAPI-Host': 'livescore6.p.rapidapi.com'
//   }
// };

// fetch('https://livescore6.p.rapidapi.com/matches/v2/list-live?Category=soccer&Timezone=-7', options)
//   .then(response => response.json())
//   .then(response => console.log(response))
//   .catch(err => console.error(err));


// fetch('https://livescore6.p.rapidapi.com/matches/v2/get-innings?Eid=723844&Category=cricket', options)
//   .then(response => response.json())
//   .then(response => console.log(response))
//   .catch(err => console.error(err));

// Use the Below API and display the information 
// https://api.disneyapi.dev/characters

var globalChars = [];

/* 
  <img class="rounded" width="250" height="200"
      src="https://static.wikia.nocookie.net/disney/images/2/2c/A.J._Arno.jpg" alt="Arno" />
*/

const charsArea = document.getElementById('chars-area');

var page = 1;

const getCharacters = async (name) => {
  var response;
  if (name) {
    response = await fetch(`https://api.disneyapi.dev/character?name=${name}`);
  } else {
    response = await fetch(`https://api.disneyapi.dev/characters?page=${page}`);
  }

  const { data: characters } = await response.json();
  globalChars = characters;
  charsArea.innerHTML = '';
  characters.forEach(({ name, imageUrl }) => {
    const divElement = document.createElement('div');
    divElement.classList.add('overflow-hidden');
    divElement.classList.add('position-relative');
    divElement.classList.add('parent-div');


    const imgElement = document.createElement('img');
    imgElement.classList.add('rounded');
    imgElement.classList.add('m-1');
    imgElement.setAttribute('height', '200');
    imgElement.setAttribute('width', '250');
    imgElement.setAttribute('src', imageUrl);
    imgElement.setAttribute('alt', name);

    const nameDiv = document.createElement('div');
    nameDiv.classList.add('name-div');
    nameDiv.classList.add('bg-primary');
    nameDiv.classList.add('p-2');
    nameDiv.classList.add('text-light');
    nameDiv.classList.add('d-inline');

    nameDiv.innerText = name;

    divElement.append(imgElement, nameDiv);
    charsArea.appendChild(divElement);
  })
}

const searchFunc = () => {
  const value = document.getElementById('search').value;
  getCharacters(value);
}

const nextPageFunc = () => {
  page++;
  getCharacters();
}

const prevPageFunc = () => {
  page--;
  getCharacters();
}



getCharacters();

