console.log("🎮 CMPM 121 – Incremental demo");

let units = 0; // current count

const EMOJI = "🐝";
const UNIT_LABEL = "honey";

//Step 6 & 7: Multiple upgrades and price increase
interface Item {
  key: string;
  name: string;
  cost: number;
  rate: number;
  count: number;
  button?: HTMLButtonElement;
  countSpan?: HTMLSpanElement;
  costSpan?: HTMLSpanElement;
}

const items: Item[] = [
  { key: "A", name: "A", cost: 10, rate: 0.1, count: 0 },
  { key: "B", name: "B", cost: 100, rate: 2.0, count: 0 },
  { key: "C", name: "C", cost: 1000, rate: 50, count: 0 },
];

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

// (Step 6)
const rateLine = document.createElement("div");
rateLine.style.opacity = "0.9";
app.append(rateLine);

// Step 1: Click button
const clickBtn = document.createElement("button");
clickBtn.textContent = `${EMOJI} Click me!`;
clickBtn.style.fontSize = "1.25rem";
clickBtn.style.padding = "0.6rem 1rem";
clickBtn.style.borderRadius = "0.75rem";
clickBtn.style.cursor = "pointer";
app.append(clickBtn);

const shopHeader = document.createElement("h2");
shopHeader.textContent = "Upgrades";
shopHeader.style.marginTop = "1rem";
app.append(shopHeader);

const shopList = document.createElement("div");
shopList.style.display = "grid";
shopList.style.gridTemplateColumns = "1fr";
shopList.style.gap = "0.5rem";
app.append(shopList);

// Logic
function formatUnits(x: number): string {
  const isNearlyInt = Math.abs(x - Math.round(x)) < 1e-6;
  return isNearlyInt ? Math.round(x).toLocaleString() : x.toFixed(1);
}
function totalRate(): number {
  return items.reduce((s, it) => s + it.count * it.rate, 0);
}

function buildShop() {
  shopList.innerHTML = "";
  items.forEach((it) => {
    const row = document.createElement("div");
    row.style.display = "grid";
    row.style.gridTemplateColumns = "minmax(0,1fr) auto";
    row.style.alignItems = "center";
    row.style.gap = "0.75rem";
    row.style.padding = "0.6rem 0.8rem";
    row.style.border = "1px solid #ddd";
    row.style.borderRadius = "0.75rem";

    const left = document.createElement("div");
    const name = document.createElement("div");
    name.style.fontWeight = "600";
    name.textContent = `Item ${it.name}`;
    const stats = document.createElement("div");
    const countSpan = document.createElement("span");
    const rateSpan = document.createElement("span");
    rateSpan.textContent = ` | ${it.rate} ${UNIT_LABEL}/sec each`;
    stats.append(countSpan, rateSpan);
    left.append(name, stats);

    const btn = document.createElement("button");
    btn.style.padding = "0.5rem 0.8rem";
    btn.style.borderRadius = "0.75rem";
    const costSpan = document.createElement("span");
    costSpan.textContent = `${it.cost} ${UNIT_LABEL}`;
    btn.append(`Buy Item ${it.name} – `, costSpan);

    btn.addEventListener("click", () => {
      if (units >= it.cost) {
        units -= it.cost;
        it.count += 1;
        render();
      }
    });

    it.button = btn;
    it.countSpan = countSpan;
    it.costSpan = costSpan;

    row.append(left, btn);
    shopList.append(row);
  });
}

function render() {
  readout.textContent = `${formatUnits(units)} ${UNIT_LABEL}`;
  const r = totalRate();
  rateLine.textContent = `Production: ${r.toFixed(2)} ${UNIT_LABEL}/sec`;

  items.forEach((it) => {
    if (it.countSpan) it.countSpan.textContent = `Owned: ${it.count}`;
    if (it.button) {
      const affordable = units >= it.cost;
      it.button.disabled = !affordable;
      it.button.style.opacity = affordable ? "1" : "0.6";
      it.button.style.cursor = affordable ? "pointer" : "not-allowed";
    }
  });
}

// Step 2: clicking increases by 1
clickBtn.addEventListener("click", () => {
  units += 1;
  render();
});

// Steps 3 & 4
let last = performance.now();
function tick(now: number) {
  const dt = (now - last) / 1000;
  last = now;
  units += totalRate() * dt;
  render();
  requestAnimationFrame(tick);
}

buildShop();
render();
requestAnimationFrame(tick);
