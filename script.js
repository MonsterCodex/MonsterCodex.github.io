const grid=document.querySelector(".monster-grid");
const search=document.getElementById("search");
const results=document.getElementById("search-results");
const categories=document.querySelectorAll(".category");

const clickSound = new Audio("assets/sounds/click.mp3");
const scanSound = new Audio("assets/sounds/scan.mp3");
const eyeScream = new Audio("assets/sounds/monster-scream.mp3");

const revealSound = new Audio("assets/sounds/reveal.mp3");

const keySounds = [
    new Audio("assets/sounds/key1.mp3"),
    new Audio("assets/sounds/key2.mp3"),
    new Audio("assets/sounds/key3.mp3"),
    new Audio("assets/sounds/key4.mp3")
];



clickSound.volume = 0.4;
scanSound.volume = 0.25;
eyeScream.volume = 0.25;
revealSound.volume = 0.5;

keySounds.forEach(sound => sound.volume = 0.15);


let currentCategory="All";

let currentPage = 1;
const monstersPerPage = 12;


const categoryIcons = {
    Games: "🎮",
    Movies: "🎬",
    Television: "📺",
    "Internet Horror": "👻",
    Creepypasta: "📖",
    Cryptids: "🐺",
    Folklore: "🧙",
    Aliens: "👽"
};


function createCard(monster){

return `
<a href="monster.html?id=${monster.id}" class="card-link">

<div class="card">

<img src="${monster.image}" alt="${monster.name}">

<div class="card-content">

<h3>${monster.name}</h3>

<p>
${categoryIcons[monster.category] || "🌍"} ${monster.universe}
</p>

<p>✍️ ${monster.creator}</p>

<span class="threat ${monster.threat.toLowerCase()}">
${monster.threat}
</span>

<div class="button">
View Profile →
</div>

</div>

</div>

</a>
`;

}


/* ==================================================
   DISPLAY MONSTERS
================================================== */

function displayMonsters(list) {

    grid.innerHTML = "";

    if(currentPage < 1){
        currentPage = 1;
    }


    /*
    HOMEPAGE

    Show ALL monsters instead of one random monster
    from each category.
    */

    if (currentCategory === "All" && search.value.trim() === "") {

        list = monsters;

    }


    /* No results */

    if (list.length === 0) {

        grid.innerHTML = `
        <div style="grid-column:1/-1;text-align:center;padding:60px;">
            <h2>No monsters found</h2>
            <p>Try another search.</p>
        </div>
        `;

        updatePagination(0);

        return;

    }


    /* PAGINATION */

    const start = (currentPage - 1) * monstersPerPage;

    const end = start + monstersPerPage;

    const pageItems = list.slice(start, end);


    pageItems.forEach(monster=>{

        grid.innerHTML += createCard(monster);

    });


    updatePagination(list.length);

}


/* ==================================================
   SEARCH DROPDOWN
================================================== */

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


/* ==================================================
   FILTER MONSTERS
================================================== */

function filterMonsters(resetPage = true){

    if(resetPage){

        currentPage = 1;

    }


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

const matchesCategory=
    currentCategory==="All" ||
    monster.category===currentCategory;


return matchesSearch&&matchesCategory;

});


displayMonsters(filtered);

showDropdown(filtered);

}


/* ==================================================
   INITIAL DISPLAY
================================================== */

displayMonsters(monsters);

search.addEventListener("input", filterMonsters);


/* ==================================================
   SEARCH KEYBOARD SOUNDS
================================================== */

search.addEventListener("keydown", function(e){

    if(![
        "Shift",
        "Control",
        "Alt",
        "Meta",
        "CapsLock",
        "Tab",
        "Escape",
        "ArrowLeft",
        "ArrowRight",
        "ArrowUp",
        "ArrowDown"
    ].includes(e.key)){

        const sound = keySounds[
            Math.floor(Math.random() * keySounds.length)
        ].cloneNode();

        sound.volume = 0.15;

        sound.play().catch(()=>{});

    }


    if(e.key === "Enter"){

        const first = document.querySelector(".search-item");

        if(first){

            const sound = clickSound.cloneNode();

            sound.volume = clickSound.volume;

            sound.play().catch(()=>{});


            setTimeout(() => {

                window.location.href =
                    `monster.html?id=${first.dataset.id}`;

            },120);

        }

    }

});


/* ==================================================
   SEARCH FOCUS
================================================== */

search.addEventListener("focus",()=>{

    if(search.value.trim()!==""){

        filterMonsters();

    }

});


/* ==================================================
   CLOSE SEARCH DROPDOWN
================================================== */

document.addEventListener("click",e=>{

    if(!e.target.closest(".search-container")){

        results.style.display="none";

    }

});


/* ==================================================
   CATEGORY FILTERING
================================================== */

categories.forEach(category=>{

    category.addEventListener("click",()=>{

        categories.forEach(c=>c.classList.remove("active"));

        category.classList.add("active");

        currentCategory=category.dataset.category;

        filterMonsters();

    });

});


/* ==================================================
   RANDOM ENCOUNTER
================================================== */

const randomButton = document.getElementById("random-monster");
const encounter = document.getElementById("encounter-screen");
const encounterText = document.getElementById("encounter-text");
const encounterImage = document.getElementById("encounter-image");
const encounterName = document.getElementById("encounter-name");
const encounterButton = document.getElementById("encounter-button");
const loadingFill = document.querySelector(".loading-fill");
const scanPercent = document.getElementById("scan-percent");


