const params=new URLSearchParams(window.location.search);
const id=params.get("id");
const monster=monsters.find(m=>m.id===id);

const clickSound = new Audio("assets/sounds/click.mp3");
clickSound.volume = 0.4;

function getAbilityIcon(ability){

const text=ability.toLowerCase();

if(text.includes("strength")) return "💪";
if(text.includes("speed")) return "⚡";
if(text.includes("voice")) return "🎭";
if(text.includes("mimic")) return "🎭";
if(text.includes("hearing")) return "👂";
if(text.includes("sound")) return "🔊";
if(text.includes("camouflage")) return "👁";
if(text.includes("stealth")) return "🥷";
if(text.includes("telepathy")) return "🧠";
if(text.includes("mind")) return "🧠";
if(text.includes("shape")) return "🌫";
if(text.includes("regeneration")) return "🦴";
if(text.includes("heal")) return "🩹";
if(text.includes("climb")) return "🕷";
if(text.includes("fire")) return "🔥";
if(text.includes("ice")) return "❄";
if(text.includes("poison")) return "☠";
if(text.includes("acid")) return "🧪";
if(text.includes("electric")) return "⚡";
if(text.includes("lightning")) return "⚡";
if(text.includes("flight")) return "🪽";
if(text.includes("fly")) return "🪽";
if(text.includes("teleport")) return "🌀";
if(text.includes("invisible")) return "👻";
if(text.includes("fear")) return "😱";
if(text.includes("bite")) return "🦷";
if(text.includes("claw")) return "🐾";
if(text.includes("tentacle")) return "🐙";
if(text.includes("water")) return "🌊";
if(text.includes("plant")) return "🌿";
if(text.includes("magic")) return "✨";
if(text.includes("curse")) return "🔮";

return "⭐";

}

function getWeaknessIcon(weakness){

const text=weakness.toLowerCase();

if(text.includes("fire")) return "🔥";
if(text.includes("light")) return "☀";
if(text.includes("sun")) return "☀";
if(text.includes("silver")) return "🥈";
if(text.includes("holy")) return "✝";
if(text.includes("water")) return "💧";
if(text.includes("cold")) return "❄";
if(text.includes("ice")) return "❄";
if(text.includes("sound")) return "🔊";
if(text.includes("electric")) return "⚡";
if(text.includes("magic")) return "✨";
if(text.includes("human")) return "🧍";
if(text.includes("unknown")) return "❓";

return "⚠";

}

if(!monster){

document.getElementById("monster-name").textContent="Monster Not Found";

}else{

document.getElementById("monster-name").textContent=monster.name||"Unknown";
document.getElementById("monster-description").textContent=monster.description||"No description available.";

const image=document.getElementById("monster-image");
image.src=monster.image;
image.alt=monster.name;

document.getElementById("monster-creator").textContent=monster.creator||"Unknown";
document.getElementById("monster-year").textContent=monster.firstAppearance||monster.year||"Unknown";
document.getElementById("monster-universe").textContent=monster.universe||"Unknown";
document.getElementById("monster-origin").textContent=monster.origin||"Unknown";
document.getElementById("monster-height").textContent=monster.height||"Unknown";
document.getElementById("monster-weight").textContent=monster.weight||"Unknown";
document.getElementById("monster-status").textContent=monster.status||"Unknown";
document.getElementById("monster-alignment").textContent=monster.alignment||"Unknown";

const threat=document.getElementById("monster-threat");
threat.textContent=monster.threat||"Unknown";
threat.className="threat";

if(monster.threat){

const level=monster.threat.toLowerCase();

if(level.includes("extreme")) threat.classList.add("extreme");
else if(level.includes("high")) threat.classList.add("high");
else if(level.includes("medium")) threat.classList.add("medium");
else if(level.includes("low")) threat.classList.add("low");
else threat.classList.add("unknown");

}

const abilities=document.getElementById("monster-abilities");
abilities.innerHTML="";

if(monster.abilities?.length){

monster.abilities.forEach(ability=>{

const li=document.createElement("li");

li.innerHTML=`
<span class="ability-icon">${getAbilityIcon(ability)}</span>
<span>${ability}</span>
`;

abilities.appendChild(li);

});

}else{

abilities.innerHTML=`
<li>
<span class="ability-icon">❓</span>
<span>Unknown</span>
</li>
`;

}

const weaknesses=document.getElementById("monster-weaknesses");
weaknesses.innerHTML="";

if(monster.weaknesses?.length){

monster.weaknesses.forEach(weakness=>{

const li=document.createElement("li");

li.innerHTML=`
<span class="weakness-icon">${getWeaknessIcon(weakness)}</span>
<span>${weakness}</span>
`;

weaknesses.appendChild(li);

});

}else{

weaknesses.innerHTML=`
<li>
<span class="weakness-icon">❓</span>
<span>Unknown</span>
</li>
`;

}

const related=document.getElementById("related-monsters");

if(related){

const relatedMonsters=monsters.filter(m=>
m.id!==monster.id&&
m.category===monster.category
).slice(0,4);

related.innerHTML="";

if(relatedMonsters.length===0){

related.innerHTML="<p>No related monsters found.</p>";

}else{

    

relatedMonsters.forEach(m=>{

related.innerHTML+=`
<div class="related-card">

<a href="monster.html?id=${m.id}">

<img src="${m.image}" alt="${m.name}">

<h3>${m.name}</h3>

<p>${m.category}</p>

</a>

</div>
`;

});

}

}

}

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

document.addEventListener("click", function(e){

    const link = e.target.closest("a");

    if(!link) return;

    // Don't intercept anchors or JavaScript links
    const href = link.getAttribute("href");

    if(!href || href.startsWith("#") || href.startsWith("javascript:")){
        return;
    }

    e.preventDefault();

    const sound = clickSound.cloneNode();
    sound.volume = clickSound.volume;

    sound.play().catch(()=>{});

    setTimeout(() => {
        window.location.href = href;
    }, 100);

});