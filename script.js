const searchInput = document.getElementById("search");

if (searchInput) {
  searchInput.addEventListener("keyup", function () {

    const value = this.value.toLowerCase();
    const games = document.querySelectorAll(".game-card");

    games.forEach(game => {
      const name = game.dataset.name.toLowerCase();

      if (name.includes(value)) {
        game.style.display = "block";
      } else {
        game.style.display = "none";
      }
    });

  });
}
