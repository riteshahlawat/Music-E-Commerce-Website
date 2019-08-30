const md = new MobileDetect(window.navigator.userAgent);
var burgerTaps = 0;
const navSlide = () => {
  var burger = document.querySelector(".burger");
  var nav = document.querySelector(".nav-links");
  var navLinks = document.querySelectorAll(".nav-links li");

  burger.addEventListener("click", () => {
    // Disable scrolling
    document.body.classList.toggle("lock-scroll");
    // Check if background needs to be transparent or not
    let currentScrollPos = window.pageYOffset;
    // If at top
    if (currentScrollPos < 1) {
      // make transparent
      document.querySelector(".nav-links").style.backgroundColor =
        "transparent";
    } else if (currentScrollPos > 1) {
      // if not at top and burger tapped once
      if (burgerTaps % 2 == 0) {
        // make black
        document.querySelector(
          ".nav-links"
        ).style.backgroundColor = getComputedStyle(
          document.documentElement
        ).getPropertyValue("--pal1");
      } else {
        // If not at top and burger tapped twice (to close)
        // make transparent again
        document.querySelector(".nav-links").style.backgroundColor = "transparent";
      }
    }
    burgerTaps++;
    // Toggle nav
    nav.classList.toggle("nav-active");
    // Animate Links
    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = "";
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 +
          0.15}s`;
      }
    });
    // Burger Animation
    burger.classList.toggle("toggle");
  });
};
window.onscroll = () => {
  let currentScrollPos = window.pageYOffset;
  let mql = window.matchMedia("(max-width: 768px)");
  var navLinks = document.querySelector(".nav-links");
  // Check if at top of page
  if (currentScrollPos < 1) {
    document.getElementsByTagName("nav")[0].style.backgroundColor =
      "transparent";
  } else {
    document.getElementsByTagName(
      "nav"
    )[0].style.backgroundColor = getComputedStyle(
      document.documentElement
    ).getPropertyValue("--pal1");
  }
};
navSlide();
