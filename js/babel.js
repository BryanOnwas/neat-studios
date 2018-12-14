'use strict';

var images = document.querySelectorAll('.slide');
var dots = document.querySelectorAll('.dot');
var left = document.querySelector('#left-arrow');
var right = document.querySelector('#right-arrow');
var fade = document.querySelectorAll('.fade');
var sideBar = document.querySelector('.sidebar');
var hamburger = document.querySelector('.hamburger');
var modal = document.querySelector('.modal-space');
var noScroll = document.querySelector('body');
var topBtn = document.querySelector('.top-button');
var head = document.querySelector('header');
var activeTest = document.querySelector('.test');

var seconds = 5000;
var time = setInterval(auto, seconds);
var current = 0;

hamburger.addEventListener('click', iconClick);
window.addEventListener('click', outsideClick);
topBtn.addEventListener('click', scrollTop);
window.addEventListener('scroll', headTop);
window.addEventListener('scroll', btnTop);

// Skips the first fade animation after page loads
// Note: If the CSS animation plays at x seconds, the timeout should be set longer than x seconds. I would add at least 0.5 more seconds just to be safe
// Note: This function will disable if the content inside the timeout function was added on any event handler
function delay() {
  setTimeout(function() {
    document.body.className = '';
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
  dots[i].addEventListener('click', function(e) {
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
};

for (var i = 0; i < dots.length; i++) {
  _loop(i);
}

// Left arrow click
left.addEventListener('click', function() {
  document.body.className = '';
  if (current === 0) {
    current = dots.length - 1;
  } else {
    current--;
  }
  start();
});

// Right arrow click
right.addEventListener('click', function() {
  document.body.className = '';
  if (current === dots.length - 1) {
    current = 0;
  } else {
    current++;
  }
  start();
});

// Stop automatic slide when hovered
for (var i = 0; i < images.length; i++) {
  images[i].addEventListener('mouseover', function() {
    clearInterval(time);
  });
  start();
}

// Start automatic slide when not hovered
for (var _i = 0; _i < images.length; _i++) {
  images[_i].addEventListener('mouseout', function() {
    clearInterval(time);
    time = setInterval(auto, seconds);
  });
  start();
}

// Stop automatic slider when left arrow hovered
left.addEventListener('mouseenter', function() {
  clearInterval(time);
});

// Stop automatic slider when right arrow hovered
right.addEventListener('mouseenter', function() {
  clearInterval(time);
});

// Stop automatic slider when left arrow hovered
left.addEventListener('mouseleave', function() {
  clearInterval(time);
  time = setInterval(auto, seconds);
});

// Stop automatic slider when right arrow hovered
right.addEventListener('mouseleave', function() {
  clearInterval(time);
  time = setInterval(auto, seconds);
});

// Hamburger icon click functionally
function iconClick() {
  hamburger.classList.toggle('is-active');
  sideBar.classList.toggle('sidebar__open');
  modal.classList.toggle('modal-space__active');
  noScroll.classList.toggle('body__active');
  activeTest.classList.toggle('test__active');
}

// Outside click functionally (in case of modal/sidebar outside clicks)
// Listen for outside clicks
function outsideClick(event) {
  if (event.target.id === 'outside-click') {
    hamburger.classList.remove('is-active');
    sideBar.classList.remove('sidebar__open');
    modal.classList.remove('modal-space__active');
    noScroll.classList.remove('body__active');
    activeTest.classList.remove('test__active');
  }
}

// Scroll-to-top functionally
function scrollTop() {
  scrollIt(0, 300, 'easeOutQuad');
  window.removeEventListener('scroll', headTop);
  setTimeout(function() {
    window.addEventListener('scroll', headTop);
  }, 300);
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

delay();
start();

//-----------------------------------

function scrollIt(destination) {
  var duration =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 200;
  var easing =
    arguments.length > 2 && arguments[2] !== undefined
      ? arguments[2]
      : 'linear';
  var callback = arguments[3];

  var easings = {
    linear: function linear(t) {
      return t;
    },
    easeInQuad: function easeInQuad(t) {
      return t * t;
    },
    easeOutQuad: function easeOutQuad(t) {
      return t * (2 - t);
    },
    easeInOutQuad: function easeInOutQuad(t) {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    },
    easeInCubic: function easeInCubic(t) {
      return t * t * t;
    },
    easeOutCubic: function easeOutCubic(t) {
      return --t * t * t + 1;
    },
    easeInOutCubic: function easeInOutCubic(t) {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    },
    easeInQuart: function easeInQuart(t) {
      return t * t * t * t;
    },
    easeOutQuart: function easeOutQuart(t) {
      return 1 - --t * t * t * t;
    },
    easeInOutQuart: function easeInOutQuart(t) {
      return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
    },
    easeInQuint: function easeInQuint(t) {
      return t * t * t * t * t;
    },
    easeOutQuint: function easeOutQuint(t) {
      return 1 + --t * t * t * t * t;
    },
    easeInOutQuint: function easeInOutQuint(t) {
      return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
    }
  };

  // Store initial position of a window and time
  // If performance is not available in your browser
  // It will fallback to new Date().getTime() - thanks IE < 10
  var start = window.pageYOffset;
  var startTime =
    'now' in window.performance ? performance.now() : new Date().getTime();
  // const startTime = typeof(window.performance['now']) == 'function' ? performance.now() : new Date().getTime();

  // Take height of window and document to sesolve max scrollable value
  // Prevent requestAnimationFrame() from scrolling below maximum scollable value
  // Resolve destination type (node or number)
  var documentHeight = Math.max(
    document.body.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.clientHeight,
    document.documentElement.scrollHeight,
    document.documentElement.offsetHeight
  );
  var windowHeight =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.getElementsByTagName('body')[0].clientHeight;
  var destinationOffset =
    typeof destination === 'number' ? destination : destination.offsetTop;
  var destinationOffsetToScroll = Math.round(
    documentHeight - destinationOffset < windowHeight
      ? documentHeight - windowHeight
      : destinationOffset
  );

  // If requestAnimationFrame is not supported
  // Move window to destination position and trigger callback function
  if ('requestAnimationFrame' in window === false) {
    window.scroll(0, destinationOffsetToScroll);
    if (callback) {
      callback();
    }
    return;
  }

  // function resolves position of a window and moves to exact amount of pixels
  // Resolved by calculating delta and timing function choosen by user
  function scroll() {
    var now =
      'now' in window.performance ? performance.now() : new Date().getTime();
    var time = Math.min(1, (now - startTime) / duration);
    var timeFunction = easings[easing](time);
    window.scroll(
      0,
      Math.ceil(timeFunction * (destinationOffsetToScroll - start) + start)
    );

    // Stop requesting animation when window reached its destination
    // And run a callback function
    if (window.pageYOffset === destinationOffsetToScroll) {
      if (callback) {
        callback();
      }
      return;
    }

    // If window still needs to scroll to reach destination
    // Request another scroll invokation
    requestAnimationFrame(scroll);
  }

  // Invoke scroll and sequential requestAnimationFrame
  scroll();
}
