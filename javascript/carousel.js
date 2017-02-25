(function() {
  var carousels = document.querySelectorAll('.c-carousel');
  var numOfCarousels = carousels.length;
  var i;

  // add event listeners to carousels
  for (i = 0; i < numOfCarousels; i++) {
    carousels[i].addEventListener('click', _navAction(i));
  }

  function _navAction(i) {
    return function(e) {
      e.preventDefault();
      // the current carousel
      var activeCarousel = carousels[i];
      console.dir(activeCarousel);
      var isSlider = activeCarousel.classList.contains('c-carousel--slider-type');
      // array of slides in current carousel
      var slideArray = Array.prototype.slice.call(activeCarousel.querySelectorAll('.c-carousel__slide'));
      // length of slide array
      var slideArrayLength = slideArray.length;
      // index number of the currently displayed slide
      var currentSlide = slideArray.indexOf(activeCarousel.querySelector('.c-carousel__slide--is-selected'));
      // array of bullet nav list items
      var bulletNav = Array.prototype.slice.call(activeCarousel.querySelectorAll('.c-carousel__bullet-nav-item'));

      // target element of click event
      var target = e.target;

      if (target.nodeName === 'I') {
        // set target to parent of icon element when prev/next nav clicked
        target = target.parentNode;
      }

      // if bullet nav is clicked
      if (target.dataset.slideIndex !== undefined) {
        // get the slide index from the data-slide-index attribute
        var targetedSlide = +(target.dataset.slideIndex);
        // remove selected class from all slides
        slideArray.forEach(function(slide) {
          if (slide.classList.contains('c-carousel__slide--is-selected')) {
            slide.classList.remove('c-carousel__slide--is-selected');
          }
          if (isSlider) {
            // slide.classList.remove('--slide-*');
            slide.className = 'c-carousel__slide';
          }
        });
        // remove active class from all bullet nav items
        bulletNav.forEach(function(bullet) {
          bullet.classList.remove('c-carousel__bullet-nav-item--is-active');
        });
        // add selected class to selected slide
        slideArray[targetedSlide].classList.add('c-carousel__slide--is-selected');
        if (isSlider) {
          if (targetedSlide > currentSlide || currentSlide === slideArray.length - 1) {
            slideArray[targetedSlide].classList.add('--slide-next');
            slideArray[currentSlide].classList.add('--slide-out-left');
            slideArray[currentSlide].classList.remove('--slide-out-*');
          } else if (targetedSlide < currentSlide) {
            slideArray[targetedSlide].classList.add('--slide-prev');
            slideArray[currentSlide].classList.add('--slide-out-right');
            slideArray[currentSlide].classList.remove('--slide-out-*');
          }
        }
        // add active class to correct bullet nav item
        bulletNav[targetedSlide].classList.add('c-carousel__bullet-nav-item--is-active');

        // if arrow nav is clicked
      } else if (target.dataset.slideNav !== undefined) {

        // get the navigation direction from data-slide-nav attribute
        var navDirection = target.dataset.slideNav;
        console.log('navDirection: ', navDirection);
        // set the next slide index
        var nextIndex = (currentSlide < slideArrayLength - 1) ? currentSlide + 1 : 0;

        // set the previous slide index
        var prevIndex = (currentSlide > 0) ? currentSlide - 1 : slideArrayLength - 1;

        // remove selected class from all slides
        slideArray.forEach(function(slide) {
          slide.classList.remove('c-carousel__slide--is-selected');
          if (isSlider) {
            // slide.classList.remove('--slide-*');
            slide.className = 'c-carousel__slide';
          }
        });
        // remove active class from all bullet nav items
        bulletNav.forEach(function(bullet) {
          bullet.classList.remove('c-carousel__bullet-nav-item--is-active');
        });
        // add selected class to slide and active class to bullet nav depending on navDirection
        if (navDirection === 'next') {
          slideArray[nextIndex].classList.add('c-carousel__slide--is-selected');
          if (isSlider) {
            slideArray[nextIndex].classList.add('--slide-next');
            slideArray[currentSlide].classList.add('--slide-out-left');
            // slideArray[currentSlide].classList.remove('--slide-out-left');
          }
          bulletNav[nextIndex].classList.add('c-carousel__bullet-nav-item--is-active');
        } else {
          slideArray[prevIndex].classList.add('c-carousel__slide--is-selected');
          if (isSlider) {
            slideArray[prevIndex].classList.add('--slide-prev');
            slideArray[currentSlide].classList.add('--slide-out-right');
            // slideArray[currentSlide].classList.remove('--slide-out-right');
          }
          bulletNav[prevIndex].classList.add('c-carousel__bullet-nav-item--is-active');
        }
      }

    };
  }

})();

