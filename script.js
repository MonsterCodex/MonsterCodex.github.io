const grid = document.querySelector(".monster-grid");
const search = document.getElementById("search");
const results = document.getElementById("search-results");


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


let currentCategory = "All";
let currentType = "All";

let currentPage = 1;
const monstersPerPage = 12;


/* ==================================================
   CATEGORY SYSTEM
================================================== */

const categoryIcons = {

    Movies: "🎬",
    Games: "🎮",
    Television: "📺",
    Folklore: "🧙",
    Mythology: "🏛️",
    Creepypasta: "👻",
    Aliens: "👽"
};


const mainCategories = [
    {
        name: "All",
        label: "All Entries",
        icon: "🌍"
    },
    {
        name: "Movies",
        label: "Movies",
        icon: "🎬"
    },
    {
        name: "Games",
        label: "Games",
        icon: "🎮"
    },
    {
        name: "Television",
        label: "Television",
        icon: "📺"
    },
    {
    name: "Folklore",
    label: "Folklore",
    icon: "🧙"
},
{
    name: "Mythology",
    label: "Mythology",
    icon: "🏛️"
},
    {
        name: "Creepypasta",
        label: "Creepypasta",
        icon: "👻"
    },
    {
        name: "Aliens",
        label: "Aliens",
        icon: "👽"
    }
];


/*
    Known alien monsters.

    These can stay marked as Movies in data.js.
    This script will automatically place them
    into the Aliens category.
*/

const alienMonsterIds = new Set([
    "xenomorph",
    "predator",
    "alien-queen",
    "facehugger",
    "chestburster",
    "the-blob"
]);


/*
    Convert your old categories into the
    new MonsterCodex structure.
*/

function getCategory(monster) {

    const id = String(monster.id || "").toLowerCase();
    const oldCategory = String(monster.category || "").trim();


    /* Known alien monsters */

    if (alienMonsterIds.has(id)) {
        return "Aliens";
    }


    /* Existing categories */

    if (oldCategory === "Movies") {
        return "Movies";
    }

    if (oldCategory === "Games") {
        return "Games";
    }

    if (oldCategory === "Television") {
        return "Television";
    }

    if (oldCategory === "Aliens") {
        return "Aliens";
    }


    /*
        SCP goes under Games.
    */

    if (oldCategory === "SCP") {
        return "Games";
    }


    /*
        Internet Horror goes under Creepypasta.
    */

    if (oldCategory === "Internet Horror") {
        return "Creepypasta";
    }


    /*
        Existing Creepypasta stays Creepypasta.
    */

    if (oldCategory === "Creepypasta") {
        return "Creepypasta";
    }


    /*
        Folklore becomes Folklore / Mythological.
    */

    if (oldCategory === "Folklore") {
    return "Folklore";
}

if (oldCategory === "Mythology") {
    return "Mythology";
}


    /*
        Anything else that is obviously an alien
        by category also goes to Aliens.
    */

    if (
        oldCategory.toLowerCase().includes("alien")
    ) {
        return "Aliens";
    }


    /*
        Safe fallback.
    */

    return oldCategory;

}


/* ==================================================
   CREATE MAIN CATEGORY BUTTONS
================================================== */

function createMainCategories() {

    const categorySection =
        document.getElementById("categories");

    if (!categorySection) return;


    const categoryGrid =
        categorySection.querySelector(".category-grid");

    if (!categoryGrid) return;


    categoryGrid.innerHTML = "";


    mainCategories.forEach(category => {

        const button =
            document.createElement("div");

        button.className =
            "category";

        if (category.name === "All") {
            button.classList.add("active");
        }


        button.dataset.category =
            category.name;


        button.innerHTML =
            `${category.icon} ${category.label}`;


        categoryGrid.appendChild(button);

    });


    attachCategoryEvents();

}


/* ==================================================
   TYPE / SUBCATEGORY SYSTEM
================================================== */

function getMonsterType(monster) {

    if (
        monster.type &&
        String(monster.type).trim() !== ""
    ) {
        return String(monster.type).trim();
    }


    return "Other";

}


