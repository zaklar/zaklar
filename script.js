const searchInput = document.getElementById("search");
const gameCards = document.querySelectorAll(".game-card");
const discordBanner = document.getElementById("discord-banner");
const closeButton = document.getElementById("close-discord-banner");

searchInput?.addEventListener("input", ({ target }) => {
    const query = target.value.trim().toLowerCase();

    gameCards.forEach(card => {
        card.hidden = !card.dataset.name.toLowerCase().includes(query);
    });
});

closeButton?.addEventListener("click", () => {
    discordBanner?.remove();
});
