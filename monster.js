// =========================================
// MONSTERCODEX MONSTER PROFILE
// =========================================


// Get monster ID from URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id");


// Find monster in data.js
const monster = monsters.find(m => m.id === id);


// =========================================
// CLICK SOUND
// =========================================

const clickSound = new Audio("assets/sounds/click.mp3");

clickSound.volume = 0.4;


// =========================================
// ABILITY ICONS
// =========================================

function getAbilityIcon(ability) {

    const text = ability.toLowerCase();

    if (text.includes("strength")) return "💪";
    if (text.includes("speed")) return "⚡";
    if (text.includes("voice")) return "🎭";
    if (text.includes("mimic")) return "🎭";
    if (text.includes("hearing")) return "👂";
    if (text.includes("sound")) return "🔊";
    if (text.includes("camouflage")) return "👁";
    if (text.includes("stealth")) return "🥷";
    if (text.includes("telepathy")) return "🧠";
    if (text.includes("mind")) return "🧠";
    if (text.includes("shape")) return "🌫";
    if (text.includes("regeneration")) return "🦴";
    if (text.includes("heal")) return "🩹";
    if (text.includes("climb")) return "🕷";
    if (text.includes("fire")) return "🔥";
    if (text.includes("ice")) return "❄️";
    if (text.includes("poison")) return "☠️";
    if (text.includes("acid")) return "🧪";
    if (text.includes("electric")) return "⚡";
    if (text.includes("lightning")) return "⚡";
    if (text.includes("flight")) return "🪽";
    if (text.includes("fly")) return "🪽";
    if (text.includes("teleport")) return "🌀";
    if (text.includes("invisible")) return "👻";
    if (text.includes("fear")) return "😱";
    if (text.includes("bite")) return "🦷";
    if (text.includes("claw")) return "🐾";
    if (text.includes("tentacle")) return "🐙";
    if (text.includes("water")) return "🌊";
    if (text.includes("plant")) return "🌿";
    if (text.includes("magic")) return "✨";
    if (text.includes("curse")) return "🔮";

    return "⭐";
}


// =========================================
// WEAKNESS ICONS
// =========================================

function getWeaknessIcon(weakness) {

    const text = weakness.toLowerCase();

    if (text.includes("fire")) return "🔥";
    if (text.includes("light")) return "☀️";
    if (text.includes("sun")) return "☀️";
    if (text.includes("silver")) return "🥈";
    if (text.includes("holy")) return "✝️";
    if (text.includes("water")) return "💧";
    if (text.includes("cold")) return "❄️";
    if (text.includes("ice")) return "❄️";
    if (text.includes("sound")) return "🔊";
    if (text.includes("electric")) return "⚡";
    if (text.includes("magic")) return "✨";
    if (text.includes("human")) return "🧍";
    if (text.includes("unknown")) return "❓";

    return "⚠️";
}


// =========================================
// LOAD MONSTER
// =========================================

