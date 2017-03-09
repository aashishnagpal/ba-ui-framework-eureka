/**
 * Created by Aashish on 2/25/2017.
 */
(function () {
  'use strict';

  var fetchScrollToTargets = function () {
    // Fetch navigation list and the anchor tags within it to form the scrollspy checkpoints
    var nav = document.querySelector('[data-scrollspy]');
    var links = nav.querySelectorAll('a[href]:not([href="#"]');
    var targets = [], testTargets = {};

    // Create the target checkpoints array.
    Array.prototype.forEach.call(links, function (element) {
      var domTarget = document.getElementById(element.hash.slice(1));
      targets.push({
        navItem: element.parentNode, // this is used to mark the active nav item
        top: window.pageYOffset + domTarget.getBoundingClientRect().top, // this will become the start bound condition for
        // active nav item
        bottom: window.pageYOffset + domTarget.getBoundingClientRect().bottom // this will become the end bound condition for active nav item
      });

      // Add a click event listener on each nav__item
      element.parentNode.addEventListener('click', function () {
        this.classList.add('nav__item--active');
      });
    });

    return {
      nav: nav,
      targets: targets
    };
  };

  var scrollspyNav = function (scrollspyObj) {
    // read current scroll position
    var scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;

    for (var i = 0; i < scrollspyObj.targets.length; i++) {
      var checkTarget = scrollspyObj.targets[i];
      var navItem = checkTarget.navItem;
      if (scrollPosition >= checkTarget.top && scrollPosition <= checkTarget.bottom) { // activate item
        navItem.classList.add('nav__item--active');
      } else {
        navItem.classList.remove('nav__item--active'); //deactivate item
      }
    }
  };

  window.addEventListener('load', function () {
    var scrollspyObject = fetchScrollToTargets();
    window.addEventListener('scroll', function () {
      scrollspyNav(scrollspyObject);
    });
  });

})();