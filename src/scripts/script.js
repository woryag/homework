// const slider = document.querySelectorAll('.slider__banner');
// const dots = document.querySelectorAll('.dot');
// const bookContianer = document.querySelector('.books-cards');
// const loadMoreBtn = document.querySelector('.main__button');

// let currentCategory = "Architecture";
// let startIndex = 0;
// const maxResults = 6;
// let cart = JSON.parse(localStorage.getItem("cart")) || [];
// let currentIndex = 0;
// let intervalTime = 5000;
// let slideInterval;

// function showSlide(index) {
//   slider.forEach(slide => slide.classList.remove('active'));
//   dots.forEach(dot => dot.classList.remove('active'));

//   slider[index].classList.add('active');
//   dots[index].classList.add('active');
//   currentIndex = index;
// }

// function nextSlide() {
//   let nextIndex = (currentIndex + 1) % slider.length;
//   showSlide(nextIndex);
// }

// dots.forEach(dot => {
//   dot.addEventListener('click', function() {
//     const index = Number(this.dataset.index);
//     showSlide(index);
//     resetInterval();
//   });
// });

// function startInterval() {
//   slideInterval = setInterval(nextSlide, intervalTime);
// }

// function resetInterval() {
//   clearInterval(slideInterval);
//   startInterval();
// }

// startInterval();

// function fetchBook(category = currentCategory) {
//   fetch(`https://www.googleapis.com/books/v1/volumes?q=subject:${category}&startIndex=${startIndex}&maxResults=${maxResults}`)
//   .then(res => res.json())
//   .then(data => {
//     if(!data.items) return

//     data.items.forEach(book => {
//       const info = book.volumeInfo;
//       const saleInfo = book.saleInfo;

//       const title = info.title || 'Без названия';
//       const authors = info.authors ? info.authors.join(', ') : 'Автор неизвестен';
//       const thumbnail = info.imageLinks?.thumbnail || 'https://via.placeholder.com/128x192?text=No+Image';
//       const description = info.description ? truncateText(info.description, 200) : 'Описание отсутствует';
//       const rating = info.averageRating;
//       const ratingsCount = info.ratingsCount;
//       const price = saleInfo.listPrice ? `${saleInfo.listPrice.amount} ${saleInfo.listPrice.currencyCode}` : null;

//       const isInCart = cart.includes(book.id);

//       const card = `
//         <div class="book-card">
//           <div class="book-card__img">
//             <img class="book-card__img" src="${thumbnail}" alt="${title}">
//           </div>
//           <div class="book-card__content">
//             <div class="cap">
//               <p class="authors">${authors}</p>
//               <h3 class="title">${title}</h3>
//               ${rating ? renderStar(rating, ratingsCount) : ''}
//             </div>
//             <p class="desc">${description}</p>
//             ${price ? `<p class="price">${price}</p>` : ''}
//             <button class="buy-btn" ${isInCart ? 'in-cart' : ''}' data-id='${book.id}'>
//               ${isInCart ? 'In cart' : 'Buy now'}
//             </button>
//           </div>
//         </div>
//       `;
//       bookContianer.insertAdjacentHTML('beforeend', card);
//     });

//     addCardEvents(); // навешиваем события на кнопки
//   })
//   .catch(err => console.log("Ошибка:", err));
// }

// function truncateText(text, maxLength) {
//   if(text.length <= maxLength) return text;
//   return text.substring(0, maxLength) + '...';
// }

// function renderStar(rating, count) {
//   let stars = '';
//   for(let i = 1; i <= 5; i++) {
//     stars += i <= rating ? '★' : '☆';
//   }
//   return `<p class="rating">${stars} (${count})</p>`;
// }

// function addCardEvents() {
//   const buttons = document.querySelectorAll('.buy-btn');
//   buttons.forEach(btn => {
//     btn.addEventListener('click', () => {
//       const id = this.dataset.id;
//       if(cart.includes(id)) {
//         cart = cart.filter(item => item !== id);
//         this.classList.remove('in-cart');
//         this.textContent = 'Buy Now';
//       } else {
//         cart.push(id);
//         this.classList.add('in-cart');
//         this.textContent = 'In cart';
//       }
//       localStorage.setItem('cart', JSON.stringify(cart));
//     });
//   });
// }

// loadMoreBtn.addEventListener('click', () => {
//   startIndex += maxResults;
//   fetchBook();
// });

// fetchBook();

// script.js (исправленный)
const slider = document.querySelectorAll('.slider__banner');
const dots = document.querySelectorAll('.dot');
const booksContainer = document.querySelector('.books-cards');
const loadMoreBtn = document.querySelector('.main__button');
const categoryLinks = document.querySelectorAll('.catalog__link');

let currentCategory = "Architecture";
let startIndex = 0;
const maxResults = 6;
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let currentIndex = 0;
let intervalTime = 5000;
let slideInterval;

