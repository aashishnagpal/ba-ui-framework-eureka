/**
 * Created by Aashish on 2/25/2017.
 */
(function () {
  'use strict';
  var nav = document.querySelector('.nav[data-nav-type="sticky"]');

  var initialOffset = nav.offsetTop;
  var stickyNav = function () {
    var scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;
    if (initialOffset > scrollPosition) {
      nav.classList.remove('nav--sticky');
    }
    else if (nav.offsetTop <= scrollPosition) {
      nav.classList.add('nav--sticky');
    }
  };
  window.addEventListener('load', function () {
    window.addEventListener('scroll', stickyNav);
  });
})();