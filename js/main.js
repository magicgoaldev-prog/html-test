const variants = [
  { weight: "100 г", sku: "01306", price: 326.4, oldPrice: 349.2 },
  { weight: "500 г", sku: "01307", price: 1432, oldPrice: 1646 },
  { weight: "1000 г", sku: "01308", price: 2064, oldPrice: 2592 },
  { weight: "5000 г", sku: "01309", price: 6320, oldPrice: 8710 },
];

const skuEl = document.querySelector("[data-sku]");
const priceEl = document.querySelector("[data-price]");
const oldPriceEl = document.querySelector("[data-old-price]");
const packButtons = [...document.querySelectorAll(".pack")];

function formatRub(value) {
  const fixed = Number.isInteger(value) ? String(value) : value.toFixed(2);
  const [whole, fraction] = fixed.split(".");
  const grouped = whole.replace(/\B(?=(\d{3})+(?!\d))/g, "\u00a0");
  return fraction ? `${grouped},${fraction} ₽` : `${grouped} ₽`;
}

function selectVariant(variant) {
  skuEl.textContent = variant.sku;
  priceEl.textContent = formatRub(variant.price);

  if (variant.oldPrice == null) {
    oldPriceEl.hidden = true;
    oldPriceEl.textContent = "";
  } else {
    oldPriceEl.hidden = false;
    oldPriceEl.textContent = formatRub(variant.oldPrice);
  }

  packButtons.forEach((button) => {
    const active = button.dataset.weight === variant.weight;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
}

document.querySelector(".product__packs").addEventListener("click", (event) => {
  const button = event.target.closest(".pack");
  if (!button) return;

  const variant = variants.find((item) => item.weight === button.dataset.weight);
  if (variant) selectVariant(variant);
});
