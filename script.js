const searchInput = document.getElementById("search");
const gameList = document.getElementById("game-list");

const discordBanner = document.getElementById("discord-banner");
const closeButton = document.getElementById("close-discord-banner");


let games = [];


async function loadGames() {

    if (!gameList) return;


    const response = await fetch("data/switch-games.json");

    games = await response.json();


    displayGames(games);

}



function displayGames(gamesToShow) {

    gameList.innerHTML = "";


    gamesToShow.forEach(game => {


        const card = document.createElement("a");

        card.href = game.page;

        card.className = "game-link";



        card.innerHTML = `

            <article class="game-card">

                <img
                    src="${game.cover}"
                    alt="${game.title} cover"
                    loading="lazy"
                >

                <div class="game-info">

                    <h3>
                        ${game.title}
                    </h3>

                    <p>
                        ${game.platform} • ${game.year}
                    </p>

                </div>

            </article>

        `;


        gameList.appendChild(card);


    });

}





searchInput?.addEventListener("input", ({ target }) => {


    const query = target.value
        .trim()
        .toLowerCase();



    const filteredGames = games.filter(game =>

        game.title
            .toLowerCase()
            .includes(query)

    );


    displayGames(filteredGames);


});





closeButton?.addEventListener("click", () => {

    discordBanner?.remove();

});





loadGames();
