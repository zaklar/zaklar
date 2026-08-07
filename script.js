const searchInput = document.getElementById("search");
const gameList = document.getElementById("game-list");

const discordBanner = document.getElementById("discord-banner");
const closeButton = document.getElementById("close-discord-banner");

const gamePage = document.getElementById("game-page");

let games = [];

async function loadGames() {

    try {

        const response = await fetch("data/switch-games.json");

        if (!response.ok) {
            throw new Error(`Failed to load JSON: ${response.status}`);
        }

        games = await response.json();

        console.log(games);

        const params = new URLSearchParams(window.location.search);
        const gameId = params.get("game");

        if (gameId && gamePage) {

            const game = games.find(game => game.id === gameId);

            if (!game) {
                gamePage.innerHTML = `
                    <h2>Game not found</h2>
                    <p>The requested game could not be found.</p>
                `;

                return;
            }

            displayGame(game);

            return;
        }

        if (gameList) {
            displayGames(games);
        }

    } catch (error) {

        console.error("Error loading games:", error);

    }

}


function displayGames(gamesToShow) {

    if (!gameList) return;

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


function displayGame(game) {

    if (!gamePage) return;


    document.title = `Zaklar | ${game.title}`;


    gamePage.innerHTML = `

        <div class="switch-header">

            <div class="switch-title">

                <h1>${game.series}</h1>

            </div>

            <p>${game.subtitle}</p>

        </div>


        <section class="game-page">

            <div class="game-page-info">

                <img
                    class="game-cover"
                    src="${game.cover}"
                    alt="${game.title} cover"
                    loading="lazy"
                >


                <div class="details">

                    <h2>${game.title}</h2>

                    <p>
                        <strong>Release:</strong>
                        ${game.year}
                    </p>

                    <p>
                        <strong>Platform:</strong>
                        ${game.platform}
                    </p>

                    <p>
                        <strong>Developer:</strong>
                        ${game.developer}
                    </p>

                    <p>
                        <strong>Publisher:</strong>
                        ${game.publisher}
                    </p>

                    <p>
                        <strong>Genre:</strong>
                        ${game.genre}
                    </p>

                    <p>
                        <strong>Tags:</strong>
                        ${game.tags}
                    </p>

                    <p>
                        <strong>Age Rating:</strong>
                        ${game.ageRating}
                    </p>

                </div>

            </div>


            <section class="description">

                <h2>Synopsis ♡</h2>

                ${game.description}

            </section>


            <section class="download">

                <h2>Download</h2>


                <div class="download-region">

                    <div class="download-header">

                        <span class="flag">🇯🇵</span>

                        <h3>Japan</h3>

                    </div>


                    <div class="download-links">

                        <a
                            class="download-button"
                            href="${game.downloads.japan.part1}"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Part 1
                        </a>


                        <a
                            class="download-button"
                            href="${game.downloads.japan.part2}"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Part 2
                        </a>

                    </div>

                </div>


                <div class="download-region">

                    <div class="download-header">

                        <span class="flag">🇺🇸</span>

                        <h3>USA</h3>

                    </div>


                    <div class="download-links">

                        <a
                            class="download-button"
                            href="${game.downloads.usa.part1}"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Part 1
                        </a>


                        <a
                            class="download-button"
                            href="${game.downloads.usa.part2}"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Part 2
                        </a>

                    </div>

                </div>


            </section>

        </section>

    `;

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
