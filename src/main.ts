console.log("🎮 CMPM 121 – Incremental demo");

let units = 0; // current count
let growthPerSec = 0; // auto growth rate (units/second) — Step 5 starts at 0
let upgrades = 0; // number of upgrades purchased
const UPGRADE_COST = 10; // flat 10 units per purchase (per spec)

const EMOJI = "🐝";
const UNIT_LABEL = "honey";

const app = document.createElement("div");
app.style.fontFamily = "system-ui, sans-serif";
app.style.maxWidth = "600px";
app.style.margin = "2rem auto";
app.style.lineHeight = "1.5";
document.body.innerHTML = "";
document.body.append(app);

// Title
const title = document.createElement("h1");
title.textContent = "Tiny Incremental (🐝)";
app.append(title);

// Step 1: Click button
const clickBtn = document.createElement("button");
clickBtn.textContent = `${EMOJI} Click me!`;
clickBtn.style.fontSize = "1.25rem";
clickBtn.style.padding = "0.6rem 1rem";
clickBtn.style.borderRadius = "0.75rem";
clickBtn.style.cursor = "pointer";
app.append(clickBtn);
