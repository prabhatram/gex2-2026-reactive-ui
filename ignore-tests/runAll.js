const tests = [
  require("./carousel.test"),
  require("./form.test"),
  require("./fetch-display.test"),
  require("./search-display.test"),
  require("./modal.test"),
  require("./favorites.test")
];

(async function runAll() {
  let passed = 0;

  for (const test of tests) {
    try {
      await test();
      console.log(`PASS: ${test.name}`);
      passed++;
    } catch (error) {
      console.error(`FAIL: ${test.name}`);
      console.error(error.message);
      process.exit(1);
    }
  }

  console.log(`\nAll ${passed} test files passed.`);
})();