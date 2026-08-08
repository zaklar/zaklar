const searchInput = document.getElementById("search");
const gameList = document.getElementById("game-list");

let games = [];

async function loadGames() {
    if (!gameList) return;

    try {
        const response = await fetch("data/switch-games.json");

        if (!response.ok) {
            throw new Error(`Failed to load JSON: ${response.status}`);
        }

        games = await response.json();
        displayGames(games);
    } catch (error) {
        console.error("Error loading games:", error);
    }
}

function displayGames(gamesToShow) {
    gameList.innerHTML = "";

    // Sort alphabetically by name
    const sorted = [...gamesToShow].sort((a, b) =>
        a.name.localeCompare(b.name)
    );

    sorted.forEach(game => {
        const card = document.createElement("a");
        card.className = "game-link";
        card.href = `games/switch-games.html?game=${encodeURIComponent(game.id)}`;

        card.innerHTML = `
            <article class="game-card">
                <img
                    src="${game.cover}"
                    alt="${game.alt}"
                    loading="lazy"
                >
                <div class="game-info">
                    <h3>${game.name}</h3>
                    <p>${game.platform} • ${game.year}</p>
                </div>
            </article>
        `;

        gameList.appendChild(card);
    });
}

searchInput?.addEventListener("input", event => {
    const query = event.target.value.trim().toLowerCase();

    const filteredGames = games.filter(game =>
        game.name.toLowerCase().includes(query)
    );

    displayGames(filteredGames);
});

loadGames();
