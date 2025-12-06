const products = [
  {
    name: 'Ассорти ягод',
    desc: 'Лёгкий бисквит с ягодами в карамельной глазури.',
    price: 500,
    img: 'img/card-berry-mix.jpg'
  },
  {
    name: 'Красный бархат',
    desc: 'Классический торт с бархатным вкусом и сливочным кремом.',
    price: 550,
    img: 'img/card-red-velvet.jpg'
  },
  {
    name: 'Молочный рай',
    desc: 'Нежнейший ванильный бисквит с молочным кремом.',
    price: 600,
    img: 'img/card-milky-paradise.jpg'
  },
  {
    name: 'Ванильная фантазия',
    desc: 'Пышные кексы с воздушным кремом пастельных оттенков.',
    price: 650,
    img: 'img/card-vanilla.jpg'
  },
  {
    name: 'Карамельный праздник',
    desc: 'Сладкая карамель и шоколадная крошка на мягком тесте.',
    price: 700,
    img: 'img/card-caramel.jpg'
  }
];

const quantities = products.map(() => 0);

function updateTotal() {
  const total = quantities.reduce((sum, qty, i) => sum + qty * products[i].price, 0);
  document.getElementById('total-sum').textContent = `Общая сумма: ${total} ₽`;
}

function renderCard(i) {
  const prod = products[i];
  const card = document.querySelector(`#card-${i}`);
  card.innerHTML = '';
  const img = document.createElement('img');
  img.src = prod.img;
  img.alt = prod.name;
  card.appendChild(img);
  const body = document.createElement('div');
  body.className = 'card-body';
  card.appendChild(body);
  const title = document.createElement('h3');
  title.textContent = prod.name;
  body.appendChild(title);
  const priceEl = document.createElement('p');
  priceEl.className = 'card-price';
  priceEl.textContent = `${prod.price} ₽/шт.`;
  body.appendChild(priceEl);
  const descEl = document.createElement('p');
  descEl.className = 'card-text';
  descEl.textContent = prod.desc;
  body.appendChild(descEl);
  if (quantities[i] === 0) {
    const orderBtn = document.createElement('button');
    orderBtn.className = 'btn btn-secondary';
    orderBtn.textContent = 'Заказать';
    orderBtn.addEventListener('click', () => {
      quantities[i]++;
      renderCard(i);
      updateTotal();
    });
    body.appendChild(orderBtn);
  } else {
    const controls = document.createElement('div');
    controls.className = 'quantity-controls';
    const minusBtn = document.createElement('button');
    minusBtn.className = 'btn btn-secondary';
    minusBtn.textContent = '−';
    minusBtn.addEventListener('click', () => {
      quantities[i] = Math.max(0, quantities[i] - 1);
      renderCard(i);
      updateTotal();
    });
    controls.appendChild(minusBtn);
    const qtySpan = document.createElement('span');
    qtySpan.textContent = quantities[i];
    controls.appendChild(qtySpan);
    const plusBtn = document.createElement('button');
    plusBtn.className = 'btn btn-secondary';
    plusBtn.textContent = '+';
    plusBtn.addEventListener('click', () => {
      quantities[i]++;
      renderCard(i);
      updateTotal();
    });
    controls.appendChild(plusBtn);
    body.appendChild(controls);
    const totalRow = document.createElement('p');
    totalRow.style.fontWeight = 'bold';
    totalRow.textContent = `Итого: ${quantities[i] * prod.price} ₽`;
    body.appendChild(totalRow);
  }
}

function init() {
  const grid = document.getElementById('product-grid');
  products.forEach((prod, i) => {
    const card = document.createElement('article');
    card.className = 'card';
    card.id = `card-${i}`;
    grid.appendChild(card);
    renderCard(i);
  });
  updateTotal();
}

document.addEventListener('DOMContentLoaded', init);