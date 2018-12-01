const seconds = 5000;
let time = setInterval(auto, seconds);
let current = 0;

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
  for (let i = 0; i < images.length; i++) {
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
  for (let i = 0; i < dots.length; i++) {
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
for (let i = 0; i < dots.length; i++) {
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
}

// Outside click functionally (in case of modal/sidebar outside clicks)
// Listen for outside clicks
function outsideClick(event) {
  if (event.target.id === 'outside-click') {
    hamburger.classList.remove('is-active');
    sideBar.classList.remove('sidebar__open');
    modal.classList.remove('modal-space__active');
    noScroll.classList.remove('body__active');
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
  if (window.scrollY > 0) {
    head.style.opacity = '1';
  } else if (window.scrollY === 0) {
    head.style.opacity = '0.9';
  }
}

// Change which Y-position the top button is visible/invisible
function btnTop() {
  if (window.scrollY > 200) {
    topBtn.style.right = '0';
  } else if (window.scrollY < 200) {
    topBtn.style.right = '-100px';
  }
}

delay();
start();
