const URL = 'https://63f9bdce897af748dcc2d723.mockapi.io'

// Login Prototype
// localstorage
// localStorage.setItem('isLoggedIn', 'true');
// localStorage.setItem(
//   'user',
//   JSON.stringify({ name: 'Sanjay Saravanan', email: 'sanjay@gmail.com' })
// );

// sessionStorage.setItem('isLoggedIn', 'true');
// sessionStorage.setItem(
//   'user',
//   JSON.stringify({ name: 'Sanjay Saravanan', email: 'sanjay@gmail.com' })
// );


const deleteItem = async (id) => {
  const response = await fetch(
    `${URL}/items/${id}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    }
  )
}

// deleteItem('5');

const editItem = async (newItemInfo, id) => {
  const response = await fetch(
    `${URL}/items/${id}`,
    {
      method: 'PUT',
      // new item info -> 
      body: JSON.stringify(newItemInfo),
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    }
  )
}

editItem(
  {
    image: 'https://media.istockphoto.com/id/1334276621/photo/bluefin-tuna-thunnus-thynnus-saltwater-fish.jpg?s=612x612&w=0&k=20&c=FNDMZ2Ptv1obv2ubYB5p81jAPVp6lJIZYDmbUeYyXhc='
  },
  '10'
)


const triggerLogin = (data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (data.email === 'sanjay@gmail.com' && data.password === '12345') {
        resolve({ email: 'sanjay@gmail.com', name: 'Sanjay Saravanan' });
      } else {
        reject({ msg: 'Invalid Credentials' })
      }
    }, 2000);
  })
}

const triggerLogout = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ msg: 'User Successfully Logged out' });
    }, 2000);
  })
}



const loader = document.getElementById('loader');

const afterLogin = document.getElementById('after-login');

const beforeLogin = document.getElementById('before-login')

const msgArea = document.getElementById('msg-area');
const successMsg = document.getElementById('success-msg');
const errorEle = document.getElementById('failure-msg')

const form = document.getElementById('form-login');
const formItem = document.getElementById('form-item');
const popUp = document.getElementById('pop-up')
const itemsArea = document.getElementById('items');

// creation no need to send id
const createItem = async (newItemInfo) => {
  const response = await fetch(
    `${URL}/items`,
    {
      method: 'POST',
      // new item info -> 
      body: JSON.stringify(newItemInfo),
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    }
  )
}


const getItems = async () => {
  // GET all Items
  const response = await fetch('https://63f9bdce897af748dcc2d723.mockapi.io/items');
  const items = await response.json();

  items.forEach(({ image, name, quantity }) => {
    const divEle = document.createElement('div');
    divEle.classList.add('m-1')
    divEle.innerHTML = `<div class="card" style="width: 18rem;">
      <img src="${image}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${name}</h5>
        <h4 class="card-title" >QTY: ${quantity}</h4>
        <button class="btn btn-primary">Edit</button>
        <button class="btn btn-danger">Delete</button>
      </div>
    </div>`;
    itemsArea.appendChild(divEle);
  });
}

formItem.addEventListener('submit', async (e) => {
  e.preventDefault();

  // initialization of data outside loop
  var data = {};

  Array.from(e.target.elements).forEach((element) => {

    // nodeName
    if (element.nodeName === 'INPUT') {
      if (element.type === 'radio') {
        if (element.checked) {
          data[element.name] = element.id;
        }
      } else {
        data[element.name] = element.value;
      }
    }
  });

  try {
    await createItem(data);
    successMsg.style.display = 'none';
    errorEle.style.display = 'none';
    afterLogin.style.display = 'block';
    beforeLogin.style.display = 'none';
    popUp.style.display = 'none';
  } catch (errRes) {
    console.log(errRes)
  }
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // initialization of data outside loop
  var data = {};

  Array.from(e.target.elements).forEach((element) => {

    // nodeName
    if (element.nodeName === 'INPUT') {
      if (element.type === 'radio') {
        if (element.checked) {
          data[element.name] = element.id;
        }
      } else {
        data[element.name] = element.value;
      }
    }
  });

  try {
    loader.style.display = 'flex';
    const loginResponse = await triggerLogin(data);
    successMsg.style.display = 'block';
    errorEle.style.display = 'none';
    afterLogin.style.display = 'block';
    beforeLogin.style.display = 'none';
    document.getElementById('name').innerText = loginResponse.name;
    getItems();
  } catch (errRes) {
    errorEle.style.display = 'block';
    successMsg.style.display = 'none';
  } finally {
    msgArea.style.display = 'block';
    loader.style.display = 'none';
  }
});


const logout = async () => {
  loader.style.display = 'flex';
  const logoutResponse = await triggerLogout();
  successMsg.style.display = 'block';
  errorEle.style.display = 'none';
  afterLogin.style.display = 'none';
  beforeLogin.style.display = 'block';
  successMsg.innerText = logoutResponse.msg;
  loader.style.display = 'none';
}



const openItemForm = () => {
  popUp.style.display = 'block';
  successMsg.style.display = 'none';
  errorEle.style.display = 'none';
  afterLogin.style.display = 'none';
  beforeLogin.style.display = 'none';
}


