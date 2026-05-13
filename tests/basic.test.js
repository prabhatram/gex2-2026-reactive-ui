const fs = require("fs");
const assert = require("assert");
const { JSDOM } = require("jsdom");

assert(fs.existsSync("index.html"), "index.html must exist");

const html = fs.readFileSync("index.html", "utf8");
const dom = new JSDOM(html);
const document = dom.window.document;

assert(document.querySelector("h1"), "The page must contain an h1 element");

const cards = document.querySelectorAll(".card");
assert(
  cards.length >= 3,
  "The page must contain at least 3 elements with class 'card'"
);

assert(
  document.querySelector("script[src]"),
  "The page must link an external JavaScript file using <script src='...'>"
);

console.log("All visible tests passed.");