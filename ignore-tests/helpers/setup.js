const fs = require("fs");
const path = require("path");
const { JSDOM } = require("jsdom");

const SCRIPT_FILE = path.join(process.cwd(), "script.js");

const samplePlaces = [
  {
    id: "p1",
    name: "Central Stairs",
    description: "A mosaic staircase full of hidden details."
  },
  {
    id: "p2",
    name: "Howl's Garden",
    description: "A quiet magical area inspired by Howl's world."
  },
  {
    id: "p3",
    name: "Totoro Forest Path",
    description: "A peaceful woodland walk with Ghibli atmosphere."
  }
];

function buildHtml() {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <body>
    <div class="carousel" id="carousel">
      <div class="slides" id="slides">
        <div class="slide card"><img class="poster" src="a.jpg" alt="a"></div>
        <div class="slide card"><img class="poster" src="b.jpg" alt="b"></div>
        <div class="slide card"><img class="poster" src="c.jpg" alt="c"></div>
      </div>
      <button class="nav-button prev" id="prev">Prev</button>
      <button class="nav-button next" id="next">Next</button>
    </div>

    <nav id="mainNav">
      <img src="menu.png" alt="Menu" id="menuToggle" class="menu-icon"/>
      <ul id="navLinks">
        <li><a href="#ghibli-park">Park</a></li>
      </ul>
    </nav>

    <section id="placesToSee">
      <div id="placeSection" class="place-section">
        <input type="text" id="searchInput" />
        <p id="searchMessage"></p>

        <div id="favoriteNotification" class="favorite-hidden">
          <button id="favoriteBtn" class="favorite-float-btn">
            ❤️ <span id="favoriteCount">0</span>
          </button>
        </div>

        <div id="placeList" class="scrollable-container"></div>
      </div>

      <div id="favoriteModal" class="favorite-modal favorite-hidden">
        <div class="favorite-box">
          <button id="closeFavoriteBtn" class="close-favorite-btn" type="button">x</button>
          <h2>Your Favorited Places</h2>
          <ul id="favoritePlaces"></ul>
          <div class="favorite-actions">
            <button id="goBack" type="button">Back</button>
            <button id="saveFavoritesBtn" type="button">Save My favorites</button>
          </div>
        </div>
      </div>

      <div id="enlargedPlace" class="enlargedPlace"></div>
    </section>

    <section id="registration">
      <form id="registrationform">
        <input type="date" id="date-of-visit" name="date-of-visit">
        <span class="error" id="visitDateError"></span>

        <select name="no-of-visitors" id="no-of-visitors">
          <option value="">---Select---</option>
          <option value="just-me">Just me</option>
        </select>
        <span class="error" id="visitorsError"></span>

        <input type="text" id="name" name="name">
        <span class="error" id="nameError"></span>

        <input type="email" id="email" name="email">
        <span class="error" id="emailError"></span>

        <input type="date" id="dob" name="dob">
        <span class="error" id="dobError"></span>

        <label><input type="radio" name="gender" value="male"> Male</label>
        <label><input type="radio" name="gender" value="female"> Female</label>
        <span class="error" id="genderError"></span>

        <select id="ticket" name="ticket">
          <option value="">--Select--</option>
          <option value="standard">Standard</option>
        </select>
        <span class="error" id="ticketError"></span>

        <textarea id="comments" name="comments"></textarea>

        <button type="submit">Register</button>
      </form>
    </section>
  </body>
  </html>
  `;
}

function flush() {
  return new Promise(resolve => setTimeout(resolve, 0));
}

async function setup(options = {}) {
  const {
    fetchOk = true,
    places = samplePlaces
  } = options;

  const dom = new JSDOM(buildHtml(), {
    url: "http://localhost",
    runScripts: "outside-only"
  });

  const { window } = dom;
  const { document } = window;

  const fetchCalls = [];
  const alertCalls = [];
  const intervalCalls = [];
  const clearCalls = [];

  window.fetch = async (url) => {
    fetchCalls.push(url);

    if (!fetchOk) {
      return {
        ok: false,
        json: async () => ({})
      };
    }

    return {
      ok: true,
      json: async () => places
    };
  };

  window.alert = (msg) => {
    alertCalls.push(msg);
  };

  window.setInterval = (fn, ms) => {
    intervalCalls.push({ fn, ms });
    return intervalCalls.length;
  };

  window.clearInterval = (id) => {
    clearCalls.push(id);
  };

  const scriptContent = fs.readFileSync(SCRIPT_FILE, "utf8");
  window.eval(scriptContent);

  await flush();
  await flush();

  return {
    window,
    document,
    fetchCalls,
    alertCalls,
    intervalCalls,
    clearCalls,
    places
  };
}

module.exports = {
  setup,
  samplePlaces
};