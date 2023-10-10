const API = 'https://api.thedogapi.com/v1/images/search?limit=3&api_key=live_EcXKvj1wjgx3bJKWy3DYAurrVwz1YpyDYoFwwtJzssg59HJC6eMwmBrQj9udNPow';

async function fetchData(urlApi) {
    const response = await fetch(urlApi);
    const data = await response.json();
    const dogImg1 = document.getElementById('img1');
    const dogImg2 = document.getElementById('img2');
    const dogImg3 = document.getElementById('img3');
    dogImg1.src = data[0].url;
    dogImg2.src = data[1].url;
    dogImg3.src = data[2].url;
}

fetchData(API);
const dogButton = document.querySelector('.dog-button');
dogButton.addEventListener('click', ()=> fetchData(API));
