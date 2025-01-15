
// bottom nav 
console.clear();
const list = document.querySelectorAll('.list');
const nav = document.querySelector('.navigation');
list.forEach(item => item.addEventListener('click', function(e){
	list.forEach(li => li.classList.remove('active'));
	e.currentTarget.classList.add('active');
}));




//website type
function toggleContent() {
	var hiddenContent = document.querySelectorAll('.hidden-content');
	var btnText = document.getElementById("myBtn");
  
	hiddenContent.forEach(function(element) {
	  if (element.style.display === "none") {
		element.style.display = "block";
		btnText.innerHTML = "See less"; 
	  } else {
		element.style.display = "none";
		btnText.innerHTML = "See more"; 
	  }
	});
  }


//ads type
  function toggleContentads() {
	var hiddenContentads = document.querySelectorAll('.hidden-content-ads');
	var btnText = document.getElementById("toggleBtn");
  
	hiddenContentads.forEach(function(element) {
	  if (element.style.display === "none") {
		element.style.display = "block";
		btnText.innerHTML = "Less Ads"; 
	  } else {
		element.style.display = "none";
		btnText.innerHTML = "More Ads"; 
	  }
	});
  }



//design type
  function toggleContentdesign() {
	var hiddenContentdesign = document.querySelectorAll('.hidden-content-design');
	var btnText = document.getElementById("toggledesign");
  
	hiddenContentdesign.forEach(function(element) {
	  if (element.style.display === "none") {
		element.style.display = "block";
		btnText.innerHTML = "Less"; 
	  } else {
		element.style.display = "none";
		btnText.innerHTML = "More"; 
	  }
	});
  }



//   process
// Retrieve elements from the DOM
const process = document.querySelector('.process');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Constants
const SECTION_WIDTH = 200;

// Array to hold section objects
const sections = [];

// Function to create a section object
function create(start) {
  const section = {
    start: start,
    width: SECTION_WIDTH,
    height: 45,
    hMax: 35,
    hMod: 0,
    progress: 0,
    dot: {
      x: 0,
      y: 0
    }
  };
  section.end = section.start + section.width;
  section.dot.x = section.start + section.width / 2;
  section.dot.y = section.height;
  sections.push(section);
}

// Function to draw a section
function draw(s) {
  const wMod = s.width * 0.3;
  ctx.beginPath();
  ctx.moveTo(s.start, s.height);
  ctx.bezierCurveTo(
    s.start + wMod, s.height,
    s.start + wMod, s.height - s.hMod,
    s.start + s.width / 2, s.height - s.hMod
  );
  ctx.bezierCurveTo(
    s.end - wMod, s.height - s.hMod,
    s.end - wMod, s.height,
    s.end, s.height
  );
  ctx.lineWidth = 4;
  ctx.strokeStyle = 'white';
  ctx.stroke();

  ctx.beginPath();
  ctx.fillStyle = 'white';
  ctx.arc(s.dot.x, s.dot.y, 8, 0, Math.PI * 2);
  ctx.fill();
}

// Easing functions
function quad(progress) {
  return Math.pow(progress, 2);
}

function makeEaseOut(delta) {
  return function(progress) {
    return 1 - delta(1 - progress);
  };
}

const quadOut = makeEaseOut(quad);

// Function to bend a section
function bend(s) {
  if (s.progress < s.hMax) {
    const delta = quadOut(s.progress / s.hMax);
    s.hMod = s.hMax * delta;
    s.dot.y = s.height - s.hMax * delta;
    s.progress++;
  }
}

// Function to reset a section
function reset(s) {
  if (s.progress > 0) {
    const delta = quadOut(s.progress / s.hMax);
    s.hMod = s.hMax * delta;
    s.dot.y = s.height - s.hMax * delta;
    s.progress -= 2;
  } else {
    s.hMod = 0;
    s.dot.y = s.height;
    s.progress = 0;
  }
}

// Initialize sections
create(0);
create(200);
create(400);
create(600);

// Animation loop
function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  sections.forEach((s, index) => {
    if (currentSection === index) {
      bend(s);
    } else {
      reset(s);
    }
    draw(s);
  });

  window.requestAnimationFrame(loop);
}

// Mouse movement interaction
let currentSection = 0;
process.addEventListener('mousemove', (event) => {
  const section = Math.floor((event.clientX - process.offsetLeft) / SECTION_WIDTH);
  currentSection = section;
});

// Start animation loop
loop();





  