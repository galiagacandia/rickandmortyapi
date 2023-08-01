

async function getPageCharacter(url, page) {
    try {
        const response = await fetch(url + page);
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

async function getPageCharacterList(page) {
    const apiUrl = "https://rickandmortyapi.com/api/character/?page=";
    const dataCharacters = await getPageCharacter(apiUrl, page);

    let containerDom = document.getElementById("container");

    if(dataCharacters && dataCharacters.results) {
        containerDom.innerHTML='';
        dataCharacters.results.forEach(character => {
            const characterArticleDom = document.createElement("article");
            characterArticleDom.classList.add('card');
            characterArticleDom.innerHTML=`
                <section class="card_face card_face_front">
                    <img src="${character.image}" alt="${character.name}" />
                    <label>${character.name}</label>
                </section>
                <section class="card_face card_face_back">
                    <label>${character.name}</label>
                    <br /><br />
                    <p><b>Species:</b> ${character.species}</p>
                    <p><b>Gender:</b> ${character.gender}</p>
                    <p><b>Type:</b> ${character.type}</p>
                    <p><b>Origin:</b> ${character.origin.name}</p>
                </section>
            `;
            characterArticleDom.addEventListener('click', () => characterArticleDom.classList.toggle('is_flipped'));
            containerDom.appendChild(characterArticleDom);
        });
    }
}


let page = 1;
let totalPages = 42;
getPageCharacterList(page);

let prevButtonDom = document.getElementById("button_prev");
let nextButtonDom = document.getElementById("button_next");

prevButtonDom.addEventListener('click', () => {
    if(page > 1) {
        page--;
        getPageCharacterList(page)
    }
});

nextButtonDom.addEventListener('click', () => {
    if(page >= 1 && page <= totalPages) {
        page++;
        getPageCharacterList(page)
    }
});