dots.forEach((dot, i) => dot.dataset.index = i); // проставляем data-index если в HTML их нет

function showSlide(index) {
  if (index < 0 || index >= slider.length) return;
  slider.forEach(slide => slide.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));

  slider[index].classList.add('active');
  dots[index].classList.add('active');
  currentIndex = index;
}

function nextSlide() {
  const nextIndex = (currentIndex + 1) % slider.length;
  showSlide(nextIndex);
}

dots.forEach(dot => {
  dot.addEventListener('click', function () {
    const index = Number(this.dataset.index);
    if (!Number.isNaN(index)) {
      showSlide(index);
      resetInterval();
    }
  });
});

function startInterval() {
  clearInterval(slideInterval);
  slideInterval = setInterval(nextSlide, intervalTime);
}

function resetInterval() {
  clearInterval(slideInterval);
  startInterval();
}

showSlide(0);
startInterval();

function truncateText(text, maxLength) {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}

function renderStar(rating, count) {
  const r = Math.round(rating);
  let stars = '';
  for (let i = 1; i <= 5; i++) {
    stars += i <= r ? '★' : '☆';
  }
  return `<p class="rating">${stars}${count ? ` (${count})` : ''}</p>`;
}

function escapeHTML(str = '') {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

async function fetchBooks(category = currentCategory) {
  try {
    const url = `https://www.googleapis.com/books/v1/volumes?q=subject:${encodeURIComponent(category)}&startIndex=${startIndex}&maxResults=${maxResults}`;
    const res = await fetch(url);
    const data = await res.json();

    if (!data.items || data.items.length === 0) {
      if (startIndex === 0) booksContainer.innerHTML = '<p>Книги не найдены.</p>';
      return;
    }

    if (startIndex === 0) booksContainer.innerHTML = '';

    data.items.forEach(item => {
      const info = item.volumeInfo || {};
      const saleInfo = item.saleInfo || {};

      const title = info.title || 'Без названия';
      const authors = info.authors ? info.authors.join(', ') : 'Автор неизвестен';
      const thumbnail = info.imageLinks?.thumbnail || info.imageLinks?.smallThumbnail || 'https://via.placeholder.com/128x192?text=No+Image';
      const description = info.description ? truncateText(info.description.replace(/(<([^>]+)>)/gi, ''), 200) : 'Описание отсутствует';
      const rating = info.averageRating;
      const ratingsCount = info.ratingsCount;
      const price = saleInfo && saleInfo.listPrice 
  ? `${saleInfo.listPrice.amount} ${saleInfo.listPrice.currencyCode}` 
  : null;

      const isInCart = cart.includes(item.id);

      const card = document.createElement('div');
      card.className = 'book-card';
      card.innerHTML = `
        <div class="book-card__img">
          <img src="${escapeHTML(thumbnail)}" alt="${escapeHTML(title)}">
        </div>
        <div class="book-card__content">
          <p class="authors">${escapeHTML(authors)}</p>
          <h3 class="title">${escapeHTML(title)}</h3>
          ${rating ? renderStar(rating, ratingsCount) : ''}
          <p class="desc">${escapeHTML(description)}</p>
          ${price ? `<p class="price">${escapeHTML(price)}</p>` : ''}
          <button class="buy-btn ${isInCart ? 'in-cart' : ''}" data-id="${escapeHTML(item.id)}">
            ${isInCart ? 'In cart' : 'Buy now'}
          </button>
        </div>
      `;
      booksContainer.appendChild(card);
    });

  } catch (err) {
    console.error('Ошибка при fetchBooks:', err);
  }
}

booksContainer.addEventListener('click', (e) => {
  const btn = e.target.closest('.buy-btn');
  if (!btn) return;
  const id = btn.dataset.id;
  if (!id) return;

  if (cart.includes(id)) {
    cart = cart.filter(item => item !== id);
    btn.classList.remove('in-cart');
    btn.textContent = 'Buy now';
  } else {
    cart.push(id);
    btn.classList.add('in-cart');
    btn.textContent = 'In cart';
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
});


categoryLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const text = link.textContent.trim();
    if (!text) return;
    categoryLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');

    currentCategory = text;
    startIndex = 0;
    fetchBooks();
  });
});

loadMoreBtn.addEventListener('click', () => {
  startIndex += maxResults;
  fetchBooks();
});

function updateCartCount() {
  const cartCountEl = document.querySelector('.cart-count');
  
  if (cart.length > 0) {
    cartCountEl.textContent = cart.length;
    cartCountEl.style.display = 'inline-flex';
  } else {
    cartCountEl.textContent = '';
    cartCountEl.style.display = 'none';
  }
}

const shopBagBtn = document.querySelector('.shop-bag');

shopBagBtn.addEventListener('click', () => {
  cart = [];
  localStorage.setItem('cart', JSON.stringify(cart));

  updateCartCount();

  fetchBooks();
});

fetchBooks();
updateCartCount();
