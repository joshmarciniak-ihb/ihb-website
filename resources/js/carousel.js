!(function (d) {
  d.addEventListener("DOMContentLoaded", () => {
    // Components
    const carouselContainer = document.querySelector(".carousel");
    const slideWrapper = document.querySelector(".carousel__slides");
    const slides = document.querySelectorAll(".carousel__slide");
    const navdots = document.querySelectorAll(".carousel__navdots button");

    // Parameters
    const n_slides = slides.length;
    const n_slidesCloned = 1;
    let slideWidth = slides[0].offsetWidth;

    function index_slideCurrent() {
      return Math.round(slideWrapper.scrollLeft / slideWidth - n_slidesCloned);
    }

    // Nav dot click handler
    function goto(index) {
      slideWrapper.scrollTo(slideWidth * (index + n_slidesCloned), 0);
    }
    for (let i = 0; i < n_slides; i++) {
      navdots[i].addEventListener("click", () => goto(i));
    }

    // Marking nav dots
    function markNavdot(index) {
      navdots[index].classList.add("is-active");
      navdots[index].setAttribute("aria-disabled", "true");
    }
    function updateNavdot() {
      const c = index_slideCurrent();
      if (c < 0 || c >= n_slides) return; // in these cases, forward() and rewind() will be executed soon
      markNavdot(c);
    }
    function updateAnimation(index) {
      // Remove animate class from all titles and links
      slides.forEach(slide => {
        const title = slide.querySelector('.hero-title');
        const link = slide.querySelector('.hero-links');
        if (title) title.classList.remove('animate');
        if (link) link.classList.remove('animate');
      });
    
      // Add animate class to the current slide's title and link after a slight delay
      const currentSlide = slides[index];
      if (currentSlide) {
        const title = currentSlide.querySelector('.hero-title');
        const link = currentSlide.querySelector('.hero-links');
        
        // Use a timeout to ensure the transition has time to kick in
        setTimeout(() => {
          if (title) title.classList.add('animate');
          if (link) link.classList.add('animate');
        }, 50);  // Adjust the delay as necessary
      }
    }

    let scrollTimer;
    slideWrapper.addEventListener("scroll", () => {
      // reset
      navdots.forEach((navdot) => {
        navdot.classList.remove("is-active");
        navdot.setAttribute("aria-disabled", "false");
      });
      // handle infinite scrolling
      if (scrollTimer) clearTimeout(scrollTimer); // to cancel if scroll continues
      scrollTimer = setTimeout(() => {
        if (slideWrapper.scrollLeft < slideWidth * (n_slidesCloned - 1 / 2)) {
          forward();
        }
        if (
          slideWrapper.scrollLeft >
          slideWidth * (n_slides - 1 + n_slidesCloned + 1 / 2)
        ) {
          rewind();
        }
      }, 100);
      // mark the navdot
      updateNavdot();
      updateAnimation(index_slideCurrent());
    });

    // Handle window resizing
    let resizeTimer;
    window.addEventListener("resize", () => {
      // update parameters
      slideWidth = slides[0].offsetWidth;
      // for autoplay
      if (resizeTimer) clearTimeout(resizeTimer);
      stop();
      resizeTimer = setTimeout(() => {
        play();
      }, 400);
    });

    // Infinite scrolling
    const firstSlideClone = slides[0].cloneNode(true);
    firstSlideClone.setAttribute("aria-hidden", "true");
    slideWrapper.append(firstSlideClone);

    const lastSlideClone = slides[n_slides - 1].cloneNode(true);
    lastSlideClone.setAttribute("aria-hidden", "true");
    slideWrapper.prepend(lastSlideClone);

    function rewind() {
      slideWrapper.classList.remove("smooth-scroll");

      setTimeout(() => {
        // wait for smooth scroll to be disabled
        slideWrapper.scrollTo(slideWidth * n_slidesCloned, 0);
        slideWrapper.classList.add("smooth-scroll");
      }, 100);
    }

    function forward() {
      slideWrapper.classList.remove("smooth-scroll");
      setTimeout(() => {
        // wait for smooth scroll to be disabled
        slideWrapper.scrollTo(slideWidth * (n_slides - 1 + n_slidesCloned), 0);
        slideWrapper.classList.add("smooth-scroll");
      }, 100);
    }

    // Autoplay
    function next() {
      const currentIndex = index_slideCurrent();
      goto(currentIndex + 1);
    }
    const pause = 6000;
    let itv;
    function play() {
      // early return if the user prefers reduced motion
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }
      clearInterval(itv);
      slideWrapper.setAttribute("aria-live", "off");
      itv = setInterval(next, pause);
    }
    function stop() {
      clearInterval(itv);
      slideWrapper.setAttribute("aria-live", "polite");
    }
    const observer = new IntersectionObserver(callback, { threshold: 0.99 });
    observer.observe(carouselContainer);
    function callback(entries, observer) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          play();
        } else {
          stop();
        }
      });
    }
    // for mouse users
    carouselContainer.addEventListener("pointerenter", () => stop());
    carouselContainer.addEventListener("pointerleave", () => play());
    // for keyboard users
    carouselContainer.addEventListener("focus", () => stop(), true);
    carouselContainer.addEventListener(
      "blur",
      () => {
        if (carouselContainer.matches(":hover")) return;
        play();
      },
      true
    );
    // for touch device users
    carouselContainer.addEventListener("touchstart", () => stop());

    // Initialization
    goto(0);
    markNavdot(0);
    slideWrapper.classList.add("smooth-scroll");
  });
})(document);