if (!monster) {

    const nameElement =
        document.getElementById("monster-name");

    if (nameElement) {
        nameElement.textContent = "Monster Not Found";
    }

} else {


    // =========================================
    // BASIC INFORMATION
    // =========================================

    const nameElement =
        document.getElementById("monster-name");

    const descriptionElement =
        document.getElementById("monster-description");

    const imageElement =
        document.getElementById("monster-image");


    if (nameElement) {
        nameElement.textContent =
            monster.name || "Unknown";
    }


    if (descriptionElement) {
        descriptionElement.textContent =
            monster.description ||
            "No description available.";
    }


    if (imageElement) {

        imageElement.src =
            monster.image || "";

        imageElement.alt =
            monster.name || "Monster";

    }


    // =========================================
    // PROFILE INFORMATION
    // =========================================

    const creator =
        document.getElementById("monster-creator");

    const year =
        document.getElementById("monster-year");

    const universe =
        document.getElementById("monster-universe");

    const origin =
        document.getElementById("monster-origin");

    const height =
        document.getElementById("monster-height");

    const weight =
        document.getElementById("monster-weight");

    const status =
        document.getElementById("monster-status");

    const alignment =
        document.getElementById("monster-alignment");


    if (creator) {
        creator.textContent =
            monster.creator || "Unknown";
    }


    if (year) {
        year.textContent =
            monster.firstAppearance ||
            monster.year ||
            "Unknown";
    }


    if (universe) {
        universe.textContent =
            monster.universe || "Unknown";
    }


    if (origin) {
        origin.textContent =
            monster.origin || "Unknown";
    }


    if (height) {
        height.textContent =
            monster.height || "Unknown";
    }


    if (weight) {
        weight.textContent =
            monster.weight || "Unknown";
    }


    if (status) {
        status.textContent =
            monster.status || "Unknown";
    }


    if (alignment) {
        alignment.textContent =
            monster.alignment || "Unknown";
    }


    // =========================================
    // ABILITIES
    // =========================================

    const abilities =
        document.getElementById("monster-abilities");


    if (abilities) {

        abilities.innerHTML = "";


        if (
            Array.isArray(monster.abilities) &&
            monster.abilities.length > 0
        ) {

            monster.abilities.forEach(ability => {

                const li =
                    document.createElement("li");


                const icon =
                    document.createElement("span");

                icon.className =
                    "ability-icon";

                icon.textContent =
                    getAbilityIcon(ability);


                const text =
                    document.createElement("span");

                text.textContent =
                    ability;


                li.appendChild(icon);
                li.appendChild(text);

                abilities.appendChild(li);

            });

        } else {

            const li =
                document.createElement("li");

            li.textContent =
                "No abilities recorded.";

            abilities.appendChild(li);

        }

    }


    // =========================================
    // WEAKNESSES
    // =========================================

    const weaknesses =
        document.getElementById("monster-weaknesses");


    if (weaknesses) {

        weaknesses.innerHTML = "";


        if (
            Array.isArray(monster.weaknesses) &&
            monster.weaknesses.length > 0
        ) {

            monster.weaknesses.forEach(weakness => {

                const li =
                    document.createElement("li");


                const icon =
                    document.createElement("span");

                icon.className =
                    "weakness-icon";

                icon.textContent =
                    getWeaknessIcon(weakness);


                const text =
                    document.createElement("span");

                text.textContent =
                    weakness;


                li.appendChild(icon);
                li.appendChild(text);

                weaknesses.appendChild(li);

            });

        } else {

            const li =
                document.createElement("li");

            li.textContent =
                "No weaknesses recorded.";

            weaknesses.appendChild(li);

        }

    }


    // =========================================
    // RELATED MONSTERS
    // =========================================

    const related =
        document.getElementById("related-monsters");


    if (related) {

        related.innerHTML = "";


        const relatedMonsters =
            monsters
                .filter(m =>
                    m.id !== monster.id &&
                    m.category === monster.category
                )
                .slice(0, 4);


        if (relatedMonsters.length === 0) {

            related.textContent =
                "No related monsters found.";

        } else {

            relatedMonsters.forEach(m => {

                const card =
                    document.createElement("a");

                card.href =
                    `monster.html?id=${m.id}`;

                card.className =
                    "card-link";


                const article =
                    document.createElement("article");

                article.className =
                    "card";


                const image =
                    document.createElement("img");

                image.src =
                    m.image || "";

                image.alt =
                    m.name || "Monster";


                const content =
                    document.createElement("div");

                content.className =
                    "card-content";


                const title =
                    document.createElement("h3");

                title.textContent =
                    m.name || "Unknown";


                const category =
                    document.createElement("p");

                category.textContent =
                    m.category || "Unknown";


                content.appendChild(title);
                content.appendChild(category);

                article.appendChild(image);
                article.appendChild(content);

                card.appendChild(article);

                related.appendChild(card);

            });

        }

    }

}


// =========================================
// RANDOM MONSTER
// =========================================

const randomButton =
    document.getElementById("random-monster");



if (randomButton) {

    randomButton.addEventListener("click", function(e) {

        e.preventDefault();


        if (
            !Array.isArray(monsters) ||
            monsters.length === 0
        ) {
            return;
        }


        const random =
            monsters[
                Math.floor(
                    Math.random() *
                    monsters.length
                )
            ];


        const encounter =
            document.getElementById(
                "encounter-screen"
            );


        if (encounter) {

            encounter.style.display = "flex";


            setTimeout(() => {

                window.location.href =
                    `monster.html?id=${random.id}`;

            }, 2000);

        } else {

            window.location.href =
                `monster.html?id=${random.id}`;

        }

    });

}

// =========================================
// NAVIGATION CLICK SOUND
// =========================================

document.addEventListener(
    "click",
    function(e) {

        const link =
            e.target.closest("a");


        if (!link) {
            return;
        }


        const href =
            link.getAttribute("href");


        if (
            !href ||
            href.startsWith("#") ||
            href.startsWith("javascript:")
        ) {
            return;
        }


        if (
            link.target === "_blank" ||
            e.ctrlKey ||
            e.shiftKey ||
            e.metaKey ||
            e.button !== 0
        ) {
            return;
        }


        e.preventDefault();


        const sound =
            clickSound.cloneNode();


        sound.volume =
            clickSound.volume;


        sound.play().catch(() => {});


        setTimeout(() => {

            window.location.href =
                href;

        }, 250);

    }
);