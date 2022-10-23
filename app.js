const allTabsBody = document.querySelectorAll('.tab-body-single');
const allTabsHead = document.querySelectorAll('.tab-head-single');
const searchForm = document.querySelector('.app-header-search');
const previous = document.getElementById('previous');
const after = document.getElementById('after');
let searchList = document.getElementById('search-list');


//token = 5889658271068532
let activeTab = 1, allData, count=1, dataID;

const init = () => {
    showActiveTabBody();
    showActiveTabHead();
}

const showActiveTabHead = () => allTabsHead[activeTab - 1].classList.add('active-tab');

const showActiveTabBody = () => {
    hideAllTabBody();
    allTabsBody[activeTab - 1].classList.add('show-tab');
}

const hideAllTabBody = () => allTabsBody.forEach(singleTabBody => singleTabBody.classList.remove('show-tab'));
const hideAllTabHead = () => allTabsHead.forEach(singleTabHead => singleTabHead.classList.remove('active-tab'));

// even listeners
window.addEventListener('DOMContentLoaded', () => init());
// button event listeners
allTabsHead.forEach(singleTabHead => {
    singleTabHead.addEventListener('click', () => {
        hideAllTabHead();
        activeTab = singleTabHead.dataset.id;
        showActiveTabHead();
        showActiveTabBody();
    });
});

const getInputValue = (event) => {
    event.preventDefault();
    let searchText = searchForm.search.value;
    fetchAllSuperHero(searchText);
}

// search form submission
searchForm.addEventListener('submit', getInputValue);

// api key => 727054372039115
const fetchAllSuperHero = async(searchText) => {
    let url = `https://www.superheroapi.com/api.php/5889658271068532/search/${searchText}`;
    try{
        const response = await fetch(url);
        allData = await response.json();
        if(allData.response === 'success'){
            showSearchList(allData.results);
        }
    } catch(error){
        console.log(error);
    }
}

const showSearchList = (data) => {
    searchList.innerHTML = "";
    data.forEach(dataItem => {
        const divElem = document.createElement('div');
        divElem.classList.add('search-list-item');
        divElem.innerHTML = `
            <img src = "${dataItem.image.url ? dataItem.image.url : ""}" alt = "">
            <p data-id = "${dataItem.id}">${dataItem.name}</p>
        `;
        searchList.appendChild(divElem);
    });
}

searchForm.search.addEventListener('keyup', () => {
    if(searchForm.search.value.length > 1){
        fetchAllSuperHero(searchForm.search.value);
    } else {
        searchList.innerHTML = "";
    }
});

searchList.addEventListener('click', (event) => {
    let searchId = event.target.dataset.id;
    //console.log(searchId);
    //console.log(count);
    //console.log(typeof(searchId));
    let singleData = allData.results.filter(singleData => {
        console.log(typeof(singleData.id));
        return searchId === singleData.id;
    })
    console.log(singleData);
    let i = Number(searchId);
    //console.log(typeof(i));
    count=i;
    //console.log(count);
    showSuperheroDetails(singleData);
    searchList.innerHTML = "";
});

const selectById =  async(count) =>{
    //https://www.superheroapi.com/api.php/5889658271068532/
    const singleData = [];
    let url = `https://www.superheroapi.com/api.php/5889658271068532/${count}`;
    singleData.push(fetch(url).then((res) => res.json()));
    Promise.all(singleData).then((results) => {
        
        showSuperheroDetails(results);
    });
    //console.log(singleData);
    //showSuperheroDetails(singleData);
    //searchList.innerHTML = "";
};

selectById(count);


previous.addEventListener('click', () =>{
    if (count >1){
        count = count-1;
    }
    else{
        count =731;
    }
    selectById(count);
})

after.addEventListener('click', () =>{
    if (count <731){
        count = count+1;
    }
    else{
        count =1;
    }
    selectById(count);
})




const showSuperheroDetails = (data) => {
    //console.log(data);
    //console.log(data[0].id);
    document.querySelector('.app-body-content-thumbnail').innerHTML = `
        <img src = "${data[0].image.url}">
    `;

    document.querySelector('.name').textContent = data[0].id + " " + data[0].name;
    document.querySelector('.powerstats').innerHTML = `
    <li>
        <span>Full name: </span>
        <span>${data[0].biography['full-name']}</span>
    </li>
    <li>
        <span> <b> PowerStats </b></span>
    <li>
        <div>
            <i class = "fa-solid fa-shield-halved"></i>
            <span>Intelligence: </span>
        </div>
        <span>${data[0].powerstats.intelligence}</span>
    </li>
    <li>
        <div>
            <i class = "fa-solid fa-shield-halved"></i>
            <span>Strength: </span>
        </div>
        <span>${data[0].powerstats.strength}</span>
    </li>
    <li>
        <div>
            <i class = "fa-solid fa-shield-halved"></i>
            <span>Speed: </span>
        </div>
        <span>${data[0].powerstats.speed}</span>
    </li>
    <li>
        <div>
            <i class = "fa-solid fa-shield-halved"></i>
            <span>Durability: </span>
        </div>
        <span>${data[0].powerstats.durability}</span>
    </li>
    <li>
        <div>
            <i class = "fa-solid fa-shield-halved"></i>
            <span>Power: </span>
        </div>
        <span>${data[0].powerstats.power}</span>
    </li>
    <li>
        <div>
            <i class = "fa-solid fa-shield-halved"></i>
            <span>Combat: </span>
        </div>
        <span>${data[0].powerstats.combat}</span>
    </li>
    <li>
        <span>Place of birth:</span>
        <span>${data[0].biography['place-of-birth']}</span>
    </li>
    <li>
        <span> <b> Small Biography </b></span>
    <li>
    <li>
        <span>Alert egos: </span>
        <span>${data[0].biography['alter-egos']}</span>
    </li>
    <li>
        <span>First apperance: </span>
        <span>${data[0].biography['first-appearance']}</span>
    </li>
    <li>
        <span>Publisher: </span>
        <span>${data[0].biography['publisher']}</span>
    </li>
    <li>
        <span>Aliases: </span>
        <span>${data[0].biography['aliases']}</span>
    </li>
    <li>
        <span> <i class = "fas fa-star"></i> Gender: </span>
        <span>${data[0].appearance['gender']}</span>
    </li>
    <li>
        <span> <i class = "fas fa-star"></i> Race: </span>
        <span>${data[0].appearance['race']}</span>
    </li>
    <li>
        <span> <i class = "fas fa-star"></i> Height: </span>
        <span>${data[0].appearance['height'][0]}</span>
    </li>
    <li>
        <span> <i class = "fas fa-star"></i> Weight: </span>
        <span>${data[0].appearance['weight'][0]}</span>
    </li>
    <li>
        <span> <i class = "fas fa-star"></i> Eye-color: </span>
        <span>${data[0].appearance['eye-color']}</span>
    </li>
    <li>
        <span> <i class = "fas fa-star"></i> Hair-color: </span>
        <span>${data[0].appearance['hair-color']}</span>
    </li>

    <li>
        <span> <i class = "fas fa-star"></i> Group affiliation: </span>
        <span>${data[0].connections['group-affiliation']}</span>
    </li>
    `;
}