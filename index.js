const btn = document.querySelector('.container__btn');
const images = document.querySelector('.container__images');
const loader = document.querySelector('#loader');

btn.addEventListener('click',() => {
  loader.style.display = "block";

  fetch('https://dog.ceo/api/breeds/image/random/20')
    .then((response) => response.json())
    .then((data) => {
      images.innerHTML = "";
      data.message.forEach((img) => {
        const imgElement = document.createElement('img');
        imgElement.src = img;
        imgElement.alt = 'Image`s Gallery'
        images.appendChild(imgElement);
      });
    })
    .catch((error) => {
      console.log(error.message);
    })
    .finally(() => {
      loader.style.display = "none";
    }) 
})
