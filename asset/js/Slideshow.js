const carousel = document.getElementById("carousel");
const slides = carousel.querySelector(".slides");

// Cloning first and last slide
const firstClone = slides.children[0].cloneNode(true);
const lastClone = slides.children[slides.children.length - 1].cloneNode(true);

slides.insertBefore(lastClone, slides.firstChild);
slides.appendChild(firstClone);

let isDragging = false;
let startX = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID;
let currentSlide = 1; // Mulai dari slide 1 (bukan clone)

function slideWidth() {
  return carousel.clientWidth;
}

function getPositionX(e) {
  return e.type.includes("mouse") ? e.pageX : e.touches[0].clientX;
}

function setSliderPosition() {
  slides.style.transform = `translateX(${currentTranslate}px)`;
}

function animation() {
  setSliderPosition();
  if (isDragging) requestAnimationFrame(animation);
}

function touchStart() {
  return function(e) {
    isDragging = true;
    startX = getPositionX(e);
    animationID = requestAnimationFrame(animation);
    slides.style.transition = "none";
  };
}

function touchMove(e) {
  if (!isDragging) return;
  const currentX = getPositionX(e);
  const deltaX = currentX - startX;
  currentTranslate = prevTranslate + deltaX;
}

function touchEnd() {
  isDragging = false;
  cancelAnimationFrame(animationID);

  const movedBy = currentTranslate - prevTranslate;

  if (movedBy < -100) currentSlide++;
  if (movedBy > 100) currentSlide--;

  moveToSlide(currentSlide);
}

function moveToSlide(index) {
  const totalSlides = slides.children.length;
  const maxSlide = totalSlides - 1;

  currentTranslate = -slideWidth() * index;
  prevTranslate = currentTranslate;
  slides.style.transition = "transform 0.4s ease";
  setSliderPosition();

  // Setelah animasi selesai, cek apakah di clone
  slides.addEventListener("transitionend", () => {
    if (index === 0) {
      currentSlide = totalSlides - 2;
      slides.style.transition = "none";
      currentTranslate = -slideWidth() * currentSlide;
      prevTranslate = currentTranslate;
      setSliderPosition();
    } else if (index === totalSlides - 1) {
      currentSlide = 1;
      slides.style.transition = "none";
      currentTranslate = -slideWidth() * currentSlide;
      prevTranslate = currentTranslate;
      setSliderPosition();
    }
  }, { once: true });
}

// Events
carousel.addEventListener("mousedown", touchStart());
carousel.addEventListener("mousemove", touchMove);
carousel.addEventListener("mouseup", touchEnd);
carousel.addEventListener("mouseleave", () => { if (isDragging) touchEnd(); });

carousel.addEventListener("touchstart", touchStart());
carousel.addEventListener("touchmove", touchMove);
carousel.addEventListener("touchend", touchEnd);

// Set posisi awal
window.addEventListener("load", () => {
  currentTranslate = -slideWidth();
  prevTranslate = currentTranslate;
  setSliderPosition();
});

window.addEventListener("resize", () => {
  currentTranslate = -slideWidth() * currentSlide;
  prevTranslate = currentTranslate;
  setSliderPosition();
});

document.querySelectorAll('.slides img').forEach(img => {
  img.ondragstart = e => e.preventDefault(); // Cegah drag gambar
});
