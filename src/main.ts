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

const readout = document.createElement("div");
readout.style.fontSize = "1.5rem";
readout.style.margin = "0.5rem 0 1rem";
app.append(readout);

// Step 1: Click button
const clickBtn = document.createElement("button");
clickBtn.textContent = `${EMOJI} Click me!`;
clickBtn.style.fontSize = "1.25rem";
clickBtn.style.padding = "0.6rem 1rem";
clickBtn.style.borderRadius = "0.75rem";
clickBtn.style.cursor = "pointer";
app.append(clickBtn);

const upgradeBtn = document.createElement("button");
upgradeBtn.textContent =
  `Buy upgrade (+1 ${UNIT_LABEL}/sec) – Cost: ${UPGRADE_COST}`;
upgradeBtn.style.fontSize = "1rem";
upgradeBtn.style.padding = "0.5rem 0.8rem";
upgradeBtn.style.marginLeft = "1rem";
upgradeBtn.style.borderRadius = "0.75rem";
upgradeBtn.style.cursor = "pointer";
app.append(upgradeBtn);

// Logic
function formatUnits(x: number): string {
  const isNearlyInt = Math.abs(x - Math.round(x)) < 1e-6;
  return isNearlyInt ? Math.round(x).toLocaleString() : x.toFixed(1);
}

function pluralize(label: string, _amount: number): string {
  return label;
}

// Status display
const status = document.createElement("div");
status.style.fontSize = "1rem";
status.style.margin = "0.5rem 0 1rem";
app.append(status);

function render() {
  readout.textContent = `${formatUnits(units)} ${pluralize(UNIT_LABEL, units)}`;
  status.textContent = `Upgrades: ${upgrades} | Auto rate: ${
    growthPerSec.toFixed(1)
  } ${UNIT_LABEL}/sec`;
}

function updateUpgradeButton() {
  upgradeBtn.disabled = units < UPGRADE_COST;
  upgradeBtn.style.opacity = upgradeBtn.disabled ? "0.6" : "1";
}

// Step 2: clicking increases by 1
clickBtn.addEventListener("click", () => {
  units += 1;
  render();
  updateUpgradeButton();
});

// Steps 3 & 4
let lastTime = performance.now();

function tick(now: number) {
  const dtSec = Math.max(0, (now - lastTime) / 1000);
  lastTime = now;

  if (growthPerSec > 0) {
    units += growthPerSec * dtSec;
    render();
    updateUpgradeButton();
  }

  requestAnimationFrame(tick);
}

// Initial render + start loop
render();
updateUpgradeButton();
requestAnimationFrame(tick);

// Step 5: purchasing an upgrade (+1/sec), costs 10, can buy multiple times
upgradeBtn.addEventListener("click", () => {
  if (units >= UPGRADE_COST) {
    units -= UPGRADE_COST;
    upgrades += 1;
    growthPerSec += 1; // each purchase increases the auto rate by 1 unit/sec
    render();
    updateUpgradeButton();
  }
});