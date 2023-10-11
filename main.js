const API_KEY = 'live_4HbFHf3sbc7Vt4Ort9m5sntl0MFo8QnfOazYLAC3xP8znArBVBTNpPY7RlxiQ5NW';
const API = 'https://api.thedogapi.com/v1/images/search?limit=2';
const FAVOURITES = 'https://api.thedogapi.com/v1/favourites';
const UPLOAD = 'https://api.thedogapi.com/v1/images/upload';
const FAVOURITES_DELETE = (id) => `https://api.thedogapi.com/v1/favourites/${id}`;

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
        const btn1 = document.getElementById('save-dog1');
        const btn2 = document.getElementById('save-dog2');

        if(data.length > 0) dogImg1.src = data[0].url;
        if(data.length > 1) dogImg2.src = data[1].url;

        btn1.onclick = () => saveFavouriteDogs(data[0].id);
        btn2.onclick = () => saveFavouriteDogs(data[1].id);

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
        }else{
            const section = document.getElementById('favorites-dogs');
            section.innerHTML = "";
            data.forEach(dog => {
                const article = document.createElement('article');
                const img = document.createElement('img');
                const btn = document.createElement('button');
                const btnText = document.createTextNode('❌');

                img.src = dog.image.url;
                img.width = 150;
                btn.appendChild(btnText);
                btn.onclick = () => deleteFavouriteDog(dog.id);
                article.appendChild(img);
                article.appendChild(btn);
                section.appendChild(article);
            })
        }

    } catch (error) {
        randomError.innerText = `Hubo un error: ${error.message}`;
    }
}

async function saveFavouriteDogs(id){
    const response = await fetch(FAVOURITES, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY
        },
        body: JSON.stringify({
          image_id: id // Id of dog to save
        }),
    })
    const data = await response.json();
    console.log('Save')
    console.log(response)

    if(response.status !== 200){
        randomError.innerText = `Hubo un error ${response.status}: ${data.message}`;
    }else{
        console.log('dog save');
        loadFavoritesDogs();
    }
}

async function deleteFavouriteDog(id){
    const response = await fetch(FAVOURITES_DELETE(id), {
        method: 'DELETE',
        headers: {
            'x-api-key': API_KEY
        },
    })
    const data = await response.json();
    console.log('Delete')
    console.log(response)

    if(response.status !== 200){
        randomError.innerText = `Hubo un error ${response.status}: ${data.message}`;
    }else{
        console.log('dog delete');
        loadFavoritesDogs();
    }
}

async function uploadDogPhoto(){
    const form = document.getElementById('upload-form');
    const formData = new FormData(form);
    console.log(formData.get('file'));

    const response = await fetch(UPLOAD, {
        method: 'POST',
        headers: {
            'x-api-key': API_KEY,
        },
         body: formData,
    });
    const data = await response.json();
    if(response.status !== 201){
        randomError.innerText = `Hubo un error ${response.status}: ${data.message}`;
    }else{
        console.log({ data });
        console.log(data.url);
        saveFavouriteDogs(data.id);
        loadFavoritesDogs();
        let labelChoose = document.querySelector('label[for="file"]');
        labelChoose.textContent = 'Choose a file';
    }
}

document.getElementById('file').addEventListener('change', function() {
    let label = document.querySelector('label[for="file"]');
    if (this.files.length > 0) {
        var fileName = this.files[0].name;  // Obtener el nombre del archivo seleccionado
        label.textContent = fileName;  // Actualizar el texto de la etiqueta con el nombre del archivo
    } else {
        label.textContent = 'Choose a file';  // Resetear al texto por defecto si no hay archivo seleccionado
    }
});


loadRandomDogs(API);
loadFavoritesDogs();
const dogRandomButton = document.querySelector('.dog-button');
dogRandomButton.addEventListener('click', () => loadRandomDogs(API));



