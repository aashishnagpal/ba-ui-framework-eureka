/**
 * Created by Aashish on 2/25/2017.
 */
(function () {
  'use strict';
  var nav = document.querySelector('.nav[data-nav-type="sticky"]');
  if (nav !== null) {
    var scrollContent = document.getElementById(nav.getAttribute('data-spyOn')) || document.documentElement || document.body;

    var initialPosition = document.querySelector('header').getBoundingClientRect().bottom;
    var finalPosition = document.querySelector('footer').getBoundingClientRect().top;

    console.log(initialPosition, finalPosition);

    var stickyNav = function () {
      var scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;
      console.log(finalPosition - scrollPosition);
      if (scrollPosition < initialPosition || scrollPosition >= finalPosition) {
        nav.classList.remove('nav--sticky');
      }
      else {
        nav.classList.add('nav--sticky');
      }
    };
    window.addEventListener('load', function () {
      window.addEventListener('scroll', stickyNav);
    });
  }
})();