const monsters = [

{
name:"Siren Head",
category:"Internet Horror",
threat:"🔴 Extreme",
image:"https://placehold.co/400x500/161B22/D32F2F?text=Siren+Head"
},

{
name:"Slender Man",
category:"Creepypasta",
threat:"🔴 High",
image:"https://placehold.co/400x500/161B22/D32F2F?text=Slender+Man"
},

{
name:"Xenomorph",
category:"Movies",
threat:"🔴 Extreme",
image:"https://placehold.co/400x500/161B22/D32F2F?text=Xenomorph"
},

{
name:"Bigfoot",
category:"Cryptid",
threat:"🟠 Unknown",
image:"https://placehold.co/400x500/161B22/D32F2F?text=Bigfoot"
}

];

const grid = document.querySelector(".monster-grid");

monsters.forEach(monster=>{

grid.innerHTML += `

<div class="card">

<img src="${monster.image}" alt="${monster.name}">

<div class="card-content">

<h3>${monster.name}</h3>

<p>${monster.category}</p>

<p>${monster.threat}</p>

<a href="#" class="button">View File</a>

</div>

</div>

`;

});
