const searchInput = document.getElementById("search");
const gameList = document.getElementById("game-list");

const discordBanner = document.getElementById("discord-banner");
const closeButton = document.getElementById("close-discord-banner");

let games = [];


async function loadGames() {

    if (!gameList) return;

    try {

        const response = await fetch("data/switch-games.json");

        if (!response.ok) {
            throw new Error(`Failed to load JSON: ${response.status}`);
        }

        games = await response.json();

        console.log(games);

        displayGames(games);

    } catch (error) {

        console.error("Error loading games:", error);

    }

}


function displayGames(gamesToShow) {

    gameList.innerHTML = "";


    gamesToShow.forEach(game => {

        const card = document.createElement("a");

        card.href = `switch-games.html?game=${game.id}`;

        card.className = "game-link";


        card.innerHTML = `

            <article class="game-card">

                <img
                    src="${game.cover}"
                    alt="${game.title} cover"
                    loading="lazy"
                >


                <div class="game-info">

                    <h3>${game.title}</h3>

                    <p>
                        ${game.platform} • ${game.year}
                    </p>

                </div>

            </article>

        `;


        gameList.appendChild(card);

    });

}


searchInput?.addEventListener("input", (event) => {

    const query = event.target.value.trim().toLowerCase();


    const filteredGames = games.filter(game =>
        game.title.toLowerCase().includes(query)
    );


    displayGames(filteredGames);

});


closeButton?.addEventListener("click", () => {

    discordBanner?.remove();

});


loadGames();
