const assert = require("assert");
const { setup, samplePlaces } = require("./helpers/setup");

module.exports = async function fetchDisplayTest() {
  const successEnv = await setup({ fetchOk: true, places: samplePlaces });
  const { document, fetchCalls } = successEnv;

  assert.strictEqual(
    fetchCalls.includes("ghibli_park.json"),
    true,
    "The script should fetch ghibli_park.json on load."
  );

  const cards = document.querySelectorAll(".place-card");
  assert.strictEqual(
    cards.length,
    samplePlaces.length,
    "One place card should be rendered for each fetched place."
  );

  assert.strictEqual(
    cards[0].querySelector("h3").textContent.trim(),
    samplePlaces[0].name,
    "Rendered place card title should match fetched data."
  );

  const failEnv = await setup({ fetchOk: false });
  const failMessage = failEnv.document.getElementById("placeList").textContent;

  assert.strictEqual(
    failMessage.includes("Could not load the list of places."),
    true,
    "A failed fetch should show an error message in placeList."
  );
};