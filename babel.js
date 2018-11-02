'use strict';

var images = document.querySelectorAll('.slide');
var dots = document.querySelectorAll('.dot');
var left = document.querySelector('#left-arrow');
var right = document.querySelector('#right-arrow');
var fade = document.querySelectorAll('.fade');

var seconds = 5000;
var time = setInterval(auto, seconds);
var current = 0;

// Skips the first fade animation after page loads 
// Note: If the CSS animation plays at x seconds, the timeout should be set longer than x seconds. I would add at least 0.5 more seconds just to be safe 
// Note: This function will disable if the content inside the timeout function was added on any event handler
function delay() {
  setTimeout(function () {
    document.body.className = "";
  }, 1000);
}

// Init slider
function reset() {
  for (var i = 0; i < images.length; i++) {
    images[0].style.display = 'none';
    dots[0].id = '';
  }
}

// Automate slider
function auto() {
  current = (current + 1) % dots.length;
  start();
}

// Start slider
function start() {
  reset();
  for (var i = 0; i < dots.length; i++) {
    if (current === i) {
      images[i].style.display = 'block';
      dots[i].id = 'active';
    } else {
      images[i].style.display = 'none';
      dots[i].id = '';
    }
  }
}

// Manual slider
var _loop = function _loop(i) {
  dots[i].addEventListener('click', function (e) {
    document.body.className = "";
    if (current === i || e.target.className !== 'dot') {
      return;
    } else {
      clearInterval(time);
      time = setInterval(auto, seconds);
    }
    current = i;
    start();
  });
};

for (var i = 0; i < dots.length; i++) {
  _loop(i);
}

// Left arrow click
left.addEventListener('click', function () {
  document.body.className = "";
  if (current === 0) {
    current = dots.length - 1;
  } else {
    current--;
  }
  start();
});

// Right arrow click
right.addEventListener('click', function () {
  document.body.className = "";
  if (current === dots.length - 1) {
    current = 0;
  } else {
    current++;
  }
  start();
});

// Stop automatic slide when hovered
for (var i = 0; i < images.length; i++) {
  images[i].addEventListener('mouseover', function () {
    clearInterval(time);
  });
  start();
};

// Start automatic slide when not hovered
for (var _i = 0; _i < images.length; _i++) {
  images[_i].addEventListener('mouseout', function () {
    clearInterval(time);
    time = setInterval(auto, seconds);
  });
  start();
};

// Stop automatic slider when left arrow hovered
left.addEventListener('mouseenter', function () {
  clearInterval(time);
});

// Stop automatic slider when right arrow hovered
right.addEventListener('mouseenter', function () {
  clearInterval(time);
});

// Stop automatic slider when left arrow hovered
left.addEventListener('mouseleave', function () {
  clearInterval(time);
  time = setInterval(auto, seconds);
});

// Stop automatic slider when right arrow hovered
right.addEventListener('mouseleave', function () {
  clearInterval(time);
  time = setInterval(auto, seconds);
});

delay();
start();