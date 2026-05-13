const assert = require("assert");
const { setup } = require("./helpers/setup");

module.exports = async function searchDisplayTest() {
  const { document, window } = await setup();

  const input = document.getElementById("searchInput");

  input.value = "totoro";
  input.dispatchEvent(new window.Event("input", { bubbles: true }));

  let cards = document.querySelectorAll(".place-card");
  assert.strictEqual(
    cards.length,
    1,
    "Search should filter place cards to matching entries only."
  );

  assert.strictEqual(
    cards[0].querySelector("h3").textContent.toLowerCase().includes("totoro"),
    true,
    "Filtered card should match the search query."
  );

  input.value = "not-a-real-place";
  input.dispatchEvent(new window.Event("input", { bubbles: true }));

  cards = document.querySelectorAll(".place-card");
  assert.strictEqual(
    cards.length,
    0,
    "No place cards should remain when search has no matches."
  );

  assert.strictEqual(
    document.getElementById("searchMessage").textContent.includes("Sorry"),
    true,
    "No-match search should show a user-facing message."
  );
};