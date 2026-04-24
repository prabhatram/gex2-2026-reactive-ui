const assert = require("assert");
const { setup } = require("./helpers/setup");

module.exports = async function formTest() {
  const { document, alertCalls, window } = await setup();

  const form = document.getElementById("registrationform");

  form.dispatchEvent(new window.Event("submit", { bubbles: true, cancelable: true }));

  /* assert.notStrictEqual(
    document.getElementById("nameError").textContent.trim(),
    "",
    "Empty name should produce an error."
  ); */

  assert.notStrictEqual(
    document.getElementById("emailError").textContent.trim(),
    "",
    "Invalid empty email should produce an error."
  );

  assert.notStrictEqual(
    document.getElementById("dobError").textContent.trim(),
    "",
    "Empty DOB should produce an error."
  );

  assert.notStrictEqual(
    document.getElementById("genderError").textContent.trim(),
    "",
    "Missing gender should produce an error."
  );

  assert.notStrictEqual(
    document.getElementById("ticketError").textContent.trim(),
    "",
    "Missing ticket should produce an error."
  );

  assert.notStrictEqual(
    document.getElementById("visitorsError").textContent.trim(),
    "",
    "Missing number of visitors should produce an error."
  );

  assert.notStrictEqual(
    document.getElementById("visitDateError").textContent.trim(),
    "",
    "Missing visit date should produce an error."
  );

  document.getElementById("name").value = "Prabhat";
  document.getElementById("email").value = "user@example.com";
  document.getElementById("dob").value = "2000-01-01";
  document.querySelector('input[name="gender"][value="male"]').checked = true;
  document.getElementById("ticket").value = "standard";
  document.getElementById("no-of-visitors").value = "just-me";
  document.getElementById("date-of-visit").value = "2026-12-01";

  form.dispatchEvent(new window.Event("submit", { bubbles: true, cancelable: true }));

  assert.strictEqual(
    alertCalls.includes("Form submitted successfully!"),
    true,
    "A valid form should trigger the success alert."
  );
};