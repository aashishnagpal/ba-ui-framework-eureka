/**
 * Created by Aashish on 2/25/2017.
 */
(function () {
  'use strict';
  var nav = document.querySelector('.nav[data-nav-type="sticky"]');
  if (nav !== null) {
    var initialOffset = nav.getBoundingClientRect().top;
    var stickyNav = function () {
      var scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;
      if (initialOffset > scrollPosition || scrollPosition <= 0) {
        nav.classList.remove('nav--sticky');
      }
      else if (nav.offsetTop <= scrollPosition) {
        nav.classList.add('nav--sticky');
      }
    };
    window.addEventListener('load', function () {
      window.addEventListener('scroll', stickyNav);
    });
  }
})();