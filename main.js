const API = 'https://api.thedogapi.com/v1/images/search?limit=2';
const FAVOURITES = 'https://api.thedogapi.com/v1/favourites';
const API_KEY = 'live_4HbFHf3sbc7Vt4Ort9m5sntl0MFo8QnfOazYLAC3xP8znArBVBTNpPY7RlxiQ5NW';

const randomError = document.getElementById('error');

async function loadRandomDogs(urlApi) {
    try {
        const response = await fetch(urlApi, {
            headers: {
                'x-api-key': API_KEY
            }
        });
        const data = await response.json();
        
        if(response.status !== 200) {
            randomError.innerText = `Hubo un error ${response.status}`;
            return;
        }

        const dogImg1 = document.getElementById('random-img1');
        const dogImg2 = document.getElementById('random-img2');

        if(data.length > 0) dogImg1.src = data[0].url;
        if(data.length > 1) dogImg2.src = data[1].url;

    } catch (error) {
        randomError.innerText = `Hubo un error: ${error.message}`;
    }
}

async function loadFavoritesDogs() {
    try {
        const response = await fetch(FAVOURITES, {
            headers: {
                'x-api-key': API_KEY
            }
        });
        const data = await response.json();

        if(response.status !== 200) {
            randomError.innerText = `There are an error ${response.status}: ${data.message}`;
            return;
        }

        console.log(data);
    } catch (error) {
        randomError.innerText = `Hubo un error: ${error.message}`;
    }
}

async function saveFavouriteDogs(){
    const response = await fetch(FAVOURITES, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY
        },
        body: JSON.stringify({
          image_id: 'dje' // Id of dog to save
        }),
    })
    const data = await response.json();
    if(response.status !== 200){
        randomError.innerText = `Hubo un error ${response.status}: ${data.message}`;
    }
}

loadRandomDogs(API);

const dogRandomButton = document.querySelector('.dog-button');
dogRandomButton.addEventListener('click', () => loadRandomDogs(API));



