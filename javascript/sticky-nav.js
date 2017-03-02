/**
 * Created by Aashish on 2/25/2017.
 */
(function () {
  'use strict';
  // fetch the navigation element (can be any element, list or not)
  // must have data-nav-type="sticky"
  var nav = document.querySelector('.nav[data-nav-type="sticky"]');

  if (nav !== null) {
    // fetch the element on which the this navigation spies on.
    // The element may not be present, then fallback to body element
    var scrollContent = document.getElementById(nav.getAttribute('data-content-id')) || document.documentElement || document.body;

    // Fetch header element using header id
    // get bottom of header to set starting boundary or fallback to Nav element's top
    var siteHeader = document.getElementById(nav.getAttribute('data-header-id')); // Header Element
    var initialPosition = siteHeader ? siteHeader.getBoundingClientRect().bottom : nav.getBoundingClientRect().top;

    // Fetch footer element using footer id
    // get top of footer to set ending boundary or fallback to scrollContent's bottom
    var siteFooter = document.getElementById(nav.getAttribute('data-footer-id'));
    var finalPosition = siteFooter ? siteFooter.getBoundingClientRect().top : scrollContent.getBoundingClientRect().bottom;

    var stickyNav = function () {
      // read current scroll position
      var scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;

      // test scroll position against starting and ending boundaries and add or remove sticky nature
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