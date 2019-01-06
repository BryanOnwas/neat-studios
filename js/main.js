let images = document.querySelectorAll('.slide');
let navDots = document.querySelectorAll('.dot');
let navIcon = document.querySelector('.hamburger');
let leftArrow = document.querySelector('.left-arrow');
let rightArrow = document.querySelector('.right-arrow');
let topBtn = document.querySelector('.top-button');
let head = document.querySelector('header');

const seconds = 5000;
let time = setInterval(auto, seconds);
let current = 0;

// Include Smooth Scroll functionality
var scroll = new SmoothScroll('a[href*="#"]', {
  speed: 500,
  offset: 64
});

navIcon.addEventListener('click', iconClick);
window.addEventListener('scroll', headTop);
window.addEventListener('scroll', btnTop);

// Init slider
function reset() {
  for (let i = 0; i < images.length; i++) {
    images[0].style.display = 'none';
    navDots[0].id = '';
  }
}

// Automate slider
function auto() {
  current = (current + 1) % navDots.length;
  start();
}

// Start slider
function start() {
  reset();
  for (let i = 0; i < navDots.length; i++) {
    if (current === i) {
      images[i].style.display = 'block';
      navDots[i].id = 'active';
    } else {
      images[i].style.display = 'none';
      navDots[i].id = '';
    }
  }
}

// Manual slider
for (let i = 0; i < navDots.length; i++) {
  navDots[i].addEventListener('click', function(e) {
    document.body.className = '';
    if (current === i || e.target.className !== 'dot') {
      return;
    } else {
      clearInterval(time);
      time = setInterval(auto, seconds);
    }
    current = i;
    start();
  });
}

// Left arrow click
leftArrow.addEventListener('click', function() {
  document.body.className = '';
  if (current === 0) {
    current = navDots.length - 1;
  } else {
    current--;
  }
  start();
});

// Right arrow click
rightArrow.addEventListener('click', function() {
  document.body.className = '';
  if (current === navDots.length - 1) {
    current = 0;
  } else {
    current++;
  }
  start();
});

// Stop automatic slide when hovered
for (let i = 0; i < images.length; i++) {
  images[i].addEventListener('mouseover', function() {
    clearInterval(time);
  });
  start();
}

// Start automatic slide when not hovered
for (let i = 0; i < images.length; i++) {
  images[i].addEventListener('mouseout', function() {
    clearInterval(time);
    time = setInterval(auto, seconds);
  });
  start();
}

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

// Change header opacity when scrolled away from top
// Change header opacity to 100% when not on top
// Change header opacity to 90% when on top
function headTop() {
  if (window.pageYOffset > 0) {
    head.style.opacity = '1';
  } else if (window.pageYOffset === 0) {
    head.style.opacity = '0.9';
  }
}

// Change which Y-position the top button is visible/invisible
function btnTop() {
  if (window.pageYOffset > 200) {
    topBtn.style.right = '0';
  } else if (window.pageYOffset < 200) {
    topBtn.style.right = '-100px';
  }
}

start();
