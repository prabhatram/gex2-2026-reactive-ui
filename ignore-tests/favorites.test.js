const assert = require("assert");
const { setup } = require("./helpers/setup");

module.exports = async function favoritesTest() {
  const { document, window } = await setup();

  // Open first place modal
  document.querySelector(".more-btn").click();

  // Add to favorites
  document.querySelector("#enlargedPlace .favorite-btn").click();

  const favoriteCount = document.getElementById("favoriteCount").textContent.trim();
  assert.strictEqual(
    favoriteCount,
    "1",
    "Adding one place to favorites should update the favorite count to 1."
  );

  assert.strictEqual(
    document.getElementById("favoriteNotification").classList.contains("favorite-hidden"),
    false,
    "Favorite notification should become visible after adding a favorite."
  );

  const stored = JSON.parse(window.localStorage.getItem("favoritesList")) || [];
  assert.strictEqual(
    stored.length,
    1,
    "Adding a place to favorites should persist it to localStorage."
  );

  // Try adding the same place again
  document.querySelector(".more-btn").click();
  document.querySelector("#enlargedPlace .favorite-btn").click();

  const storedAfterDuplicate = JSON.parse(window.localStorage.getItem("favoritesList")) || [];
  assert.strictEqual(
    storedAfterDuplicate.length,
    1,
    "Adding the same place again should not duplicate it."
  );

  // Check list rendering
  const favoriteItems = document.querySelectorAll("#favoritePlaces li");
  assert.strictEqual(
    favoriteItems.length,
    1,
    "Favorites UI should show one list item after adding one favorite."
  );

  // Remove favorite
  favoriteItems[0].querySelector(".remove-favorite-btn").click();

  assert.strictEqual(
    document.querySelectorAll("#favoritePlaces li").length,
    0,
    "Removing a favorite should remove it from the UI list."
  );

  assert.strictEqual(
    document.getElementById("favoriteCount").textContent.trim(),
    "0",
    "Removing the only favorite should reset the count to 0."
  );
};