function getTypeIcon(type) {

    const text =
        String(type).toLowerCase();


    if (text.includes("slasher")) return "🔪";
    if (text.includes("killer")) return "☠️";
    if (text.includes("robot")) return "🤖";
    if (text.includes("android")) return "🤖";
    if (text.includes("ai")) return "🧠";
    if (text.includes("alien")) return "👽";
    if (text.includes("cryptid")) return "🐺";
    if (text.includes("animatronic")) return "🐻";
    if (text.includes("creature")) return "👹";
    if (text.includes("demon")) return "😈";
    if (text.includes("spirit")) return "👻";
    if (text.includes("entity")) return "👁️";
    if (text.includes("shapeshifter")) return "🌫️";
    if (text.includes("undead")) return "💀";
    if (text.includes("witch")) return "🧙";
    if (text.includes("goblin")) return "👺";
    if (text.includes("sea")) return "🌊";
    if (text.includes("water")) return "💧";
    if (text.includes("supernatural")) return "👻";
    if (text.includes("mythological")) return "🏛️";

    return "👹";

}


function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* ==================================================
   CREATE TYPE FILTERS
================================================== */

function createTypeFilters() {

    const categorySection =
        document.getElementById("categories");

    if (!categorySection) return;


    const oldFilters =
        document.getElementById("type-filters");


    if (oldFilters) {
        oldFilters.remove();
    }


    currentType = "All";


    /*
        Don't show subcategories on All Monsters.
    */

    if (currentCategory === "All") {
        return;
    }


    /*
        IMPORTANT:
        Use getCategory() here rather than the
        original monster.category.
    */

    const categoryMonsters =
        monsters.filter(monster =>
            getCategory(monster) === currentCategory
        );


    const typeSet = new Set();


    categoryMonsters.forEach(monster => {

        typeSet.add(
            getMonsterType(monster)
        );

    });


    const types =
        Array.from(typeSet).sort(
            (a, b) =>
                a.localeCompare(b)
        );


    if (types.length === 0) {
        return;
    }


    const typeSection =
        document.createElement("div");

    typeSection.id =
        "type-filters";


    typeSection.innerHTML = `

        <div class="section-title">

            <h3>
                ${categoryIcons[currentCategory] || "👹"}
                ${currentCategory} Monsters
            </h3>

            <p>
                Browse by monster type.
            </p>

        </div>


        <div class="type-filter-grid">

            <div
                class="type-filter active"
                data-type="All">

                🌍 All ${currentCategory}

            </div>


            ${types.map(type => `

                <div
                    class="type-filter"
                    data-type="${escapeHTML(type)}">

                    ${getTypeIcon(type)}
                    ${escapeHTML(type)}

                </div>

            `).join("")}

        </div>

    `;


    categorySection.insertAdjacentElement(
        "afterend",
        typeSection
    );


    typeSection
        .querySelectorAll(".type-filter")
        .forEach(filter => {

            filter.addEventListener(
                "click",
                () => {

                    
                    typeSection
                        .querySelectorAll(
                            ".type-filter"
                        )
                        .forEach(button => {

                            button.classList.remove(
                                "active"
                            );

                        });


                    filter.classList.add(
                        "active"
                    );


                    currentType =
                        filter.dataset.type;


                    currentPage = 1;


                    filterMonsters();

                }
            );

        });

}


/* ==================================================
   CREATE MONSTER CARD
================================================== */