const encounterMessages = [

    "🔒 Accessing secure database...",
    "🛰️ Scanning classified archives...",
    "📡 Searching known universes...",
    "🧬 Analysing lifeform...",
    "⚠️ Threat signature detected...",
    "👁️ Identity confirmed..."

];


/* ---------- RANDOM ENCOUNTER ---------- */

if(randomButton){

    randomButton.addEventListener("click",function(e){

        e.preventDefault();


        clickSound.cloneNode().play().catch(()=>{});


        scanSound.currentTime=0;

        scanSound.play().catch(()=>{});


        const random=
            monsters[
                Math.floor(
                    Math.random()*monsters.length
                )
            ];


        encounter.style.display="flex";


        encounterImage.style.display="none";

        encounterName.style.display="none";

        encounterButton.style.display="none";


        loadingFill.style.animation="none";

        loadingFill.offsetHeight;

        loadingFill.style.animation=
            "loading 3s linear forwards";


        let i=0;


        encounterText.textContent=
            encounterMessages[0];


        const messageTimer=setInterval(()=>{

            i++;


            if(i<encounterMessages.length){

                encounterText.textContent=
                    encounterMessages[i];

            }

        },600);


        scanPercent.textContent="0%";


        let percent=0;


        const percentTimer=setInterval(()=>{

            if(percent<100){

                percent+=
                    Math.floor(Math.random()*6)+2;


                if(percent>100){

                    percent=100;

                }


                scanPercent.textContent=
                    percent+"%";


                return;

            }


            clearInterval(percentTimer);

            clearInterval(messageTimer);


            encounterText.textContent=
                "ACCESS GRANTED";


            scanPercent.textContent="100%";


            setTimeout(()=>{

                encounterText.textContent=
                    "CLASSIFIED FILE LOCATED";


                scanSound.pause();

                scanSound.currentTime=0;


                revealSound.currentTime=0;

                revealSound.play().catch(()=>{});


                encounterImage.src=random.image;

                encounterImage.alt=random.name;

                encounterImage.style.display="block";


                encounterName.textContent=random.name;

                encounterName.style.display="block";


                encounterButton.style.display="inline-block";


                encounterButton.onclick=function(){

                    encounter.style.display="none";

                    window.location.href=
                        `monster.html?id=${random.id}`;

                };


            },800);


        },180);

    });

}


/* ==================================================
   GLOBAL CLICK SOUNDS
================================================== */

document.addEventListener("pointerdown",function(e){

    const clickable=e.target.closest(
        "a,.button,.category,.search-item,button,.threat"
    );


    if(!clickable) return;


    clickSound.cloneNode().play().catch(()=>{});

});


/* ==================================================
   MONSTER EYES
================================================== */

const eyes = document.querySelector(".monster-eyes");


if(eyes){

    let canPlay = true;


    eyes.addEventListener("mouseenter",()=>{

        if(!canPlay) return;


        eyeScream.currentTime = 0;

        eyeScream.play().catch(()=>{});


        document
            .querySelector(".logo")
            .classList
            .add("monster-awake");


        canPlay = false;

    });


    eyes.addEventListener("mouseleave",()=>{

        document
            .querySelector(".logo")
            .classList
            .remove("monster-awake");


        canPlay = true;

    });

}


/* ==================================================
   PAGINATION
================================================== */

function updatePagination(total){

    const totalPages =
        Math.max(
            1,
            Math.ceil(total / monstersPerPage)
        );


    const pageInfo =
        document.getElementById("page-info");


    const previousButton =
        document.getElementById("prev-page");


    const nextButton =
        document.getElementById("next-page");


    /*
    Make sure the current page can never
    go beyond the available pages.
    */

    if(currentPage > totalPages){

        currentPage = totalPages;

    }


    if(pageInfo){

        pageInfo.textContent =
            `Page ${currentPage} of ${totalPages}`;

    }


    if(previousButton){

        previousButton.disabled =
            currentPage === 1;

    }


    if(nextButton){

        nextButton.disabled =
            currentPage >= totalPages ||
            total === 0;

    }

}


/* ==================================================
   PREVIOUS PAGE
================================================== */

const previousPageButton =
    document.getElementById("prev-page");


if(previousPageButton){

    previousPageButton.addEventListener("click",()=>{

        if(currentPage > 1){

            currentPage--;

            filterMonsters(false);

        }

    });

}


/* ==================================================
   NEXT PAGE
================================================== */

const nextPageButton =
    document.getElementById("next-page");


if(nextPageButton){

    nextPageButton.addEventListener("click",()=>{

        const term =
            search.value.toLowerCase().trim();


        const filtered =
            monsters.filter(monster=>{

                const text=[

                    monster.name,
                    monster.category,
                    monster.creator,
                    monster.universe,
                    monster.description,
                    ...(monster.abilities||[]),
                    ...(monster.weaknesses||[])

                ].join(" ").toLowerCase();


                const matchesSearch =
                    text.includes(term);


                const matchesCategory =
                    currentCategory==="All" ||
                    monster.category===currentCategory;


                return matchesSearch &&
                       matchesCategory;

            });


        const totalPages =
            Math.ceil(
                filtered.length /
                monstersPerPage
            );


        if(currentPage < totalPages){

            currentPage++;

            filterMonsters(false);

        }

    });

}