const assert = require("assert");
const { setup, samplePlaces } = require("./helpers/setup");

module.exports = async function modalTest() {
  const { document, window } = await setup();

  const firstMoreButton = document.querySelector(".more-btn");
  firstMoreButton.click();

  const modal = document.getElementById("enlargedPlace");
  assert.strictEqual(
    modal.classList.contains("show"),
    true,
    "Clicking READ MORE should show the enlarged modal."
  );

  const modalCard = modal.querySelector(".enlarged-card");
  assert.ok(modalCard, "The enlarged modal should contain an enlarged-card.");

  assert.strictEqual(
    modalCard.querySelector("h2").textContent.trim(),
    samplePlaces[0].name,
    "The modal title should match the clicked place."
  );

  const cancelBtn = modal.querySelector(".cancel-btn");
  cancelBtn.click();

  assert.strictEqual(
    modal.classList.contains("show"),
    false,
    "Clicking CANCEL should hide the enlarged modal."
  );
};