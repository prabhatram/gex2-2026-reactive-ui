const assert = require("assert");
const { setup } = require("./helpers/setup");

module.exports = async function carouselTest() {
  const { document, intervalCalls, clearCalls, window } = await setup();

  const slides = document.querySelectorAll(".slide");
  const nextBtn = document.getElementById("next");
  const prevBtn = document.getElementById("prev");
  const carousel = document.getElementById("carousel");

  assert.strictEqual(
    [...slides].filter(slide => slide.classList.contains("active")).length,
    1,
    "Exactly one slide should be active on load."
  );

  assert.strictEqual(
    slides[0].classList.contains("active"),
    true,
    "The first slide should be active initially."
  );

  nextBtn.click();
  assert.strictEqual(
    slides[1].classList.contains("active"),
    true,
    "Clicking Next should activate the second slide."
  );

  prevBtn.click();
  assert.strictEqual(
    slides[0].classList.contains("active"),
    true,
    "Clicking Prev should return to the first slide."
  );

  prevBtn.click();
  assert.strictEqual(
    slides[2].classList.contains("active"),
    true,
    "Prev on the first slide should wrap to the last slide."
  );

  assert.strictEqual(
    intervalCalls.length >= 1,
    true,
    "Auto-slide should start on load."
  );

  assert.strictEqual(
    intervalCalls[0].ms,
    4000,
    "Auto-slide interval should be 4000 ms."
  );

  carousel.dispatchEvent(new window.Event("mouseenter"));
  assert.strictEqual(
    clearCalls.length >= 1,
    true,
    "Hovering over the carousel should stop auto-slide."
  );
};