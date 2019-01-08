//Declare Variables
let images = document.querySelectorAll('.slide');
let navDots = document.querySelectorAll('.dot');
let navIcon = document.querySelector('.hamburger');
let leftArrow = document.querySelector('.left-arrow');
let rightArrow = document.querySelector('.right-arrow');
let topBtn = document.querySelector('.top-button');
let head = document.querySelector('header');

const seconds = 3000;
let time = setInterval(auto, seconds);
let current = 0;

// Include Smooth Scroll functionality
var scroll = new SmoothScroll('a[href*="#"]', {
  speed: 500,
  offset: 64
});

// Event Handlers
navIcon.addEventListener('click', iconClick);
window.addEventListener('scroll', headTop);
window.addEventListener('scroll', btnTop);

// Automate slider
function auto() {
  current = (current + 1) % navDots.length;
  start();
}

// Start slider
function start() {
  navDots.forEach(function(navDot, i) {
    if (current === i) {
      images[i].style.display = 'block';
      navDot.classList.add('active');
    } else {
      images[i].style.display = 'none';
      navDot.classList.remove('active');
    }
  });
}

// Manual slider
navDots.forEach(function(navDot, i) {
  navDot.addEventListener('click', function() {
    if (current === i || navDot.className !== 'dot') {
      return;
    }
    clearInterval(time);
    time = setInterval(auto, seconds);
    current = i;
    start();
  });
});

// Left arrow click
leftArrow.addEventListener('click', function() {
  current === 0 ? (current = navDots.length - 1) : current--;
  start();
});

// Right arrow click
rightArrow.addEventListener('click', function() {
  current === navDots.length - 1 ? (current = 0) : current++;
  start();
});

// Stop automatic slide when hovered
images.forEach(function(image) {
  image.addEventListener('mouseover', function() {
    clearInterval(time);
  });
  start();
});

// Start automatic slide when not hovered
images.forEach(function(image) {
  image.addEventListener('mouseout', function() {
    clearInterval(time);
    time = setInterval(auto, seconds);
  });
  start();
});

// Stop automatic slider when left arrow is hovered
leftArrow.addEventListener('mouseenter', function() {
  clearInterval(time);
});

// Stop automatic slider when right arrow is hovered
rightArrow.addEventListener('mouseenter', function() {
  clearInterval(time);
});

// Start automatic slider when left arrow is not hovered
leftArrow.addEventListener('mouseleave', function() {
  clearInterval(time);
  time = setInterval(auto, seconds);
});

// Start automatic slider when right arrow is not hovered
rightArrow.addEventListener('mouseleave', function() {
  clearInterval(time);
  time = setInterval(auto, seconds);
});

// Hamburger icon click functionally
function iconClick() {
  navIcon.classList.toggle('is-active');
}

// Change header opacity to 100% when not on top and to 90% when on top
function headTop() {
  window.pageYOffset > 0 ? (head.style.opacity = '1') : (head.style.opacity = '0.9');
}

// Change which Y-position the top button is visible/invisible
function btnTop() {
  window.pageYOffset > 200 ? (topBtn.style.right = '0') : (topBtn.style.right = '-100px');
}
