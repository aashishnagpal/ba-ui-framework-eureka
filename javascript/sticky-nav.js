/**
 * Created by Aashish on 2/25/2017.
 */
(function () {
  'use strict';


  var fetchStickyNavBoundaries = function () {

    var getPosition = function (element, dimension) {
      return window.pageYOffset + element.getBoundingClientRect()[dimension];
    };

    // fetch the navigation element (can be any element, list or not)
    // must have data-nav-type="sticky"
    var nav = document.querySelector('[data-nav-type="sticky"]');
    if (nav !== null) {
      // Fetch header element using header id
      // get bottom of header to set starting boundary or fallback to Nav element's top

      // fetch the element on which the this navigation spies on.
      // The element may not be present, then fallback to body element
      var scrollContent = document.getElementById(nav.getAttribute('data-content-id')) || document.documentElement || document.body;

      var siteHeader = document.getElementById(nav.getAttribute('data-header-id')); // Header Element
      var initialPosition = siteHeader ? getPosition(siteHeader, 'bottom') : getPosition(scrollContent, 'top');

      // Fetch footer element using footer id
      // get top of footer to set ending boundary or fallback to scrollContent's bottom
      var siteFooter = document.getElementById(nav.getAttribute('data-footer-id'));
      var finalPosition = siteFooter ? getPosition(siteFooter, 'top') : getPosition(scrollContent, 'bottom');

      return {
        nav: nav,
        start: initialPosition,
        end: finalPosition - window.innerHeight
      };
    }
  };

  var stickyNav = function (boundaries) {
    // read current scroll position
    var scrollPosition = window.pageYOffset;

    // test scroll position against starting and ending boundaries and add or remove sticky nature
    if (scrollPosition < boundaries.start) {
      boundaries.nav.classList.remove('nav--sticky');
    } else if (scrollPosition > boundaries.end) {
      // this expects that the `nav--sticky` is already added by the `else` tag below
      boundaries.nav.style.top = 'auto';
      boundaries.nav.style.bottom = scrollPosition - boundaries.end + 'px';
    } else {
      boundaries.nav.classList.add('nav--sticky');
      boundaries.nav.style.top = 0;
      boundaries.nav.style.bottom = 'auto';
    }
  };

  window.addEventListener('load', function () {
    var stickyBoundaries = fetchStickyNavBoundaries();
    window.addEventListener('scroll', function () {
      stickyNav(stickyBoundaries);
    });
  });
})();