function createCard(monster) {

    const category = getCategory(monster);

    // Get the title the monster comes from
    let sourceTitle = "";

    if (category === "Movies") {
        sourceTitle = monster.film || "";
    }
    else if (category === "Games") {
        sourceTitle = monster.game || "";
    }
    else if (category === "Television") {
        sourceTitle = monster.television || monster.tv || "";
    }
    else {
        sourceTitle = monster.source || "";
    }


    return `

        <a
            href="monster.html?id=${monster.id}"
            class="card-link">

            <div class="card">

                <img
                    src="${monster.image}"
                    alt="${monster.name}">

                <div class="card-content">

                    <h3>
                        ${monster.name}
                    </h3>


                    ${
                        sourceTitle
                        ? `
                            <p class="monster-source">
                                ${category === "Movies" ? "🎬" :
                                  category === "Games" ? "🎮" :
                                  category === "Television" ? "📺" : "📖"}
                                ${sourceTitle}
                            </p>
                          `
                        : ""
                    }


                    <p>
                        ${categoryIcons[category] || "🌍"}
                        ${category}
                    </p>


                    <p>
                        ✍️ ${monster.creator || "Unknown"}
                    </p>


                    <span
                        class="threat ${(monster.threat || "unknown").toLowerCase()}">

                        ${monster.threat || "Unknown"}

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


    if (currentPage < 1) {
        currentPage = 1;
    }




    if (list.length === 0) {

        grid.innerHTML = `

            <div style="
                grid-column:1/-1;
                text-align:center;
                padding:60px;
            ">

                <h2>
                    No monsters found
                </h2>

                <p>
                    Try another search or category.
                </p>

            </div>

        `;


        updatePagination(0);

        return;

    }




    const start =
        (currentPage - 1) *
        monstersPerPage;


    const end =
        start + monstersPerPage;


    const pageItems =
        list.slice(start, end);


    pageItems.forEach(monster => {

        grid.innerHTML +=
            createCard(monster);

    });


    updatePagination(
        list.length
    );

}


/* ==================================================
   SEARCH DROPDOWN
================================================== */

function showDropdown(list) {

    results.innerHTML = "";


    if (
        search.value.trim() === "" ||
        list.length === 0
    ) {

        results.style.display =
            "none";

        return;

    }


    list.slice(0, 6)
        .forEach(monster => {

            results.innerHTML += `

                <div
                    class="search-item"
                    data-id="${monster.id}">

                    <img
                        src="${monster.image}"
                        alt="${monster.name}">

                    <div>

                        <h4>
                            ${monster.name}
                        </h4>

                        <p>
                            ${getCategory(monster)}
                        </p>

                    </div>

                </div>

            `;

        });


    results.style.display =
        "block";


    document
        .querySelectorAll(".search-item")
        .forEach(item => {

            item.addEventListener(
                "click",
                () => {

                    clickSound
                        .cloneNode()
                        .play()
                        .catch(() => {});


                    setTimeout(() => {

                        window.location.href =
                            `monster.html?id=${item.dataset.id}`;

                    }, 100);

                }
            );

        });

}


/* ==================================================
   FILTER MONSTERS
================================================== */

function filterMonsters(
    resetPage = true
) {

    if (resetPage) {
        currentPage = 1;
    }


    const term =
        search.value
            .toLowerCase()
            .trim();


    const filtered =
        monsters.filter(monster => {

            const text = [

                monster.name,

                getCategory(monster),

                monster.category,

                monster.type || "",

                monster.creator,

                monster.universe,

                monster.description,

                ...(monster.abilities || []),

                ...(monster.weaknesses || [])

            ]
            .join(" ")
            .toLowerCase();


            const matchesSearch =
                text.includes(term);


            const matchesCategory =
                currentCategory === "All" ||
                getCategory(monster) ===
                currentCategory;


            const matchesType =
                currentType === "All" ||
                getMonsterType(monster) ===
                currentType;


            return (
                matchesSearch &&
                matchesCategory &&
                matchesType
            );

        });


    displayMonsters(filtered);

    showDropdown(filtered);

}


/* ==================================================
   SEARCH
================================================== */

search.addEventListener(
    "input",
    () => {

        filterMonsters();

    }
);




search.addEventListener(
    "keydown",
    function(e) {

        const ignoredKeys = [

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

        ];


        if (!ignoredKeys.includes(e.key)) {

            const sound =
                keySounds[
                    Math.floor(
                        Math.random() *
                        keySounds.length
                    )
                ].cloneNode();


            sound.volume = 0.15;

            sound.play().catch(() => {});

        }


        if (e.key === "Enter") {

            const first =
                document.querySelector(
                    ".search-item"
                );


            if (first) {

                clickSound
                    .cloneNode()
                    .play()
                    .catch(() => {});


                setTimeout(() => {

                    window.location.href =
                        `monster.html?id=${first.dataset.id}`;

                }, 120);

            }

        }

    }
);




search.addEventListener(
    "focus",
    () => {

        if (
            search.value.trim() !== ""
        ) {

            filterMonsters();

        }

    }
);




document.addEventListener(
    "click",
    e => {

        if (
            !e.target.closest(
                ".search-container"
            )
        ) {

            results.style.display =
                "none";

        }

    }
);


/* ==================================================
   MAIN CATEGORY EVENTS
================================================== */

function attachCategoryEvents() {

    const categoryButtons =
        document.querySelectorAll(
            ".category"
        );


    categoryButtons.forEach(
        category => {

            category.addEventListener(
                "click",
                () => {

                    

                    categoryButtons.forEach(
                        button =>
                            button.classList.remove(
                                "active"
                            )
                    );


                    category.classList.add(
                        "active"
                    );


                    currentCategory =
                        category.dataset.category;

                        currentCategory =
    category.dataset.category;


const listTitle =
    document.getElementById("monster-list-title");

if (listTitle) {

    if (currentCategory === "All") {

        listTitle.textContent = "All Entries";

    } else {

        listTitle.textContent =
            currentCategory;

    }

}


currentType = "All";

currentPage = 1;




                                    currentType = "All";

                    currentPage = 1;




                    createTypeFilters();

                    filterMonsters();

                }
            );

        }
    );

}


/* ==================================================
   RANDOM ENCOUNTER
================================================== */

const randomButton =
    document.getElementById(
        "random-monster"
    );

const encounter =
    document.getElementById(
        "encounter-screen"
    );

const encounterText =
    document.getElementById(
        "encounter-text"
    );

const encounterImage =
    document.getElementById(
        "encounter-image"
    );

const encounterName =
    document.getElementById(
        "encounter-name"
    );

const encounterButton =
    document.getElementById(
        "encounter-button"
    );

const loadingFill =
    document.querySelector(
        ".loading-fill"
    );

const scanPercent =
    document.getElementById(
        "scan-percent"
    );


const encounterMessages = [

    "🔒 Accessing secure database...",
    "🛰️ Scanning classified archives...",
    "📡 Searching known universes...",
    "🧬 Analysing lifeform...",
    "⚠️ Threat signature detected...",
    "👁️ Identity confirmed..."

];


if (randomButton) {

    randomButton.addEventListener(
        "click",
        function(e) {

            e.preventDefault();


            clickSound
                .cloneNode()
                .play()
                .catch(() => {});


            scanSound.currentTime = 0;

            scanSound
                .play()
                .catch(() => {});


            const random =
                monsters[
                    Math.floor(
                        Math.random() *
                        monsters.length
                    )
                ];


            encounter.style.display =
                "flex";


            encounterImage.style.display =
                "none";

            encounterName.style.display =
                "none";

            encounterButton.style.display =
                "none";


            loadingFill.style.animation =
                "none";

            loadingFill.offsetHeight;

            loadingFill.style.animation =
                "loading 3s linear forwards";


            let i = 0;


            encounterText.textContent =
                encounterMessages[0];


            const messageTimer =
                setInterval(() => {

                    i++;

                    if (
                        i <
                        encounterMessages.length
                    ) {

                        encounterText.textContent =
                            encounterMessages[i];

                    }

                }, 600);


            scanPercent.textContent =
                "0%";


            let percent = 0;


            const percentTimer =
                setInterval(() => {

                    if (percent < 100) {

                        percent +=
                            Math.floor(
                                Math.random() * 6
                            ) + 2;


                        if (percent > 100) {
                            percent = 100;
                        }


                        scanPercent.textContent =
                            percent + "%";


                        return;

                    }


                    clearInterval(
                        percentTimer
                    );

                    clearInterval(
                        messageTimer
                    );


                    encounterText.textContent =
                        "ACCESS GRANTED";

                    scanPercent.textContent =
                        "100%";


                    setTimeout(() => {

                        encounterText.textContent =
                            "CLASSIFIED FILE LOCATED";


                        scanSound.pause();

                        scanSound.currentTime =
                            0;


                        revealSound.currentTime =
                            0;

                        revealSound
                            .play()
                            .catch(() => {});


                        encounterImage.src =
                            random.image;

                        encounterImage.alt =
                            random.name;

                        encounterImage.style.display =
                            "block";


                        encounterName.textContent =
                            random.name;

                        encounterName.style.display =
                            "block";


                        encounterButton.style.display =
                            "inline-block";


                        encounterButton.onclick =
                            function() {

                                encounter.style.display =
                                    "none";

                                window.location.href =
                                    `monster.html?id=${random.id}`;

                            };


                    }, 800);


                }, 180);

        }
    );

}


/* ==================================================
   GLOBAL CLICK SOUNDS
================================================== */

document.addEventListener(
    "pointerdown",
    function(e) {

        const clickable =
            e.target.closest(
                "a,.button,.category,.search-item,button,.threat,.type-filter"
            );


        if (!clickable) return;


        clickSound
            .cloneNode()
            .play()
            .catch(() => {});

    }
);

// ---------- NAVIGATION SOUND ----------

document.addEventListener("click", function(e) {

    const link = e.target.closest("a");

    if (!link) return;

    const href = link.getAttribute("href");

    if (!href || href.startsWith("#")) return;

    // Allow normal browser actions
    if (
        e.ctrlKey ||
        e.shiftKey ||
        e.metaKey ||
        e.button !== 0 ||
        link.target === "_blank"
    ) {
        return;
    }

    e.preventDefault();

    // Let the click sound finish
    setTimeout(() => {

        window.location.href = href;

    }, 250);

});


/* ==================================================
   MONSTER EYES
================================================== */

const eyes =
    document.querySelector(
        ".monster-eyes"
    );


if (eyes) {

    let canPlay = true;


    eyes.addEventListener(
        "mouseenter",
        () => {

            if (!canPlay) return;


            eyeScream.currentTime = 0;

            eyeScream
                .play()
                .catch(() => {});


            const logo =
                document.querySelector(
                    ".logo"
                );


            if (logo) {

                logo.classList.add(
                    "monster-awake"
                );

            }


            canPlay = false;

        }
    );


    eyes.addEventListener(
        "mouseleave",
        () => {

            const logo =
                document.querySelector(
                    ".logo"
                );


            if (logo) {

                logo.classList.remove(
                    "monster-awake"
                );

            }


            canPlay = true;

        }
    );

}


/* ==================================================
   PAGINATION
================================================== */

function updatePagination(total) {

    const totalPages =
        Math.max(
            1,
            Math.ceil(
                total /
                monstersPerPage
            )
        );


    const pageInfo =
        document.getElementById(
            "page-info"
        );


    const previousButton =
        document.getElementById(
            "prev-page"
        );


    const nextButton =
        document.getElementById(
            "next-page"
        );


    if (currentPage > totalPages) {

        currentPage =
            totalPages;

    }


    if (pageInfo) {

        pageInfo.textContent =
            `Page ${currentPage} of ${totalPages}`;

    }


    if (previousButton) {

        previousButton.disabled =
            currentPage === 1;

    }


    if (nextButton) {

        nextButton.disabled =
            currentPage >= totalPages ||
            total === 0;

    }

}


/* ==================================================
   PREVIOUS PAGE
================================================== */

const previousPageButton =
    document.getElementById(
        "prev-page"
    );


if (previousPageButton) {

    previousPageButton.addEventListener(
        "click",
        () => {

           
            if (currentPage > 1) {

                currentPage--;

                filterMonsters(false);

            }

        }
    );

}


/* ==================================================
   NEXT PAGE
================================================== */

const nextPageButton =
    document.getElementById(
        "next-page"
    );


if (nextPageButton) {

    nextPageButton.addEventListener(
        "click",
        () => {

           
            const term =
                search.value
                    .toLowerCase()
                    .trim();


            const filtered =
                monsters.filter(monster => {

                    const text = [

                        monster.name,

                        getCategory(monster),

                        monster.category,

                        monster.type || "",

                        monster.creator,

                        monster.universe,

                        monster.description,

                        ...(monster.abilities || []),

                        ...(monster.weaknesses || [])

                    ]
                    .join(" ")
                    .toLowerCase();


                    const matchesSearch =
                        text.includes(term);


                    const matchesCategory =
                        currentCategory === "All" ||
                        getCategory(monster) ===
                        currentCategory;


                    const matchesType =
                        currentType === "All" ||
                        getMonsterType(monster) ===
                        currentType;


                    return (
                        matchesSearch &&
                        matchesCategory &&
                        matchesType
                    );

                });


            const totalPages =
                Math.ceil(
                    filtered.length /
                    monstersPerPage
                );


            if (
                currentPage <
                totalPages
            ) {

                currentPage++;

                filterMonsters(false);

            }

        }
    );

}


/* ==================================================
   START
================================================== */

document.addEventListener("DOMContentLoaded", () => {

    createMainCategories();

    attachCategoryEvents();

    currentCategory = "All";
    currentType = "All";
    currentPage = 1;

    filterMonsters();

});