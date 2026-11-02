// Sample plants are fictional. The app copies these into localStorage on first visit.
const STARTUP = {
  name: "Good Growth",
  tagline: "A calmer way to care for your plants.",
  pitch: "Know what needs water, when it needs it, and who can help while you are away."
};

const INITIAL_PLANTS = [
  { id: "plant-1", name: "Monstera", species: "Monstera deliciosa", interval: 7, lastWatered: "2026-10-24" },
  { id: "plant-2", name: "Olive", species: "Olive tree", interval: 10, lastWatered: "2026-10-25" },
  { id: "plant-3", name: "Little cactus", species: "Mammillaria", interval: 21, lastWatered: "2026-10-16" },
  { id: "plant-4", name: "Golden pothos", species: "Epipremnum aureum", interval: 5, lastWatered: "2026-10-29" }
];

const SITTERS = [
  { name: "Alex Morgan", area: "Downtown", specialty: "Tropical plants", rate: 18, initials: "AM" },
  { name: "Jamie Lee", area: "North End", specialty: "Succulents & cacti", rate: 15, initials: "JL" },
  { name: "Riley Chen", area: "West Side", specialty: "Small home jungles", rate: 20, initials: "RC" }
];
