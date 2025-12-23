const params = new URLSearchParams(window.location.search);
const container = document.getElementById('invoiceDetails');

const plan = params.get('plan');
const fragrance1 = params.get('fragrance1');
const fragrance2 = params.get('fragrance2');
const price = params.get('price');

let html = `
  <p><strong>Subscription:</strong> ${plan}</p>
  <p><strong>Fragrance 1:</strong> ${fragrance1}</p>
`;

if (fragrance2) {
  html += `<p><strong>Fragrance 2:</strong> ${fragrance2}</p>`;
}

html += `
  <hr />
  <p><strong>Total:</strong> $${price}</p>
`;

container.innerHTML = html;
