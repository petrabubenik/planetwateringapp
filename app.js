(function () {
  "use strict";

  const storage = {
    get: function (key, fallback) {
      try {
        const saved = localStorage.getItem(key);
        return saved === null ? fallback : JSON.parse(saved);
      } catch (error) {
        return fallback;
      }
    },
    set: function (key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        // The app remains usable when browser storage is unavailable.
      }
    }
  };

  const plants = storage.get("goodGrowthPlants", INITIAL_PLANTS.map(function (plant) {
    return Object.assign({}, plant);
  }));
  let activeFilter = "all";
  const plantList = document.getElementById("plant-list");
  const searchBox = document.getElementById("search-box");
  const plantDialog = document.getElementById("plant-dialog");
  const plantForm = document.getElementById("plant-form");
  const confirmationDialog = document.getElementById("confirmation-dialog");

  document.title = STARTUP.name + " | Plant care";
  document.getElementById("brand-name").lastChild.textContent = STARTUP.name;
  document.getElementById("tagline").textContent = STARTUP.tagline;
  document.getElementById("pitch").textContent = STARTUP.pitch;

  function dateString(date) {
    return date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, "0") + "-" + String(date.getDate()).padStart(2, "0");
  }

  function todayString() {
    return dateString(new Date());
  }

  function dayNumber(value) {
    const parts = value.split("-").map(Number);
    return Math.floor(Date.UTC(parts[0], parts[1] - 1, parts[2]) / 86400000);
  }

  function careStatus(plant) {
    const daysSinceWatering = Math.max(0, dayNumber(todayString()) - dayNumber(plant.lastWatered));
    const daysLeft = Number(plant.interval) - daysSinceWatering;
    let label;

    if (daysLeft < 0) {
      label = "Overdue by " + Math.abs(daysLeft) + (Math.abs(daysLeft) === 1 ? " day" : " days");
    } else if (daysLeft === 0) {
      label = "Ready for water today";
    } else if (daysLeft === 1) {
      label = "Water tomorrow";
    } else {
      label = "Water in " + daysLeft + " days";
    }

    return { daysLeft: daysLeft, label: label };
  }

  function readableDate(value) {
    const parts = value.split("-").map(Number);
    return new Intl.DateTimeFormat("en", { month: "short", day: "numeric" }).format(new Date(parts[0], parts[1] - 1, parts[2]));
  }

  function makeElement(tag, className, text) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text) element.textContent = text;
    return element;
  }

  function makePlantCard(plant) {
    const status = careStatus(plant);
    const card = makeElement("article", "plant-card" + (status.daysLeft <= 0 ? " needs-water" : ""));
    const illustration = makeElement("div", "plant-illustration");
    illustration.setAttribute("aria-hidden", "true");
    illustration.textContent = "✿";

    const details = makeElement("div", "plant-details");
    details.appendChild(makeElement("h3", "", plant.name));
    details.appendChild(makeElement("p", "species", plant.species || "Plant friend"));

    const rhythm = makeElement("p", "care-rhythm", "Every " + plant.interval + " days · Last watered " + readableDate(plant.lastWatered));
    details.appendChild(rhythm);

    const care = makeElement("div", "plant-care");
    const statusLabel = makeElement("span", "care-status" + (status.daysLeft <= 0 ? " status-due" : status.daysLeft <= 2 ? " status-soon" : ""), status.label);
    care.appendChild(statusLabel);
    if (status.daysLeft <= 0) {
      const waterButton = makeElement("button", "button water-button", "Watered today");
      waterButton.type = "button";
      waterButton.addEventListener("click", function () {
        plant.lastWatered = todayString();
        savePlants();
        renderPlants();
      });
      care.appendChild(waterButton);
    }

    const removeButton = makeElement("button", "remove-button", "Remove");
    removeButton.type = "button";
    removeButton.setAttribute("aria-label", "Remove " + plant.name);
    removeButton.addEventListener("click", function () {
      const index = plants.findIndex(function (item) { return item.id === plant.id; });
      if (index !== -1) plants.splice(index, 1);
      savePlants();
      renderPlants();
    });

    const actions = makeElement("div", "plant-actions");
    actions.append(care, removeButton);
    card.append(illustration, details, actions);
    return card;
  }

  function renderPlants() {
    const query = searchBox.value.trim().toLowerCase();
    const dueCount = plants.filter(function (plant) { return careStatus(plant).daysLeft <= 0; }).length;
    const upcomingCount = plants.filter(function (plant) {
      const daysLeft = careStatus(plant).daysLeft;
      return daysLeft > 0 && daysLeft <= 2;
    }).length;

    document.getElementById("due-count").textContent = dueCount;
    document.getElementById("upcoming-count").textContent = upcomingCount;
    document.getElementById("total-count").textContent = plants.length;
    document.getElementById("all-filter-count").textContent = plants.length;
    document.getElementById("due-filter-count").textContent = dueCount;

    const matches = plants.filter(function (plant) {
      const status = careStatus(plant);
      const matchesSearch = (plant.name + " " + plant.species).toLowerCase().indexOf(query) !== -1;
      const matchesFilter = activeFilter === "all" || (activeFilter === "due" && status.daysLeft <= 0) || (activeFilter === "healthy" && status.daysLeft > 0);
      return matchesSearch && matchesFilter;
    }).sort(function (first, second) {
      return careStatus(first).daysLeft - careStatus(second).daysLeft;
    });

    plantList.replaceChildren.apply(plantList, matches.map(makePlantCard));
    document.getElementById("empty-message").hidden = plants.length > 0;
    document.getElementById("no-results").hidden = plants.length === 0 || matches.length > 0;
    document.querySelectorAll(".filter-button").forEach(function (button) {
      const selected = button.dataset.filter === activeFilter;
      button.classList.toggle("active", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
  }

  function savePlants() {
    storage.set("goodGrowthPlants", plants);
  }

  function openPlantDialog() {
    plantForm.reset();
    plantDialog.showModal();
    plantForm.elements.name.focus();
  }

  document.getElementById("open-plant-form").addEventListener("click", openPlantDialog);
  document.getElementById("empty-add").addEventListener("click", openPlantDialog);
  document.getElementById("header-add").addEventListener("click", function (event) {
    event.preventDefault();
    window.location.hash = "plants";
    openPlantDialog();
  });
  document.getElementById("close-plant-form").addEventListener("click", function () { plantDialog.close(); });
  document.getElementById("cancel-plant-form").addEventListener("click", function () { plantDialog.close(); });
  plantForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const formData = new FormData(plantForm);
    plants.push({
      id: "plant-" + Date.now(),
      name: String(formData.get("name")).trim(),
      species: String(formData.get("species")).trim() || "Plant friend",
      interval: Number(formData.get("interval")),
      lastWatered: todayString()
    });
    savePlants();
    searchBox.value = "";
    activeFilter = "all";
    renderPlants();
    plantDialog.close();
  });

  searchBox.addEventListener("input", renderPlants);
  document.querySelectorAll(".filter-button").forEach(function (button) {
    button.addEventListener("click", function () {
      activeFilter = button.dataset.filter;
      renderPlants();
    });
  });

  function renderSitters() {
    const sitterList = document.getElementById("sitter-list");
    sitterList.replaceChildren.apply(sitterList, SITTERS.map(function (sitter) {
      const card = makeElement("article", "sitter-card");
      const avatar = makeElement("span", "sitter-avatar", sitter.initials);
      avatar.setAttribute("aria-hidden", "true");
      const heading = makeElement("div", "sitter-heading");
      heading.append(makeElement("h2", "", sitter.name), makeElement("p", "", sitter.area));
      const specialty = makeElement("p", "sitter-specialty", sitter.specialty);
      const footer = makeElement("div", "sitter-footer");
      footer.appendChild(makeElement("strong", "", "$" + sitter.rate + " / visit"));
      const requestButton = makeElement("button", "button secondary", "Request a visit");
      requestButton.type = "button";
      requestButton.addEventListener("click", function () {
        document.getElementById("confirmation-title").textContent = "Request noted";
        document.getElementById("confirmation-message").textContent = "Your sample request for " + sitter.name + " is just a demo. No sitter has been contacted and no payment was made.";
        confirmationDialog.showModal();
      });
      footer.appendChild(requestButton);
      card.append(avatar, heading, specialty, footer);
      return card;
    }));
  }

  document.getElementById("close-confirmation").addEventListener("click", function () { confirmationDialog.close(); });

  function showView() {
    const requested = (window.location.hash || "#plants").slice(1);
    const current = requested === "sitters" ? "sitters" : "plants";
    document.querySelectorAll("[data-view]").forEach(function (view) {
      view.hidden = view.id !== current;
    });
    document.querySelectorAll("nav a").forEach(function (link) {
      if (link.getAttribute("href") === "#" + current) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
    window.scrollTo(0, 0);
  }

  window.addEventListener("hashchange", showView);
  renderPlants();
  renderSitters();
  showView();
})();