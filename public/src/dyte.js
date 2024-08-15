const navbar = document.querySelector('.header.navbar');
const menu = document.querySelector('#menu');

menu.onclick = () => {
  menu.classList.toggle('fa-times');
  navbar.classList.toggle('active');
};

window.onscroll = () => {
  menu.classList.remove('fa-times');
};

var swiper = new Swiper('.review-slider', {
  loop: true,
  grabCursor: true,
  spaceBetween: 20,
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    740: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
    }
  },
  pagination: {
    el: '.swiper-pagination',
  }
});
