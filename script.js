"use strict";
////////////////////////Scroll to first section
const btnScrollTo = document.querySelector(".btn-scroll-to");
const section1 = document.querySelector(".section--1");

btnScrollTo.addEventListener("click", function () {
  section1.scrollIntoView({ behavior: "smooth" });
});

///////////////////////Event delegation - page navigation
document.querySelector(".navbar").addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("nav-link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

///////////////////////Sticky navigation Intersection observer API
const header = document.querySelector(".header");
const navbar = document.querySelector(".navbar");

const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) navbar.classList.add("sticky");
  else navbar.classList.remove("sticky");
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
});

headerObserver.observe(header);

/////////////////////////Reveal sections

const allSections = document.querySelectorAll(".section");

const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  else {
    entry.target.classList.remove("section-hidden");
    observer.unobserve(entry.target);
  }
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section-hidden");
});
////////////////Slider - carousel
const slides = document.querySelectorAll(".slide");
const slider = document.querySelector(".slider");

const btnRigth = document.querySelector(".slider__btn--right");
const btnLeft = document.querySelector(".slider__btn--left");

let curSlide = 0;
const maxSlide = slides.length;

const goToSlide = function (slide) {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
};
goToSlide(0);

const nextSlide = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  goToSlide(curSlide);
};
const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }
  goToSlide(curSlide);
};

btnRigth.addEventListener("click", nextSlide);
btnLeft.addEventListener("click", prevSlide);

/////////////Toggle menu mobile
const menuToggle = document.querySelector(".toggle");
const menu = document.querySelector(".nav_links");

function toggleMenu() {
  menuToggle.classList.toggle("active");
  menu.classList.toggle("active");
}
