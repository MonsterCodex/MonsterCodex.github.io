const grid=document.querySelector(".monster-grid");
const search=document.getElementById("search");
const results=document.getElementById("search-results");
const categories=document.querySelectorAll(".category");

let currentCategory="All";

function createCard(monster){

return `
<div class="card">
<img src="${monster.image}" alt="${monster.name}">
<div class="card-content">
<h3>${monster.name}</h3>
<p>${monster.category}</p>
<span class="threat ${monster.threat.toLowerCase()}">${monster.threat}</span>
<a href="monster.html?id=${monster.id}" class="button">View Profile →</a>
</div>
</div>
`;

}

function displayMonsters(list){

grid.innerHTML="";

if(list.length===0){

grid.innerHTML=`
<div style="grid-column:1/-1;text-align:center;padding:60px;">
<h2>No monsters found</h2>
<p>Try another search.</p>
</div>
`;

return;

}

list.forEach(monster=>{
grid.innerHTML+=createCard(monster);
});

}

function showDropdown(list){

results.innerHTML="";

if(search.value.trim()===""||list.length===0){

results.style.display="none";
return;

}

list.slice(0,6).forEach(monster=>{

results.innerHTML+=`
<div class="search-item" data-id="${monster.id}">
<img src="${monster.image}" alt="${monster.name}">
<div>
<h4>${monster.name}</h4>
<p>${monster.category}</p>
</div>
</div>
`;

});

results.style.display="block";

document.querySelectorAll(".search-item").forEach(item=>{

item.addEventListener("click",()=>{

window.location.href=`monster.html?id=${item.dataset.id}`;

});

});

}

function filterMonsters(){

const term=search.value.toLowerCase().trim();

let filtered=monsters.filter(monster=>{

const text=[
monster.name,
monster.category,
monster.creator,
monster.universe,
monster.description,
...(monster.abilities||[]),
...(monster.weaknesses||[])
].join(" ").toLowerCase();

const matchesSearch=text.includes(term);

const matchesCategory=currentCategory==="All"||monster.category===currentCategory;

return matchesSearch&&matchesCategory;

});

displayMonsters(filtered);

showDropdown(filtered);

}

displayMonsters(monsters);

search.addEventListener("input",filterMonsters);

search.addEventListener("keydown",e=>{

if(e.key==="Enter"){

const first=document.querySelector(".search-item");

if(first){

window.location.href=`monster.html?id=${first.dataset.id}`;

}

}

});

search.addEventListener("focus",()=>{

if(search.value.trim()!==""){

filterMonsters();

}

});

document.addEventListener("click",e=>{

if(!e.target.closest(".search-container")){

results.style.display="none";

}

});

categories.forEach(category=>{

category.addEventListener("click",()=>{

categories.forEach(c=>c.classList.remove("active"));

category.classList.add("active");

currentCategory=category.dataset.category;

filterMonsters();

});

});

const randomButton=document.getElementById("random-monster");

const encounter=document.getElementById("encounter-screen");

if(randomButton){

randomButton.addEventListener("click",e=>{

e.preventDefault();

const random=monsters[Math.floor(Math.random()*monsters.length)];

encounter.style.display="flex";

setTimeout(()=>{

window.location.href=`monster.html?id=${random.id}`;

},2000);

});

}