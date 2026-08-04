const monsters = {

"siren-head":{

name:"Siren Head",

category:"Internet Horror",

creator:"Trevor Henderson",

year:"2018",

threat:"🔴 Extreme",

status:"Active",

image:"https://placehold.co/500x700/111111/990000?text=Siren+Head",

description:"Siren Head is a gigantic humanoid entity with two sirens where its head should be. It mimics voices and emergency broadcasts to lure victims.",

abilities:[
"Voice Mimicry",
"Extreme Height",
"Super Strength",
"Camouflage",
"Long Distance Sound Projection"
]

},

"xenomorph":{

name:"Xenomorph",

category:"Movies",

creator:"H. R. Giger",

year:"1979",

threat:"🔴 Extreme",

status:"Active",

image:"https://placehold.co/500x700/111111/990000?text=Xenomorph",

description:"The Xenomorph is an extraterrestrial lifeform featured in the Alien franchise.",

abilities:[
"Acid Blood",
"Stealth",
"Climbing",
"Extreme Speed"
]

}

};

const params = new URLSearchParams(window.location.search);

const id = params.get("id");

const monster = monsters[id];

if(monster){

document.getElementById("monster-name").textContent=monster.name;

document.getElementById("monster-category").textContent=monster.category;

document.getElementById("monster-creator").textContent=monster.creator;

document.getElementById("monster-year").textContent=monster.year;

document.getElementById("monster-threat").textContent=monster.threat;

document.getElementById("monster-status").textContent=monster.status;

document.getElementById("monster-description").textContent=monster.description;

document.getElementById("monster-image").src=monster.image;

const list=document.getElementById("monster-abilities");

monster.abilities.forEach(ability=>{

const li=document.createElement("li");

li.textContent=ability;

list.appendChild(li);

});

}
