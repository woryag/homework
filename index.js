const links = document.querySelectorAll('.container__link');
const images = document.querySelectorAll('.slider__image');
const dots = document.querySelectorAll('.slider__dots .dot');
const arrowForward = document.querySelector('.next');
const arrowBack = document.querySelector('.prev');

let currentIndex = 0;

function updateSlider(index) {
  images.forEach(img => img.classList.remove('active'));
  links.forEach(link => link.classList.remove('activies'));
  dots.forEach(dot => dot.classList.remove('active'));

  images[index].classList.add('active');
  links[index].classList.add('activies');
  dots[index].classList.add('active');
}

links.forEach((link, i) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    currentIndex = i;
    updateSlider(currentIndex);
  });
});

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    currentIndex = i;
    updateSlider(currentIndex);
  });
});

arrowForward.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % images.length;
  updateSlider(currentIndex);
});

arrowBack.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateSlider(currentIndex);
});