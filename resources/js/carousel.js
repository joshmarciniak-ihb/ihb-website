!(function (d) {
  d.addEventListener("DOMContentLoaded", () => {
    const carouselContainer = d.querySelector(".carousel");
    const slideWrapper = d.querySelector(".carousel-slides");
    const slides = d.querySelectorAll(".carousel-slide");
    const navdots = d.querySelectorAll(".carousel-navdots button");
    const slideContent = d.querySelectorAll(".slide-content");

    const nSlides = slides.length;
    const nSlidesCloned = 1;

    const firstSlideClone = slides[0].cloneNode(true);
    slideWrapper.append(firstSlideClone);

    const lastSlideClone = slides[nSlides - 1].cloneNode(true);
    slideWrapper.prepend(lastSlideClone);

    let slideWidth = slides[0].offsetWidth;
    let isDragging = false;


    let scrollTimer;
    const pause = 7000;
    let itv;
    const observer = new IntersectionObserver(callback, {threshold: 0.99});

    slideWrapper.addEventListener('scroll', () => {
      navdots.forEach(navdot => {
        navdot.classList.remove('is-active');
      });

      slideContent.forEach(content => {
        content.classList.remove('is-active');
      })

      if (scrollTimer) clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        if (slideWrapper.scrollLeft < slideWidth * (nSlidesCloned - 1 / 2)) {
          forward();
        }

        if (slideWrapper.scrollLeft > slideWidth * ((nSlides - 1 + nSlidesCloned) + 1/2)) {
          rewind();
        }
      }, 100);
      updateSlideContent();
      updateNavdot();
    });

    let resizeTimer;
    window.addEventListener('resize', () => {
      slideWidth = slides[0].offsetWidth;
      if (resizeTimer) clearTimeout(resizeTimer);
      stop();
      resizeTimer = setTimeout(() => {
        play();
      }, 400);
    });

    carouselContainer.addEventListener("pointerenter", () => stop());
    carouselContainer.addEventListener("pointerleave", () => play());
    carouselContainer.addEventListener("touchstart", () => stop());

    carouselContainer.addEventListener("mousedown", (e) => {
      isDragging = true;
    });

    carouselContainer.addEventListener("mouseleave", () => {
      isDragging = false;
    });

    carouselContainer.addEventListener("mouseup", () => {
      isDragging = false;
    });

    carouselContainer.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      e.preventDefault();
      scrollTimer = setTimeout(() => {
        if (slideWrapper.scrollLeft < slideWidth * (nSlidesCloned - 1 / 2)) {
          forward();
        }

        if (slideWrapper.scrollLeft > slideWidth * ((nSlides - 1 + nSlidesCloned) + 1/2)) {
          rewind();
        }
      }, 100);
      updateSlideContent();
      updateNavdot();
    });

    setSlideContent(0);
    goto(0);
    markNavdot(0);
    
    slideWrapper.classList.add("smooth-scroll");
    observer.observe(carouselContainer);

    function indexSlideCurrent() {
      return Math.round(slideWrapper.scrollLeft / slideWidth - nSlidesCloned);
    }

    function goto(index) {
      slideWrapper.scrollTo(slideWidth * (index + nSlidesCloned), 0);
    }
    for (let i = 0; i < nSlides; i++) {
      navdots[i].addEventListener("click", () => goto(i));
    }

    function markNavdot(index) {
      navdots[index].classList.add("is-active");
    }

    function updateNavdot() {
      const c = indexSlideCurrent();
      if (c < 0 || c >= nSlides) return;
      markNavdot(c);
    }

    function setSlideContent(index) {
      slideContent[index].classList.add("is-active");
    }

    function updateSlideContent(){
      const c = indexSlideCurrent();
      if (c < 0 || c >= nSlides) return;
      setSlideContent(c);
    }

    function rewind() {
      slideWrapper.classList.remove('smooth-scroll');
      setTimeout(() => {
        slideWrapper.scrollTo(slideWidth * nSlidesCloned, 0);
        slideWrapper.classList.add('smooth-scroll');
      }, 100);
    }

    function forward() {
      slideWrapper.classList.remove('smooth-scroll');
      setTimeout(() => {
        slideWrapper.scrollTo(slideWidth * ( nSlides - 1 + nSlidesCloned), 0);
      });
    }

    function next() {
      goto(indexSlideCurrent() + 1);
    }

    function play() {
      clearInterval(itv);
      itv = setInterval(next, pause);
    }

    function stop() {
      clearInterval(itv);
    }

    function callback(entries, observer) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          play();
        } else {
          stop();
        }
      })
    }
  });
})(document);
